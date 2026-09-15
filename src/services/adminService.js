import api from "./api";

export const loginAdmin = async (loginData) => {
  const response = await api.post("/login", loginData);

  return response.data;
};