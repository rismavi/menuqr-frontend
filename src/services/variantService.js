import api from "./api";

// ========================================
// AMBIL VARIANT BERDASARKAN MENU
// ========================================

export const getMenuVariants = async (menuId) => {
  const response = await api.get(
    `/menus/${menuId}/variants`
  );

  return response.data;
};

// ========================================
// TAMBAH VARIANT
// ========================================

export const createVariant = async (
  menuId,
  variantData
) => {
  const response = await api.post(
    `/menus/${menuId}/variants`,
    variantData
  );

  return response.data;
};

// ========================================
// UPDATE VARIANT
// ========================================

export const updateVariant = async (
  id,
  variantData
) => {
  const response = await api.put(
    `/variants/${id}`,
    variantData
  );

  return response.data;
};

// ========================================
// HAPUS VARIANT
// ========================================

export const deleteVariant = async (id) => {
  const response = await api.delete(
    `/variants/${id}`
  );

  return response.data;
};