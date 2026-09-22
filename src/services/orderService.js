import api from "./api";

// =========================================================
// MEMBUAT PESANAN
// =========================================================

export const createOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData
  );

  return response.data;
};

// =========================================================
// MENGAMBIL DETAIL PESANAN
// =========================================================

export const getOrder = async (orderCode) => {
  const response = await api.get(
    `/orders/${encodeURIComponent(orderCode)}`
  );

  return response.data;
};

// =========================================================
// MENGAMBIL LINK WHATSAPP
// =========================================================

export const getWhatsAppUrl = async (orderCode) => {
  const response = await api.get(
    `/orders/${encodeURIComponent(orderCode)}/whatsapp`
  );

  return response.data;
};