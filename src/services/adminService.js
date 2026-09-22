import api from "./api";

// =========================================================
// LOGIN ADMIN
// =========================================================

export const loginAdmin = async (loginData) => {
  const response = await api.post(
    "/login",
    loginData
  );

  return response.data;
};

// =========================================================
// MENGAMBIL DATA ADMIN YANG SEDANG LOGIN
// =========================================================

export const getMe = async () => {
  const response = await api.get(
    "/me"
  );

  return response.data;
};

// =========================================================
// LOGOUT ADMIN
// =========================================================

export const logoutAdmin = async () => {
  const response = await api.post(
    "/logout"
  );

  return response.data;
};