import api from "./api";

// ========================================
// CUSTOMER
// ========================================

// Ambil semua menu berdasarkan restaurant slug
export const getMenus = async (restaurantSlug) => {
  const response = await api.get(`/restaurants/${restaurantSlug}/menu`);
  return response.data;
};

// Ambil detail satu menu
export const getMenuById = async (id) => {
  const response = await api.get(`/menus/${id}`);
  return response.data;
};

// Ambil variant dari sebuah menu
export const getMenuVariants = async (menuId) => {
  const response = await api.get(`/menus/${menuId}/variants`);
  return response.data;
};

// Ambil addon dari sebuah menu
export const getMenuAddons = async (menuId) => {
  const response = await api.get(`/menus/${menuId}/addons`);
  return response.data;
};


// ========================================
// ADMIN
// ========================================

// Ambil semua menu untuk halaman admin
export const getAdminMenus = async () => {
  const response = await api.get("/admin/menus");
  return response.data;
};

// Tambah menu baru
export const createMenu = async (menuData) => {
  const response = await api.post("/menus", menuData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update menu
export const updateMenu = async (id, menuData) => {
  // Jika menggunakan FormData karena ada upload gambar
  if (menuData instanceof FormData) {
    menuData.append("_method", "PUT");

    const response = await api.post(`/menus/${id}`, menuData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  // Jika update tanpa upload gambar
  const response = await api.put(`/menus/${id}`, menuData);

  return response.data;
};

// Hapus menu
export const deleteMenu = async (id) => {
  const response = await api.delete(`/menus/${id}`);
  return response.data;
};