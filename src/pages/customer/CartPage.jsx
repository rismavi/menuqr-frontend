import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useEffect, useState } from 'react';

function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  // =========================
  // DATA MEJA
  // =========================

  const [table, setTable] = useState(null);

  useEffect(() => {
    try {
      const savedTable = localStorage.getItem('restaurantTable');

      if (!savedTable) {
        return;
      }

      const parsedTable = JSON.parse(savedTable);

      const tableData =
        parsedTable?.table ||
        parsedTable?.data?.table ||
        parsedTable?.data ||
        parsedTable;

      setTable(tableData);
    } catch (error) {
      console.error(
        'Gagal membaca data meja:',
        error
      );

      setTable(null);
    }
  }, []);

  // =========================
  // TOTAL
  // =========================

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + (Number(item.totalPrice) || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0),
    0
  );

  // =========================
  // LINK KEMBALI KE MENU
  // =========================

  const menuLink = table?.code
    ? `/?table=${table.code}`
    : '/';

  // =========================
  // KERANJANG KOSONG
  // =========================

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container cart-container">

          {/* HEADER */}
          <div className="cart-page-header">

            <Link
              to={menuLink}
              className="cart-back"
            >
              <span>←</span>
              Kembali ke menu
            </Link>

            <div className="cart-title-area">
              <p className="cart-label">
                YOUR ORDER
              </p>

              <h1>
                Keranjang
              </h1>
            </div>

          </div>

          {/* EMPTY CART */}
          <div className="cart-empty">

            <div className="cart-empty-icon">
              🛒
            </div>

            <p className="cart-empty-label">
              KERANJANG KOSONG
            </p>

            <h2>
              Belum ada pesanan
            </h2>

            <p className="cart-empty-description">
              Pilih menu favoritmu dan tambahkan
              ke keranjang untuk mulai memesan.
            </p>

            <Link
              to={menuLink}
              className="cart-empty-button"
            >
              Lihat Menu
              <span>→</span>
            </Link>

          </div>

        </div>
      </main>
    );
  }

  // =========================
  // CART ADA ISINYA
  // =========================

  return (
    <main className="cart-page">
      <div className="container cart-container">

        {/* HEADER */}
        <div className="cart-page-header">

          <Link
            to={menuLink}
            className="cart-back"
          >
            <span>←</span>
            Kembali ke menu
          </Link>

          <div className="cart-title-row">

            <div className="cart-title-area">

              <p className="cart-label">
                YOUR ORDER
              </p>

              <h1>
                Keranjang
              </h1>

              <p className="cart-subtitle">
                Periksa kembali pesananmu sebelum
                melanjutkan.
              </p>

            </div>

            <div className="cart-item-badge">
              {totalItems} item
            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="cart-content">

          {/* DAFTAR ITEM */}
          <section className="cart-items-section">

            <div className="cart-section-heading">

              <h2>
                Pesananmu
              </h2>

              <span>
                {cartItems.length} menu
              </span>

            </div>

            <div className="cart-list">

              {cartItems.map((item, index) => {

                const variantPrice = item.variant
                  ? Number(item.variant.price) || 0
                  : 0;

                const addonPrice = item.addons
                  ? item.addons.reduce(
                      (total, addon) =>
                        total +
                        (Number(addon.price) || 0),
                      0
                    )
                  : 0;

                const unitPrice =
                  (Number(item.price) || 0) +
                  variantPrice +
                  addonPrice;

                const itemTotal =
                  unitPrice * item.quantity;

                return (
                  <article
                    className="cart-item"
                    key={`${item.menuId}-${index}`}
                  >

                    {/* INFO MENU */}
                    <div className="cart-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <div className="cart-item-details">

                        {item.variant && (
                          <div className="cart-detail-row">

                            <span>
                              Variant
                            </span>

                            <strong>
                              {item.variant.name}
                            </strong>

                          </div>
                        )}

                        {item.addons &&
                          item.addons.length > 0 && (
                            <div className="cart-detail-row">

                              <span>
                                Tambahan
                              </span>

                              <strong>
                                {item.addons
                                  .map(
                                    (addon) =>
                                      addon.name
                                  )
                                  .join(', ')}
                            </strong>

                          </div>
                        )}

                      </div>

                      <div className="cart-unit-price">
                        Rp{' '}
                        {unitPrice.toLocaleString(
                          'id-ID'
                        )}

                        <span>
                          {' '}
                          / item
                        </span>
                      </div>

                    </div>

                    {/* ACTION */}
                    <div className="cart-item-action">

                      <div className="cart-quantity">

                        <button
                          type="button"
                          aria-label="Kurangi jumlah"
                          onClick={() =>
                            updateQuantity(
                              index,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Tambah jumlah"
                          onClick={() =>
                            updateQuantity(
                              index,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <div className="cart-item-total">
                        Rp{' '}
                        {itemTotal.toLocaleString(
                          'id-ID'
                        )}
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() =>
                          removeFromCart(index)
                        }
                      >
                        Hapus
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          </section>

          {/* SUMMARY */}
          <aside className="cart-summary">

            <div className="cart-summary-heading">

              <p>
                ORDER SUMMARY
              </p>

              <h2>
                Ringkasan Pesanan
              </h2>

            </div>

            <div className="cart-summary-row">

              <span>
                Total menu
              </span>

              <strong>
                {totalItems} item
              </strong>

            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">

              <div>

                <span>
                  Total Pesanan
                </span>

                <small>
                  Harga sudah termasuk pilihan menu
                </small>

              </div>

              <strong>
                Rp{' '}
                {totalPrice.toLocaleString(
                  'id-ID'
                )}
              </strong>

            </div>

            <Link
              to="/order"
              className="cart-checkout-button"
            >
              Lanjut ke Pesanan
              <span>→</span>
            </Link>

            {/* KEMBALI KE MENU TANPA SCAN QR ULANG */}
            <Link
              to={menuLink}
              className="cart-continue-button"
            >
              Tambah Menu Lain
            </Link>

          </aside>

        </div>

      </div>
    </main>
  );
}

export default CartPage;