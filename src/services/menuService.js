import api from "./api";

export const getMenus = async (
  restaurantSlug
) => {
  if (!restaurantSlug) {
    throw new Error(
      "Restaurant slug wajib diisi."
    );
  }

  const response = await api.get(
    `/restaurants/${restaurantSlug}/menu`
  );

  return response.data;
};

export const getMenuById = async (
  id
) => {
  const response = await api.get(
    `/menus/${id}`
  );

  return response.data;
};

export const getMenuVariants = async (
  menuId
) => {
  const response = await api.get(
    `/menus/${menuId}/variants`
  );

  return response.data;
};

export const getMenuAddons = async (
  menuId
) => {
  const response = await api.get(
    `/menus/${menuId}/addons`
  );

  return response.data;
};

export const getAdminMenus = async () => {
  const response = await api.get(
    "/admin/menus"
  );

  return response.data;
};

export const createMenu = async (
  menuData
) => {
  const response = await api.post(
    "/menus",
    menuData
  );

  return response.data;
};

export const updateMenu = async (
  id,
  menuData
) => {
  if (menuData instanceof FormData) {
    menuData.append(
      "_method",
      "PUT"
    );

    const response = await api.post(
      `/menus/${id}`,
      menuData
    );

    return response.data;
  }

  const response = await api.put(
    `/menus/${id}`,
    menuData
  );

  return response.data;
};

export const deleteMenu = async (
  id
) => {
  const response = await api.delete(
    `/menus/${id}`
  );

  return response.data;
};