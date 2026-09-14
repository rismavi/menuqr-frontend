import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import {
  createOrder,
  getWhatsAppUrl,
} from '../../services/orderService';

function OrderPage() {
  const { cartItems } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ambil data meja dari localStorage
  const savedTable =
    localStorage.getItem('restaurantTable');

  const parsedTable = savedTable
    ? JSON.parse(savedTable)
    : null;

  // Data meja sudah disimpan dalam bentuk:
  // {
  //   id: 2,
  //   name: "Table 01",
  //   code: "HOSHI-001",
  //   ...
  // }
  const table =
    parsedTable?.table ||
    parsedTable?.data ||
    parsedTable;

  const grandTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.totalPrice),
    0
  );

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      setError('');

      const orderData = {
        restaurant_id:
          cartItems[0].restaurantId,

        table_id:
          table?.id || null,

        customer_name:
          name || null,

        note:
          notes || null,

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
        'Data yang dikirim:',
        orderData
      );

      const result =
        await createOrder(orderData);

      console.log(
        'Response order:',
        result
      );

      const orderId =
        result.data.id;

      console.log(
        'ID Pesanan:',
        orderId
      );

      const whatsappResult =
        await getWhatsAppUrl(orderId);

      console.log(
        'Response WhatsApp:',
        whatsappResult
      );

      if (
        whatsappResult.whatsapp_url
      ) {
        window.open(
          whatsappResult.whatsapp_url,
          '_blank'
        );
      } else {
        setError(
          'Pesanan berhasil dibuat, tetapi link WhatsApp tidak ditemukan.'
        );
      }
    } catch (err) {
      console.error(
        'Gagal membuat pesanan:',
        err
      );

      setError(
        'Gagal membuat pesanan. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="fw-bold mb-3">
            Pesanan Kosong
          </h2>

          <p className="text-muted mb-4">
            Belum ada menu yang dipilih.
          </p>

          <Link
            to="/"
            className="btn btn-dark"
          >
            Kembali ke Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">
        Pesan Sekarang
      </h2>

      {/* Pesan error */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* Informasi meja */}
      {table && (
        <div className="alert alert-light border mb-4">
          <div className="fw-bold">
            Meja {table.name}
          </div>

          <small className="text-muted">
            Pesanan akan dicatat untuk meja ini.
          </small>
        </div>
      )}

      {/* Jika meja belum ditemukan */}
      {!table && (
        <div className="alert alert-warning mb-4">
          Meja belum terdeteksi. Silakan
          kembali ke menu dan scan QR Code meja.
        </div>
      )}

      {/* Data pelanggan */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Data Pelanggan
          </h5>

          <div className="mb-3">
            <label className="form-label">
              Nama
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Nomor WhatsApp
            </label>

            <input
              type="tel"
              className="form-control"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          <div>
            <label className="form-label">
              Catatan Pesanan
            </label>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Contoh: Tidak pakai daun bawang"
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Ringkasan pesanan */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            Ringkasan Pesanan
          </h5>

          {cartItems.map(
            (item, index) => (
              <div
                key={index}
                className="border-bottom py-3"
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-1">
                      {item.name}
                    </h6>

                    <p className="text-muted mb-1">
                      {item.quantity} × Rp{' '}
                      {Number(
                        item.price
                      ).toLocaleString(
                        'id-ID'
                      )}
                    </p>

                    {item.variant && (
                      <p className="mb-1 small">
                        Variant:{' '}
                        {item.variant.name}
                      </p>
                    )}

                    {item.addons &&
                      item.addons.length >
                        0 && (
                        <p className="mb-0 small">
                          Add-on:{' '}
                          {item.addons
                            .map(
                              (addon) =>
                                addon.name
                            )
                            .join(', ')}
                        </p>
                      )}
                  </div>

                  <div className="fw-bold">
                    Rp{' '}
                    {Number(
                      item.totalPrice
                    ).toLocaleString(
                      'id-ID'
                    )}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Total */}
          <div className="d-flex justify-content-between mt-3">
            <span className="fw-bold">
              Total Pesanan
            </span>

            <span className="fw-bold fs-5">
              Rp{' '}
              {grandTotal.toLocaleString(
                'id-ID'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Tombol */}
      <div className="d-flex gap-2">
        <Link
          to="/cart"
          className="btn btn-outline-dark flex-grow-1"
        >
          Kembali
        </Link>

        <button
          type="button"
          className="btn btn-dark flex-grow-1"
          onClick={handleConfirmOrder}
          disabled={loading}
        >
          {loading
            ? 'Memproses...'
            : 'Konfirmasi Pesanan'}
        </button>
      </div>
    </div>
  );
}

export default OrderPage;