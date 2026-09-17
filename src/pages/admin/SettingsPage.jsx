import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAdminProfile } from "../../context/AdminProfileContext";
import {
  getRestaurants,
  updateRestaurant,
} from "../../services/restaurantService";

function SettingsPage() {
  const { profile, updateProfile } =
    useAdminProfile();

  // =========================================================
  // PROFILE ADMIN
  // =========================================================

  const [adminName, setAdminName] =
    useState(
      profile.name || "Administrator"
    );

  const [profilePhoto, setProfilePhoto] =
    useState(
      profile.photo || null
    );

  // =========================================================
  // DATA RESTAURANT
  // =========================================================

  const [restaurant, setRestaurant] =
    useState(null);

  const [restaurantLoading, setRestaurantLoading] =
    useState(true);

  const [restaurantSaving, setRestaurantSaving] =
    useState(false);

  const [restaurantError, setRestaurantError] =
    useState("");

  // =========================================================
  // LOKASI RESTAURANT
  // =========================================================

  const [latitude, setLatitude] =
    useState("");

  const [longitude, setLongitude] =
    useState("");

  const [locationRadius, setLocationRadius] =
    useState("100");

  // =========================================================
  // AMBIL DATA RESTAURANT
  // =========================================================

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setRestaurantLoading(true);
        setRestaurantError("");

        const response =
          await getRestaurants();

        console.log(
          "Data restaurant:",
          response
        );

        // ---------------------------------------------------
        // Normalisasi response
        // ---------------------------------------------------

        const restaurantList =
          Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
            ? response.data
            : response?.data
            ? [response.data]
            : [];

        // ---------------------------------------------------
        // Cari Hoshi Ramen
        // ---------------------------------------------------

        const foundRestaurant =
          restaurantList.find(
            (item) =>
              Number(item.id) === 4 ||
              item.slug === "hoshi-ramen"
          );

        if (!foundRestaurant) {
          setRestaurantError(
            "Data restaurant Hoshi Ramen tidak ditemukan."
          );

          return;
        }

        console.log(
          "Restaurant yang digunakan:",
          foundRestaurant
        );

        setRestaurant(
          foundRestaurant
        );

        // ---------------------------------------------------
        // Isi lokasi yang sudah tersimpan
        // ---------------------------------------------------

        setLatitude(
          foundRestaurant.latitude ??
            ""
        );

        setLongitude(
          foundRestaurant.longitude ??
            ""
        );

        setLocationRadius(
          foundRestaurant.location_radius ??
            100
        );

      } catch (error) {
        console.error(
          "Gagal mengambil data restaurant:",
          error
        );

        setRestaurantError(
          error?.response?.data?.message ||
            "Gagal mengambil data restaurant."
        );

      } finally {
        setRestaurantLoading(false);
      }
    };

    loadRestaurant();
  }, []);

  // =========================================================
  // FOTO PROFILE
  // =========================================================

  const handlePhotoChange = (
    event
  ) => {
    const file =
      event.target.files[0];

    if (!file) return;

    // Maksimal 2 MB
    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Ukuran foto maksimal 2 MB."
      );

      return;
    }

    // Format foto
    const allowedTypes = [
      "image/jpeg",
      "image/png",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      alert(
        "Foto harus berformat JPG, JPEG, atau PNG."
      );

      return;
    }

    // Ubah menjadi Data URL
    const reader =
      new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // SIMPAN PROFILE ADMIN
  // =========================================================

  const handleSaveProfile = (
    event
  ) => {
    event.preventDefault();

    updateProfile({
      ...profile,
      name: adminName,
      photo: profilePhoto,
    });

    alert(
      "Perubahan profil berhasil disimpan."
    );
  };

  // =========================================================
  // SIMPAN LOKASI RESTAURANT
  // =========================================================

  const handleSaveLocation =
    async (event) => {
      event.preventDefault();

      // -----------------------------------------------------
      // Validasi latitude
      // -----------------------------------------------------

      if (
        latitude === "" ||
        longitude === ""
      ) {
        setRestaurantError(
          "Latitude dan longitude wajib diisi."
        );

        return;
      }

      // -----------------------------------------------------
      // Konversi angka
      // -----------------------------------------------------

      const latitudeNumber =
        Number(latitude);

      const longitudeNumber =
        Number(longitude);

      const radiusNumber =
        Number(locationRadius);

      // -----------------------------------------------------
      // Validasi angka
      // -----------------------------------------------------

      if (
        Number.isNaN(
          latitudeNumber
        ) ||
        latitudeNumber < -90 ||
        latitudeNumber > 90
      ) {
        setRestaurantError(
          "Latitude harus berupa angka antara -90 sampai 90."
        );

        return;
      }

      if (
        Number.isNaN(
          longitudeNumber
        ) ||
        longitudeNumber < -180 ||
        longitudeNumber > 180
      ) {
        setRestaurantError(
          "Longitude harus berupa angka antara -180 sampai 180."
        );

        return;
      }

      if (
        Number.isNaN(
          radiusNumber
        ) ||
        radiusNumber <= 0
      ) {
        setRestaurantError(
          "Radius harus lebih besar dari 0 meter."
        );

        return;
      }

      if (!restaurant?.id) {
        setRestaurantError(
          "Data restaurant belum tersedia."
        );

        return;
      }

      try {
        setRestaurantSaving(true);
        setRestaurantError("");

        // ---------------------------------------------------
        // Data yang dikirim ke backend
        // ---------------------------------------------------

        const restaurantData = {
          latitude:
            latitudeNumber,

          longitude:
            longitudeNumber,

          location_radius:
            radiusNumber,
        };

        console.log(
          "Data lokasi yang dikirim:",
          restaurantData
        );

        // ---------------------------------------------------
        // Update restaurant
        // ---------------------------------------------------

        const response =
          await updateRestaurant(
            restaurant.id,
            restaurantData
          );

        console.log(
          "Response update restaurant:",
          response
        );

        // ---------------------------------------------------
        // Update state lokal
        // ---------------------------------------------------

        setRestaurant({
          ...restaurant,
          latitude:
            latitudeNumber,
          longitude:
            longitudeNumber,
          location_radius:
            radiusNumber,
        });

        alert(
          "Lokasi restaurant berhasil disimpan."
        );

      } catch (error) {
        console.error(
          "Gagal menyimpan lokasi restaurant:",
          error
        );

        console.error(
          "Detail error backend:",
          error?.response?.data
        );

        // ---------------------------------------------------
        // Ambil pesan error backend
        // ---------------------------------------------------

        const backendMessage =
          error?.response?.data?.message;

        const backendErrors =
          error?.response?.data?.errors;

        if (
          backendErrors
        ) {
          const messages =
            Object.values(
              backendErrors
            )
              .flat()
              .join(" ");

          setRestaurantError(
            messages ||
              "Data lokasi tidak valid."
          );
        } else {
          setRestaurantError(
            backendMessage ||
              "Gagal menyimpan lokasi restaurant."
          );
        }

      } finally {
        setRestaurantSaving(
          false
        );
      }
    };

  // =========================================================
  // TAMPILAN
  // =========================================================

  return (
    <div
      className="admin-layout"
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor:
          "#f7f5f6",
      }}
    >

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="settings-content"
        style={{
          marginLeft: "240px",
          width:
            "calc(100% - 240px)",
          minHeight: "100vh",
          boxSizing:
            "border-box",
        }}
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="settings-header">

          <div>

            <h1>
              Pengaturan
            </h1>

            <p>
              Kelola informasi akun
              dan pengaturan restoran.
            </p>

          </div>

        </div>

        {/* ===================================================
            FORM PROFILE
        ==================================================== */}

        <form
          onSubmit={
            handleSaveProfile
          }
        >

          {/* =================================================
              FOTO PROFIL
          ================================================== */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>
                Foto Profil
              </h2>

              <p>
                Gunakan foto profil
                untuk memudahkan
                identifikasi akun admin.
              </p>

            </div>

            <div className="profile-photo-area">

              <div className="profile-photo">

                {profilePhoto ? (
                  <img
                    src={
                      profilePhoto
                    }
                    alt="Foto profil"
                  />
                ) : (
                  <span>
                    {(
                      adminName ||
                      "Admin"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <div className="profile-photo-info">

                <strong>
                  Foto Profil Administrator
                </strong>

                <p>
                  Format JPG, JPEG
                  atau PNG. Maksimal
                  2 MB.
                </p>

                <label className="change-photo-button">

                  Ganti Foto

                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={
                      handlePhotoChange
                    }
                    hidden
                  />

                </label>

              </div>

            </div>

          </section>

          {/* =================================================
              INFORMASI AKUN
          ================================================== */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>
                Informasi Akun
              </h2>

              <p>
                Kelola informasi akun
                administrator.
              </p>

            </div>

            <div className="settings-grid">

              <div className="settings-field">

                <label>
                  Nama Admin
                </label>

                <input
                  type="text"
                  value={
                    adminName
                  }
                  onChange={(
                    event
                  ) =>
                    setAdminName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Masukkan nama admin"
                />

              </div>

              <div className="settings-field">

                <label>
                  Email Saat Ini
                </label>

                <input
                  type="email"
                  defaultValue="admin@hoshiramen.com"
                  disabled
                />

              </div>

              <div className="settings-field">

                <label>
                  Email Baru
                </label>

                <input
                  type="email"
                  placeholder="Masukkan email baru"
                />

              </div>

              <div className="settings-field">

                <label>
                  Konfirmasi Password
                </label>

                <input
                  type="password"
                  placeholder="Masukkan password untuk konfirmasi"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              UBAH PASSWORD
          ================================================== */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>
                Ubah Password
              </h2>

              <p>
                Pastikan password baru
                berbeda dari password
                sebelumnya.
              </p>

            </div>

            <div className="settings-grid settings-password-grid">

              <div className="settings-field">

                <label>
                  Password Saat Ini
                </label>

                <input
                  type="password"
                  placeholder="Masukkan password saat ini"
                />

              </div>

              <div />

              <div className="settings-field">

                <label>
                  Password Baru
                </label>

                <input
                  type="password"
                  placeholder="Masukkan password baru"
                />

              </div>

              <div className="settings-field">

                <label>
                  Konfirmasi Password Baru
                </label>

                <input
                  type="password"
                  placeholder="Ulangi password baru"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              BUTTON PROFILE
          ================================================== */}

          <div className="settings-actions">

            <button
              type="button"
              className="settings-cancel-button"
            >
              Batal
            </button>

            <button
              type="submit"
              className="settings-save-button"
            >
              Simpan Perubahan
            </button>

          </div>

        </form>

        {/* ===================================================
            LOKASI RESTAURANT
        ==================================================== */}

        <section className="settings-section restaurant-location-section">

          <div className="settings-section-header">

            <h2>
              Lokasi Restoran
            </h2>

            <p>
              Atur lokasi Hoshi Ramen
              yang digunakan untuk
              memvalidasi jarak pelanggan
              saat melakukan pemesanan.
            </p>

          </div>

          {/* =================================================
              LOADING
          ================================================== */}

          {restaurantLoading && (
            <div className="settings-location-loading">
              Memuat data lokasi restoran...
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================== */}

          {restaurantError && (
            <div className="settings-location-error">
              <strong>
                Terjadi kesalahan
              </strong>

              <p>
                {restaurantError}
              </p>
            </div>
          )}

          {/* =================================================
              LOCATION FORM
          ================================================== */}

          {!restaurantLoading &&
            restaurant && (
              <form
                onSubmit={
                  handleSaveLocation
                }
              >

                {/* INFO RESTAURANT */}

                <div className="restaurant-location-info">

                  <div>

                    <span>
                      RESTAURANT
                    </span>

                    <strong>
                      {
                        restaurant.name
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      ID RESTAURANT
                    </span>

                    <strong>
                      {
                        restaurant.id
                      }
                    </strong>

                  </div>

                </div>

                {/* INPUT LOCATION */}

                <div className="settings-grid">

                  {/* LATITUDE */}

                  <div className="settings-field">

                    <label htmlFor="restaurant-latitude">

                      Latitude

                    </label>

                    <input
                      id="restaurant-latitude"
                      type="number"
                      step="any"
                      value={
                        latitude
                      }
                      onChange={(
                        event
                      ) =>
                        setLatitude(
                          event.target
                            .value
                        )
                      }
                      placeholder="Contoh: -7.98"
                    />

                    <small>
                      Nilai antara -90
                      sampai 90.
                    </small>

                  </div>

                  {/* LONGITUDE */}

                  <div className="settings-field">

                    <label htmlFor="restaurant-longitude">

                      Longitude

                    </label>

                    <input
                      id="restaurant-longitude"
                      type="number"
                      step="any"
                      value={
                        longitude
                      }
                      onChange={(
                        event
                      ) =>
                        setLongitude(
                          event.target
                            .value
                        )
                      }
                      placeholder="Contoh: 112.63"
                    />

                    <small>
                      Nilai antara -180
                      sampai 180.
                    </small>

                  </div>

                  {/* RADIUS */}

                  <div className="settings-field">

                    <label htmlFor="restaurant-radius">

                      Radius Lokasi

                    </label>

                    <div className="settings-input-with-unit">

                      <input
                        id="restaurant-radius"
                        type="number"
                        min="1"
                        value={
                          locationRadius
                        }
                        onChange={(
                          event
                        ) =>
                          setLocationRadius(
                            event.target
                              .value
                          )
                        }
                        placeholder="100"
                      />

                      <span>
                        meter
                      </span>

                    </div>

                    <small>
                      Jarak maksimal pelanggan
                      dari restoran.
                    </small>

                  </div>

                </div>

                {/* =================================================
                    PETUNJUK
                ================================================== */}

                <div className="restaurant-location-note">

                  <span>
                    ℹ
                  </span>

                  <div>

                    <strong>
                      Cara kerja lokasi
                    </strong>

                    <p>
                      Saat pelanggan melakukan
                      pemesanan, browser akan
                      mengambil lokasi pelanggan.
                      Backend kemudian membandingkan
                      lokasi tersebut dengan lokasi
                      restoran dan radius yang kamu
                      tentukan di sini.
                    </p>

                  </div>

                </div>

                {/* =================================================
                    SAVE LOCATION
                ================================================== */}

                <div className="settings-actions">

                  <button
                    type="submit"
                    className="settings-save-button"
                    disabled={
                      restaurantSaving
                    }
                  >

                    {restaurantSaving
                      ? "Menyimpan..."
                      : "Simpan Lokasi Restoran"}

                  </button>

                </div>

              </form>
            )}

        </section>

      </main>

    </div>
  );
}

export default SettingsPage;