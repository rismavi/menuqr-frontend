import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  getCategories,
  createCategory,
  updateCategory,
} from "../../services/categoryService";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // TAMBAH KATEGORI
  // =========================

  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    restaurant_id: 4,
    name: "",
    slug: "",
    description: "",
    is_active: true,
    sort_order: 0,
  });

  // =========================
  // EDIT KATEGORI
  // =========================

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const [editFormData, setEditFormData] = useState({
    restaurant_id: 4,
    name: "",
    slug: "",
    description: "",
    is_active: true,
    sort_order: 0,
  });

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      console.log("Data kategori:", response);

      const categoryData = Array.isArray(response)
        ? response
        : response?.data || [];

      setCategories(categoryData);
    } catch (error) {
      console.error(
        "Gagal mengambil kategori:",
        error
      );

      alert("Gagal mengambil data kategori.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLE FORM TAMBAH
  // =========================

  const handleFormChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setFormData((currentData) => ({
        ...currentData,
        name: value,
        slug: generatedSlug,
      }));

      return;
    }

    setFormData((currentData) => ({
      ...currentData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================
  // HANDLE FORM EDIT
  // =========================

  const handleEditFormChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      setEditFormData((currentData) => ({
        ...currentData,
        name: value,
        slug: generatedSlug,
      }));

      return;
    }

    setEditFormData((currentData) => ({
      ...currentData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================
  // BUKA MODAL TAMBAH
  // =========================

  const handleOpenAddModal = () => {
    setFormData({
      restaurant_id: 4,
      name: "",
      slug: "",
      description: "",
      is_active: true,
      sort_order:
        categories.length + 1,
    });

    setFormError("");
    setShowAddModal(true);
  };

  // =========================
  // TUTUP MODAL TAMBAH
  // =========================

  const handleCloseAddModal = () => {
    if (saving) return;

    setShowAddModal(false);
    setFormError("");
  };

  // =========================
  // SIMPAN KATEGORI BARU
  // =========================

  const handleCreateCategory = async (
    event
  ) => {
    event.preventDefault();

    setFormError("");

    if (!formData.name.trim()) {
      setFormError(
        "Nama kategori wajib diisi."
      );
      return;
    }

    if (!formData.slug.trim()) {
      setFormError(
        "Slug kategori wajib diisi."
      );
      return;
    }

    try {
      setSaving(true);

      const categoryData = {
        restaurant_id: Number(
          formData.restaurant_id
        ),
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description:
          formData.description.trim(),
        is_active: Boolean(
          formData.is_active
        ),
        sort_order: Number(
          formData.sort_order
        ),
      };

      console.log(
        "Data kategori yang dikirim:",
        categoryData
      );

      await createCategory(
        categoryData
      );

      setShowAddModal(false);

      setFormData({
        restaurant_id: 4,
        name: "",
        slug: "",
        description: "",
        is_active: true,
        sort_order: 0,
      });

      await loadCategories();

      alert(
        "Kategori berhasil ditambahkan."
      );
    } catch (error) {
      console.error(
        "Gagal menambahkan kategori:",
        error
      );

      if (
        error.response?.data?.errors
      ) {
        const errors =
          error.response.data.errors;

        const firstError =
          Object.values(errors)
            .flat()
            .find(Boolean);

        setFormError(
          firstError ||
            "Data kategori tidak valid."
        );
      } else if (
        error.response?.data?.message
      ) {
        setFormError(
          error.response.data.message
        );
      } else {
        setFormError(
          "Gagal menambahkan kategori. Silakan coba lagi."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // BUKA MODAL EDIT
  // =========================

  const handleOpenEditModal = (
    category
  ) => {
    setEditingCategory(category);

    setEditFormData({
      restaurant_id:
        category.restaurant_id ??
        category.restaurant?.id ??
        4,
      name: category.name || "",
      slug: category.slug || "",
      description:
        category.description || "",
      is_active:
        category.is_active === true ||
        category.is_active === 1 ||
        category.is_active === "1",
      sort_order:
        category.sort_order ??
        category.order ??
        0,
    });

    setEditError("");
    setShowEditModal(true);
  };

  // =========================
  // TUTUP MODAL EDIT
  // =========================

  const handleCloseEditModal = () => {
    if (editSaving) return;

    setShowEditModal(false);
    setEditingCategory(null);
    setEditError("");
  };

  // =========================
  // UPDATE KATEGORI
  // =========================

  const handleUpdateCategory = async (
    event
  ) => {
    event.preventDefault();

    setEditError("");

    if (!editingCategory) {
      setEditError(
        "Kategori yang akan diedit tidak ditemukan."
      );
      return;
    }

    if (!editFormData.name.trim()) {
      setEditError(
        "Nama kategori wajib diisi."
      );
      return;
    }

    if (!editFormData.slug.trim()) {
      setEditError(
        "Slug kategori wajib diisi."
      );
      return;
    }

    try {
      setEditSaving(true);

      const categoryData = {
        restaurant_id: Number(
          editFormData.restaurant_id
        ),
        name: editFormData.name.trim(),
        slug: editFormData.slug.trim(),
        description:
          editFormData.description.trim(),
        is_active: Boolean(
          editFormData.is_active
        ),
        sort_order: Number(
          editFormData.sort_order
        ),
      };

      console.log(
        "Data kategori yang diperbarui:",
        categoryData
      );

      await updateCategory(
        editingCategory.id,
        categoryData
      );

      setShowEditModal(false);
      setEditingCategory(null);

      await loadCategories();

      alert(
        "Kategori berhasil diperbarui."
      );
    } catch (error) {
      console.error(
        "Gagal memperbarui kategori:",
        error
      );

      if (
        error.response?.data?.errors
      ) {
        const errors =
          error.response.data.errors;

        const firstError =
          Object.values(errors)
            .flat()
            .find(Boolean);

        setEditError(
          firstError ||
            "Data kategori tidak valid."
        );
      } else if (
        error.response?.data?.message
      ) {
        setEditError(
          error.response.data.message
        );
      } else {
        setEditError(
          "Gagal memperbarui kategori. Silakan coba lagi."
        );
      }
    } finally {
      setEditSaving(false);
    }
  };

  // =========================
  // DATA STATISTIK
  // =========================

  const totalCategories =
    categories.length;

  const activeCategories =
    categories.filter(
      (category) =>
        category.is_active === true ||
        category.is_active === 1 ||
        category.is_active === "1"
    ).length;

  const inactiveCategories =
    totalCategories -
    activeCategories;

  const getMenuCount = (
    category
  ) => {
    return Number(
      category.menus_count ??
        category.total_menu ??
        category.totalMenu ??
        category.menus?.length ??
        0
    );
  };

  const totalMenus =
    categories.reduce(
      (total, category) =>
        total +
        getMenuCount(category),
      0
    );

  const categoryWithMostMenus =
    [...categories].sort(
      (a, b) =>
        getMenuCount(b) -
        getMenuCount(a)
    )[0];

  const mostMenusCount =
    categoryWithMostMenus
      ? getMenuCount(
          categoryWithMostMenus
        )
      : 0;

  const getCategoryStatus = (
    category
  ) => {
    const active =
      category.is_active === true ||
      category.is_active === 1 ||
      category.is_active === "1";

    return active
      ? "Aktif"
      : "Nonaktif";
  };

  const getCategoryOrder = (
    category,
    index
  ) => {
    return (
      category.sort_order ??
      category.order ??
      index + 1
    );
  };

  return (
    <div
      className="admin-layout"
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f7f5f6",
      }}
    >
      {/* =========================
          SIDEBAR
      ========================= */}

      <AdminSidebar />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main
        style={{
          marginLeft: "240px",
          width:
            "calc(100% - 240px)",
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
            justifyContent:
              "space-between",
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
              Kategori
            </h1>

            <p
              style={{
                margin:
                  "8px 0 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              Kelola kategori menu
              Hoshi Ramen.
            </p>
          </div>

          <button
            type="button"
            onClick={
              handleOpenAddModal
            }
            style={{
              border: "none",
              backgroundColor:
                "#8f2638",
              color: "#ffffff",
              padding:
                "12px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Tambah Kategori
          </button>
        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (
          <div
            style={{
              backgroundColor:
                "#ffffff",
              border:
                "1px solid #eee",
              borderRadius:
                "14px",
              padding: "50px",
              textAlign:
                "center",
              color: "#777",
              marginBottom:
                "24px",
            }}
          >
            Memuat data
            kategori...
          </div>
        ) : (
          <>
            {/* =========================
                STATISTICS
            ========================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4, 1fr)",
                gap: "20px",
                marginBottom:
                  "24px",
              }}
            >
              <div
                style={
                  statCardStyle
                }
              >
                <span
                  style={
                    statLabelStyle
                  }
                >
                  Total Kategori
                </span>

                <h2
                  style={
                    statValueStyle
                  }
                >
                  {totalCategories}
                </h2>

                <span
                  style={
                    statDescriptionStyle
                  }
                >
                  Semua kategori
                  menu
                </span>
              </div>

              <div
                style={
                  statCardStyle
                }
              >
                <span
                  style={
                    statLabelStyle
                  }
                >
                  Kategori Aktif
                </span>

                <h2
                  style={{
                    ...statValueStyle,
                    color:
                      "#4f8a62",
                  }}
                >
                  {activeCategories}
                </h2>

                <span
                  style={
                    statDescriptionStyle
                  }
                >
                  Sedang digunakan
                </span>
              </div>

              <div
                style={
                  statCardStyle
                }
              >
                <span
                  style={
                    statLabelStyle
                  }
                >
                  Total Menu
                </span>

                <h2
                  style={
                    statValueStyle
                  }
                >
                  {totalMenus}
                </h2>

                <span
                  style={
                    statDescriptionStyle
                  }
                >
                  Dari semua kategori
                </span>
              </div>

              <div
                style={
                  statCardStyle
                }
              >
                <span
                  style={
                    statLabelStyle
                  }
                >
                  Kategori Terbanyak
                </span>

                <h2
                  style={{
                    ...statValueStyle,
                    fontSize:
                      "22px",
                  }}
                >
                  {categoryWithMostMenus?.name ||
                    "-"}
                </h2>

                <span
                  style={
                    statDescriptionStyle
                  }
                >
                  {mostMenusCount}{" "}
                  menu
                </span>
              </div>
            </div>

            {/* =========================
                CATEGORY LIST + INFO
            ========================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 1fr",
                gap: "24px",
              }}
            >
              {/* CATEGORY LIST */}

              <div
                style={{
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px solid #eee",
                  borderRadius:
                    "14px",
                  overflow:
                    "hidden",
                }}
              >
                <div
                  style={{
                    padding:
                      "20px 22px",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize:
                        "18px",
                      fontWeight:
                        "700",
                      color:
                        "#211b1d",
                    }}
                  >
                    Daftar Kategori
                  </h2>

                  <p
                    style={{
                      margin:
                        "6px 0 0",
                      fontSize:
                        "12px",
                      color:
                        "#888",
                    }}
                  >
                    Kategori yang
                    tersedia pada
                    restoran.
                  </p>
                </div>

                {categories.length ===
                0 ? (
                  <div
                    style={{
                      padding:
                        "40px",
                      textAlign:
                        "center",
                      color:
                        "#888",
                      fontSize:
                        "13px",
                    }}
                  >
                    Belum ada
                    kategori.
                  </div>
                ) : (
                  <div
                    style={{
                      overflowX:
                        "auto",
                    }}
                  >
                    <table
                      style={{
                        width:
                          "100%",
                        borderCollapse:
                          "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor:
                              "#faf9f9",
                            textAlign:
                              "left",
                          }}
                        >
                          <th
                            style={
                              tableHeaderStyle
                            }
                          >
                            Kategori
                          </th>

                          <th
                            style={
                              tableHeaderStyle
                            }
                          >
                            Jumlah Menu
                          </th>

                          <th
                            style={
                              tableHeaderStyle
                            }
                          >
                            Status
                          </th>

                          <th
                            style={{
                              ...tableHeaderStyle,
                              textAlign:
                                "center",
                            }}
                          >
                            Urutan
                          </th>

                          <th
                            style={{
                              ...tableHeaderStyle,
                              textAlign:
                                "center",
                            }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {categories.map(
                          (
                            category,
                            index
                          ) => {
                            const status =
                              getCategoryStatus(
                                category
                              );

                            const menuCount =
                              getMenuCount(
                                category
                              );

                            const order =
                              getCategoryOrder(
                                category,
                                index
                              );

                            return (
                              <tr
                                key={
                                  category.id
                                }
                              >
                                <td
                                  style={
                                    tableCellStyle
                                  }
                                >
                                  <div
                                    style={{
                                      display:
                                        "flex",
                                      alignItems:
                                        "center",
                                      gap: "12px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width:
                                          "42px",
                                        height:
                                          "42px",
                                        borderRadius:
                                          "9px",
                                        backgroundColor:
                                          "#f4e8eb",
                                        display:
                                          "flex",
                                        alignItems:
                                          "center",
                                        justifyContent:
                                          "center",
                                        color:
                                          "#8f2638",
                                        fontWeight:
                                          "700",
                                        fontSize:
                                          "14px",
                                        flexShrink:
                                          0,
                                      }}
                                    >
                                      {category.name
                                        ?.charAt(
                                          0
                                        )
                                        ?.toUpperCase() ||
                                        "?"}
                                    </div>

                                    <div>
                                      <strong
                                        style={{
                                          display:
                                            "block",
                                          fontSize:
                                            "13px",
                                          color:
                                            "#211b1d",
                                        }}
                                      >
                                        {category.name ||
                                          "-"}
                                      </strong>

                                      <span
                                        style={{
                                          display:
                                            "block",
                                          marginTop:
                                            "3px",
                                          fontSize:
                                            "11px",
                                          color:
                                            "#999",
                                        }}
                                      >
                                        {category.description ||
                                          "Tidak ada deskripsi."}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td
                                  style={
                                    tableCellStyle
                                  }
                                >
                                  <strong
                                    style={{
                                      fontSize:
                                        "13px",
                                      color:
                                        "#211b1d",
                                    }}
                                  >
                                    {
                                      menuCount
                                    }
                                  </strong>

                                  <span
                                    style={{
                                      marginLeft:
                                        "4px",
                                      fontSize:
                                        "11px",
                                      color:
                                        "#999",
                                    }}
                                  >
                                    menu
                                  </span>
                                </td>

                                <td
                                  style={
                                    tableCellStyle
                                  }
                                >
                                  <span
                                    style={{
                                      display:
                                        "inline-block",
                                      padding:
                                        "6px 10px",
                                      borderRadius:
                                        "6px",
                                      backgroundColor:
                                        status ===
                                        "Aktif"
                                          ? "#e9f5ec"
                                          : "#f7e9ec",
                                      color:
                                        status ===
                                        "Aktif"
                                          ? "#4f8a62"
                                          : "#8f2638",
                                      fontSize:
                                        "10px",
                                      fontWeight:
                                        "600",
                                    }}
                                  >
                                    {status}
                                  </span>
                                </td>

                                <td
                                  style={{
                                    ...tableCellStyle,
                                    textAlign:
                                      "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize:
                                        "13px",
                                      color:
                                        "#555",
                                    }}
                                  >
                                    {order}
                                  </span>
                                </td>

                                <td
                                  style={{
                                    ...tableCellStyle,
                                    textAlign:
                                      "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display:
                                        "flex",
                                      justifyContent:
                                        "center",
                                      gap: "7px",
                                    }}
                                  >
                                    <button
                                      type="button"
                                      style={
                                        actionButtonStyle
                                      }
                                      onClick={() =>
                                        handleOpenEditModal(
                                          category
                                        )
                                      }
                                    >
                                      Edit
                                    </button>

                                    <button
                                      type="button"
                                      style={{
                                        ...actionButtonStyle,
                                        color:
                                          "#8f2638",
                                      }}
                                      onClick={() =>
                                        alert(
                                          "Fitur Hapus Kategori akan dibuat setelah fitur Edit berhasil."
                                        )
                                      }
                                    >
                                      Hapus
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

              {/* CATEGORY HIGHLIGHT */}

              <div
                style={{
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px solid #eee",
                  borderRadius:
                    "14px",
                  padding:
                    "22px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "18px",
                    fontWeight:
                      "700",
                    color:
                      "#211b1d",
                  }}
                >
                  Komposisi Kategori
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 22px",
                    fontSize:
                      "12px",
                    color:
                      "#888",
                  }}
                >
                  Distribusi menu
                  berdasarkan
                  kategori.
                </p>

                {categories.length ===
                0 ? (
                  <p
                    style={{
                      fontSize:
                        "12px",
                      color:
                        "#999",
                    }}
                  >
                    Belum ada data
                    kategori.
                  </p>
                ) : (
                  categories.map(
                    (category) => {
                      const menuCount =
                        getMenuCount(
                          category
                        );

                      const percentage =
                        totalMenus >
                        0
                          ? Math.round(
                              (menuCount /
                                totalMenus) *
                                100
                            )
                          : 0;

                      return (
                        <CategoryProgress
                          key={
                            category.id
                          }
                          name={
                            category.name ||
                            "-"
                          }
                          total={`${menuCount} menu`}
                          percentage={`${percentage}%`}
                        />
                      );
                    }
                  )
                )}

                <div
                  style={{
                    marginTop:
                      "25px",
                    padding:
                      "16px",
                    borderRadius:
                      "10px",
                    backgroundColor:
                      "#f7f5f6",
                  }}
                >
                  <span
                    style={{
                      fontSize:
                        "11px",
                      color:
                        "#888",
                    }}
                  >
                    Kategori dengan
                    menu terbanyak
                  </span>

                  <strong
                    style={{
                      display:
                        "block",
                      marginTop:
                        "5px",
                      fontSize:
                        "16px",
                      color:
                        "#211b1d",
                    }}
                  >
                    {categoryWithMostMenus?.name ||
                      "-"}
                  </strong>

                  <span
                    style={{
                      display:
                        "block",
                      marginTop:
                        "3px",
                      fontSize:
                        "11px",
                      color:
                        "#777",
                    }}
                  >
                    {totalMenus >
                    0
                      ? `${Math.round(
                          (mostMenusCount /
                            totalMenus) *
                            100
                        )}% dari seluruh menu`
                      : "Belum ada menu"}
                  </span>
                </div>
              </div>
            </div>

            {/* =========================
                CATEGORY INFORMATION
            ========================= */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "24px",
                marginTop:
                  "24px",
              }}
            >
              {/* STATUS KATEGORI */}

              <div
                style={{
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px solid #eee",
                  borderRadius:
                    "14px",
                  padding:
                    "22px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "17px",
                    color:
                      "#211b1d",
                  }}
                >
                  Status Kategori
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 18px",
                    fontSize:
                      "12px",
                    color:
                      "#888",
                  }}
                >
                  Kondisi kategori
                  yang digunakan
                  saat ini.
                </p>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    padding:
                      "13px 0",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <span
                    style={{
                      fontSize:
                        "13px",
                      color:
                        "#555",
                    }}
                  >
                    Kategori aktif
                  </span>

                  <strong
                    style={{
                      fontSize:
                        "15px",
                      color:
                        "#4f8a62",
                    }}
                  >
                    {activeCategories}
                  </strong>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                    padding:
                      "13px 0",
                  }}
                >
                  <span
                    style={{
                      fontSize:
                        "13px",
                      color:
                        "#555",
                    }}
                  >
                    Kategori nonaktif
                  </span>

                  <strong
                    style={{
                      fontSize:
                        "15px",
                      color:
                        "#8f2638",
                    }}
                  >
                    {inactiveCategories}
                  </strong>
                </div>
              </div>

              {/* PENGATURAN KATEGORI */}

              <div
                style={{
                  backgroundColor:
                    "#ffffff",
                  border:
                    "1px solid #eee",
                  borderRadius:
                    "14px",
                  padding:
                    "22px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize:
                      "17px",
                    color:
                      "#211b1d",
                  }}
                >
                  Pengaturan Kategori
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 18px",
                    fontSize:
                      "12px",
                    color:
                      "#888",
                  }}
                >
                  Gunakan kategori
                  untuk mengatur
                  tampilan menu
                  pelanggan.
                </p>

                <div
                  style={{
                    padding:
                      "15px",
                    borderRadius:
                      "10px",
                    backgroundColor:
                      "#f7f5f6",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "10px",
                      marginBottom:
                        "10px",
                    }}
                  >
                    <span
                      style={{
                        width:
                          "9px",
                        height:
                          "9px",
                        borderRadius:
                          "50%",
                        backgroundColor:
                          "#4f8a62",
                      }}
                    ></span>

                    <strong
                      style={{
                        fontSize:
                          "13px",
                        color:
                          "#211b1d",
                      }}
                    >
                      {inactiveCategories ===
                      0
                        ? "Semua kategori aktif"
                        : "Terdapat kategori nonaktif"}
                    </strong>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize:
                        "11px",
                      lineHeight:
                        "1.6",
                      color:
                        "#777",
                    }}
                  >
                    Kategori yang
                    aktif akan
                    ditampilkan pada
                    halaman menu
                    pelanggan.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* =========================
          MODAL TAMBAH KATEGORI
      ========================= */}

      {showAddModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor:
              "rgba(33, 27, 29, 0.45)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseAddModal();
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth:
                "520px",
              backgroundColor:
                "#ffffff",
              borderRadius:
                "16px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15)",
              overflow:
                "hidden",
            }}
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            <div
              style={{
                padding:
                  "22px 24px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize:
                    "10px",
                  fontWeight:
                    "700",
                  color:
                    "#8f2638",
                  letterSpacing:
                    "0.08em",
                }}
              >
                TAMBAH KATEGORI
              </span>

              <h2
                style={{
                  margin:
                    "6px 0 0",
                  fontSize:
                    "21px",
                  fontWeight:
                    "700",
                  color:
                    "#211b1d",
                }}
              >
                Tambah Kategori
              </h2>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  fontSize:
                    "12px",
                  color:
                    "#888",
                }}
              >
                Tambahkan kategori
                baru untuk menu
                restoran.
              </p>
            </div>

            <form
              onSubmit={
                handleCreateCategory
              }
            >
              <div
                style={{
                  padding:
                    "22px 24px",
                }}
              >
                {formError && (
                  <div
                    style={{
                      marginBottom:
                        "16px",
                      padding:
                        "11px 13px",
                      borderRadius:
                        "8px",
                      backgroundColor:
                        "#fcecef",
                      color:
                        "#8f2638",
                      fontSize:
                        "12px",
                      lineHeight:
                        "1.5",
                    }}
                  >
                    {formError}
                  </div>
                )}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Nama Kategori
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Contoh: Makanan"
                    style={
                      formInputStyle
                    }
                    disabled={saving}
                  />
                </div>

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={
                      formData.slug
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="makanan"
                    style={
                      formInputStyle
                    }
                    disabled={saving}
                  />

                  <span
                    style={{
                      display:
                        "block",
                      marginTop:
                        "5px",
                      fontSize:
                        "10px",
                      color:
                        "#999",
                    }}
                  >
                    Slug dibuat
                    otomatis dari
                    nama kategori.
                  </span>
                </div>

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Deskripsi
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Deskripsi singkat kategori..."
                    rows="3"
                    style={{
                      ...formInputStyle,
                      resize:
                        "vertical",
                      minHeight:
                        "80px",
                    }}
                    disabled={saving}
                  ></textarea>
                </div>

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Urutan
                  </label>

                  <input
                    type="number"
                    name="sort_order"
                    value={
                      formData.sort_order
                    }
                    onChange={
                      handleFormChange
                    }
                    min="0"
                    style={
                      formInputStyle
                    }
                    disabled={saving}
                  />
                </div>

                <label
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    cursor:
                      saving
                        ? "default"
                        : "pointer",
                    fontSize:
                      "12px",
                    color:
                      "#555",
                  }}
                >
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={
                      formData.is_active
                    }
                    onChange={
                      handleFormChange
                    }
                    disabled={saving}
                    style={{
                      width:
                        "16px",
                      height:
                        "16px",
                      accentColor:
                        "#8f2638",
                    }}
                  />

                  <span>
                    Aktifkan kategori
                  </span>
                </label>
              </div>

              <div
                style={{
                  padding:
                    "16px 24px",
                  borderTop:
                    "1px solid #eee",
                  display:
                    "flex",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    handleCloseAddModal
                  }
                  disabled={saving}
                  style={{
                    border:
                      "1px solid #ddd",
                    backgroundColor:
                      "#ffffff",
                    color:
                      "#555",
                    padding:
                      "10px 16px",
                    borderRadius:
                      "8px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "600",
                    cursor:
                      saving
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    border:
                      "none",
                    backgroundColor:
                      saving
                        ? "#b87985"
                        : "#8f2638",
                    color:
                      "#ffffff",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "8px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "600",
                    cursor:
                      saving
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          MODAL EDIT KATEGORI
      ========================= */}

      {showEditModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor:
              "rgba(33, 27, 29, 0.45)",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseEditModal();
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth:
                "520px",
              backgroundColor:
                "#ffffff",
              borderRadius:
                "16px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15)",
              overflow:
                "hidden",
            }}
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            {/* HEADER */}

            <div
              style={{
                padding:
                  "22px 24px",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <span
                style={{
                  fontSize:
                    "10px",
                  fontWeight:
                    "700",
                  color:
                    "#8f2638",
                  letterSpacing:
                    "0.08em",
                }}
              >
                EDIT KATEGORI
              </span>

              <h2
                style={{
                  margin:
                    "6px 0 0",
                  fontSize:
                    "21px",
                  fontWeight:
                    "700",
                  color:
                    "#211b1d",
                }}
              >
                Edit Kategori
              </h2>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  fontSize:
                    "12px",
                  color:
                    "#888",
                }}
              >
                Perbarui informasi
                kategori menu.
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleUpdateCategory
              }
            >
              <div
                style={{
                  padding:
                    "22px 24px",
                }}
              >
                {editError && (
                  <div
                    style={{
                      marginBottom:
                        "16px",
                      padding:
                        "11px 13px",
                      borderRadius:
                        "8px",
                      backgroundColor:
                        "#fcecef",
                      color:
                        "#8f2638",
                      fontSize:
                        "12px",
                      lineHeight:
                        "1.5",
                    }}
                  >
                    {editError}
                  </div>
                )}

                {/* NAMA */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Nama Kategori
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      editFormData.name
                    }
                    onChange={
                      handleEditFormChange
                    }
                    placeholder="Contoh: Makanan"
                    style={
                      formInputStyle
                    }
                    disabled={
                      editSaving
                    }
                  />
                </div>

                {/* SLUG */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={
                      editFormData.slug
                    }
                    onChange={
                      handleEditFormChange
                    }
                    placeholder="makanan"
                    style={
                      formInputStyle
                    }
                    disabled={
                      editSaving
                    }
                  />

                  <span
                    style={{
                      display:
                        "block",
                      marginTop:
                        "5px",
                      fontSize:
                        "10px",
                      color:
                        "#999",
                    }}
                  >
                    Slug akan
                    mengikuti nama
                    kategori.
                  </span>
                </div>

                {/* DESKRIPSI */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Deskripsi
                  </label>

                  <textarea
                    name="description"
                    value={
                      editFormData.description
                    }
                    onChange={
                      handleEditFormChange
                    }
                    placeholder="Deskripsi singkat kategori..."
                    rows="3"
                    style={{
                      ...formInputStyle,
                      resize:
                        "vertical",
                      minHeight:
                        "80px",
                    }}
                    disabled={
                      editSaving
                    }
                  ></textarea>
                </div>

                {/* URUTAN */}

                <div
                  style={{
                    marginBottom:
                      "16px",
                  }}
                >
                  <label
                    style={
                      formLabelStyle
                    }
                  >
                    Urutan
                  </label>

                  <input
                    type="number"
                    name="sort_order"
                    value={
                      editFormData.sort_order
                    }
                    onChange={
                      handleEditFormChange
                    }
                    min="0"
                    style={
                      formInputStyle
                    }
                    disabled={
                      editSaving
                    }
                  />
                </div>

                {/* STATUS */}

                <label
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: "10px",
                    cursor:
                      editSaving
                        ? "default"
                        : "pointer",
                    fontSize:
                      "12px",
                    color:
                      "#555",
                  }}
                >
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={
                      editFormData.is_active
                    }
                    onChange={
                      handleEditFormChange
                    }
                    disabled={
                      editSaving
                    }
                    style={{
                      width:
                        "16px",
                      height:
                        "16px",
                      accentColor:
                        "#8f2638",
                    }}
                  />

                  <span>
                    Aktifkan kategori
                  </span>
                </label>
              </div>

              {/* FOOTER */}

              <div
                style={{
                  padding:
                    "16px 24px",
                  borderTop:
                    "1px solid #eee",
                  display:
                    "flex",
                  justifyContent:
                    "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={
                    handleCloseEditModal
                  }
                  disabled={
                    editSaving
                  }
                  style={{
                    border:
                      "1px solid #ddd",
                    backgroundColor:
                      "#ffffff",
                    color:
                      "#555",
                    padding:
                      "10px 16px",
                    borderRadius:
                      "8px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "600",
                    cursor:
                      editSaving
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={
                    editSaving
                  }
                  style={{
                    border:
                      "none",
                    backgroundColor:
                      editSaving
                        ? "#b87985"
                        : "#8f2638",
                    color:
                      "#ffffff",
                    padding:
                      "10px 18px",
                    borderRadius:
                      "8px",
                    fontSize:
                      "12px",
                    fontWeight:
                      "600",
                    cursor:
                      editSaving
                        ? "not-allowed"
                        : "pointer",
                  }}
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
    TABLE STYLE
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
    FORM STYLE
========================= */

const formLabelStyle = {
  display: "block",
  marginBottom: "7px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#444",
};

const formInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px 12px",
  fontSize: "12px",
  color: "#333",
  outline: "none",
  backgroundColor: "#ffffff",
};

/* =========================
    CATEGORY PROGRESS
========================= */

function CategoryProgress({
  name,
  total,
  percentage,
}) {
  return (
    <div
      style={{
        marginBottom: "17px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "7px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "#555",
          }}
        >
          {name}
        </span>

        <span
          style={{
            fontSize: "11px",
            color: "#888",
          }}
        >
          {total}
        </span>
      </div>

      <div
        style={{
          height: "7px",
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: percentage,
            height: "100%",
            backgroundColor:
              "#8f2638",
            borderRadius:
              "10px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default CategoryPage;