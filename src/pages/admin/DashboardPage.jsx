import AdminSidebar from "../../components/admin/AdminSidebar";

function DashboardPage() {
  // Data contoh penjualan selama 7 hari
  const salesData = [
    { day: "Sen", value: 1800000 },
    { day: "Sel", value: 2400000 },
    { day: "Rab", value: 2100000 },
    { day: "Kam", value: 2800000 },
    { day: "Jum", value: 3200000 },
    { day: "Sab", value: 4100000 },
    { day: "Min", value: 3600000 },
  ];

  // Nilai terbesar digunakan sebagai acuan tinggi grafik
  const maxSales = Math.max(...salesData.map((item) => item.value));

  return (
    <div
      className="admin-layout"
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f7f5f6",
      }}
    >
      {/* =========================
          SIDEBAR
      ========================= */}

      <AdminSidebar />

      {/* =========================
          MAIN CONTENT
      ========================= */}

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
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              color: "#211b1d",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#777",
              fontSize: "14px",
            }}
          >
            Selamat datang di Dashboard Hoshi Ramen.
          </p>
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
          {/* TOTAL PESANAN */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "22px",
              border: "1px solid #eee",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              Total Pesanan
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "#211b1d",
              }}
            >
              128
            </h2>

            <span
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "12px",
                color: "#4f8a62",
              }}
            >
              ↑ 12% dari minggu lalu
            </span>
          </div>

          {/* PESANAN HARI INI */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "22px",
              border: "1px solid #eee",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              Pesanan Hari Ini
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "#211b1d",
              }}
            >
              24
            </h2>

            <span
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "12px",
                color: "#4f8a62",
              }}
            >
              ↑ 8% dari kemarin
            </span>
          </div>

          {/* PENDAPATAN */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "22px",
              border: "1px solid #eee",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              Pendapatan Hari Ini
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "28px",
                color: "#211b1d",
              }}
            >
              Rp 2,4 Jt
            </h2>

            <span
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "12px",
                color: "#4f8a62",
              }}
            >
              ↑ 15% dari kemarin
            </span>
          </div>

          {/* MENU TERLARIS */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "22px",
              border: "1px solid #eee",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "13px",
              }}
            >
              Menu Terlaris
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "20px",
                color: "#211b1d",
              }}
            >
              Spicy Ramen
            </h2>

            <span
              style={{
                display: "block",
                marginTop: "8px",
                fontSize: "12px",
                color: "#777",
              }}
            >
              42 pesanan minggu ini
            </span>
          </div>
        </div>

        {/* =========================
            GRAFIK + STATUS MEJA
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* GRAFIK PENJUALAN */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#211b1d",
                  }}
                >
                  Penjualan 7 Hari
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Performa penjualan minggu ini
                </p>
              </div>

              <span
                style={{
                  fontSize: "12px",
                  padding: "7px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#f4e8eb",
                  color: "#8f2638",
                  fontWeight: "600",
                }}
              >
                Minggu Ini
              </span>
            </div>

            {/* AREA GRAFIK */}

            <div
              style={{
                height: "250px",
                display: "flex",
                alignItems: "flex-end",
                gap: "18px",
                padding: "10px 8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {salesData.map((item) => {
                const height =
                  (item.value / maxSales) * 190;

                return (
                  <div
                    key={item.day}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#888",
                      }}
                    >
                      {(item.value / 1000000).toFixed(1)} jt
                    </span>

                    <div
                      style={{
                        width: "100%",
                        maxWidth: "42px",
                        height: `${height}px`,
                        backgroundColor: "#8f2638",
                        borderRadius: "7px 7px 0 0",
                      }}
                    ></div>

                    <span
                      style={{
                        fontSize: "11px",
                        color: "#777",
                        marginTop: "4px",
                      }}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STATUS MEJA */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
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
                Status Meja
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Kondisi meja saat ini
              </p>
            </div>

            {/* TERSEDIA */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#4f8a62",
                  }}
                ></span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  Tersedia
                </span>
              </div>

              <strong
                style={{
                  fontSize: "18px",
                  color: "#211b1d",
                }}
              >
                8
              </strong>
            </div>

            {/* TERISI */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#d59b3f",
                  }}
                ></span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  Terisi
                </span>
              </div>

              <strong
                style={{
                  fontSize: "18px",
                  color: "#211b1d",
                }}
              >
                5
              </strong>
            </div>

            {/* DIPESAN */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#8f2638",
                  }}
                ></span>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#555",
                  }}
                >
                  Dipesan
                </span>
              </div>

              <strong
                style={{
                  fontSize: "18px",
                  color: "#211b1d",
                }}
              >
                2
              </strong>
            </div>

            {/* TOTAL */}

            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                backgroundColor: "#f7f5f6",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                Total Meja
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "4px",
                  fontSize: "20px",
                  color: "#211b1d",
                }}
              >
                15 Meja
              </strong>
            </div>
          </div>
        </div>

        {/* =========================
            PESANAN TERBARU + MENU TERLARIS
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* PESANAN TERBARU */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              border: "1px solid #eee",
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
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#211b1d",
                  }}
                >
                  Pesanan Terbaru
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Pesanan yang baru masuk
                </p>
              </div>

              <span
                style={{
                  fontSize: "12px",
                  color: "#8f2638",
                  fontWeight: "600",
                }}
              >
                Lihat Semua →
              </span>
            </div>

            {/* PESANAN 1 */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 100px 100px",
                gap: "15px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong
                style={{
                  fontSize: "13px",
                  color: "#8f2638",
                }}
              >
                #ORD-128
              </strong>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Meja 05
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  2 menu
                </span>
              </div>

              <strong
                style={{
                  fontSize: "13px",
                  color: "#211b1d",
                }}
              >
                Rp 78.000
              </strong>

              <span
                style={{
                  padding: "6px 9px",
                  borderRadius: "6px",
                  backgroundColor: "#fff4dc",
                  color: "#a36b13",
                  fontSize: "10px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Diproses
              </span>
            </div>

            {/* PESANAN 2 */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 100px 100px",
                gap: "15px",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <strong
                style={{
                  fontSize: "13px",
                  color: "#8f2638",
                }}
              >
                #ORD-127
              </strong>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Meja 02
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  3 menu
                </span>
              </div>

              <strong
                style={{
                  fontSize: "13px",
                  color: "#211b1d",
                }}
              >
                Rp 112.000
              </strong>

              <span
                style={{
                  padding: "6px 9px",
                  borderRadius: "6px",
                  backgroundColor: "#e9f5ec",
                  color: "#4f8a62",
                  fontSize: "10px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Selesai
              </span>
            </div>

            {/* PESANAN 3 */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 100px 100px",
                gap: "15px",
                alignItems: "center",
                padding: "14px 0",
              }}
            >
              <strong
                style={{
                  fontSize: "13px",
                  color: "#8f2638",
                }}
              >
                #ORD-126
              </strong>

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Meja 09
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  1 menu
                </span>
              </div>

              <strong
                style={{
                  fontSize: "13px",
                  color: "#211b1d",
                }}
              >
                Rp 45.000
              </strong>

              <span
                style={{
                  padding: "6px 9px",
                  borderRadius: "6px",
                  backgroundColor: "#fff4dc",
                  color: "#a36b13",
                  fontSize: "10px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Diproses
              </span>
            </div>
          </div>

          {/* MENU TERLARIS */}

          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "24px",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
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
                Menu Terlaris
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Minggu ini
              </p>
            </div>

            {/* MENU 1 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#f4e8eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8f2638",
                  fontWeight: "700",
                }}
              >
                1
              </div>

              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Spicy Ramen
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  42 pesanan
                </span>
              </div>
            </div>

            {/* MENU 2 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#f7f5f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                  fontWeight: "700",
                }}
              >
                2
              </div>

              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Chicken Ramen
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  35 pesanan
                </span>
              </div>
            </div>

            {/* MENU 3 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#f7f5f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                  fontWeight: "700",
                }}
              >
                3
              </div>

              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Gyoza
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#888",
                  }}
                >
                  28 pesanan
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;