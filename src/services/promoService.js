import api from "./api";

// Ambil semua promo
export const getPromos = async () => {
  const response = await api.get("/promos");
  return response.data;
};

// Tambah promo
export const createPromo = async (promoData) => {
  const response = await api.post("/promos", promoData);
  return response.data;
};

// Update promo
export const updatePromo = async (id, promoData) => {
  const response = await api.put(`/promos/${id}`, promoData);
  return response.data;
};

// Hapus promo
export const deletePromo = async (id) => {
  const response = await api.delete(`/promos/${id}`);
  return response.data;
};