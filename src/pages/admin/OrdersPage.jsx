import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  getOrders,
  getOrderByCode,
  updateOrderStatus,
} from "../../services/ordersService";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // LOAD ORDERS
  // =========================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getOrders();

      console.log("Data orders:", result);

      const orderData =
        result?.data ||
        result?.orders ||
        result ||
        [];

      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err);

      setError(
        err.response?.data?.message ||
          "Gagal mengambil data pesanan."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================
  // FORMAT DATA
  // =========================

  const getOrderCode = (order) => {
    return (
      order?.order_code ||
      order?.code ||
      `#${order?.id || "-"}`
    );
  };

  const getCustomerName = (order) => {
    return (
      order?.customer_name ||
      order?.customer?.name ||
      order?.name ||
      "-"
    );
  };

  const getTableName = (order) => {
    return (
      order?.table?.name ||
      order?.table?.table_number ||
      order?.table_name ||
      order?.table_code ||
      "-"
    );
  };

  const getTotal = (order) => {
    return (
      order?.total ||
      order?.grand_total ||
      order?.total_price ||
      0
    );
  };

  const getItemCount = (order) => {
    if (order?.items_count !== undefined) {
      return order.items_count;
    }

    if (order?.total_items !== undefined) {
      return order.total_items;
    }

    if (Array.isArray(order?.items)) {
      return order.items.reduce(
        (total, item) =>
          total + Number(item?.quantity || 1),
        0
      );
    }

    return 0;
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));
  };

  const formatTime = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // NORMALIZE STATUS
  // =========================

  const normalizeStatus = (status) => {
    if (!status) return "Baru";

    const value = String(status).toLowerCase();

    // BACKEND: pending
    if (
      value === "pending" ||
      value === "baru" ||
      value === "new"
    ) {
      return "Baru";
    }

    // BACKEND: confirmed
    if (
      value === "confirmed" ||
      value === "processing" ||
      value === "diproses" ||
      value === "process"
    ) {
      return "Diproses";
    }

    // BACKEND: completed
    if (
      value === "completed" ||
      value === "selesai" ||
      value === "complete"
    ) {
      return "Selesai";
    }

    // BACKEND: cancelled
    if (
      value === "cancelled" ||
      value === "canceled" ||
      value === "dibatalkan"
    ) {
      return "Dibatalkan";
    }

    return status;
  };

  const getPaymentStatus = (order) => {
    return (
      order?.payment_status ||
      order?.payment ||
      "-"
    );
  };

  // =========================
  // FILTER
  // =========================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderCode =
        getOrderCode(order).toLowerCase();

      const customer =
        getCustomerName(order).toLowerCase();

      const table =
        getTableName(order).toLowerCase();

      const keyword = search.toLowerCase();

      const matchSearch =
        orderCode.includes(keyword) ||
        customer.includes(keyword) ||
        table.includes(keyword);

      const status = normalizeStatus(
        order?.status
      );

      const matchStatus =
        statusFilter === "Semua" ||
        status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  // =========================
  // STATS
  // =========================

  const totalOrders = orders.length;

  const newOrders = orders.filter(
    (order) =>
      normalizeStatus(order?.status) === "Baru"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      normalizeStatus(order?.status) ===
      "Diproses"
  ).length;

  const completedOrders = orders.filter(
    (order) =>
      normalizeStatus(order?.status) ===
      "Selesai"
  ).length;

  // =========================
  // DETAIL ORDER
  // =========================

  const handleDetail = async (order) => {
    try {
      setDetailLoading(true);

      const orderCode =
        order?.order_code ||
        order?.code;

      if (!orderCode) {
        setSelectedOrder(order);
        return;
      }

      const result =
        await getOrderByCode(orderCode);

      console.log("Detail order:", result);

      const detail =
        result?.data ||
        result?.order ||
        result;

      setSelectedOrder(detail);
    } catch (err) {
      console.error(
        "Gagal mengambil detail:",
        err
      );

      setSelectedOrder(order);
    } finally {
      setDetailLoading(false);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const handleUpdateStatus = async (
    order,
    newStatus
  ) => {
    try {
      setUpdating(true);

      await updateOrderStatus(
        order.id,
        newStatus
      );

      alert(
        "Status pesanan berhasil diperbarui."
      );

      setSelectedOrder(null);

      await loadOrders();
    } catch (err) {
      console.error(
        "Gagal update status:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Gagal memperbarui status pesanan."
      );
    } finally {
      setUpdating(false);
    }
  };

  // =========================
  // STATUS BADGE
  // =========================

  const StatusBadge = ({ status }) => {
    const normalized =
      normalizeStatus(status);

    let background = "#f3f4f6";
    let color = "#374151";

    if (normalized === "Baru") {
      background = "#fff7ed";
      color = "#ea580c";
    }

    if (normalized === "Diproses") {
      background = "#eff6ff";
      color = "#2563eb";
    }

    if (normalized === "Selesai") {
      background = "#ecfdf5";
      color = "#059669";
    }

    if (normalized === "Dibatalkan") {
      background = "#fef2f2";
      color = "#dc2626";
    }

    return (
      <span
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "20px",
          background,
          color,
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {normalized}
      </span>
    );
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          marginLeft: "250px",
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
                color: "#111827",
              }}
            >
              Pesanan
            </h1>

            <p
              style={{
                marginTop: "6px",
                color: "#6b7280",
              }}
            >
              Kelola pesanan pelanggan
            </p>
          </div>

          <button
            onClick={loadOrders}
            style={{
              border: "none",
              background: "#111827",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              padding: "14px 18px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <StatCard
            title="Total Pesanan"
            value={totalOrders}
          />

          <StatCard
            title="Pesanan Baru"
            value={newOrders}
          />

          <StatCard
            title="Diproses"
            value={processingOrders}
          />

          <StatCard
            title="Selesai"
            value={completedOrders}
          />
        </div>

        {/* FILTER */}
        <div
          style={{
            background: "#fff",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid #e5e7eb",
            display: "flex",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Cari pesanan, pelanggan, atau meja..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              flex: 1,
              padding: "11px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            style={{
              padding: "11px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "#fff",
            }}
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Baru">
              Baru
            </option>

            <option value="Diproses">
              Diproses
            </option>

            <option value="Selesai">
              Selesai
            </option>

            <option value="Dibatalkan">
              Dibatalkan
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              Memuat data pesanan...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              Belum ada pesanan.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#f9fafb",
                  }}
                >
                  <th style={thStyle}>
                    Pesanan
                  </th>

                  <th style={thStyle}>
                    Pelanggan
                  </th>

                  <th style={thStyle}>
                    Meja
                  </th>

                  <th style={thStyle}>
                    Item
                  </th>

                  <th style={thStyle}>
                    Total
                  </th>

                  <th style={thStyle}>
                    Status
                  </th>

                  <th style={thStyle}>
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map(
                  (order, index) => (
                    <tr
                      key={
                        order.id || index
                      }
                    >
                      <td style={tdStyle}>
                        <strong>
                          {getOrderCode(
                            order
                          )}
                        </strong>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginTop: "4px",
                          }}
                        >
                          {formatTime(
                            order.created_at
                          )}
                        </div>
                      </td>

                      <td style={tdStyle}>
                        {getCustomerName(
                          order
                        )}
                      </td>

                      <td style={tdStyle}>
                        {getTableName(order)}
                      </td>

                      <td style={tdStyle}>
                        {getItemCount(order)} item
                      </td>

                      <td style={tdStyle}>
                        <strong>
                          {formatRupiah(
                            getTotal(order)
                          )}
                        </strong>
                      </td>

                      <td style={tdStyle}>
                        <StatusBadge
                          status={
                            order.status
                          }
                        />
                      </td>

                      <td style={tdStyle}>
                        <button
                          onClick={() =>
                            handleDetail(
                              order
                            )
                          }
                          style={{
                            border: "none",
                            background:
                              "#eff6ff",
                            color: "#800000",
                            padding:
                              "7px 12px",
                            borderRadius:
                              "7px",
                            cursor: "pointer",
                            fontWeight:
                              "600",
                          }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* DETAIL MODAL */}
      {selectedOrder && (
        <div
          onClick={() =>
            !updating &&
            setSelectedOrder(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "650px",
              maxHeight: "85vh",
              overflowY: "auto",
              background: "#fff",
              borderRadius: "14px",
              padding: "26px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                  }}
                >
                  Detail Pesanan
                </h2>

                <p
                  style={{
                    margin:
                      "5px 0 0",
                    color: "#6b7280",
                  }}
                >
                  {getOrderCode(
                    selectedOrder
                  )}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                style={{
                  border: "none",
                  background: "#f3f4f6",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                ×
              </button>
            </div>

            {detailLoading ? (
              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                Memuat detail pesanan...
              </div>
            ) : (
              <>
                {/* INFO */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: "14px",
                    marginBottom: "24px",
                  }}
                >
                  <InfoItem
                    label="Pelanggan"
                    value={getCustomerName(
                      selectedOrder
                    )}
                  />

                  <InfoItem
                    label="Meja"
                    value={getTableName(
                      selectedOrder
                    )}
                  />

                  <InfoItem
                    label="Waktu"
                    value={formatTime(
                      selectedOrder.created_at
                    )}
                  />

                  <InfoItem
                    label="Pembayaran"
                    value={getPaymentStatus(
                      selectedOrder
                    )}
                  />
                </div>

                {/* STATUS */}
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "6px",
                    }}
                  >
                    Status
                  </div>

                  <StatusBadge
                    status={
                      selectedOrder.status
                    }
                  />
                </div>

                {/* ITEMS */}
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "12px",
                  }}
                >
                  Item Pesanan
                </h3>

                <div
                  style={{
                    border:
                      "1px solid #e5e7eb",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {Array.isArray(
                    selectedOrder.items
                  ) &&
                  selectedOrder.items.length >
                    0 ? (
                    selectedOrder.items.map(
                      (item, index) => (
                        <div
                          key={
                            item.id ||
                            index
                          }
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            padding:
                              "14px",
                            borderBottom:
                              index <
                              selectedOrder
                                .items
                                .length -
                                1
                                ? "1px solid #e5e7eb"
                                : "none",
                          }}
                        >
                          <div>
                            <strong>
                              {item.menu
                                ?.name ||
                                item.menu_name ||
                                item.name ||
                                "Menu"}
                            </strong>

                            {item.variant && (
                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                  color:
                                    "#6b7280",
                                  marginTop:
                                    "4px",
                                }}
                              >
                                Varian:{" "}
                                {item.variant
                                  ?.name ||
                                  item.variant}
                              </div>
                            )}

                            <div
                              style={{
                                fontSize:
                                  "12px",
                                color:
                                  "#6b7280",
                                marginTop:
                                  "4px",
                              }}
                            >
                              Qty:{" "}
                              {item.quantity ||
                                1}
                            </div>
                          </div>

                          <strong>
                            {formatRupiah(
                              item.subtotal ||
                                item.total ||
                                item.price ||
                                0
                            )}
                          </strong>
                        </div>
                      )
                    )
                  ) : (
                    <div
                      style={{
                        padding: "20px",
                        textAlign:
                          "center",
                        color:
                          "#6b7280",
                      }}
                    >
                      Tidak ada detail
                      item.
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    marginTop: "20px",
                    paddingTop: "18px",
                    borderTop:
                      "1px solid #e5e7eb",
                    fontSize: "18px",
                  }}
                >
                  <strong>Total</strong>

                  <strong>
                    {formatRupiah(
                      getTotal(
                        selectedOrder
                      )
                    )}
                  </strong>
                </div>

                {/* ACTION */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "24px",
                  }}
                >
                  {/* BARU → CONFIRMED */}
                  {normalizeStatus(
                    selectedOrder.status
                  ) === "Baru" && (
                    <button
                      disabled={updating}
                      onClick={() =>
                        handleUpdateStatus(
                          selectedOrder,
                          "confirmed"
                        )
                      }
                      style={{
                        flex: 1,
                        border: "none",
                        background:
                          "#2563eb",
                        color: "#fff",
                        padding:
                          "12px",
                        borderRadius:
                          "8px",
                        cursor: updating
                          ? "not-allowed"
                          : "pointer",
                        fontWeight:
                          "600",
                      }}
                    >
                      {updating
                        ? "Memproses..."
                        : "Proses ke Dapur"}
                    </button>
                  )}

                  {/* CONFIRMED → COMPLETED */}
                  {normalizeStatus(
                    selectedOrder.status
                  ) === "Diproses" && (
                    <button
                      disabled={updating}
                      onClick={() =>
                        handleUpdateStatus(
                          selectedOrder,
                          "completed"
                        )
                      }
                      style={{
                        flex: 1,
                        border: "none",
                        background:
                          "#059669",
                        color: "#fff",
                        padding:
                          "12px",
                        borderRadius:
                          "8px",
                        cursor: updating
                          ? "not-allowed"
                          : "pointer",
                        fontWeight:
                          "600",
                      }}
                    >
                      {updating
                        ? "Menyimpan..."
                        : "Tandai Selesai"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================
// COMPONENT TAMBAHAN
// =========================

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "26px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div
      style={{
        background: "#f9fafb",
        padding: "12px 14px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#6b7280",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <strong
        style={{
          fontSize: "14px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  fontSize: "12px",
  color: "#6b7280",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "15px 16px",
  borderBottom: "1px solid #f1f5f9",
  fontSize: "14px",
  color: "#374151",
};

export default OrdersPage;