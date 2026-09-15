import AdminSidebar from "../../components/admin/AdminSidebar";

function VariantPage() {
  const variants = [
    {
      id: 1,
      menu: "Spicy Ramen",
      variant: "Level 0",
      description: "Tidak pedas",
      price: "Rp 35.000",
      status: "Aktif",
    },
    {
      id: 2,
      menu: "Spicy Ramen",
      variant: "Level 1",
      description: "Pedas ringan",
      price: "Rp 35.000",
      status: "Aktif",
    },
    {
      id: 3,
      menu: "Spicy Ramen",
      variant: "Level 2",
      description: "Pedas sedang",
      price: "Rp 36.000",
      status: "Aktif",
    },
    {
      id: 4,
      menu: "Spicy Ramen",
      variant: "Level 3",
      description: "Pedas",
      price: "Rp 37.000",
      status: "Aktif",
    },
    {
      id: 5,
      menu: "Spicy Ramen",
      variant: "Level 4",
      description: "Sangat pedas",
      price: "Rp 38.000",
      status: "Aktif",
    },
    {
      id: 6,
      menu: "Chicken Ramen",
      variant: "Regular",
      description: "Porsi standar",
      price: "Rp 32.000",
      status: "Aktif",
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
              Variant Menu
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                color: "#777",
              }}
            >
              Kelola pilihan variant dan harga tambahan menu.
            </p>
          </div>

          <button
            type="button"
            style={{
              border: "none",
              backgroundColor: "#8f2638",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Tambah Variant
          </button>
        </div>

        {/* STATISTIC CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Total Variant
            </span>

            <h2 style={statValueStyle}>
              6
            </h2>

            <span style={statDescriptionStyle}>
              Semua variant menu
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Variant Aktif
            </span>

            <h2
              style={{
                ...statValueStyle,
                color: "#4f8a62",
              }}
            >
              6
            </h2>

            <span style={statDescriptionStyle}>
              Siap dipilih pelanggan
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Menu Dengan Variant
            </span>

            <h2 style={statValueStyle}>
              2
            </h2>

            <span style={statDescriptionStyle}>
              Menu memiliki pilihan
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Variant Terpopuler
            </span>

            <h2
              style={{
                ...statValueStyle,
                fontSize: "22px",
              }}
            >
              Level 2
            </h2>

            <span style={statDescriptionStyle}>
              Spicy Ramen
            </span>
          </div>
        </div>

        {/* FILTER */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Cari variant atau nama menu..."
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

          <select
            style={{
              width: "170px",
              height: "42px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0 12px",
              fontSize: "12px",
              color: "#555",
              backgroundColor: "#ffffff",
            }}
          >
            <option>Semua Menu</option>
            <option>Spicy Ramen</option>
            <option>Chicken Ramen</option>
          </select>

          <select
            style={{
              width: "150px",
              height: "42px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0 12px",
              fontSize: "12px",
              color: "#555",
              backgroundColor: "#ffffff",
            }}
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </div>

        {/* MAIN CONTENT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* VARIANT TABLE */}

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
                Daftar Variant
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Daftar pilihan variant yang tersedia untuk pelanggan.
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
                  <th style={tableHeaderStyle}>
                    Menu
                  </th>

                  <th style={tableHeaderStyle}>
                    Variant
                  </th>

                  <th style={tableHeaderStyle}>
                    Harga
                  </th>

                  <th style={tableHeaderStyle}>
                    Status
                  </th>

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
                {variants.map((item) => (
                  <tr key={item.id}>
                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "13px",
                          color: "#211b1d",
                        }}
                      >
                        {item.menu}
                      </strong>
                    </td>

                    <td style={tableCellStyle}>
                      <div>
                        <strong
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "#211b1d",
                          }}
                        >
                          {item.variant}
                        </strong>

                        <span
                          style={{
                            display: "block",
                            marginTop: "3px",
                            fontSize: "11px",
                            color: "#999",
                          }}
                        >
                          {item.description}
                        </span>
                      </div>
                    </td>

                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "12px",
                          color: "#8f2638",
                        }}
                      >
                        {item.price}
                      </strong>
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          backgroundColor: "#e9f5ec",
                          color: "#4f8a62",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "7px",
                        }}
                      >
                        <button
                          type="button"
                          style={actionButtonStyle}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          style={{
                            ...actionButtonStyle,
                            color: "#8f2638",
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VARIANT INFORMATION */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "22px",
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
              Distribusi Variant
            </h2>

            <p
              style={{
                margin: "6px 0 22px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Jumlah variant berdasarkan menu.
            </p>

            <VariantProgress
              name="Spicy Ramen"
              total="5 variant"
              percentage="83%"
            />

            <VariantProgress
              name="Chicken Ramen"
              total="1 variant"
              percentage="17%"
            />

            {/* INFO CARD */}

            <div
              style={{
                marginTop: "26px",
                padding: "16px",
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
                Prinsip Variant
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "14px",
                  color: "#211b1d",
                }}
              >
                Satu menu dapat memiliki beberapa pilihan.
              </strong>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "#777",
                }}
              >
                Variant digunakan ketika pelanggan perlu memilih
                opsi tertentu sebelum menambahkan menu ke keranjang.
              </p>
            </div>

            {/* SPICY LEVEL */}

            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#888",
                }}
              >
                Contoh Variant
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <strong
                  style={{
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Spicy Ramen
                </strong>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#8f2638",
                    fontWeight: "600",
                  }}
                >
                  5 Level
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM INFORMATION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          {/* ACTIVE */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "22px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#211b1d",
              }}
            >
              Status Variant
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Ringkasan status variant menu.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "13px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Variant aktif
              </span>

              <strong
                style={{
                  fontSize: "15px",
                  color: "#4f8a62",
                }}
              >
                6
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "13px 0",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Variant nonaktif
              </span>

              <strong
                style={{
                  fontSize: "15px",
                  color: "#8f2638",
                }}
              >
                0
              </strong>
            </div>
          </div>

          {/* PRICE INFORMATION */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "22px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#211b1d",
              }}
            >
              Informasi Harga
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Pengaturan harga pada setiap variant.
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
                Harga Variant Tertinggi
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  fontSize: "19px",
                  color: "#8f2638",
                }}
              >
                Rp 38.000
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#777",
                }}
              >
                Spicy Ramen — Level 4
              </span>
            </div>
          </div>
        </div>
      </main>
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
   TABLE STYLE
========================= */

const tableHeaderStyle = {
  padding: "14px 18px",
  fontSize: "11px",
  color: "#888",
  fontWeight: "600",
  borderBottom: "1px solid #eee",
};

const tableCellStyle = {
  padding: "16px 18px",
  borderBottom: "1px solid #eee",
  fontSize: "13px",
};

/* =========================
   ACTION BUTTON
========================= */

const actionButtonStyle = {
  border: "none",
  backgroundColor: "#f7f5f6",
  color: "#555",
  padding: "7px 10px",
  borderRadius: "6px",
  fontSize: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

/* =========================
   VARIANT PROGRESS
========================= */

function VariantProgress({
  name,
  total,
  percentage,
}) {
  return (
    <div
      style={{
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "7px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#555",
          }}
        >
          {name}
        </span>

        <span
          style={{
            fontSize: "11px",
            color: "#888",
          }}
        >
          {total}
        </span>
      </div>

      <div
        style={{
          height: "7px",
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: percentage,
            height: "100%",
            backgroundColor: "#8f2638",
            borderRadius: "10px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default VariantPage;