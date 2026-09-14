import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getMenus } from '../../services/menuService';
import { getCategories } from '../../services/categoryService';
import { getTableByCode } from '../../services/tableService';

import MenuCard from '../../components/customer/MenuCard';

function MenuPage() {
  const [searchParams] = useSearchParams();

  const tableCode = searchParams.get('table');

  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState('all');

  const [search, setSearch] = useState('');

  const [table, setTable] = useState(null);
  const [tableLoading, setTableLoading] =
    useState(false);
  const [tableError, setTableError] =
    useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* =========================
     AMBIL MENU & KATEGORI
  ========================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuData, categoryData] =
          await Promise.all([
            getMenus(),
            getCategories(),
          ]);

        console.log('Data menu:', menuData);
        console.log('Data kategori:', categoryData);

        if (Array.isArray(menuData)) {
          setMenus(menuData);
        } else if (
          menuData?.data &&
          Array.isArray(menuData.data)
        ) {
          setMenus(menuData.data);
        }

        if (Array.isArray(categoryData)) {
          setCategories(categoryData);
        } else if (
          categoryData?.data &&
          Array.isArray(categoryData.data)
        ) {
          setCategories(categoryData.data);
        }
      } catch (err) {
        console.error(
          'Gagal mengambil data:',
          err
        );

        setError(
          'Gagal mengambil data menu atau kategori.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     CEK MEJA DARI QR
  ========================= */

  useEffect(() => {
    const fetchTable = async () => {
      if (!tableCode) {
        setTable(null);
        setTableError('');

        localStorage.removeItem(
          'restaurantTable'
        );

        return;
      }

      try {
        setTableLoading(true);
        setTableError('');

        const tableData =
          await getTableByCode(
            'hoshi-ramen',
            tableCode
          );

        console.log(
          'Data meja:',
          tableData
        );

        const tableResult =
          tableData?.table ||
          tableData?.data ||
          tableData;

        setTable(tableResult);

        localStorage.setItem(
          'restaurantTable',
          JSON.stringify(tableResult)
        );

        console.log(
          'Data meja disimpan:',
          tableResult
        );
      } catch (err) {
        console.error(
          'Gagal mengambil data meja:',
          err
        );

        setTable(null);

        setTableError(
          'Kode meja tidak ditemukan.'
        );

        localStorage.removeItem(
          'restaurantTable'
        );
      } finally {
        setTableLoading(false);
      }
    };

    fetchTable();
  }, [tableCode]);

  /* =========================
     FILTER MENU
  ========================= */

  const filteredMenus = menus.filter(
    (menu) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        Number(menu.category_id) ===
          Number(selectedCategory);

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        menu.name
          ?.toLowerCase()
          .includes(searchText) ||
        menu.description
          ?.toLowerCase()
          .includes(searchText);

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-danger mb-3">
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="text-muted mb-0">
          Memuat menu...
        </p>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="menu-page">

      {/* =========================
          HEADER RESTORAN
      ========================= */}

      <section className="menu-header">
        <div className="container">

          <div className="menu-header-content">

            <div>
              <p className="menu-header-label">
                WELCOME TO
              </p>

              <h1 className="menu-header-title">
                Hoshi Ramen
              </h1>

              <p className="menu-header-subtitle">
                Pilih menu favoritmu 🍜
              </p>
            </div>

            {table && (
              <div className="table-badge">
                <span className="table-badge-label">
                  MEJA
                </span>

                <strong>
                  {table.name}
                </strong>
              </div>
            )}

          </div>

          {/* CEK MEJA */}

          {tableLoading && (
            <div className="table-status">
              Memeriksa meja...
            </div>
          )}

          {tableError && (
            <div className="table-error">
              {tableError}
            </div>
          )}

          {!tableCode && (
            <div className="table-warning">
              Silakan scan QR Code meja untuk
              memulai pemesanan.
            </div>
          )}

        </div>
      </section>

      {/* =========================
          MENU CONTENT
      ========================= */}

      <section className="menu-content">
        <div className="container">

          {/* SEARCH */}

          <div className="menu-search">
            <span className="menu-search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Cari menu..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* =========================
              KATEGORI
          ========================= */}

          <div className="menu-category-wrapper">

            <button
              className={`menu-category ${
                selectedCategory === 'all'
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setSelectedCategory('all')
              }
            >
              Semua
            </button>

            {categories.map(
              (category) => (
                <button
                  key={category.id}
                  className={`menu-category ${
                    Number(
                      selectedCategory
                    ) === Number(category.id)
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      category.id
                    )
                  }
                >
                  {category.name}
                </button>
              )
            )}

          </div>

          {/* =========================
              JUDUL MENU
          ========================= */}

          <div className="menu-section-header">
            <div>
              <p className="menu-section-label">
                OUR MENU
              </p>

              <h2>
                Pilihan Menu
              </h2>
            </div>

            <span className="menu-count">
              {filteredMenus.length} menu
            </span>
          </div>

          {/* =========================
              DAFTAR MENU
          ========================= */}

          {filteredMenus.length > 0 ? (
            <div className="row g-3 g-md-4">

              {filteredMenus.map(
                (menu) => (
                  <div
                    className="col-12 col-sm-6 col-lg-4"
                    key={menu.id}
                  >
                    <MenuCard
                      menu={menu}
                    />
                  </div>
                )
              )}

            </div>
          ) : (
            <div className="menu-empty">
              <div className="menu-empty-icon">
                🍜
              </div>

              <h3>
                Menu tidak ditemukan
              </h3>

              <p>
                Coba gunakan kata kunci lain
                atau pilih kategori yang berbeda.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default MenuPage;