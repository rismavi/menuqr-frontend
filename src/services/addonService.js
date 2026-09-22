import api from "./api";

export const getMenuAddons = async (menuId) => {
  const response = await api.get(`/menus/${menuId}/addons`);
  return response.data;
};

export const createAddon = async (menuId, addonData) => {
  const response = await api.post(
    `/menus/${menuId}/addons`,
    addonData
  );
  return response.data;
};

export const updateAddon = async (id, addonData) => {
  const response = await api.put(`/addons/${id}`, addonData);
  return response.data;
};

export const deleteAddon = async (id) => {
  const response = await api.delete(`/addons/${id}`);
  return response.data;
};