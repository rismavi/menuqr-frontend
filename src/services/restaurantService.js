import api from "./api";

// Ambil semua restaurant
export const getRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

// Update restaurant
export const updateRestaurant = async (
  id,
  restaurantData
) => {
  const response = await api.put(
    `/restaurants/${id}`,
    restaurantData
  );

  return response.data;
};