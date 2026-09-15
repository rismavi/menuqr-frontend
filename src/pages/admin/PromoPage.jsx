import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const dummyPromos = [
  {
    id: 1,
    name: "Diskon Spesial Ramen",
    description: "Semua varian Tori Paitan &",
    code: "RAMEN10",
    type: "Persentase",
    value: "10%",
    minPurchase: "Rp75.000",
    period: "01 Mei – 31 Mei 2025",
    status: "Aktif",
    remaining: "Sisa 19 hari",
    icon: "🍜",
  },
  {
    id: 2,
    name: "Makan Siang Berdua",
    description: "Khusus jam makan siang (11.00–14.00)",
    code: "LUNCHDUO",
    type: "Potongan Tetap",
    value: "Rp20.000",
    minPurchase: "Rp100.000",
    period: "10 Mei – 25 Mei 2025",
    status: "Aktif",
    remaining: "Sisa 13 hari",
    icon: "👥",
  },
  {
    id: 3,
    name: "Gratis Ocha Akhir Pekan",
    description: "Refill Genmaicha / Sencha",
    code: "FREE-OCHA",
    type: "Diskon Khusus",
    value: "100% Item",
    minPurchase: "Rp50.000",
    period: "Setiap Sabtu–Minggu",
    status: "Aktif",
    remaining: "Pengulangan Rutin",
    icon: "🍵",
  },
  {
    id: 4,
    name: "Flash Sale Gajian Kul",
    description: "Promo kilat akhir bulan",
    code: "PAYDAY50",
    type: "Potongan Tetap",
    value: "Rp30.000",
    minPurchase: "Rp150.000",
    period: "25 Mei – 28 Mei 2025",
    status: "Terjadwal",
    remaining: "Dimulai dlm 13 hari",
    icon: "📅",
  },
  {
    id: 5,
    name: "Opening Promo Shibu",
    description: "Diskon grand opening gerai",
    code: "GRANDOPEN",
    type: "Persentase",
    value: "20%",
    minPurchase: "Rp50.000",
    period: "01 Apr – 15 Apr 2025",
    status: "Berakhir",
    remaining: "Kedaluwarsa",
    icon: "🏪",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Aktif: {
      background: "#e8f6ed",
      color: "#167344",
    },
    Terjadwal: {
      background: "#e9efff",
      color: "#315fd4",
    },
    Berakhir: {
      background: "#f2f2f4",
      color: "#777783",
    },
  };

  const style = styles[status] || styles.Aktif;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        background: style.background,
        color: style.color,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "currentColor",
        }}
      />
      {status}
    </span>
  );
}

function PromoPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredPromos = dummyPromos.filter((promo) => {
    const matchesTab =
      activeTab === "Semua" ||
      (activeTab === "Aktif" && promo.status === "Aktif") ||
      (activeTab === "Terjadwal" &&
        promo.status === "Terjadwal") ||
      (activeTab === "Berakhir" &&
        promo.status === "Berakhir");

    const keyword = search.toLowerCase();

    const matchesSearch =
      promo.name.toLowerCase().includes(keyword) ||
      promo.code.toLowerCase().includes(keyword);

    return matchesTab && matchesSearch;
  });

  const activeCount = dummyPromos.filter(
    (promo) => promo.status === "Aktif"
  ).length;

  const scheduledCount = dummyPromos.filter(
    (promo) => promo.status === "Terjadwal"
  ).length;

  const expiredCount = dummyPromos.filter(
    (promo) => promo.status === "Berakhir"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f7fc",
        color: "#252532",
      }}
    >
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: "0 24px 40px",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #ebeaf0",
            marginBottom: "22px",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Overview & Manajemen
            </h3>

            <p
              style={{
                margin: "3px 0 0",
                fontSize: "13px",
                color: "#888794",
              }}
            >
              Sistem Pemesanan Restoran Digital
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* OPEN STATUS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 13px",
                borderRadius: "5px",
                background: "#eef4f0",
                color: "#165b3b",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#17663f",
                }}
              />

              BUKA / OPEN
            </div>

            {/* NOTIFICATION */}
            <div
              style={{
                position: "relative",
                fontSize: "21px",
                color: "#55545e",
              }}
            >
              ♧

              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-3px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#8f102d",
                }}
              />
            </div>

            {/* ADMIN */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "#ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "17px",
                }}
              >
                👩🏻
              </div>

              Admin

              <span style={{ fontSize: "10px" }}>
                ▼
              </span>
            </div>
          </div>
        </header>

        {/* BREADCRUMB */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          <span
            style={{
              color: "#920f2e",
              fontWeight: 700,
              letterSpacing: "0.6px",
            }}
          >
            KAMPANYE & PENAWARAN
          </span>

          <span style={{ color: "#b0afb7" }}>
            •
          </span>

          <span style={{ color: "#777681" }}>
            Shibui Dining Management
          </span>
        </div>

        {/* PAGE TITLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "25px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "34px",
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-1px",
              }}
            >
              Promosi
            </h1>

            <p
              style={{
                margin: "7px 0 0",
                color: "#777681",
                fontSize: "15px",
              }}
            >
              Kelola promo restoran, diskon musiman,
              voucher meja, dan loyalty dining.
            </p>
          </div>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "170px",
                padding: "12px 15px",
                borderRadius: "8px",
                background: "#f0f1fa",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#dce9e9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ⚡
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#777681",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  PROMO BERJALAN
                </div>

                <strong
                  style={{
                    display: "block",
                    marginTop: "2px",
                    fontSize: "16px",
                  }}
                >
                  {activeCount} Aktif
                </strong>
              </div>
            </div>

            <div
              style={{
                width: "170px",
                padding: "12px 15px",
                borderRadius: "8px",
                background: "#f0f1fa",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "#f4e4e7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🎁
              </div>

              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#777681",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  KLAIM BULAN INI
                </div>

                <strong
                  style={{
                    display: "block",
                    marginTop: "2px",
                    fontSize: "16px",
                  }}
                >
                  1.482{" "}
                  <span
                    style={{
                      color: "#16804d",
                      fontSize: "11px",
                    }}
                  >
                    +18%
                  </span>
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATION */}
        <section
          style={{
            minHeight: "175px",
            borderRadius: "10px",
            background:
              "linear-gradient(100deg, #f1f2fb 0%, #f0f1fa 65%, #dddde6 65%)",
            padding: "24px",
            marginBottom: "25px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "570px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                padding: "5px 11px",
                background: "#eadde4",
                color: "#891334",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.4px",
              }}
            >
              ✨ REKOMENDASI DINAMIS
            </span>

            <h2
              style={{
                margin: "13px 0 5px",
                fontSize: "21px",
                fontWeight: 700,
              }}
            >
              Tingkatkan Reservasi Akhir Pekan
            </h2>

            <p
              style={{
                margin: 0,
                color: "#686773",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Promo paket berdua terbukti menaikkan
              rata-rata pesanan meja sebesar 24.6%
              pada hari Jumat–Minggu. Pertimbangkan
              untuk mengaktifkan voucher pairing
              wagyu.
            </p>
          </div>

          {/* REDEMPTION */}
          <div
            style={{
              position: "absolute",
              right: "242px",
              top: "60px",
              width: "145px",
              padding: "14px 10px",
              background: "#fff",
              borderRadius: "5px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#55545e",
              }}
            >
              Redemption rate{" "}
              <strong style={{ color: "#97112f" }}>
                82%
              </strong>
            </div>

            <div
              style={{
                height: "6px",
                borderRadius: "10px",
                background: "#e7e5eb",
                marginTop: "7px",
              }}
            >
              <div
                style={{
                  width: "82%",
                  height: "100%",
                  borderRadius: "10px",
                  background: "#8e102d",
                }}
              />
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              position: "absolute",
              right: "24px",
              top: "68px",
              border: "none",
              borderRadius: "3px",
              background: "#a81637",
              color: "#fff",
              padding: "13px 17px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ＋ Tambah Promo Baru
          </button>
        </section>

        {/* FILTER */}
        <section
          style={{
            background: "#fff",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #eeeef3",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "#f0f1f8",
              padding: "4px",
              borderRadius: "6px",
            }}
          >
            {[
              {
                label: "Semua",
                count: dummyPromos.length,
              },
              {
                label: "Aktif",
                count: activeCount,
              },
              {
                label: "Terjadwal",
                count: scheduledCount,
              },
              {
                label: "Berakhir",
                count: expiredCount,
              },
            ].map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                style={{
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 14px",
                  background:
                    activeTab === tab.label
                      ? "#fff"
                      : "transparent",
                  color:
                    activeTab === tab.label
                      ? "#292833"
                      : "#73727d",
                  fontSize: "12px",
                  fontWeight:
                    activeTab === tab.label
                      ? 700
                      : 500,
                  cursor: "pointer",
                  boxShadow:
                    activeTab === tab.label
                      ? "0 1px 4px rgba(0,0,0,0.05)"
                      : "none",
                }}
              >
                {tab.label}{" "}
                <span
                  style={{
                    color:
                      tab.label === "Aktif"
                        ? "#16804d"
                        : tab.label === "Terjadwal"
                        ? "#315fd4"
                        : "#777681",
                  }}
                >
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "350px",
                height: "38px",
                borderRadius: "5px",
                background: "#f2f2f8",
                padding: "0 12px",
              }}
            >
              <span
                style={{
                  color: "#777681",
                  fontSize: "17px",
                  marginRight: "8px",
                }}
              >
                ⌕
              </span>

              <input
                type="text"
                placeholder="Cari promo berdasarkan nama atau kode..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "12px",
                  color: "#33323d",
                }}
              />
            </div>

            <button
              type="button"
              style={{
                border: "none",
                borderRadius: "5px",
                background: "#f2f2f8",
                padding: "0 15px",
                fontSize: "12px",
                color: "#55545e",
                cursor: "pointer",
              }}
            >
              ↓ Ekspor
            </button>
          </div>
        </section>

        {/* TABLE */}
        <section
          style={{
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #eeeef3",
            overflow: "hidden",
          }}
        >
          {/* TABLE HEADER */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "2.2fr 1fr 1.25fr .8fr 1fr 1.6fr",
              padding: "14px 20px",
              background: "#f6f6fa",
              color: "#666570",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.3px",
            }}
          >
            <div>NAMA PROMO</div>
            <div>KODE PROMO</div>
            <div>JENIS DISKON</div>
            <div>NILAI</div>
            <div>MIN. PEMBELIAN</div>
            <div>PERIODE BERLAKU</div>
          </div>

          {/* TABLE ROWS */}
          {filteredPromos.map((promo) => (
            <div
              key={promo.id}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2.2fr 1fr 1.25fr .8fr 1fr 1.6fr",
                alignItems: "center",
                padding: "15px 20px",
                borderTop: "1px solid #eeeeF3",
                minHeight: "66px",
                color:
                  promo.status === "Berakhir"
                    ? "#85848d"
                    : "#292833",
              }}
            >
              {/* NAME */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "5px",
                    background: "#eef0f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "17px",
                    flexShrink: 0,
                  }}
                >
                  {promo.icon}
                </div>

                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "14px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {promo.name}
                  </strong>

                  <span
                    style={{
                      display: "block",
                      marginTop: "3px",
                      fontSize: "11px",
                      color: "#777681",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {promo.description}
                  </span>
                </div>
              </div>

              {/* CODE */}
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "7px 9px",
                    borderRadius: "3px",
                    background: "#eff0f7",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  {promo.code}
                </span>
              </div>

              {/* TYPE */}
              <div
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <span
                  style={{
                    color:
                      promo.type === "Persentase"
                        ? "#a30f31"
                        : "#16804d",
                    fontWeight: 700,
                  }}
                >
                  {promo.type === "Persentase"
                    ? "%"
                    : "▣"}
                </span>

                {promo.type}
              </div>

              {/* VALUE */}
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color:
                    promo.status === "Berakhir"
                      ? "#85848d"
                      : promo.type ===
                        "Persentase"
                      ? "#a30f31"
                      : "#292833",
                }}
              >
                {promo.value}
              </div>

              {/* MINIMUM */}
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {promo.minPurchase}
              </div>

              {/* PERIOD */}
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {promo.period}
                </div>

                <div
                  style={{
                    marginTop: "3px",
                    fontSize: "10px",
                    color:
                      promo.status === "Berakhir"
                        ? "#e25555"
                        : promo.status ===
                          "Terjadwal"
                        ? "#315fd4"
                        : "#16804d",
                  }}
                >
                  {promo.remaining}
                </div>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {filteredPromos.length === 0 && (
            <div
              style={{
                padding: "45px",
                textAlign: "center",
                color: "#888794",
                fontSize: "13px",
              }}
            >
              Promo tidak ditemukan.
            </div>
          )}

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "13px 20px",
              borderTop: "1px solid #eeeeF3",
              fontSize: "11px",
              color: "#666570",
            }}
          >
            <div>
              Menampilkan{" "}
              <strong>
                {filteredPromos.length}
              </strong>{" "}
              dari{" "}
              <strong>
                {dummyPromos.length}
              </strong>{" "}
              promo
              <span
                style={{
                  margin: "0 10px",
                  color: "#c4c3ca",
                }}
              >
                •
              </span>
              Waktu server: GMT+7 (WIB)
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "#bbb" }}>
                ‹
              </span>

              <span
                style={{
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "3px",
                  background: "#f0f1f8",
                  color: "#292833",
                  fontWeight: 600,
                }}
              >
                1
              </span>

              <span style={{ color: "#bbb" }}>
                ›
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          MODAL TAMBAH PROMO
      ========================= */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20, 19, 27, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "500px",
              maxWidth: "100%",
              background: "#fff",
              borderRadius: "10px",
              padding: "25px",
              boxShadow:
                "0 15px 50px rgba(0,0,0,0.15)",
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
                <span
                  style={{
                    fontSize: "10px",
                    color: "#95112f",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  PROMO BARU
                </span>

                <h2
                  style={{
                    margin: "4px 0 0",
                    fontSize: "21px",
                  }}
                >
                  Tambah Promo
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#777681",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gap: "14px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Nama Promo
                </label>

                <input
                  type="text"
                  placeholder="Masukkan nama promo"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border: "1px solid #dddce4",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Kode Promo
                </label>

                <input
                  type="text"
                  placeholder="Contoh: RAMEN10"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border: "1px solid #dddce4",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Jenis Diskon
                  </label>

                  <select
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #dddce4",
                      borderRadius: "5px",
                      background: "#fff",
                    }}
                  >
                    <option>
                      Persentase
                    </option>
                    <option>
                      Potongan Tetap
                    </option>
                    <option>
                      Diskon Khusus
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Nilai Diskon
                  </label>

                  <input
                    type="text"
                    placeholder="10%"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "10px 12px",
                      border: "1px solid #dddce4",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Minimum Pembelian
                </label>

                <input
                  type="text"
                  placeholder="Rp75.000"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    border: "1px solid #dddce4",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "1px solid #dddce4",
                  background: "#fff",
                  padding: "10px 17px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  border: "none",
                  background: "#a81637",
                  color: "#fff",
                  padding: "10px 17px",
                  borderRadius: "5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Simpan Promo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromoPage;