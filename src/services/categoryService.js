import api from "./api";

// ========================================
// AMBIL SEMUA KATEGORI
// ========================================

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

// ========================================
// TAMBAH KATEGORI
// ========================================

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData);

  return response.data;
};

// ========================================
// UPDATE KATEGORI
// ========================================

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);

  return response.data;
};

// ========================================
// HAPUS KATEGORI
// ========================================

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
};