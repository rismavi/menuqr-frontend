import api from "./api";

// ================================
// CUSTOMER
// ================================

export const getMenus = async () => {
  const response = await api.get("/menus");
  return response.data;
};

export const getMenuById = async (id) => {
  const response = await api.get(`/menus/${id}`);
  return response.data;
};

export const getMenuVariants = async (menuId) => {
  const response = await api.get(`/menus/${menuId}/variants`);
  return response.data;
};

export const getMenuAddons = async (menuId) => {
  const response = await api.get(`/menus/${menuId}/addons`);
  return response.data;
};


// ================================
// ADMIN
// ================================

// Ambil semua menu,
// termasuk menu yang sedang tidak tersedia
export const getAdminMenus = async () => {
  const response = await api.get("/admin/menus");
  return response.data;
};


// Tambah menu
export const createMenu = async (menuData) => {
  const response = await api.post("/menus", menuData);
  return response.data;
};


// Update menu
export const updateMenu = async (id, menuData) => {
  const response = await api.post(`/menus/${id}`, menuData);
  return response.data;
};


// Hapus menu
export const deleteMenu = async (id) => {
  const response = await api.delete(`/menus/${id}`);
  return response.data;
};