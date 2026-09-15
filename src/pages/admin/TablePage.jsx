import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  getTables,
  getTableQr,
} from "../../services/tableService";

function TablePage() {
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);

  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [loadingQr, setLoadingQr] = useState(false);

  // Mengambil data meja dari backend
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoadingTables(true);

        const data = await getTables();

        setTables(data);
      } catch (error) {
        console.error("Gagal mengambil data meja:", error);
        alert("Data meja gagal dimuat.");
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, []);

  // Membuka modal dan mengambil QR dari backend
  const openQrModal = async (table) => {
    try {
      setSelectedTable(table);
      setShowQrModal(true);
      setQrUrl(null);
      setLoadingQr(true);

      const qr = await getTableQr(table.id);

      setQrUrl(qr);
    } catch (error) {
      console.error("Gagal mengambil QR:", error);
      alert("QR Code gagal dimuat.");
    } finally {
      setLoadingQr(false);
    }
  };

  // Menutup modal
  const closeQrModal = () => {
    setShowQrModal(false);
    setSelectedTable(null);

    if (qrUrl) {
      URL.revokeObjectURL(qrUrl);
    }

    setQrUrl(null);
  };

  // Download QR Code
  const downloadQr = () => {
    if (!qrUrl || !selectedTable) {
      return;
    }

    const link = document.createElement("a");

    link.href = qrUrl;
    link.download = `QR-${selectedTable.code}.svg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistik meja
  const totalTables = tables.length;

  const availableTables = tables.filter(
    (table) =>
      table.status === "Tersedia" ||
      table.status === "available"
  ).length;

  const occupiedTables = tables.filter(
    (table) =>
      table.status === "Terisi" ||
      table.status === "occupied"
  ).length;

  const activeQr = tables.filter(
    (table) => table.qr_code
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f3f6",
        margin: 0,
      }}
    >
      <AdminSidebar />

      <main
        style={{
          marginLeft: "240px",
          padding: "32px",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
                color: "#211b1d",
              }}
            >
              Meja & QR
            </h1>

            <p
              style={{
                margin: "6px 0 0",
                color: "#888",
                fontSize: "13px",
              }}
            >
              Kelola meja restoran dan QR Code untuk pelanggan.
            </p>
          </div>

          <button
            style={{
              border: "none",
              backgroundColor: "#8f2638",
              color: "#ffffff",
              padding: "11px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Tambah Meja
          </button>
        </div>

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            title="Total Meja"
            value={totalTables}
            description="Meja terdaftar"
          />

          <StatCard
            title="Tersedia"
            value={availableTables}
            description="Siap digunakan"
          />

          <StatCard
            title="Terisi"
            value={occupiedTables}
            description="Sedang digunakan"
          />

          <StatCard
            title="QR Aktif"
            value={activeQr}
            description="QR Code tersedia"
          />
        </div>

        {/* CONTENT */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                  color: "#211b1d",
                }}
              >
                Daftar Meja
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Data meja diambil langsung dari database.
              </p>
            </div>

            <select
              style={{
                padding: "9px 12px",
                border: "1px solid #ddd",
                borderRadius: "7px",
                fontSize: "12px",
                color: "#555",
                backgroundColor: "#fff",
              }}
            >
              <option>Semua Status</option>
              <option>Tersedia</option>
              <option>Terisi</option>
            </select>
          </div>

          {/* TABLE */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <th style={thStyle}>MEJA</th>
                <th style={thStyle}>KODE QR</th>
                <th style={thStyle}>KAPASITAS</th>
                <th style={thStyle}>STATUS</th>

                <th
                  style={{
                    ...thStyle,
                    textAlign: "right",
                  }}
                >
                  AKSI
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingTables ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#999",
                      fontSize: "13px",
                    }}
                  >
                    Memuat data meja...
                  </td>
                </tr>
              ) : tables.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "#999",
                      fontSize: "13px",
                    }}
                  >
                    Belum ada data meja.
                  </td>
                </tr>
              ) : (
                tables.map((table) => (
                  <tr
                    key={table.id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    {/* MEJA */}
                    <td style={tdStyle}>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#211b1d",
                        }}
                      >
                        {table.name}
                      </div>

                      <div
                        style={{
                          fontSize: "11px",
                          color: "#999",
                          marginTop: "3px",
                        }}
                      >
                        ID #{table.id}
                      </div>
                    </td>

                    {/* CODE */}
                    <td style={tdStyle}>
                      <span
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#f5eef0",
                          color: "#8f2638",
                          padding: "6px 9px",
                          borderRadius: "6px",
                          fontWeight: "600",
                        }}
                      >
                        {table.code}
                      </span>
                    </td>

                    {/* CAPACITY */}
                    <td style={tdStyle}>
                      {table.capacity} orang
                    </td>

                    {/* STATUS */}
                    <td style={tdStyle}>
                      <StatusBadge
                        status={formatStatus(table.status)}
                      />
                    </td>

                    {/* ACTION */}
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                      }}
                    >
                      <button
                        onClick={() => openQrModal(table)}
                        style={{
                          border: "1px solid #ddd",
                          backgroundColor: "#fff",
                          color: "#8f2638",
                          padding: "7px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          cursor: "pointer",
                          marginRight: "7px",
                        }}
                      >
                        Lihat QR
                      </button>

                      <button
                        style={{
                          border: "none",
                          backgroundColor: "#f4f4f4",
                          color: "#555",
                          padding: "7px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* QR MODAL */}
        {showQrModal && selectedTable && (
          <div
            onClick={closeQrModal}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "380px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "28px",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  color: "#211b1d",
                }}
              >
                QR {selectedTable.name}
              </h2>

              <p
                style={{
                  margin: "7px 0 20px",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Scan QR ini untuk membuka menu.
              </p>

              {/* QR IMAGE */}
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  margin: "0 auto 18px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                }}
              >
                {loadingQr ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    Memuat QR...
                  </span>
                ) : qrUrl ? (
                  <img
                    src={qrUrl}
                    alt={`QR ${selectedTable.name}`}
                    style={{
                      width: "165px",
                      height: "165px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    QR tidak tersedia
                  </span>
                )}
              </div>

              {/* TABLE CODE */}
              <div
                style={{
                  backgroundColor: "#f7f5f6",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    marginBottom: "4px",
                  }}
                >
                  Kode Meja
                </div>

                <strong
                  style={{
                    color: "#8f2638",
                    fontSize: "14px",
                  }}
                >
                  {selectedTable.code}
                </strong>
              </div>

              {/* BUTTON */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                <button
                  onClick={closeQrModal}
                  style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Tutup
                </button>

                <button
                  onClick={downloadQr}
                  disabled={!qrUrl}
                  style={{
                    flex: 1,
                    border: "none",
                    backgroundColor: qrUrl ? "#8f2638" : "#ccc",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: qrUrl ? "pointer" : "not-allowed",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Download QR
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function formatStatus(status) {
  if (status === "available") {
    return "Tersedia";
  }

  if (status === "occupied") {
    return "Terisi";
  }

  return status || "Tidak diketahui";
}

function StatCard({ title, value, description }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#999",
          marginBottom: "9px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "27px",
          fontWeight: "700",
          color: "#211b1d",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#999",
          marginTop: "4px",
        }}
      >
        {description}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isAvailable = status === "Tersedia";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "5px 9px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: "600",
        backgroundColor: isAvailable
          ? "#edf7ef"
          : "#fff1f1",
        color: isAvailable
          ? "#36804a"
          : "#b43d3d",
      }}
    >
      {status}
    </span>
  );
}

const thStyle = {
  padding: "12px 10px",
  textAlign: "left",
  fontSize: "10px",
  color: "#999",
  fontWeight: "700",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "15px 10px",
  fontSize: "12px",
  color: "#555",
};

export default TablePage;