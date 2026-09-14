import api from './api';

export const getMenus = async () => {
  const response = await api.get('/menus');
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