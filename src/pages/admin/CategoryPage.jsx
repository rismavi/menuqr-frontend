import AdminSidebar from "../../components/admin/AdminSidebar";

function CategoryPage() {
  const categories = [
    {
      id: 1,
      name: "Makanan",
      description: "Berbagai pilihan makanan utama.",
      totalMenu: 12,
      status: "Aktif",
      order: 1,
    },
    {
      id: 2,
      name: "Minuman",
      description: "Minuman dingin dan hangat.",
      totalMenu: 5,
      status: "Aktif",
      order: 2,
    },
    {
      id: 3,
      name: "Snack",
      description: "Camilan dan makanan ringan.",
      totalMenu: 4,
      status: "Aktif",
      order: 3,
    },
    {
      id: 4,
      name: "Paket",
      description: "Paket menu pilihan Hoshi Ramen.",
      totalMenu: 3,
      status: "Aktif",
      order: 4,
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
              Kategori
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              Kelola kategori menu Hoshi Ramen.
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
            + Tambah Kategori
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
          {/* TOTAL KATEGORI */}

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Total Kategori
            </span>

            <h2 style={statValueStyle}>
              4
            </h2>

            <span style={statDescriptionStyle}>
              Semua kategori menu
            </span>
          </div>

          {/* KATEGORI AKTIF */}

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Kategori Aktif
            </span>

            <h2
              style={{
                ...statValueStyle,
                color: "#4f8a62",
              }}
            >
              4
            </h2>

            <span style={statDescriptionStyle}>
              Sedang digunakan
            </span>
          </div>

          {/* TOTAL MENU */}

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Total Menu
            </span>

            <h2 style={statValueStyle}>
              24
            </h2>

            <span style={statDescriptionStyle}>
              Dari semua kategori
            </span>
          </div>

          {/* KATEGORI TERBANYAK */}

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Kategori Terbanyak
            </span>

            <h2
              style={{
                ...statValueStyle,
                fontSize: "22px",
              }}
            >
              Makanan
            </h2>

            <span style={statDescriptionStyle}>
              12 menu
            </span>
          </div>
        </div>

        {/* =========================
            CATEGORY LIST + INFO
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
          }}
        >
          {/* =========================
              CATEGORY LIST
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
                Daftar Kategori
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Kategori yang tersedia pada restoran.
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
                    Kategori
                  </th>

                  <th style={tableHeaderStyle}>
                    Jumlah Menu
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
                    Urutan
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
                {categories.map((category) => (
                  <tr key={category.id}>
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
                            width: "42px",
                            height: "42px",
                            borderRadius: "9px",
                            backgroundColor: "#f4e8eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#8f2638",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                        >
                          {category.name.charAt(0)}
                        </div>

                        <div>
                          <strong
                            style={{
                              display: "block",
                              fontSize: "13px",
                              color: "#211b1d",
                            }}
                          >
                            {category.name}
                          </strong>

                          <span
                            style={{
                              display: "block",
                              marginTop: "3px",
                              fontSize: "11px",
                              color: "#999",
                            }}
                          >
                            {category.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "13px",
                          color: "#211b1d",
                        }}
                      >
                        {category.totalMenu}
                      </strong>

                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "11px",
                          color: "#999",
                        }}
                      >
                        menu
                      </span>
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
                        {category.status}
                      </span>
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#555",
                        }}
                      >
                        {category.order}
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

          {/* =========================
              CATEGORY HIGHLIGHT
          ========================= */}

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
              Komposisi Kategori
            </h2>

            <p
              style={{
                margin: "6px 0 22px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Distribusi menu berdasarkan kategori.
            </p>

            <CategoryProgress
              name="Makanan"
              total="12 menu"
              percentage="50%"
            />

            <CategoryProgress
              name="Minuman"
              total="5 menu"
              percentage="21%"
            />

            <CategoryProgress
              name="Snack"
              total="4 menu"
              percentage="17%"
            />

            <CategoryProgress
              name="Paket"
              total="3 menu"
              percentage="12%"
            />

            {/* HIGHLIGHT */}

            <div
              style={{
                marginTop: "25px",
                padding: "16px",
                borderRadius: "10px",
                backgroundColor: "#f7f5f6",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#888",
                }}
              >
                Kategori dengan menu terbanyak
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  fontSize: "16px",
                  color: "#211b1d",
                }}
              >
                Makanan
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "3px",
                  fontSize: "11px",
                  color: "#777",
                }}
              >
                50% dari seluruh menu
              </span>
            </div>
          </div>
        </div>

        {/* =========================
            CATEGORY INFORMATION
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          {/* ACTIVE CATEGORY */}

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
              Status Kategori
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Kondisi kategori yang digunakan saat ini.
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
                Kategori aktif
              </span>

              <strong
                style={{
                  fontSize: "15px",
                  color: "#4f8a62",
                }}
              >
                4
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
                Kategori nonaktif
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

          {/* QR PREVIEW */}

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
              Pengaturan Kategori
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Gunakan kategori untuk mengatur tampilan menu pelanggan.
            </p>

            <div
              style={{
                padding: "15px",
                borderRadius: "10px",
                backgroundColor: "#f7f5f6",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor: "#4f8a62",
                  }}
                ></span>

                <strong
                  style={{
                    fontSize: "13px",
                    color: "#211b1d",
                  }}
                >
                  Semua kategori aktif
                </strong>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "#777",
                }}
              >
                Kategori yang aktif akan ditampilkan pada halaman
                menu pelanggan.
              </p>
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
    CATEGORY PROGRESS
========================= */

function CategoryProgress({
  name,
  total,
  percentage,
}) {
  return (
    <div
      style={{
        marginBottom: "17px",
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

export default CategoryPage;