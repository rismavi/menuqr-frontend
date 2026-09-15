import AdminSidebar from "../../components/admin/AdminSidebar";

function AddonPage() {
  const addons = [
    {
      id: 1,
      name: "Extra Egg",
      description: "Tambahan telur untuk menu ramen.",
      price: "Rp 5.000",
      sold: 38,
      stock: "Tersedia",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Extra Noodle",
      description: "Tambahan mie untuk porsi lebih banyak.",
      price: "Rp 7.000",
      sold: 31,
      stock: "Tersedia",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Chashu",
      description: "Tambahan potongan chashu.",
      price: "Rp 10.000",
      sold: 27,
      stock: "Tersedia",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Cheese",
      description: "Tambahan keju untuk menu pilihan.",
      price: "Rp 6.000",
      sold: 19,
      stock: "Tersedia",
      status: "Aktif",
    },
    {
      id: 5,
      name: "Seaweed",
      description: "Tambahan lembaran nori.",
      price: "Rp 4.000",
      sold: 14,
      stock: "Habis",
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
              Add-on / Topping
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                color: "#777",
              }}
            >
              Kelola tambahan menu yang dapat dipilih pelanggan.
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
            + Tambah Add-on
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
              Total Add-on
            </span>

            <h2 style={statValueStyle}>
              5
            </h2>

            <span style={statDescriptionStyle}>
              Semua tambahan menu
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Add-on Aktif
            </span>

            <h2
              style={{
                ...statValueStyle,
                color: "#4f8a62",
              }}
            >
              5
            </h2>

            <span style={statDescriptionStyle}>
              Dapat dipilih pelanggan
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Stok Tersedia
            </span>

            <h2 style={statValueStyle}>
              4
            </h2>

            <span style={statDescriptionStyle}>
              Add-on siap digunakan
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Terlaris
            </span>

            <h2
              style={{
                ...statValueStyle,
                fontSize: "21px",
              }}
            >
              Extra Egg
            </h2>

            <span style={statDescriptionStyle}>
              38 terjual
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
            alignItems: "center",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Cari add-on atau topping..."
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
            style={filterSelectStyle}
          >
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>

          <select
            style={filterSelectStyle}
          >
            <option>Semua Stok</option>
            <option>Tersedia</option>
            <option>Habis</option>
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
          {/* ADDON TABLE */}

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
                Daftar Add-on
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                Daftar tambahan yang tersedia pada restoran.
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
                    Add-on
                  </th>

                  <th style={tableHeaderStyle}>
                    Harga
                  </th>

                  <th style={tableHeaderStyle}>
                    Terjual
                  </th>

                  <th style={tableHeaderStyle}>
                    Stok
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
                {addons.map((addon) => (
                  <tr key={addon.id}>
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
                            flexShrink: 0,
                          }}
                        >
                          +
                        </div>

                        <div>
                          <strong
                            style={{
                              display: "block",
                              fontSize: "13px",
                              color: "#211b1d",
                            }}
                          >
                            {addon.name}
                          </strong>

                          <span
                            style={{
                              display: "block",
                              marginTop: "3px",
                              fontSize: "11px",
                              color: "#999",
                            }}
                          >
                            {addon.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td style={tableCellStyle}>
                      <strong
                        style={{
                          fontSize: "12px",
                          color: "#8f2638",
                        }}
                      >
                        {addon.price}
                      </strong>
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        {addon.sold}
                      </span>
                    </td>

                    <td style={tableCellStyle}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          borderRadius: "6px",
                          backgroundColor:
                            addon.stock === "Tersedia"
                              ? "#e9f5ec"
                              : "#fbeaec",
                          color:
                            addon.stock === "Tersedia"
                              ? "#4f8a62"
                              : "#8f2638",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        {addon.stock}
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

          {/* HIGHLIGHT */}

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
              Add-on Terlaris
            </h2>

            <p
              style={{
                margin: "6px 0 22px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Tambahan menu dengan jumlah penjualan tertinggi.
            </p>

            <AddonHighlight
              rank="01"
              name="Extra Egg"
              sold="38 terjual"
              price="Rp 5.000"
            />

            <AddonHighlight
              rank="02"
              name="Extra Noodle"
              sold="31 terjual"
              price="Rp 7.000"
            />

            <AddonHighlight
              rank="03"
              name="Chashu"
              sold="27 terjual"
              price="Rp 10.000"
            />

            {/* INFO */}

            <div
              style={{
                marginTop: "24px",
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
                Catatan
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                  fontSize: "14px",
                  color: "#211b1d",
                }}
              >
                Add-on meningkatkan fleksibilitas pesanan.
              </strong>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "#777",
                }}
              >
                Pelanggan dapat menambahkan topping sesuai
                kebutuhan pada menu yang mendukung add-on.
              </p>
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
          {/* STOCK STATUS */}

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
              Status Stok
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Kondisi stok add-on saat ini.
            </p>

            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                Stok tersedia
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
                ...summaryRowStyle,
                borderBottom: "none",
              }}
            >
              <span style={summaryLabelStyle}>
                Stok habis
              </span>

              <strong
                style={{
                  fontSize: "15px",
                  color: "#8f2638",
                }}
              >
                1
              </strong>
            </div>
          </div>

          {/* SALES INFORMATION */}

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
              Informasi Penjualan
            </h2>

            <p
              style={{
                margin: "6px 0 18px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Ringkasan penjualan add-on.
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
                Total Add-on Terjual
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "5px",
                  fontSize: "22px",
                  color: "#8f2638",
                }}
              >
                129
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "4px",
                  fontSize: "11px",
                  color: "#777",
                }}
              >
                Dari seluruh jenis add-on
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
   FILTER
========================= */

const filterSelectStyle = {
  width: "160px",
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
   SUMMARY
========================= */

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "13px 0",
  borderBottom: "1px solid #eee",
};

const summaryLabelStyle = {
  fontSize: "13px",
  color: "#555",
};

/* =========================
   ADDON HIGHLIGHT
========================= */

function AddonHighlight({
  rank,
  name,
  sold,
  price,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "13px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          backgroundColor: "#f4e8eb",
          color: "#8f2638",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {rank}
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <strong
          style={{
            display: "block",
            fontSize: "13px",
            color: "#211b1d",
          }}
        >
          {name}
        </strong>

        <span
          style={{
            display: "block",
            marginTop: "3px",
            fontSize: "11px",
            color: "#999",
          }}
        >
          {sold}
        </span>
      </div>

      <strong
        style={{
          fontSize: "11px",
          color: "#8f2638",
        }}
      >
        {price}
      </strong>
    </div>
  );
}

export default AddonPage;