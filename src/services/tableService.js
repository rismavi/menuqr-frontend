import api from "./api";

// =========================
// GET ALL TABLES
// =========================

export const getTables = async () => {
  const response = await api.get("/tables");
  return response.data;
};

// =========================
// GET TABLE BY CODE
// Digunakan untuk customer / QR
// =========================

export const getTableByCode = async (
  restaurantSlug,
  tableCode
) => {
  const response = await api.get(
    `/restaurants/${restaurantSlug}/tables/${tableCode}`
  );

  return response.data;
};

// =========================
// GET TABLE QR
// =========================

export const getTableQr = async (tableId) => {
  const response = await api.get(
    `/tables/${tableId}/qr`,
    {
      responseType: "blob",
    }
  );

  return URL.createObjectURL(response.data);
};

// =========================
// CREATE TABLE
// =========================

export const createTable = async (tableData) => {
  const response = await api.post(
    "/tables",
    tableData
  );

  return response.data;
};

// =========================
// UPDATE TABLE
// =========================

export const updateTable = async (
  id,
  tableData
) => {
  const response = await api.put(
    `/tables/${id}`,
    tableData
  );

  return response.data;
};

// =========================
// DELETE TABLE
// =========================

export const deleteTable = async (id) => {
  const response = await api.delete(
    `/tables/${id}`
  );

  return response.data;
};

// =========================
// DOWNLOAD TABLE QR
// =========================

export const downloadTableQr = async (tableId) => {
  const response = await api.get(
    `/tables/${tableId}/qr/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};