import api from "./api";

/* =========================
   GET ALL ORDERS
========================= */

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

/* =========================
   GET ORDER DETAIL
========================= */

export const getOrderByCode = async (orderCode) => {
  const response = await api.get(`/orders/${orderCode}`);
  return response.data;
};

/* =========================
   UPDATE ORDER STATUS
========================= */

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, {
    status,
  });

  return response.data;
};