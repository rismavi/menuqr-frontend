import api from './api';

export const getTableByCode = async (
  restaurantSlug,
  tableCode
) => {
  const response = await api.get(
    `/restaurants/${restaurantSlug}/tables/${tableCode}`
  );

  return response.data;
};