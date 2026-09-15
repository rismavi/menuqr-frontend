import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "#ORD-001",
      customer: "Budi",
      table: "Table 01",
      time: "10:15",
      items: 3,
      total: "Rp 82.000",
      status: "Baru",
      payment: "Belum Bayar",
    },
    {
      id: "#ORD-002",
      customer: "Sinta",
      table: "Table 03",
      time: "10:22",
      items: 2,
      total: "Rp 67.000",
      status: "Diproses",
      payment: "Belum Bayar",
    },
    {
      id: "#ORD-003",
      customer: "Andi",
      table: "Table 05",
      time: "10:35",
      items: 4,
      total: "Rp 124.000",
      status: "Selesai",
      payment: "Lunas",
    },
    {
      id: "#ORD-004",
      customer: "Rina",
      table: "Table 02",
      time: "10:41",
      items: 2,
      total: "Rp 55.000",
      status: "Diproses",
      payment: "Belum Bayar",
    },
    {
      id: "#ORD-005",
      customer: "Dimas",
      table: "Table 07",
      time: "10:50",
      items: 5,
      total: "Rp 156.000",
      status: "Baru",
      payment: "Belum Bayar",
    },
  ];

  const orderItems = [
    {
      name: "Spicy Ramen",
      variant: "Level 2",
      qty: 1,
      price: "Rp 36.000",
    },
    {
      name: "Gyoza",
      variant: "Original",
      qty: 1,
      price: "Rp 22.000",
    },
    {
      name: "Ocha",
      variant: "Regular",
      qty: 1,
      price: "Rp 8.000",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f7f5f6",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

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
              Pesanan
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                color: "#777",
              }}
            >
              Kelola pesanan pelanggan dan proses pesanan ke dapur.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#4f8a62",
              }}
            ></span>

            <span
              style={{
                fontSize: "12px",
                color: "#555",
              }}
            >
              Kasir aktif
            </span>
          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div style={statCardStyle}>
            <span style={statLabelStyle}>Pesanan Hari Ini</span>

            <h2 style={statValueStyle}>28</h2>

            <span style={statDescriptionStyle}>Total pesanan masuk</span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>Pesanan Baru</span>

            <h2
              style={{
                ...statValueStyle,
                color: "#8f2638",
              }}
            >
              6
            </h2>

            <span style={statDescriptionStyle}>Menunggu diproses</span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>Sedang Diproses</span>

            <h2
              style={{
                ...statValueStyle,
                color: "#b47a36",
              }}
            >
              8
            </h2>

            <span style={statDescriptionStyle}>Sedang dibuat dapur</span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>Selesai</span>

            <h2
              style={{
                ...statValueStyle,
                color: "#4f8a62",
              }}
            >
              14
            </h2>

            <span style={statDescriptionStyle}>Pesanan selesai</span>
          </div>
        </div>

        {/* =========================
            FILTER
        ========================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Cari nomor pesanan atau nama pelanggan..."
            style={{
              flex: 1,
              height: "42px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0 13px",
              fontSize: "12px",
              outline: "none",
            }}
          />

          <select style={filterSelectStyle}>
            <option>Semua Status</option>
            <option>Baru</option>
            <option>Diproses</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>

          <select style={filterSelectStyle}>
            <option>Semua Pembayaran</option>
            <option>Belum Bayar</option>
            <option>Lunas</option>
          </select>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 330px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* =========================
              ORDER TABLE
          ========================= */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "20px 22px",
                borderBottom: "1px solid #eee",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#211b1d",
                }}
              >
                Daftar Pesanan
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Pesanan pelanggan yang masuk hari ini.
              </p>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#faf9f9",
                    textAlign: "left",
                  }}
                >
                  <th style={tableHeaderStyle}>Pesanan</th>

                  <th style={tableHeaderStyle}>Pelanggan</th>

                  <th style={tableHeaderStyle}>Meja</th>

                  <th style={tableHeaderStyle}>Total</th>

                  <th style={tableHeaderStyle}>Status</th>

                  <th
                    style={{
                      ...tableHeaderStyle,
                      textAlign: "center",
                    }}
                  >
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: "#211b1d",
                        }}
                      >
                        {order.id}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          marginTop: "3px",
                          fontSize: "10px",
                          color: "#999",
                        }}
                      >
                        {order.time}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "12px",
                          color: "#211b1d",
                        }}
                      >
                        {order.customer}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          marginTop: "3px",
                          fontSize: "10px",
                          color: "#999",
                        }}
                      >
                        {order.items} item
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        {order.table}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "12px",
                          color: "#8f2638",
                        }}
                      >
                        {order.total}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          marginTop: "3px",
                          fontSize: "10px",
                          color: order.payment === "Lunas" ? "#4f8a62" : "#999",
                        }}
                      >
                        {order.payment}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <StatusBadge status={order.status} />
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          border: "none",
                          backgroundColor: "#f7f5f6",
                          color: "#555",
                          padding: "7px 11px",
                          borderRadius: "6px",
                          fontSize: "10px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              OPERATIONAL INFO
          ========================= */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* KASIR */}

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #eee",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                  color: "#211b1d",
                }}
              >
                Operasional Kasir
              </h2>

              <p
                style={{
                  margin: "6px 0 18px",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Ringkasan pesanan yang perlu ditangani.
              </p>

              <OperationRow
                label="Menunggu diproses"
                value="6"
                valueColor="#8f2638"
              />

              <OperationRow
                label="Sedang dibuat"
                value="8"
                valueColor="#b47a36"
              />

              <OperationRow label="Selesai" value="14" valueColor="#4f8a62" />
            </div>

            {/* PEMBAYARAN */}

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #eee",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                  color: "#211b1d",
                }}
              >
                Pembayaran
              </h2>

              <p
                style={{
                  margin: "6px 0 18px",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Pembayaran dilakukan langsung di kasir.
              </p>

              <div
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#f7f5f6",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  Menunggu pembayaran
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "5px",
                    fontSize: "22px",
                    color: "#8f2638",
                  }}
                >
                  14
                </strong>

                <span
                  style={{
                    display: "block",
                    marginTop: "4px",
                    fontSize: "11px",
                    color: "#777",
                  }}
                >
                  Pesanan belum dibayar
                </span>
              </div>
            </div>

            {/* ALUR PESANAN */}

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #eee",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "17px",
                  color: "#211b1d",
                }}
              >
                Alur Pesanan
              </h2>

              <p
                style={{
                  margin: "6px 0 18px",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Proses pesanan dari WhatsApp hingga pesanan selesai.
              </p>

              <WorkflowStep
                number="1"
                title="Pesanan masuk ke WhatsApp"
                description="Pesanan pelanggan masuk melalui WhatsApp."
              />

              <WorkflowStep
                number="2"
                title="Customer bayar di kasir"
                description="Customer melakukan pembayaran langsung di kasir."
              />

              <WorkflowStep
                number="3"
                title="Diproses di dapur"
                description="Pesanan yang sudah dibayar diteruskan ke dapur."
              />

              <WorkflowStep
                number="4"
                title="Pesanan selesai"
                description="Pesanan selesai dibuat dan siap diberikan."
                last
              />
            </div>
          </div>
        </div>
      </main>

      {/* =========================
          DETAIL MODAL
      ========================= */}

      {selectedOrder && (
        <div
          onClick={() => setSelectedOrder(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(33, 27, 29, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "30px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "520px",
              maxWidth: "100%",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            {/* MODAL HEADER */}

            <div
              style={{
                padding: "20px 22px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#999",
                  }}
                >
                  Detail Pesanan
                </span>

                <h2
                  style={{
                    margin: "4px 0 0",
                    fontSize: "20px",
                    color: "#211b1d",
                  }}
                >
                  {selectedOrder.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "none",
                  borderRadius: "50%",
                  backgroundColor: "#f7f5f6",
                  color: "#777",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* CUSTOMER INFO */}

            <div
              style={{
                padding: "18px 22px",
                backgroundColor: "#faf9f9",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <InfoItem label="Pelanggan" value={selectedOrder.customer} />

              <InfoItem label="Meja" value={selectedOrder.table} />

              <InfoItem label="Waktu" value={selectedOrder.time} />

              <InfoItem label="Pembayaran" value={selectedOrder.payment} />
            </div>

            {/* ORDER ITEMS */}

            <div
              style={{
                padding: "20px 22px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 14px",
                  fontSize: "15px",
                  color: "#211b1d",
                }}
              >
                Detail Item
              </h3>

              {orderItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      index === orderItems.length - 1
                        ? "none"
                        : "1px solid #eee",
                  }}
                >
                  <div>
                    <strong
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#211b1d",
                      }}
                    >
                      {item.name}
                    </strong>

                    <span
                      style={{
                        display: "block",
                        marginTop: "3px",
                        fontSize: "10px",
                        color: "#999",
                      }}
                    >
                      {item.variant} × {item.qty}
                    </span>
                  </div>

                  <strong
                    style={{
                      fontSize: "12px",
                      color: "#555",
                    }}
                  >
                    {item.price}
                  </strong>
                </div>
              ))}

              {/* TOTAL */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "17px",
                  marginTop: "7px",
                  borderTop: "1px solid #ddd",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  Total Pesanan
                </span>

                <strong
                  style={{
                    fontSize: "20px",
                    color: "#8f2638",
                  }}
                >
                  {selectedOrder.total}
                </strong>
              </div>
            </div>

            {/* MODAL ACTIONS */}

            <div
              style={{
                padding: "18px 22px",
                borderTop: "1px solid #eee",
                display: "flex",
                justifyContent: "flex-end",
                gap: "9px",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{
                  border: "1px solid #ddd",
                  backgroundColor: "#ffffff",
                  color: "#555",
                  padding: "10px 14px",
                  borderRadius: "7px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Tutup
              </button>

              <button
                type="button"
                style={{
                  border: "none",
                  backgroundColor: "#8f2638",
                  color: "#ffffff",
                  padding: "10px 14px",
                  borderRadius: "7px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Proses ke Dapur
              </button>

              <button
                type="button"
                style={{
                  border: "none",
                  backgroundColor: "#4f8a62",
                  color: "#ffffff",
                  padding: "10px 14px",
                  borderRadius: "7px",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   STATISTIC STYLE
========================= */

const statCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "14px",
  padding: "20px",
};

const statLabelStyle = {
  fontSize: "13px",
  color: "#777",
};

const statValueStyle = {
  margin: "8px 0 0",
  fontSize: "28px",
  color: "#211b1d",
};

const statDescriptionStyle = {
  display: "block",
  marginTop: "6px",
  fontSize: "11px",
  color: "#999",
};

/* =========================
   FILTER
========================= */

const filterSelectStyle = {
  width: "175px",
  height: "42px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "12px",
  color: "#555",
  backgroundColor: "#ffffff",
};

/* =========================
   TABLE
========================= */

const tableHeaderStyle = {
  padding: "14px 15px",
  fontSize: "10px",
  color: "#888",
  fontWeight: "600",
  borderBottom: "1px solid #eee",
};

const tableCellStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
  fontSize: "12px",
};

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  let backgroundColor = "#f7f5f6";
  let color = "#777";

  if (status === "Baru") {
    backgroundColor = "#fbeaec";
    color = "#8f2638";
  }

  if (status === "Diproses") {
    backgroundColor = "#fbf1df";
    color = "#b47a36";
  }

  if (status === "Selesai") {
    backgroundColor = "#e9f5ec";
    color = "#4f8a62";
  }

  if (status === "Dibatalkan") {
    backgroundColor = "#eee";
    color = "#777";
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 9px",
        borderRadius: "6px",
        backgroundColor,
        color,
        fontSize: "10px",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );
}

/* =========================
   OPERATION ROW
========================= */

function OperationRow({ label, value, valueColor }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          color: "#555",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          fontSize: "15px",
          color: valueColor,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================
   WORKFLOW
========================= */

function WorkflowStep({ number, title, description, last = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        position: "relative",
        paddingBottom: last ? "0" : "17px",
      }}
    >
      {!last && (
        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "31px",
            bottom: "0",
            width: "1px",
            backgroundColor: "#ddd",
          }}
        ></div>
      )}

      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "#f4e8eb",
          color: "#8f2638",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "700",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {number}
      </div>

      <div>
        <strong
          style={{
            display: "block",
            fontSize: "12px",
            color: "#211b1d",
          }}
        >
          {title}
        </strong>

        <span
          style={{
            display: "block",
            marginTop: "3px",
            fontSize: "10px",
            color: "#999",
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
}

/* =========================
   INFO ITEM
========================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <span
        style={{
          display: "block",
          fontSize: "10px",
          color: "#999",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "4px",
          fontSize: "12px",
          color: "#211b1d",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

export default OrdersPage;
