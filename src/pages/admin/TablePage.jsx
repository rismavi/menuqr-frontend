import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
  getTableQr,
  downloadTableQr,
} from "../../services/tableService";

function TablePage() {
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const [showQrModal, setShowQrModal] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [selectedQrTable, setSelectedQrTable] =
    useState(null);
  const [qrLoading, setQrLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    capacity: 1,
  });

  // =========================
  // LOAD TABLES
  // =========================

  const loadTables = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getTables();

      const tableData =
        result?.data ||
        result?.tables ||
        result ||
        [];

      setTables(
        Array.isArray(tableData)
          ? tableData
          : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Gagal mengambil data meja."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  // =========================
  // FORM
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "capacity"
          ? Number(value)
          : value,
    }));
  };

  const openAddModal = () => {
    setEditingTable(null);

    setForm({
      name: "",
      code: "",
      capacity: 1,
    });

    setShowModal(true);
  };

  const openEditModal = (table) => {
    setEditingTable(table);

    setForm({
      name: table?.name || "",
      code: table?.code || "",
      capacity:
        Number(table?.capacity || 1),
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingTable(null);

    setForm({
      name: "",
      code: "",
      capacity: 1,
    });
  };

  // =========================
  // SAVE TABLE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Nama meja wajib diisi.");
      return;
    }

    if (!form.code.trim()) {
      alert("Kode meja wajib diisi.");
      return;
    }

    if (
      !form.capacity ||
      Number(form.capacity) < 1
    ) {
      alert(
        "Kapasitas meja minimal 1 orang."
      );
      return;
    }

    if (Number(form.capacity) > 10) {
      alert(
        "Kapasitas meja maksimal 10 orang."
      );
      return;
    }

    try {
      setSaving(true);

      const tableData = {
        name: form.name.trim(),
        code: form.code.trim(),
        capacity: Number(form.capacity),

        // Backend tetap membutuhkan meja aktif,
        // tetapi status ini tidak ditampilkan di UI.
        is_active: true,
      };

      if (editingTable) {
        await updateTable(
          editingTable.id,
          tableData
        );

        alert(
          "Meja berhasil diperbarui."
        );
      } else {
        await createTable(tableData);

        alert("Meja berhasil ditambahkan.");
      }

      closeModal();
      await loadTables();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal menyimpan data meja."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE TABLE
  // =========================

  const handleDelete = async (table) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus meja "${table?.name}"?`
    );

    if (!confirmed) return;

    try {
      await deleteTable(table.id);

      alert("Meja berhasil dihapus.");

      await loadTables();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal menghapus meja."
      );
    }
  };

  // =========================
  // SHOW QR
  // =========================

  const handleShowQr = async (table) => {
    try {
      setQrLoading(true);
      setSelectedQrTable(table);
      setShowQrModal(true);
      setQrImage("");

      const imageUrl =
        await getTableQr(table.id);

      setQrImage(imageUrl);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal mengambil QR meja."
      );

      setShowQrModal(false);
    } finally {
      setQrLoading(false);
    }
  };

  // =========================
  // CLOSE QR
  // =========================

  const closeQrModal = () => {
    setShowQrModal(false);
    setSelectedQrTable(null);

    if (qrImage) {
      URL.revokeObjectURL(qrImage);
    }

    setQrImage("");
  };

  // =========================
  // DOWNLOAD QR
  // =========================

  const handleDownloadQr = async (table) => {
    try {
      const blob =
        await downloadTableQr(table.id);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `QR-${table.code || table.name}.png`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal mengunduh QR meja."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <AdminSidebar />

      <main
  style={{
    marginLeft: "247px",
    width: "calc(100% - 247px)",
    minHeight: "100vh",
    padding: "35px 40px",
    boxSizing: "border-box",
    backgroundColor: "#f8f9fa",
  }}
>
        {/* =========================
            HEADER
        ========================= */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontWeight: "700",
                color: "#222",
              }}
            >
              Meja & QR
            </h2>

            <p
              style={{
                marginTop: "6px",
                marginBottom: 0,
                color: "#777",
              }}
            >
              Kelola meja dan QR Code untuk
              pelanggan.
            </p>
          </div>

          <button
            onClick={openAddModal}
            style={{
              border: "none",
              background: "#800000",
              color: "#fff",
              padding:
                "11px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
          >
            + Tambah Meja
          </button>
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div
            style={{
              background: "#f8d7da",
              color: "#842029",
              padding:
                "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* =========================
            TABLE CARD
        ========================= */}

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#777",
              }}
            >
              Memuat data meja...
            </div>
          ) : tables.length === 0 ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#777",
              }}
            >
              Belum ada meja.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: "850px",
                  borderCollapse:
                    "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor:
                        "#800000",
                      color: "#fff",
                    }}
                  >
                    <th
                      style={thStyle}
                    >
                      No
                    </th>

                    <th
                      style={thStyle}
                    >
                      Nama Meja
                    </th>

                    <th
                      style={thStyle}
                    >
                      Kode Meja
                    </th>

                    <th
                      style={thStyle}
                    >
                      Kapasitas
                    </th>

                    <th
                      style={thStyle}
                    >
                      QR Code
                    </th>

                    <th
                      style={thStyle}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tables.map(
                    (table, index) => (
                      <tr
                        key={table.id}
                        style={{
                          borderBottom:
                            "1px solid #eee",
                        }}
                      >
                        <td
                          style={
                            tdStyle
                          }
                        >
                          {index + 1}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <strong>
                            {table.name ||
                              "-"}
                          </strong>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <span
                            style={{
                              display:
                                "inline-block",
                              background:
                                "#f1f1f1",
                              padding:
                                "5px 9px",
                              borderRadius:
                                "6px",
                              fontSize:
                                "13px",
                              fontWeight:
                                "600",
                            }}
                          >
                            {table.code ||
                              "-"}
                          </span>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {table.capacity ||
                            0}{" "}
                          orang
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <button
                            onClick={() =>
                              handleShowQr(
                                table
                              )
                            }
                            style={{
                              border:
                                "none",
                              background:
                                "#800000",
                              color:
                                "#fff",
                              padding:
                                "8px 13px",
                              borderRadius:
                                "7px",
                              cursor:
                                "pointer",
                              fontSize:
                                "13px",
                              fontWeight:
                                "600",
                            }}
                          >
                            Lihat QR
                          </button>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                              flexWrap:
                                "wrap",
                            }}
                          >
                            <button
                              onClick={() =>
                                openEditModal(
                                  table
                                )
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "#f1f1f1",
                                color:
                                  "#333",
                                padding:
                                  "8px 12px",
                                borderRadius:
                                  "7px",
                                cursor:
                                  "pointer",
                                fontSize:
                                  "13px",
                              }}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDownloadQr(
                                  table
                                )
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "#e8f1ff",
                                color:
                                  "#0d6efd",
                                padding:
                                  "8px 12px",
                                borderRadius:
                                  "7px",
                                cursor:
                                  "pointer",
                                fontSize:
                                  "13px",
                              }}
                            >
                              Download QR
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  table
                                )
                              }
                              style={{
                                border:
                                  "none",
                                background:
                                  "#f8d7da",
                                color:
                                  "#842029",
                                padding:
                                  "8px 12px",
                                borderRadius:
                                  "7px",
                                cursor:
                                  "pointer",
                                fontSize:
                                  "13px",
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* =========================
          MODAL TAMBAH / EDIT
      ========================= */}

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "15px",
              padding: "28px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "22px",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontWeight: "700",
                }}
              >
                {editingTable
                  ? "Edit Meja"
                  : "Tambah Meja"}
              </h4>

              <button
                onClick={closeModal}
                disabled={saving}
                style={{
                  border: "none",
                  background:
                    "#f1f1f1",
                  width: "38px",
                  height: "38px",
                  borderRadius:
                    "50%",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
            >
              {/* NAMA */}
              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  Nama Meja
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Contoh: Table 01"
                  style={
                    inputStyle
                  }
                />
              </div>

              {/* KODE */}
              <div
                style={{
                  marginBottom:
                    "16px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  Kode Meja
                </label>

                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={
                    handleChange
                  }
                  placeholder="Contoh: HOSHI-001"
                  style={{
                    ...inputStyle,
                    textTransform:
                      "uppercase",
                  }}
                />

                <small
                  style={{
                    display:
                      "block",
                    marginTop:
                      "6px",
                    color: "#777",
                  }}
                >
                  Kode ini digunakan
                  pada QR Code meja.
                </small>
              </div>

              {/* KAPASITAS */}
              <div
                style={{
                  marginBottom:
                    "25px",
                }}
              >
                <label
                  style={
                    labelStyle
                  }
                >
                  Kapasitas
                </label>

                <input
                  type="number"
                  name="capacity"
                  min="1"
                  max="10"
                  value={
                    form.capacity
                  }
                  onChange={
                    handleChange
                  }
                  style={
                    inputStyle
                  }
                />

                <small
                  style={{
                    display:
                      "block",
                    marginTop:
                      "6px",
                    color: "#777",
                  }}
                >
                  Maksimal 10 orang.
                </small>
              </div>

              {/* BUTTON */}
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                  style={{
                    border:
                      "1px solid #ddd",
                    background:
                      "#fff",
                    color:
                      "#333",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600",
                  }}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    border: "none",
                    background:
                      "#800000",
                    color:
                      "#fff",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "600",
                    opacity:
                      saving
                        ? 0.6
                        : 1,
                  }}
                >
                  {saving
                    ? "Menyimpan..."
                    : editingTable
                    ? "Simpan Perubahan"
                    : "Tambah Meja"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          MODAL QR
      ========================= */}

      {showQrModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "450px",
              borderRadius: "15px",
              padding: "28px",
              boxSizing:
                "border-box",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom:
                  "20px",
              }}
            >
              <div
                style={{
                  textAlign:
                    "left",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontWeight:
                      "700",
                  }}
                >
                  QR Meja
                </h4>

                <div
                  style={{
                    marginTop:
                      "5px",
                    color: "#777",
                  }}
                >
                  {selectedQrTable?.name ||
                    "-"}
                </div>
              </div>

              <button
                onClick={
                  closeQrModal
                }
                style={{
                  border: "none",
                  background:
                    "#f1f1f1",
                  width: "38px",
                  height: "38px",
                  borderRadius:
                    "50%",
                  cursor:
                    "pointer",
                  fontSize:
                    "20px",
                }}
              >
                ×
              </button>
            </div>

            {/* QR */}
            <div
              style={{
                minHeight:
                  "300px",
                display:
                  "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center",
                border:
                  "1px solid #eee",
                borderRadius:
                  "10px",
                background:
                  "#fafafa",
                padding:
                  "20px",
              }}
            >
              {qrLoading ? (
                <div
                  style={{
                    color: "#777",
                  }}
                >
                  Memuat QR...
                </div>
              ) : qrImage ? (
                <img
                  src={qrImage}
                  alt={`QR ${selectedQrTable?.name || "Meja"}`}
                  style={{
                    width:
                      "280px",
                    height:
                      "280px",
                    objectFit:
                      "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    color: "#777",
                  }}
                >
                  QR tidak tersedia.
                </div>
              )}
            </div>

            {/* INFO */}
            {selectedQrTable && (
              <div
                style={{
                  marginTop:
                    "18px",
                  marginBottom:
                    "18px",
                  background:
                    "#f8f9fa",
                  padding:
                    "12px",
                  borderRadius:
                    "8px",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "13px",
                    color:
                      "#777",
                  }}
                >
                  Kode Meja
                </div>

                <strong>
                  {
                    selectedQrTable.code
                  }
                </strong>
              </div>
            )}

            {/* BUTTON DOWNLOAD */}
            {selectedQrTable && (
              <button
                onClick={() =>
                  handleDownloadQr(
                    selectedQrTable
                  )
                }
                style={{
                  width: "100%",
                  border: "none",
                  background:
                    "#800000",
                  color: "#fff",
                  padding:
                    "11px 18px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                }}
              >
                Download QR
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// STYLE
// =========================

const thStyle = {
  padding: "15px 14px",
  textAlign: "left",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "15px 14px",
  fontSize: "14px",
  color: "#333",
  verticalAlign: "middle",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  padding: "11px 13px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  fontSize: "14px",
};

export default TablePage;