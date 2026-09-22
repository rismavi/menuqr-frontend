import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  getMenuAddons,
  createAddon,
  updateAddon,
  deleteAddon,
} from "../../services/addonService";

import { getAdminMenus } from "../../services/menuService";

function AddonPage() {
  const [menus, setMenus] = useState([]);
  const [addons, setAddons] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [menuFilter, setMenuFilter] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingAddon, setEditingAddon] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [addForm, setAddForm] = useState({
    menu_id: "",
    name: "",
    price: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const menuResponse = await getAdminMenus();

      const menuList =
        menuResponse?.data ||
        menuResponse ||
        [];

      setMenus(menuList);

      const allAddons = [];

      for (const menu of menuList) {
        try {
          const addonResponse = await getMenuAddons(menu.id);

          const addonList =
            addonResponse?.data ||
            addonResponse ||
            [];

          addonList.forEach((addon) => {
            allAddons.push({
              ...addon,
              menu_id: menu.id,
              menu_name: menu.name,
            });
          });
        } catch (addonError) {
          console.error(
            `Gagal mengambil addon menu ${menu.id}:`,
            addonError
          );
        }
      }

      setAddons(allAddons);
    } catch (err) {
      console.error("Gagal mengambil data addon:", err);

      setError(
        err.response?.data?.message ||
          "Gagal mengambil data add-on."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FILTER
  ========================= */

  const filteredAddons = useMemo(() => {
    return addons.filter((addon) => {
      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        !keyword ||
        addon.name?.toLowerCase().includes(keyword) ||
        addon.description?.toLowerCase().includes(keyword) ||
        addon.menu_name?.toLowerCase().includes(keyword);

      const matchesMenu =
        !menuFilter ||
        String(addon.menu_id) === String(menuFilter);

      return matchesSearch && matchesMenu;
    });
  }, [addons, search, menuFilter]);

  /* =========================
     STATISTICS
  ========================= */

  const totalAddons = addons.length;

  const totalMenusWithAddon = new Set(
    addons.map((addon) => addon.menu_id)
  ).size;

  const totalPrice = addons.reduce(
    (total, addon) => {
      return total + Number(addon.price || 0);
    },
    0
  );

  const averagePrice =
    totalAddons > 0
      ? Math.round(totalPrice / totalAddons)
      : 0;

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));
  };

  /* =========================
     ADD ADDON
  ========================= */

  const handleAddAddon = async (event) => {
    event.preventDefault();

    if (!addForm.menu_id) {
      setError("Silakan pilih menu terlebih dahulu.");
      return;
    }

    if (!addForm.name.trim()) {
      setError("Nama add-on wajib diisi.");
      return;
    }

    if (
      addForm.price === "" ||
      Number(addForm.price) < 0
    ) {
      setError("Harga add-on tidak valid.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createAddon(addForm.menu_id, {
        name: addForm.name.trim(),
        price: Number(addForm.price),
      });

      setShowAddModal(false);

      setAddForm({
        menu_id: "",
        name: "",
        price: "",
      });

      await loadData();
    } catch (err) {
      console.error("Gagal menambahkan addon:", err);

      setError(
        err.response?.data?.message ||
          "Gagal menambahkan add-on."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     OPEN EDIT
  ========================= */

  const handleOpenEdit = (addon) => {
    setEditingAddon(addon);

    setEditForm({
      name: addon.name || "",
      price: addon.price ?? "",
    });

    setError("");
    setShowEditModal(true);
  };

  /* =========================
     UPDATE ADDON
  ========================= */

  const handleUpdateAddon = async (event) => {
    event.preventDefault();

    if (!editingAddon) {
      return;
    }

    if (!editForm.name.trim()) {
      setError("Nama add-on wajib diisi.");
      return;
    }

    if (
      editForm.price === "" ||
      Number(editForm.price) < 0
    ) {
      setError("Harga add-on tidak valid.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await updateAddon(editingAddon.id, {
        name: editForm.name.trim(),
        price: Number(editForm.price),
      });

      setShowEditModal(false);
      setEditingAddon(null);

      setEditForm({
        name: "",
        price: "",
      });

      await loadData();
    } catch (err) {
      console.error("Gagal mengubah addon:", err);

      setError(
        err.response?.data?.message ||
          "Gagal mengubah add-on."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE ADDON
  ========================= */

  const handleDeleteAddon = async (addon) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus add-on "${addon.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(addon.id);
      setError("");

      await deleteAddon(addon.id);

      await loadData();
    } catch (err) {
      console.error("Gagal menghapus addon:", err);

      setError(
        err.response?.data?.message ||
          "Gagal menghapus add-on."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f7f5f6",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "700",
                color: "#211b1d",
              }}
            >
              Add-on / Topping
            </h1>

            <p
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                color: "#777",
              }}
            >
              Kelola tambahan menu yang dapat dipilih pelanggan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");

              setAddForm({
                menu_id: "",
                name: "",
                price: "",
              });

              setShowAddModal(true);
            }}
            style={{
              border: "none",
              backgroundColor: "#8f2638",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Tambah Add-on
          </button>
        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "13px 16px",
              borderRadius: "10px",
              backgroundColor: "#fbeaec",
              color: "#8f2638",
              border: "1px solid #f0cdd2",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {/* =========================
            STATISTICS
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Total Add-on
            </span>

            <h2 style={statValueStyle}>
              {totalAddons}
            </h2>

            <span style={statDescriptionStyle}>
              Semua tambahan menu
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Menu Memiliki Add-on
            </span>

            <h2
              style={{
                ...statValueStyle,
                color: "#4f8a62",
              }}
            >
              {totalMenusWithAddon}
            </h2>

            <span style={statDescriptionStyle}>
              Menu yang memiliki tambahan
            </span>
          </div>

          <div style={statCardStyle}>
            <span style={statLabelStyle}>
              Rata-rata Harga
            </span>

            <h2
              style={{
                ...statValueStyle,
                fontSize: "22px",
              }}
            >
              {formatRupiah(averagePrice)}
            </h2>

            <span style={statDescriptionStyle}>
              Harga tambahan menu
            </span>
          </div>
        </div>

        {/* =========================
            FILTER
        ========================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Cari add-on atau topping..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            style={{
              flex: 1,
              height: "42px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0 13px",
              fontSize: "12px",
              outline: "none",
            }}
          />

          <select
            value={menuFilter}
            onChange={(event) =>
              setMenuFilter(event.target.value)
            }
            style={filterSelectStyle}
          >
            <option value="">
              Semua Menu
            </option>

            {menus.map((menu) => (
              <option
                key={menu.id}
                value={menu.id}
              >
                {menu.name}
              </option>
            ))}
          </select>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px 22px",
              borderBottom: "1px solid #eee",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                color: "#211b1d",
              }}
            >
              Daftar Add-on
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Daftar tambahan yang tersedia pada restoran.
            </p>
          </div>

          {/* =========================
              LOADING
          ========================= */}

          {loading ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#888",
                fontSize: "13px",
              }}
            >
              Memuat data add-on...
            </div>
          ) : filteredAddons.length === 0 ? (
            <div
              style={{
                padding: "50px",
                textAlign: "center",
                color: "#888",
                fontSize: "13px",
              }}
            >
              Belum ada add-on yang ditemukan.
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#faf9f9",
                      textAlign: "left",
                    }}
                  >
                    <th style={tableHeaderStyle}>
                      Add-on
                    </th>

                    <th style={tableHeaderStyle}>
                      Menu
                    </th>

                    <th style={tableHeaderStyle}>
                      Harga
                    </th>

                    <th
                      style={{
                        ...tableHeaderStyle,
                        textAlign: "center",
                      }}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAddons.map((addon) => (
                    <tr key={addon.id}>
                      {/* ADDON */}

                      <td style={tableCellStyle}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "9px",
                              backgroundColor: "#f4e8eb",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#8f2638",
                              fontWeight: "700",
                              fontSize: "14px",
                              flexShrink: 0,
                            }}
                          >
                            +
                          </div>

                          <div>
                            <strong
                              style={{
                                display: "block",
                                fontSize: "13px",
                                color: "#211b1d",
                              }}
                            >
                              {addon.name}
                            </strong>

                            {addon.description && (
                              <span
                                style={{
                                  display: "block",
                                  marginTop: "3px",
                                  fontSize: "11px",
                                  color: "#999",
                                }}
                              >
                                {addon.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* MENU */}

                      <td style={tableCellStyle}>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#555",
                          }}
                        >
                          {addon.menu_name || "-"}
                        </span>
                      </td>

                      {/* PRICE */}

                      <td style={tableCellStyle}>
                        <strong
                          style={{
                            fontSize: "12px",
                            color: "#8f2638",
                          }}
                        >
                          {formatRupiah(addon.price)}
                        </strong>
                      </td>

                      {/* ACTION */}

                      <td
                        style={{
                          ...tableCellStyle,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "7px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenEdit(addon)
                            }
                            disabled={
                              deletingId === addon.id
                            }
                            style={actionButtonStyle}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAddon(addon)
                            }
                            disabled={
                              deletingId === addon.id
                            }
                            style={{
                              ...actionButtonStyle,
                              color: "#8f2638",
                            }}
                          >
                            {deletingId === addon.id
                              ? "Menghapus..."
                              : "Hapus"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* =========================
          ADD MODAL
      ========================= */}

      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <div style={modalHeaderStyle}>
              <div>
                <h2 style={modalTitleStyle}>
                  Tambah Add-on
                </h2>

                <p style={modalDescriptionStyle}>
                  Tambahkan topping atau tambahan untuk menu.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={closeButtonStyle}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddAddon}>
              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Menu
                </label>

                <select
                  value={addForm.menu_id}
                  onChange={(event) =>
                    setAddForm({
                      ...addForm,
                      menu_id: event.target.value,
                    })
                  }
                  style={formInputStyle}
                >
                  <option value="">
                    Pilih Menu
                  </option>

                  {menus.map((menu) => (
                    <option
                      key={menu.id}
                      value={menu.id}
                    >
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Nama Add-on
                </label>

                <input
                  type="text"
                  placeholder="Contoh: Extra Egg"
                  value={addForm.name}
                  onChange={(event) =>
                    setAddForm({
                      ...addForm,
                      name: event.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Harga Tambahan
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Contoh: 5000"
                  value={addForm.price}
                  onChange={(event) =>
                    setAddForm({
                      ...addForm,
                      price: event.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div style={modalFooterStyle}>
                <button
                  type="button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                  style={cancelButtonStyle}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={saveButtonStyle}
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Add-on"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          EDIT MODAL
      ========================= */}

      {showEditModal && (
        <div style={modalOverlayStyle}>
          <div style={modalCardStyle}>
            <div style={modalHeaderStyle}>
              <div>
                <h2 style={modalTitleStyle}>
                  Edit Add-on
                </h2>

                <p style={modalDescriptionStyle}>
                  Ubah informasi add-on.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowEditModal(false)
                }
                style={closeButtonStyle}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateAddon}>
              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Menu
                </label>

                <input
                  type="text"
                  value={
                    editingAddon?.menu_name || "-"
                  }
                  disabled
                  style={{
                    ...formInputStyle,
                    backgroundColor: "#f5f5f5",
                    color: "#888",
                  }}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Nama Add-on
                </label>

                <input
                  type="text"
                  placeholder="Nama Add-on"
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      name: event.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div style={formGroupStyle}>
                <label style={formLabelStyle}>
                  Harga Tambahan
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Contoh: 5000"
                  value={editForm.price}
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      price: event.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div style={modalFooterStyle}>
                <button
                  type="button"
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  style={cancelButtonStyle}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={saveButtonStyle}
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   STATISTIC STYLE
========================= */

const statCardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "14px",
  padding: "20px",
};

const statLabelStyle = {
  fontSize: "13px",
  color: "#777",
};

const statValueStyle = {
  margin: "8px 0 0",
  fontSize: "28px",
  color: "#211b1d",
};

const statDescriptionStyle = {
  display: "block",
  marginTop: "6px",
  fontSize: "11px",
  color: "#999",
};

/* =========================
   FILTER
========================= */

const filterSelectStyle = {
  width: "180px",
  height: "42px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "12px",
  color: "#555",
  backgroundColor: "#ffffff",
};

/* =========================
   TABLE
========================= */

const tableHeaderStyle = {
  padding: "14px 18px",
  fontSize: "11px",
  color: "#888",
  fontWeight: "600",
  borderBottom: "1px solid #eee",
};

const tableCellStyle = {
  padding: "16px 18px",
  borderBottom: "1px solid #eee",
  fontSize: "13px",
};

/* =========================
   ACTION BUTTON
========================= */

const actionButtonStyle = {
  border: "none",
  backgroundColor: "#f7f5f6",
  color: "#555",
  padding: "7px 10px",
  borderRadius: "6px",
  fontSize: "10px",
  fontWeight: "600",
  cursor: "pointer",
};

/* =========================
   MODAL
========================= */

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "20px",
};

const modalCardStyle = {
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxSizing: "border-box",
  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
};

const modalTitleStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
  color: "#211b1d",
};

const modalDescriptionStyle = {
  margin: "6px 0 0",
  fontSize: "12px",
  color: "#888",
};

const closeButtonStyle = {
  border: "none",
  backgroundColor: "#f7f5f6",
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  fontSize: "20px",
  color: "#777",
  cursor: "pointer",
};

const formGroupStyle = {
  marginBottom: "18px",
};

const formLabelStyle = {
  display: "block",
  marginBottom: "7px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#555",
};

const formInputStyle = {
  width: "100%",
  height: "42px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
};

const modalFooterStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "26px",
};

const cancelButtonStyle = {
  border: "1px solid #ddd",
  backgroundColor: "#ffffff",
  color: "#555",
  padding: "10px 16px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const saveButtonStyle = {
  border: "none",
  backgroundColor: "#8f2638",
  color: "#ffffff",
  padding: "10px 16px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

export default AddonPage;