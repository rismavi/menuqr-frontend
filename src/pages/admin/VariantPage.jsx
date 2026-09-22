import { useEffect, useMemo, useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { getAdminMenus } from "../../services/menuService";

import {
  getMenuVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "../../services/variantService";

function VariantPage() {
  // ========================================
  // DATA
  // ========================================

  const [menus, setMenus] = useState([]);
  const [variants, setVariants] = useState([]);

  const [loading, setLoading] = useState(true);

  // ========================================
  // FILTER
  // ========================================

  const [search, setSearch] = useState("");
  const [menuFilter, setMenuFilter] = useState("all");

  // ========================================
  // MODAL TAMBAH
  // ========================================

  const [showAddModal, setShowAddModal] = useState(false);

  const [addForm, setAddForm] = useState({
    menu_id: "",
    name: "",
    price: "",
    sort_order: 0,
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ========================================
  // MODAL EDIT
  // ========================================

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    sort_order: 0,
  });

  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // ========================================
  // DELETE
  // ========================================

  const [deletingId, setDeletingId] = useState(null);

  // ========================================
  // LOAD DATA
  // ========================================

  const loadData = async () => {
    try {
      setLoading(true);

      // ========================================
      // AMBIL MENU
      // ========================================

      const menuResponse = await getAdminMenus();

      let menuData = [];

      if (Array.isArray(menuResponse)) {
        menuData = menuResponse;
      } else if (Array.isArray(menuResponse?.data)) {
        menuData = menuResponse.data;
      } else if (Array.isArray(menuResponse?.menus)) {
        menuData = menuResponse.menus;
      } else if (Array.isArray(menuResponse?.data?.data)) {
        menuData = menuResponse.data.data;
      } else if (Array.isArray(menuResponse?.data?.menus)) {
        menuData = menuResponse.data.menus;
      }

      setMenus(menuData);

      // ========================================
      // AMBIL VARIANT DARI SETIAP MENU
      // ========================================

      const variantResults = await Promise.all(
        menuData.map(async (menu) => {
          try {
            const response = await getMenuVariants(menu.id);

            let variantData = [];

            if (Array.isArray(response)) {
              variantData = response;
            } else if (Array.isArray(response?.data)) {
              variantData = response.data;
            }

            return variantData.map((variant) => ({
              ...variant,
              menu_id: menu.id,
              menu_name: menu.name,
            }));
          } catch (error) {
            console.error(
              `Gagal mengambil variant menu ${menu.name}:`,
              error
            );

            return [];
          }
        })
      );

      setVariants(variantResults.flat());
    } catch (error) {
      console.error(
        "Gagal mengambil data variant:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ========================================
  // FILTER DATA
  // ========================================

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) => {
      const variantName =
        variant.name ??
        variant.variant_name ??
        variant.title ??
        "";

      const menuName = variant.menu_name ?? "";

      const matchSearch =
        variantName
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        menuName
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchMenu =
        menuFilter === "all" ||
        Number(variant.menu_id) ===
          Number(menuFilter);

      return matchSearch && matchMenu;
    });
  }, [
    variants,
    search,
    menuFilter,
  ]);

  // ========================================
  // STATISTIK
  // ========================================

  const totalVariants = variants.length;

  const totalMenusWithVariant = new Set(
    variants.map((variant) => variant.menu_id)
  ).size;

  const popularVariant = useMemo(() => {
    if (variants.length === 0) {
      return "-";
    }

    const countMap = {};

    variants.forEach((variant) => {
      const name =
        variant.name ??
        variant.variant_name ??
        variant.title ??
        "-";

      countMap[name] =
        (countMap[name] || 0) + 1;
    });

    return (
      Object.entries(countMap).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] ?? "-"
    );
  }, [variants]);

  // ========================================
  // TAMBAH VARIANT
  // ========================================

  const handleOpenAddModal = () => {
    setFormError("");

    setAddForm({
      menu_id:
        menus.length > 0
          ? menus[0].id
          : "",
      name: "",
      price: "",
      sort_order: 0,
    });

    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    if (saving) return;

    setShowAddModal(false);
    setFormError("");
  };

  const handleAddChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddVariant = async (event) => {
    event.preventDefault();

    setFormError("");

    // ========================================
    // VALIDASI MENU
    // ========================================

    if (!addForm.menu_id) {
      setFormError(
        "Silakan pilih menu terlebih dahulu."
      );
      return;
    }

    // ========================================
    // VALIDASI NAMA
    // ========================================

    if (!addForm.name.trim()) {
      setFormError(
        "Nama variant wajib diisi."
      );
      return;
    }

    // ========================================
    // VALIDASI HARGA
    // ========================================

    if (
      addForm.price === "" ||
      Number(addForm.price) < 0
    ) {
      setFormError(
        "Harga variant tidak valid."
      );
      return;
    }

    try {
      setSaving(true);

      await createVariant(
        addForm.menu_id,
        {
          name: addForm.name.trim(),
          price: Number(addForm.price),
          sort_order:
            Number(addForm.sort_order) || 0,
        }
      );

      setShowAddModal(false);

      await loadData();

      alert(
        "Variant berhasil ditambahkan."
      );
    } catch (error) {
      console.error(
        "Gagal menambahkan variant:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Variant gagal ditambahkan.";

      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // EDIT VARIANT
  // ========================================

  const handleOpenEditModal = (
    variant
  ) => {
    setEditingVariant(variant);

    setEditForm({
      name:
        variant.name ??
        variant.variant_name ??
        variant.title ??
        "",

      price: Number(
        variant.price ??
          variant.additional_price ??
          variant.extra_price ??
          0
      ),

      sort_order: Number(
        variant.sort_order ?? 0
      ),
    });

    setEditError("");
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    if (editSaving) return;

    setShowEditModal(false);
    setEditingVariant(null);
    setEditError("");
  };

  const handleEditChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditVariant = async (
    event
  ) => {
    event.preventDefault();

    if (!editingVariant) return;

    setEditError("");

    // ========================================
    // VALIDASI NAMA
    // ========================================

    if (!editForm.name.trim()) {
      setEditError(
        "Nama variant wajib diisi."
      );
      return;
    }

    // ========================================
    // VALIDASI HARGA
    // ========================================

    if (
      editForm.price === "" ||
      Number(editForm.price) < 0
    ) {
      setEditError(
        "Harga variant tidak valid."
      );
      return;
    }

    try {
      setEditSaving(true);

      await updateVariant(
        editingVariant.id,
        {
          name:
            editForm.name.trim(),

          price:
            Number(editForm.price),

          sort_order:
            Number(editForm.sort_order) || 0,
        }
      );

      setShowEditModal(false);
      setEditingVariant(null);

      await loadData();

      alert(
        "Variant berhasil diperbarui."
      );
    } catch (error) {
      console.error(
        "Gagal memperbarui variant:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Variant gagal diperbarui.";

      setEditError(message);
    } finally {
      setEditSaving(false);
    }
  };

  // ========================================
  // DELETE VARIANT
  // ========================================

  const handleDeleteVariant = async (
    variant
  ) => {
    const variantName =
      variant.name ??
      variant.variant_name ??
      variant.title ??
      "Variant";

    const confirmed =
      window.confirm(
        `Apakah kamu yakin ingin menghapus variant "${variantName}"?`
      );

    if (!confirmed) return;

    try {
      setDeletingId(variant.id);

      await deleteVariant(
        variant.id
      );

      await loadData();

      alert(
        "Variant berhasil dihapus."
      );
    } catch (error) {
      console.error(
        "Gagal menghapus variant:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Variant gagal dihapus."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="variant-page">

      <AdminSidebar />

      <main className="variant-main">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="variant-header">

          <div>
            <h1>
              Variant Menu
            </h1>

            <p>
              Kelola pilihan variant
              untuk menu restoran.
            </p>
          </div>

          <button
            type="button"
            className="variant-add-button"
            onClick={
              handleOpenAddModal
            }
          >
            + Tambah Variant
          </button>

        </div>

        {/* ========================================
            STATISTIK
        ======================================== */}

        <div className="variant-stats">

          <div className="variant-stat-card">

            <div className="variant-stat-icon">
              ◇
            </div>

            <div>
              <span>
                Total Variant
              </span>

              <strong>
                {totalVariants}
              </strong>
            </div>

          </div>

          <div className="variant-stat-card">

            <div className="variant-stat-icon">
              ▦
            </div>

            <div>
              <span>
                Menu Memiliki Variant
              </span>

              <strong>
                {totalMenusWithVariant}
              </strong>
            </div>

          </div>

          <div className="variant-stat-card">

            <div className="variant-stat-icon">
              ★
            </div>

            <div>
              <span>
                Variant Terbanyak
              </span>

              <strong
                style={{
                  fontSize:
                    "16px",
                  maxWidth:
                    "150px",
                  overflow:
                    "hidden",
                  textOverflow:
                    "ellipsis",
                  whiteSpace:
                    "nowrap",
                }}
              >
                {popularVariant}
              </strong>
            </div>

          </div>

        </div>

        {/* ========================================
            FILTER
        ======================================== */}

        <div className="variant-filter-card">

          <div className="variant-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Cari variant atau menu..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>

          <select
            value={menuFilter}
            onChange={(event) =>
              setMenuFilter(
                event.target.value
              )
            }
          >

            <option value="all">
              Semua Menu
            </option>

            {menus.map(
              (menu) => (
                <option
                  key={menu.id}
                  value={menu.id}
                >
                  {menu.name}
                </option>
              )
            )}

          </select>

        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="variant-content-grid">

          {/* ========================================
              TABLE
          ======================================== */}

          <div className="variant-table-card">

            <div className="variant-card-header">

              <div>

                <h2>
                  Daftar Variant
                </h2>

                <p>
                  Menampilkan{" "}
                  {
                    filteredVariants.length
                  }{" "}
                  variant
                </p>

              </div>

            </div>

            {loading ? (

              <div className="variant-loading">
                Memuat data variant...
              </div>

            ) : filteredVariants.length ===
              0 ? (

              <div className="variant-empty">

                <div className="variant-empty-icon">
                  ◇
                </div>

                <h3>
                  Belum ada variant
                </h3>

                <p>
                  Tambahkan variant
                  untuk menu restoran.
                </p>

              </div>

            ) : (

              <div className="variant-table-wrapper">

                <table className="variant-table">

                  <thead>

                    <tr>

                      <th>
                        VARIANT
                      </th>

                      <th>
                        MENU
                      </th>

                      <th>
                        HARGA
                      </th>

                      <th>
                        AKSI
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredVariants.map(
                      (variant) => {

                        const variantName =
                          variant.name ??
                          variant.variant_name ??
                          variant.title ??
                          "-";

                        const price =
                          Number(
                            variant.price ??
                              variant.additional_price ??
                              variant.extra_price ??
                              0
                          );

                        return (

                          <tr
                            key={
                              variant.id
                            }
                          >

                            <td>

                              <div className="variant-name-cell">

                                <div className="variant-name-icon">
                                  ◇
                                </div>

                                <div>

                                  <strong>
                                    {
                                      variantName
                                    }
                                  </strong>

                                  <small>
                                    Urutan{" "}
                                    {
                                      variant.sort_order ??
                                      0
                                    }
                                  </small>

                                </div>

                              </div>

                            </td>

                            <td>

                              <span className="variant-menu-name">
                                {
                                  variant.menu_name ??
                                  "-"
                                }
                              </span>

                            </td>

                            <td>
                              Rp{" "}
                              {price.toLocaleString(
                                "id-ID"
                              )}
                            </td>

                            <td>

                              <div className="variant-action-buttons">

                                <button
                                  type="button"
                                  className="variant-edit-button"
                                  onClick={() =>
                                    handleOpenEditModal(
                                      variant
                                    )
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="variant-delete-button"
                                  disabled={
                                    deletingId ===
                                    variant.id
                                  }
                                  onClick={() =>
                                    handleDeleteVariant(
                                      variant
                                    )
                                  }
                                >
                                  {deletingId ===
                                  variant.id
                                    ? "..."
                                    : "Hapus"}
                                </button>

                              </div>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* ========================================
              DISTRIBUSI
          ======================================== */}

          <div className="variant-distribution-card">

            <div className="variant-card-header">

              <div>

                <h2>
                  Distribusi Variant
                </h2>

                <p>
                  Jumlah variant setiap menu
                </p>

              </div>

            </div>

            <div className="variant-distribution-list">

              {menus.length === 0 ? (

                <div className="variant-no-menu">
                  Belum ada menu.
                </div>

              ) : (

                menus.map(
                  (menu) => {

                    const count =
                      variants.filter(
                        (variant) =>
                          Number(
                            variant.menu_id
                          ) ===
                          Number(
                            menu.id
                          )
                      ).length;

                    const maxCount =
                      Math.max(
                        ...menus.map(
                          (item) =>
                            variants.filter(
                              (variant) =>
                                Number(
                                  variant.menu_id
                                ) ===
                                Number(
                                  item.id
                                )
                            ).length
                        ),
                        1
                      );

                    const percentage =
                      (count /
                        maxCount) *
                      100;

                    return (

                      <div
                        className="variant-distribution-item"
                        key={
                          menu.id
                        }
                      >

                        <div className="variant-distribution-info">

                          <span>
                            {
                              menu.name
                            }
                          </span>

                          <strong>
                            {count}
                          </strong>

                        </div>

                        <div className="variant-progress">

                          <div
                            className="variant-progress-bar"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    );
                  }
                )

              )}

            </div>

          </div>

        </div>

      </main>

      {/* ========================================
          MODAL TAMBAH VARIANT
      ======================================== */}

      {showAddModal && (

        <div className="variant-modal-overlay">

          <div className="variant-modal">

            <div className="variant-modal-header">

              <div>

                <h3>
                  Tambah Variant
                </h3>

                <p>
                  Tambahkan pilihan
                  variant untuk menu.
                </p>

              </div>

              <button
                type="button"
                className="variant-modal-close"
                onClick={
                  handleCloseAddModal
                }
                disabled={
                  saving
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                handleAddVariant
              }
            >

              {formError && (

                <div className="variant-form-error">
                  {formError}
                </div>

              )}

              {/* MENU */}

              <div className="variant-form-group">

                <label>
                  Menu
                </label>

                <select
                  name="menu_id"
                  value={
                    addForm.menu_id
                  }
                  onChange={
                    handleAddChange
                  }
                  required
                >

                  <option value="">
                    Pilih menu
                  </option>

                  {menus.map(
                    (menu) => (

                      <option
                        key={
                          menu.id
                        }
                        value={
                          menu.id
                        }
                      >
                        {menu.name}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* NAMA */}

              <div className="variant-form-group">

                <label>
                  Nama Variant
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    addForm.name
                  }
                  onChange={
                    handleAddChange
                  }
                  placeholder="Contoh: Level 1"
                  required
                />

              </div>

              {/* HARGA DAN URUTAN */}

              <div className="variant-form-row">

                <div className="variant-form-group">

                  <label>
                    Harga Tambahan
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={
                      addForm.price
                    }
                    onChange={
                      handleAddChange
                    }
                    placeholder="0"
                    min="0"
                    required
                  />

                  <small>
                    Isi 0 jika tidak
                    ada tambahan harga.
                  </small>

                </div>

                <div className="variant-form-group">

                  <label>
                    Urutan
                  </label>

                  <input
                    type="number"
                    name="sort_order"
                    value={
                      addForm.sort_order
                    }
                    onChange={
                      handleAddChange
                    }
                    min="0"
                  />

                </div>

              </div>

              {/* ACTION */}

              <div className="variant-modal-actions">

                <button
                  type="button"
                  className="variant-btn-cancel"
                  onClick={
                    handleCloseAddModal
                  }
                  disabled={
                    saving
                  }
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="variant-btn-save"
                  disabled={
                    saving
                  }
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Variant"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ========================================
          MODAL EDIT VARIANT
      ======================================== */}

      {showEditModal &&
        editingVariant && (

          <div className="variant-modal-overlay">

            <div className="variant-modal">

              <div className="variant-modal-header">

                <div>

                  <h3>
                    Edit Variant
                  </h3>

                  <p>
                    Perbarui informasi
                    variant menu.
                  </p>

                </div>

                <button
                  type="button"
                  className="variant-modal-close"
                  onClick={
                    handleCloseEditModal
                  }
                  disabled={
                    editSaving
                  }
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={
                  handleEditVariant
                }
              >

                {editError && (

                  <div className="variant-form-error">
                    {editError}
                  </div>

                )}

                {/* NAMA */}

                <div className="variant-form-group">

                  <label>
                    Nama Variant
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      editForm.name
                    }
                    onChange={
                      handleEditChange
                    }
                    required
                  />

                </div>

                {/* HARGA DAN URUTAN */}

                <div className="variant-form-row">

                  <div className="variant-form-group">

                    <label>
                      Harga Tambahan
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={
                        editForm.price
                      }
                      onChange={
                        handleEditChange
                      }
                      min="0"
                      required
                    />

                  </div>

                  <div className="variant-form-group">

                    <label>
                      Urutan
                    </label>

                    <input
                      type="number"
                      name="sort_order"
                      value={
                        editForm.sort_order
                      }
                      onChange={
                        handleEditChange
                      }
                      min="0"
                    />

                  </div>

                </div>

                {/* ACTION */}

                <div className="variant-modal-actions">

                  <button
                    type="button"
                    className="variant-btn-cancel"
                    onClick={
                      handleCloseEditModal
                    }
                    disabled={
                      editSaving
                    }
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="variant-btn-save"
                    disabled={
                      editSaving
                    }
                  >
                    {editSaving
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

export default VariantPage;