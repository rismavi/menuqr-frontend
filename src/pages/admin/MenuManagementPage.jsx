import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

import {
  getAdminMenus,
  deleteMenu,
} from "../../services/menuService";

import { getCategories } from "../../services/categoryService";
import { getRestaurants } from "../../services/restaurantService";

function MenuManagementPage() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [menuResponse, categoryResponse, restaurantResponse] =
        await Promise.all([
          getAdminMenus(),
          getCategories(),
          getRestaurants(),
        ]);

      setMenus(
        Array.isArray(menuResponse)
          ? menuResponse
          : menuResponse?.data || []
      );

      setCategories(
        Array.isArray(categoryResponse)
          ? categoryResponse
          : categoryResponse?.data || []
      );

      setRestaurants(
        Array.isArray(restaurantResponse)
          ? restaurantResponse
          : restaurantResponse?.data || []
      );
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Gagal mengambil data menu. Pastikan backend Laravel sedang berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (menu) => {
    if (menu.category?.name) {
      return menu.category.name;
    }

    const category = categories.find(
      (item) => item.id === menu.category_id
    );

    return category?.name || "-";
  };

  const getRestaurantName = (menu) => {
    if (menu.restaurant?.name) {
      return menu.restaurant.name;
    }

    const restaurant = restaurants.find(
      (item) => item.id === menu.restaurant_id
    );

    return restaurant?.name || "-";
  };

  const filteredMenus = useMemo(() => {
    return menus.filter((menu) => {
      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        !keyword ||
        menu.name?.toLowerCase().includes(keyword) ||
        menu.description?.toLowerCase().includes(keyword) ||
        menu.slug?.toLowerCase().includes(keyword);

      const matchesCategory =
        !categoryFilter ||
        String(menu.category_id) === String(categoryFilter);

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "available" && menu.is_available) ||
        (statusFilter === "unavailable" && !menu.is_available);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [menus, search, categoryFilter, statusFilter]);

  const totalMenus = menus.length;

  const availableMenus = menus.filter(
    (menu) => menu.is_available
  ).length;

  const unavailableMenus = menus.filter(
    (menu) => !menu.is_available
  ).length;

  const totalCategories = categories.length;

  const categoryComposition = useMemo(() => {
    const result = {};

    menus.forEach((menu) => {
      const categoryName = getCategoryName(menu);

      if (!result[categoryName]) {
        result[categoryName] = 0;
      }

      result[categoryName]++;
    });

    return Object.entries(result)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [menus, categories]);

  const handleDelete = async (menu) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus menu "${menu.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMenu(menu.id);

      setMenus((currentMenus) =>
        currentMenus.filter((item) => item.id !== menu.id)
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Gagal menghapus menu."
      );
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price || 0);
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main menu-management-page">
          <div className="admin-loading">
            <div className="admin-loading-spinner"></div>
            <p>Memuat data menu...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main menu-management-page">

        {/* ================= HEADER ================= */}
        <section className="menu-page-header">
          <div>
            <span className="menu-page-eyebrow">
              MENU MANAGEMENT
            </span>

            <h1>Manajemen Menu</h1>

            <p>
              Kelola seluruh menu restaurant dari satu tempat.
            </p>
          </div>

          <button
            type="button"
            className="menu-add-button"
            onClick={() => alert("Form tambah menu akan dibuat selanjutnya.")}
          >
            <span>+</span>
            Tambah Menu
          </button>
        </section>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="menu-error">
            <strong>Terjadi kesalahan</strong>
            <span>{error}</span>
          </div>
        )}

        {/* ================= STATISTICS ================= */}
        <section className="menu-stat-grid">

          <div className="menu-stat-card">
            <div className="menu-stat-icon bowl-icon">
              🍜
            </div>

            <div className="menu-stat-content">
              <span>Total Menu</span>
              <strong>{totalMenus}</strong>
              <small>Semua menu</small>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon check-icon">
              ✓
            </div>

            <div className="menu-stat-content">
              <span>Tersedia</span>
              <strong>{availableMenus}</strong>
              <small>Menu aktif</small>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon warning-icon">
              !
            </div>

            <div className="menu-stat-content">
              <span>Habis</span>
              <strong>{unavailableMenus}</strong>
              <small>Tidak tersedia</small>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-icon category-icon">
              ◈
            </div>

            <div className="menu-stat-content">
              <span>Kategori</span>
              <strong>{totalCategories}</strong>
              <small>Kategori menu</small>
            </div>
          </div>

        </section>

        {/* ================= FILTER ================= */}
        <section className="menu-filter-card">

          <div className="menu-search-box">
            <span className="menu-search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Cari nama atau deskripsi menu..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="">Semua Kategori</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="unavailable">Habis</option>
          </select>

        </section>

        {/* ================= MENU TABLE ================= */}
        <section className="menu-list-card">

          <div className="menu-list-header">
            <div>
              <span className="menu-list-eyebrow">
                MENU LIST
              </span>

              <h2>Daftar Menu</h2>
            </div>

            <span className="menu-count-badge">
              {filteredMenus.length} menu
            </span>
          </div>

          <div className="menu-table-wrapper">
            <table className="menu-table">

              <thead>
                <tr>
                  <th>MENU</th>
                  <th>KATEGORI</th>
                  <th>HARGA</th>
                  <th>STATUS</th>
                  <th>RESTAURANT</th>
                  <th>AKSI</th>
                </tr>
              </thead>

              <tbody>
                {filteredMenus.length > 0 ? (
                  filteredMenus.map((menu) => (
                    <tr key={menu.id}>

                      {/* MENU */}
                      <td>
                        <div className="menu-info">

                          {menu.image_url ? (
                            <img
                              src={menu.image_url}
                              alt={menu.name}
                              className="menu-image"
                            />
                          ) : (
                            <div className="menu-image-placeholder">
                              🍜
                            </div>
                          )}

                          <div className="menu-info-text">
                            <strong>
                              {menu.name}
                            </strong>

                            <span>
                              {menu.slug || "-"}
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* KATEGORI */}
                      <td>
                        <span className="category-badge">
                          {getCategoryName(menu)}
                        </span>
                      </td>

                      {/* HARGA */}
                      <td>
                        <strong className="menu-price">
                          Rp {formatPrice(menu.price)}
                        </strong>
                      </td>

                      {/* STATUS */}
                      <td>
                        {menu.is_available ? (
                          <span className="status-badge status-available">
                            <span className="status-dot"></span>
                            Tersedia
                          </span>
                        ) : (
                          <span className="status-badge status-unavailable">
                            <span className="status-dot"></span>
                            Habis
                          </span>
                        )}
                      </td>

                      {/* RESTAURANT */}
                      <td>
                        <span className="restaurant-name">
                          {getRestaurantName(menu)}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td>
                        <div className="menu-actions">

                          <button
                            type="button"
                            className="menu-edit-button"
                            onClick={() =>
                              alert(
                                `Edit menu "${menu.name}" akan dibuat selanjutnya.`
                              )
                            }
                          >
                            <span>✎</span>
                            Edit
                          </button>

                          <button
                            type="button"
                            className="menu-delete-button"
                            onClick={() =>
                              handleDelete(menu)
                            }
                          >
                            <span>♜</span>
                            Hapus
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="menu-empty-state">
                        <div className="menu-empty-icon">
                          🍜
                        </div>

                        <h3>Menu tidak ditemukan</h3>

                        <p>
                          Tidak ada menu yang sesuai
                          dengan pencarian atau filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </section>

        {/* ================= BOTTOM INFORMATION ================= */}
        <section className="menu-bottom-grid">

          {/* CATEGORY COMPOSITION */}
          <div className="menu-bottom-card">

            <div className="menu-bottom-header">
              <div>
                <span>KATEGORI</span>
                <h3>Komposisi Menu</h3>
              </div>
            </div>

            {categoryComposition.length > 0 ? (
              <div className="category-composition">

                {categoryComposition.map(
                  ([categoryName, total]) => {
                    const percentage =
                      totalMenus > 0
                        ? (total / totalMenus) * 100
                        : 0;

                    return (
                      <div
                        className="composition-item"
                        key={categoryName}
                      >
                        <div className="composition-top">
                          <span>{categoryName}</span>
                          <strong>{total}</strong>
                        </div>

                        <div className="composition-bar">
                          <div
                            className="composition-bar-fill"
                            style={{
                              width: `${percentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  }
                )}

              </div>
            ) : (
              <div className="small-empty">
                Belum ada data kategori.
              </div>
            )}

          </div>

          {/* QUICK SUMMARY */}
          <div className="menu-bottom-card">

            <div className="menu-bottom-header">
              <div>
                <span>OVERVIEW</span>
                <h3>Ringkasan Menu</h3>
              </div>
            </div>

            <div className="menu-overview">

              <div className="overview-row">
                <span>Total menu</span>
                <strong>{totalMenus}</strong>
              </div>

              <div className="overview-row">
                <span>Menu tersedia</span>
                <strong>{availableMenus}</strong>
              </div>

              <div className="overview-row">
                <span>Menu habis</span>
                <strong>{unavailableMenus}</strong>
              </div>

              <div className="overview-row">
                <span>Kategori</span>
                <strong>{totalCategories}</strong>
              </div>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default MenuManagementPage;