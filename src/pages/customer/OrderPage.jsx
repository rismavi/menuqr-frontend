import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/useCart";
import {
  createOrder,
  getWhatsAppUrl,
} from "../../services/orderService";

function OrderPage() {
  const { cartItems } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ambil data meja dari localStorage
  const savedTable =
    localStorage.getItem("restaurantTable");

  const parsedTable = savedTable
    ? JSON.parse(savedTable)
    : null;

  const table =
    parsedTable?.table ||
    parsedTable?.data ||
    parsedTable;

  // Hitung total pesanan
  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.totalPrice) || 0),
    0
  );

  // Link kembali ke menu
  const menuLink = table?.code
    ? `/?table=${table.code}`
    : "/";

  /*
   * =========================
   * VALIDASI FORM
   * =========================
   *
   * Nama dan nomor WhatsApp wajib diisi.
   * Catatan pesanan bersifat opsional.
   */

  const isFormValid =
    name.trim() !== "" &&
    phone.trim() !== "";

  /*
   * =========================
   * KONFIRMASI PESANAN
   * =========================
   */

  const handleConfirmOrder = async () => {
    // Validasi nama
    if (name.trim() === "") {
      setError(
        "Nama wajib diisi sebelum melakukan konfirmasi pesanan."
      );
      return;
    }

    // Validasi nomor WhatsApp
    if (phone.trim() === "") {
      setError(
        "Nomor WhatsApp wajib diisi sebelum melakukan konfirmasi pesanan."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        restaurant_id:
          cartItems[0].restaurantId,

        table_id:
          table?.id || null,

        customer_name:
          name.trim(),

        note:
          notes.trim() || null,

        items: cartItems.map((item) => ({
          menu_id:
            item.menuId,

          variant_id:
            item.variant?.id || null,

          addon_ids:
            item.addons
              ? item.addons.map(
                  (addon) => addon.id
                )
              : [],

          quantity:
            item.quantity,

          note: null,
        })),
      };

      console.log(
        "Data yang dikirim:",
        orderData
      );

      // Buat pesanan
      const result =
        await createOrder(orderData);

      console.log(
        "Response order:",
        result
      );

      const orderId =
        result.data.id;

      console.log(
        "ID Pesanan:",
        orderId
      );

      // Ambil link WhatsApp
      const whatsappResult =
        await getWhatsAppUrl(orderId);

      console.log(
        "Response WhatsApp:",
        whatsappResult
      );

      // Buka WhatsApp
      if (
        whatsappResult.whatsapp_url
      ) {
        window.open(
          whatsappResult.whatsapp_url,
          "_blank"
        );
      } else {
        setError(
          "Pesanan berhasil dibuat, tetapi link WhatsApp tidak ditemukan."
        );
      }

    } catch (err) {
      console.error(
        "Gagal membuat pesanan:",
        err
      );

      setError(
        "Gagal membuat pesanan. Silakan coba lagi."
      );

    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * KERANJANG KOSONG
   * =========================
   */

  if (cartItems.length === 0) {
    return (
      <main className="order-page">

        <div className="container order-container">

          <div className="order-empty">

            <div className="order-empty-icon">
              🛒
            </div>

            <p className="order-label">
              YOUR ORDER
            </p>

            <h1>
              Pesanan Kosong
            </h1>

            <p>
              Belum ada menu yang dipilih.
            </p>

            <Link
              to={menuLink}
              className="order-primary-button"
            >
              Kembali ke Menu
              <span>→</span>
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="order-page">

      <div className="container order-container">

        {/* =========================
            HEADER
        ========================== */}

        <div className="order-page-header">

          <Link
            to="/cart"
            className="order-back"
          >
            <span>←</span>
            Kembali ke keranjang
          </Link>

          <div className="order-title-area">

            <p className="order-label">
              CHECKOUT
            </p>

            <h1>
              Pesan Sekarang
            </h1>

            <p>
              Lengkapi informasi pesananmu
              sebelum melakukan konfirmasi.
            </p>

          </div>

        </div>


        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <div className="order-error">

            <span>
              !
            </span>

            <div>

              <strong>
                Periksa kembali data pesanan
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>
        )}


        {/* =========================
            INFORMASI MEJA
        ========================== */}

        {table && (
          <div className="order-table-card">

            <div className="order-table-icon">
              #
            </div>

            <div>

              <span>
                YOUR TABLE
              </span>

              <strong>
                {table.name}
              </strong>

              <small>
                Pesanan akan dicatat untuk meja ini.
              </small>

            </div>

          </div>
        )}


        {/* =========================
            MEJA BELUM TERDETEKSI
        ========================== */}

        {!table && (
          <div className="order-warning">

            <span>
              !
            </span>

            <div>

              <strong>
                Meja belum terdeteksi
              </strong>

              <p>
                Silakan kembali ke menu dan
                scan QR Code meja.
              </p>

            </div>

          </div>
        )}


        {/* =========================
            INFORMASI PESANAN
        ========================== */}

        <div className="order-reminder">

          <div className="order-reminder-icon">
            ℹ
          </div>

          <div className="order-reminder-content">

            <strong>
              Informasi Pesanan
            </strong>

            <p>
              Setelah pesanan dikonfirmasi,
              detail pesanan akan diteruskan
              melalui WhatsApp restoran.
            </p>

            <p>
              <strong>
                Pembayaran dilakukan langsung
                di kasir.
              </strong>
            </p>

          </div>

        </div>


        {/* =========================
            CONTENT
        ========================== */}

        <div className="order-content">

          {/* =========================
              DATA PELANGGAN
          ========================== */}

          <section className="order-card">

            <div className="order-card-header">

              <div>

                <span>
                  STEP 01
                </span>

                <h2>
                  Data Pelanggan
                </h2>

              </div>

            </div>


            <div className="order-form">

              {/* NAMA */}

              <div className="order-form-group">

                <label htmlFor="customer-name">
                  Nama
                  <span className="required-mark">
                    *
                  </span>
                </label>

                <input
                  id="customer-name"
                  type="text"
                  placeholder="Masukkan nama"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />

                <small className="required-text">
                  Nama wajib diisi.
                </small>

              </div>


              {/* NOMOR WHATSAPP */}

              <div className="order-form-group">

                <label htmlFor="customer-phone">
                  Nomor WhatsApp
                  <span className="required-mark">
                    *
                  </span>
                </label>

                <input
                  id="customer-phone"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                />

                <small className="required-text">
                  Nomor WhatsApp wajib diisi.
                </small>

              </div>


              {/* CATATAN */}

              <div className="order-form-group">

                <label htmlFor="order-notes">
                  Catatan Pesanan
                  <span className="optional-mark">
                    (opsional)
                  </span>
                </label>

                <textarea
                  id="order-notes"
                  rows="4"
                  placeholder="Contoh: Tidak pakai daun bawang"
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                />

                <small>
                  Tambahkan catatan jika ada
                  permintaan khusus.
                </small>

              </div>

            </div>

          </section>


          {/* =========================
              RINGKASAN PESANAN
          ========================== */}

          <section className="order-card">

            <div className="order-card-header order-summary-header">

              <div>

                <span>
                  STEP 02
                </span>

                <h2>
                  Ringkasan Pesanan
                </h2>

              </div>

              <span className="order-item-count">

                {cartItems.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}{" "}

                item

              </span>

            </div>


            <div className="order-items">

              {cartItems.map(
                (item, index) => {

                  const variantPrice =
                    item.variant
                      ? Number(
                          item.variant.price
                        ) || 0
                      : 0;

                  const addonPrice =
                    item.addons
                      ? item.addons.reduce(
                          (
                            total,
                            addon
                          ) =>
                            total +
                            (Number(
                              addon.price
                            ) || 0),
                          0
                        )
                      : 0;

                  const unitPrice =
                    (Number(
                      item.price
                    ) || 0) +
                    variantPrice +
                    addonPrice;

                  const itemTotal =
                    unitPrice *
                    item.quantity;

                  return (
                    <div
                      key={index}
                      className="order-item"
                    >

                      <div className="order-item-main">

                        <h3>
                          {item.name}
                        </h3>

                        <div className="order-item-price">
                          {item.quantity} × Rp{" "}
                          {unitPrice.toLocaleString(
                            "id-ID"
                          )}
                        </div>


                        {/* VARIANT */}

                        {item.variant && (
                          <div className="order-item-option">

                            <span>
                              Variant
                            </span>

                            <strong>
                              {item.variant.name}
                            </strong>

                          </div>
                        )}


                        {/* ADD-ON */}

                        {item.addons &&
                          item.addons.length >
                            0 && (
                            <div className="order-item-option">

                              <span>
                                Add-on
                              </span>

                              <strong>
                                {item.addons
                                  .map(
                                    (addon) =>
                                      addon.name
                                  )
                                  .join(
                                    ", "
                                  )}
                              </strong>

                            </div>
                          )}

                      </div>


                      <div className="order-item-total">

                        Rp{" "}
                        {itemTotal.toLocaleString(
                          "id-ID"
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>


            {/* =========================
                TOTAL
            ========================== */}

            <div className="order-total">

              <div>

                <span>
                  Total Pesanan
                </span>

                <small>
                  Harga sudah termasuk
                  pilihan menu dan tambahan.
                </small>

              </div>

              <strong>
                Rp{" "}
                {grandTotal.toLocaleString(
                  "id-ID"
                )}
              </strong>

            </div>

          </section>

        </div>


        {/* =========================
            ACTION
        ========================== */}

        <div className="order-actions">

          <Link
            to="/cart"
            className="order-secondary-button"
          >
            <span>
              ←
            </span>

            Kembali
          </Link>


          <button
            type="button"
            className="order-primary-button"
            onClick={handleConfirmOrder}
            disabled={
              loading ||
              !isFormValid
            }
          >

            {loading ? (
              <>
                <span className="order-spinner" />

                Memproses...
              </>
            ) : (
              <>
                Konfirmasi Pesanan

                <span>
                  →
                </span>
              </>
            )}

          </button>

        </div>


        {/* =========================
            FOOTER NOTE
        ========================== */}

        <p className="order-footer-note">

          <strong>
            *
          </strong>{" "}

          Nama dan nomor WhatsApp wajib diisi.
          Catatan pesanan bersifat opsional.

        </p>

      </div>

    </main>
  );
}

export default OrderPage;