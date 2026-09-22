import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  getTables,
  getTableQr,
  createTable,
  updateTable,
  deleteTable,
} from "../../services/tableService";

function TablePage() {
  const [tables, setTables] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("Semua");

  const [selectedTable, setSelectedTable] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    capacity: "",
    status: "available",
  });

  // =========================
  // LOAD TABLES
  // =========================

  const loadTables = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getTables();

      console.log("Data meja:", result);

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
      console.error(
        "Gagal mengambil data meja:",
        err
      );

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
  // FORMAT STATUS
  // =========================

  const formatStatus = (status) => {
    const value = String(
      status || ""
    ).toLowerCase();

    if (
      value === "available" ||
      value === "tersedia"
    ) {
      return "Tersedia";
    }

    if (
      value === "occupied" ||
      value === "terisi"
    ) {
      return "Terisi";
    }

    if (
      value === "inactive" ||
      value === "nonaktif"
    ) {
      return "Nonaktif";
    }

    return status || "-";
  };

  // =========================
  // FILTER
  // =========================

  const filteredTables = useMemo(() => {
    if (statusFilter === "Semua") {
      return tables;
    }

    return tables.filter(
      (table) =>
        formatStatus(table.status) ===
        statusFilter
    );
  }, [tables, statusFilter]);

  // =========================
  // STATS
  // =========================

  const totalTables = tables.length;

  const availableTables = tables.filter(
    (table) =>
      formatStatus(table.status) ===
      "Tersedia"
  ).length;

  const occupiedTables = tables.filter(
    (table) =>
      formatStatus(table.status) ===
      "Terisi"
  ).length;

  const activeQr = tables.filter(
    (table) =>
      table?.code ||
      table?.qr_code
  ).length;

  // =========================
  // OPEN ADD FORM
  // =========================

  const handleAdd = () => {
    setEditingTable(null);

    setForm({
      name: "",
      code: "",
      capacity: "",
      status: "available",
    });

    setError("");
    setShowForm(true);
  };

  // =========================
  // OPEN EDIT FORM
  // =========================

  const handleEdit = (table) => {
    setEditingTable(table);

    setForm({
      name: table?.name || "",
      code:
        table?.code ||
        table?.qr_code ||
        "",
      capacity:
        table?.capacity ??
        "",
      status:
        table?.status ||
        "available",
    });

    setError("");
    setShowForm(true);
  };

  // =========================
  // FORM INPUT
  // =========================

  const handleFormChange = (event) => {
    const { name, value } =
      event.target;

    if (name === "capacity") {
      // Izinkan input kosong
      if (value === "") {
        setForm((prev) => ({
          ...prev,
          capacity: "",
        }));

        return;
      }

      const numberValue =
        Number(value);

      // Kapasitas maksimal 10 orang
      if (numberValue > 10) {
        return;
      }

      // Kapasitas minimal 1 orang
      if (numberValue < 1) {
        return;
      }

      setForm((prev) => ({
        ...prev,
        capacity: value,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE TABLE
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // =========================
    // VALIDASI NAMA
    // =========================

    if (!form.name.trim()) {
      alert("Nama meja wajib diisi.");
      return;
    }

    // =========================
    // VALIDASI KODE
    // =========================

    if (!form.code.trim()) {
      alert("Kode meja wajib diisi.");
      return;
    }

    // =========================
    // VALIDASI KAPASITAS
    // =========================

    const capacity =
      Number(form.capacity);

    if (
      !form.capacity ||
      Number.isNaN(capacity)
    ) {
      alert(
        "Kapasitas meja wajib diisi."
      );
      return;
    }

    if (capacity < 1) {
      alert(
        "Kapasitas meja minimal 1 orang."
      );
      return;
    }

    if (capacity > 10) {
      alert(
        "Kapasitas meja maksimal 10 orang."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const tableData = {
        name: form.name.trim(),
        code: form.code.trim(),
        capacity: capacity,
        status: form.status,
      };

      console.log(
        "Data meja yang dikirim:",
        tableData
      );

      if (editingTable) {
        await updateTable(
          editingTable.id,
          tableData
        );

        alert(
          "Data meja berhasil diperbarui."
        );
      } else {
        await createTable(tableData);

        alert(
          "Meja berhasil ditambahkan."
        );
      }

      setShowForm(false);
      setEditingTable(null);

      setForm({
        name: "",
        code: "",
        capacity: "",
        status: "available",
      });

      await loadTables();
    } catch (err) {
      console.error(
        "Gagal menyimpan meja:",
        err
      );

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
      `Apakah kamu yakin ingin menghapus meja "${table?.name || table?.code || ""}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTable(table.id);

      alert("Meja berhasil dihapus.");

      await loadTables();
    } catch (err) {
      console.error(
        "Gagal menghapus meja:",
        err
      );

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
      setSelectedTable(table);

      if (qrUrl) {
        URL.revokeObjectURL(qrUrl);
        setQrUrl("");
      }

      const url = await getTableQr(
        table.id
      );

      setQrUrl(url);
    } catch (err) {
      console.error(
        "Gagal mengambil QR:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Gagal mengambil QR meja."
      );

      setSelectedTable(null);
    } finally {
      setQrLoading(false);
    }
  };

  // =========================
  // CLOSE QR
  // =========================

  const closeQr = () => {
    if (qrUrl) {
      URL.revokeObjectURL(qrUrl);
    }

    setQrUrl("");
    setSelectedTable(null);
  };

  // =========================
  // DOWNLOAD QR
  // =========================

  const downloadQr = () => {
    if (!qrUrl || !selectedTable) {
      return;
    }

    const link =
      document.createElement("a");

    link.href = qrUrl;

    link.download = `QR-${selectedTable.code || selectedTable.name || selectedTable.id}.svg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // =========================
  // STATUS BADGE
  // =========================

  const StatusBadge = ({ status }) => {
    const normalized =
      formatStatus(status);

    let background = "#f3f4f6";
    let color = "#374151";

    if (normalized === "Tersedia") {
      background = "#ecfdf5";
      color = "#059669";
    }

    if (normalized === "Terisi") {
      background = "#fff7ed";
      color = "#ea580c";
    }

    if (normalized === "Nonaktif") {
      background = "#fef2f2";
      color = "#dc2626";
    }

    return (
      <span
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "20px",
          background,
          color,
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {normalized}
      </span>
    );
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          marginLeft: "250px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Meja & QR
            </h1>

            <p
              style={{
                marginTop: "6px",
                color: "#6b7280",
              }}
            >
              Kelola meja dan QR code
              restoran
            </p>
          </div>

          <button
            onClick={handleAdd}
            style={{
              border: "none",
              background: "#800000",
              color: "#fff",
              padding: "11px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            + Tambah Meja
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            title="Total Meja"
            value={totalTables}
          />

          <StatCard
            title="Tersedia"
            value={availableTables}
          />

          <StatCard
            title="Terisi"
            value={occupiedTables}
          />

          <StatCard
            title="QR Aktif"
            value={activeQr}
          />
        </div>

        {/* FILTER */}
        <div
          style={{
            background: "#fff",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "20px",
            border:
              "1px solid #e5e7eb",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong
              style={{
                fontSize: "14px",
                color: "#111827",
              }}
            >
              Daftar Meja
            </strong>

            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              Kelola meja restoran
              dan QR code
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            style={{
              padding: "10px 14px",
              border:
                "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#fff",
              outline: "none",
            }}
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Tersedia">
              Tersedia
            </option>

            <option value="Terisi">
              Terisi
            </option>

            <option value="Nonaktif">
              Nonaktif
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border:
              "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              Memuat data meja...
            </div>
          ) : filteredTables.length ===
            0 ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              Belum ada data meja.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "#f9fafb",
                  }}
                >
                  <th style={thStyle}>
                    MEJA
                  </th>

                  <th style={thStyle}>
                    KODE QR
                  </th>

                  <th style={thStyle}>
                    KAPASITAS
                  </th>

                  <th style={thStyle}>
                    STATUS
                  </th>

                  <th style={thStyle}>
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTables.map(
                  (table, index) => (
                    <tr
                      key={
                        table.id ||
                        index
                      }
                    >
                      <td style={tdStyle}>
                        <strong>
                          {table.name ||
                            table.table_number ||
                            "-"}
                        </strong>
                      </td>

                      <td style={tdStyle}>
                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "6px 10px",
                            borderRadius:
                              "6px",
                            background:
                              "#fef2f2",
                            color:
                              "#800000",
                            fontSize:
                              "12px",
                            fontWeight:
                              "600",
                          }}
                        >
                          {table.code ||
                            table.qr_code ||
                            "-"}
                        </span>
                      </td>

                      <td style={tdStyle}>
                        {table.capacity ||
                          0}{" "}
                        orang
                      </td>

                      <td style={tdStyle}>
                        <StatusBadge
                          status={
                            table.status
                          }
                        />
                      </td>

                      <td style={tdStyle}>
                        <div
                          style={{
                            display:
                              "flex",
                            gap: "8px",
                          }}
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
                                "#fef2f2",
                              color:
                                "#800000",
                              padding:
                                "7px 12px",
                              borderRadius:
                                "7px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            Lihat QR
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(
                                table
                              )
                            }
                            style={{
                              border:
                                "none",
                              background:
                                "#f3f4f6",
                              color:
                                "#374151",
                              padding:
                                "7px 12px",
                              borderRadius:
                                "7px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
                            }}
                          >
                            Edit
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
                                "#fef2f2",
                              color:
                                "#dc2626",
                              padding:
                                "7px 12px",
                              borderRadius:
                                "7px",
                              cursor:
                                "pointer",
                              fontWeight:
                                "600",
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
          )}
        </div>
      </main>

      {/* =========================
          FORM MODAL
      ========================= */}

      {showForm && (
        <div
          onClick={() =>
            !saving &&
            setShowForm(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#111827",
              }}
            >
              {editingTable
                ? "Edit Meja"
                : "Tambah Meja"}
            </h2>

            <p
              style={{
                margin:
                  "6px 0 24px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              {editingTable
                ? "Perbarui data meja"
                : "Tambahkan meja baru"}
            </p>

            <form
              onSubmit={handleSubmit}
            >
              {/* NAMA */}
              <div
                style={{
                  marginBottom: "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color:
                      "#374151",
                    marginBottom:
                      "7px",
                  }}
                >
                  Nama Meja
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={
                    handleFormChange
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
                  marginBottom: "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color:
                      "#374151",
                    marginBottom:
                      "7px",
                  }}
                >
                  Kode Meja
                </label>

                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={
                    handleFormChange
                  }
                  placeholder="Contoh: HOSHI-001"
                  style={
                    inputStyle
                  }
                />
              </div>

              {/* KAPASITAS */}
              <div
                style={{
                  marginBottom: "18px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color:
                      "#374151",
                    marginBottom:
                      "7px",
                  }}
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
                    handleFormChange
                  }
                  placeholder="Maksimal 10 orang"
                  style={
                    inputStyle
                  }
                />

                <div
                  style={{
                    fontSize:
                      "12px",
                    color:
                      "#6b7280",
                    marginTop:
                      "5px",
                  }}
                >
                  Kapasitas maksimal
                  10 orang.
                </div>
              </div>

              {/* STATUS */}
              <div
                style={{
                  marginBottom: "26px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "600",
                    color:
                      "#374151",
                    marginBottom:
                      "7px",
                  }}
                >
                  Status
                </label>

                <select
                  name="status"
                  value={
                    form.status
                  }
                  onChange={
                    handleFormChange
                  }
                  style={
                    inputStyle
                  }
                >
                  <option value="available">
                    Tersedia
                  </option>

                  <option value="occupied">
                    Terisi
                  </option>
                </select>
              </div>

              {/* BUTTON */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setShowForm(false)
                  }
                  style={{
                    flex: 1,
                    padding: "12px",
                    border:
                      "1px solid #d1d5db",
                    background:
                      "#fff",
                    color:
                      "#6b7280",
                    borderRadius:
                      "8px",
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
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
                    flex: 1,
                    padding: "12px",
                    border: "none",
                    background:
                      saving
                        ? "#d1d5db"
                        : "#800000",
                    color: "#fff",
                    borderRadius:
                      "8px",
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
                    fontWeight:
                      "600",
                  }}
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          QR MODAL
      ========================= */}

      {selectedTable && (
        <div
          onClick={closeQr}
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#111827",
              }}
            >
              QR Meja
            </h2>

            <p
              style={{
                margin:
                  "8px 0 20px",
                color: "#6b7280",
              }}
            >
              {selectedTable.name ||
                selectedTable.code}
            </p>

            <div
              style={{
                minHeight: "250px",
                display: "flex",
                justifyContent:
                  "center",
                alignItems: "center",
                marginBottom:
                  "20px",
              }}
            >
              {qrLoading ? (
                <div
                  style={{
                    color:
                      "#6b7280",
                  }}
                >
                  Memuat QR...
                </div>
              ) : qrUrl ? (
                <img
                  src={qrUrl}
                  alt={`QR ${selectedTable.code || selectedTable.name}`}
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit:
                      "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    color:
                      "#6b7280",
                  }}
                >
                  QR tidak tersedia.
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={downloadQr}
                disabled={!qrUrl}
                style={{
                  flex: 1,
                  border: "none",
                  background:
                    qrUrl
                      ? "#800000"
                      : "#d1d5db",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: qrUrl
                    ? "pointer"
                    : "not-allowed",
                  fontWeight:
                    "600",
                }}
              >
                Download QR
              </button>

              <button
                onClick={closeQr}
                style={{
                  flex: 1,
                  border:
                    "1px solid #d1d5db",
                  background: "#fff",
                  color: "#374151",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight:
                    "600",
                }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// STAT CARD
// =========================

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border:
          "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "26px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

// =========================
// STYLE
// =========================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "9px",
  outline: "none",
  fontSize: "14px",
  color: "#374151",
  background: "#fff",
};

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  fontSize: "12px",
  color: "#6b7280",
  borderBottom:
    "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "15px 16px",
  borderBottom:
    "1px solid #f1f5f9",
  fontSize: "14px",
  color: "#374151",
};

export default TablePage;