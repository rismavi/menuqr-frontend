import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useAdminProfile } from "../../context/AdminProfileContext";

function SettingsPage() {
  const { profile, updateProfile } = useAdminProfile();

  const [adminName, setAdminName] = useState(
    profile.name || "Administrator"
  );

  const [profilePhoto, setProfilePhoto] = useState(
    profile.photo || null
  );

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Cek ukuran file maksimal 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      return;
    }

    // Cek format foto
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Foto harus berformat JPG, JPEG, atau PNG.");
      return;
    }

    // Mengubah foto menjadi Data URL agar bisa disimpan
    // ke localStorage dan tetap tersedia setelah pindah halaman.
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateProfile({
      ...profile,
      name: adminName,
      photo: profilePhoto,
    });

    alert("Perubahan berhasil disimpan.");
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
        className="settings-content"
        style={{
          marginLeft: "240px",
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div className="settings-header">
          <div>
            <h1>Pengaturan</h1>

            <p>
              Kelola informasi dan keamanan akun administrator.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>

          {/* =========================
              FOTO PROFIL
          ========================= */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>Foto Profil</h2>

              <p>
                Gunakan foto profil untuk memudahkan identifikasi akun admin.
              </p>

            </div>

            <div className="profile-photo-area">

              <div className="profile-photo">

                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Foto profil"
                  />
                ) : (
                  <span>
                    {(adminName || "Admin").charAt(0).toUpperCase()}
                  </span>
                )}

              </div>

              <div className="profile-photo-info">

                <strong>
                  Foto Profil Administrator
                </strong>

                <p>
                  Format JPG, JPEG atau PNG. Maksimal 2 MB.
                </p>

                <label className="change-photo-button">

                  Ganti Foto

                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoChange}
                    hidden
                  />

                </label>

              </div>

            </div>

          </section>

          {/* =========================
              INFORMASI AKUN
          ========================= */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>Informasi Akun</h2>

              <p>
                Kelola informasi akun administrator.
              </p>

            </div>

            <div className="settings-grid">

              <div className="settings-field">

                <label>
                  Nama Admin
                </label>

                <input
                  type="text"
                  value={adminName}
                  onChange={(event) =>
                    setAdminName(event.target.value)
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

          {/* =========================
              UBAH PASSWORD
          ========================= */}

          <section className="settings-section">

            <div className="settings-section-header">

              <h2>Ubah Password</h2>

              <p>
                Pastikan password baru berbeda dari password sebelumnya.
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

              <div></div>

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

          {/* =========================
              BUTTON
          ========================= */}

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

      </main>

    </div>
  );
}

export default SettingsPage;