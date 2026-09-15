import api from "./api";

export const getTables = async () => {
  const response = await api.get("/tables");
  return response.data;
};

export const getTableByCode = async (restaurantSlug, tableCode) => {
  const response = await api.get(
    `/restaurants/${restaurantSlug}/tables/${tableCode}`
  );
  return response.data;
};

export const getTableQr = async (tableId) => {
  const response = await api.get(`/tables/${tableId}/qr`, {
    responseType: "blob",
  });

  return URL.createObjectURL(response.data);
};