import AdminSidebar from "../../components/admin/AdminSidebar";

function MenuManagementPage() {
  const menus = [
    {
      id: 1,
      name: "Spicy Ramen",
      category: "Makanan",
      price: "Rp 35.000",
      status: "Tersedia",
    },
    {
      id: 2,
      name: "Chicken Ramen",
      category: "Makanan",
      price: "Rp 32.000",
      status: "Tersedia",
    },
    {
      id: 3,
      name: "Beef Ramen",
      category: "Makanan",
      price: "Rp 38.000",
      status: "Tersedia",
    },
    {
      id: 4,
      name: "Gyoza",
      category: "Snack",
      price: "Rp 22.000",
      status: "Tersedia",
    },
    {
      id: 5,
      name: "Ocha",
      category: "Minuman",
      price: "Rp 8.000",
      status: "Habis",
    },
  ];

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
              Manajemen Menu
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              Kelola daftar menu makanan dan minuman Hoshi Ramen.
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
            + Tambah Menu
          </button>
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
          {/* TOTAL MENU */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              Total Menu
            </span>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "28px",
                color: "#211b1d",
              }}
            >
              24
            </h2>
          </div>

          {/* TERSEDIA */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              Menu Tersedia
            </span>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "28px",
                color: "#4f8a62",
              }}
            >
              21
            </h2>
          </div>

          {/* MENU HABIS */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              Menu Habis
            </span>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "28px",
                color: "#8f2638",
              }}
            >
              3
            </h2>
          </div>

          {/* KATEGORI */}

          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #eee",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                color: "#777",
              }}
            >
              Total Kategori
            </span>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "28px",
                color: "#211b1d",
              }}
            >
              4
            </h2>
          </div>
        </div>

        {/* =========================
            SEARCH + FILTER
        ========================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "20px",
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Cari nama menu..."
            style={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "11px 13px",
              fontSize: "13px",
              outline: "none",
            }}
          />

          <select
            style={{
              width: "170px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "11px 13px",
              fontSize: "13px",
              color: "#555",
              backgroundColor: "#ffffff",
              outline: "none",
            }}
          >
            <option>Semua Kategori</option>
            <option>Makanan</option>
            <option>Minuman</option>
            <option>Snack</option>
            <option>Paket</option>
          </select>

          <select
            style={{
              width: "150px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "11px 13px",
              fontSize: "13px",
              color: "#555",
              backgroundColor: "#ffffff",
              outline: "none",
            }}
          >
            <option>Semua Status</option>
            <option>Tersedia</option>
            <option>Habis</option>
          </select>
        </div>

        {/* =========================
            MENU TABLE
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
                color: "#211b1d",
              }}
            >
              Daftar Menu
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Kelola informasi menu restoran.
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
                <th style={tableHeaderStyle}>Menu</th>
                <th style={tableHeaderStyle}>Kategori</th>
                <th style={tableHeaderStyle}>Harga</th>
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
              {menus.map((menu) => (
                <tr key={menu.id}>
                  <td style={tableCellStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          backgroundColor: "#f4e8eb",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#8f2638",
                          fontSize: "11px",
                          fontWeight: "600",
                          flexShrink: 0,
                        }}
                      >
                        Foto
                      </div>

                      <div>
                        <strong
                          style={{
                            display: "block",
                            fontSize: "13px",
                            color: "#211b1d",
                          }}
                        >
                          {menu.name}
                        </strong>

                        <span
                          style={{
                            fontSize: "11px",
                            color: "#999",
                          }}
                        >
                          ID Menu #{menu.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td style={tableCellStyle}>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#555",
                      }}
                    >
                      {menu.category}
                    </span>
                  </td>

                  <td style={tableCellStyle}>
                    <strong
                      style={{
                        fontSize: "13px",
                        color: "#211b1d",
                      }}
                    >
                      {menu.price}
                    </strong>
                  </td>

                  <td style={tableCellStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "10px",
                        fontWeight: "600",
                        backgroundColor:
                          menu.status === "Tersedia"
                            ? "#e9f5ec"
                            : "#f8e8eb",
                        color:
                          menu.status === "Tersedia"
                            ? "#4f8a62"
                            : "#8f2638",
                      }}
                    >
                      {menu.status}
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
                        gap: "8px",
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

        {/* =========================
            BOTTOM INFORMATION
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {/* KOMPOSISI KATEGORI */}

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
              Komposisi Kategori
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Jumlah menu berdasarkan kategori.
            </p>

            <CategoryRow
              name="Makanan"
              total="12 menu"
              percentage="50%"
            />

            <CategoryRow
              name="Minuman"
              total="5 menu"
              percentage="21%"
            />

            <CategoryRow
              name="Snack"
              total="4 menu"
              percentage="17%"
            />

            <CategoryRow
              name="Paket"
              total="3 menu"
              percentage="12%"
            />
          </div>

          {/* KETERSEDIAAN */}

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
              Ketersediaan Menu
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Kondisi menu saat ini.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                Menu tersedia
              </span>

              <strong
                style={{
                  color: "#4f8a62",
                  fontSize: "15px",
                }}
              >
                21
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                Menu habis
              </span>

              <strong
                style={{
                  color: "#8f2638",
                  fontSize: "15px",
                }}
              >
                3
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                Rata-rata harga
              </span>

              <strong
                style={{
                  color: "#211b1d",
                  fontSize: "15px",
                }}
              >
                Rp 28.000
              </strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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
    CATEGORY ROW
========================= */

function CategoryRow({ name, total, percentage }) {
  return (
    <div
      style={{
        marginBottom: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
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

export default MenuManagementPage;