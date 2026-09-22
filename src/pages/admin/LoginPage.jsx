import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAdmin,
  getMe,
} from "../../services/adminService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    // -------------------------------------------------------
    // VALIDASI
    // -------------------------------------------------------

    if (!email.trim() || !password.trim()) {
      setError(
        "Email dan password wajib diisi."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      // =====================================================
      // 1. LOGIN KE BACKEND
      // =====================================================

      const result =
        await loginAdmin({
          email: email.trim(),
          password,
        });

      console.log(
        "Response login:",
        result
      );

      // =====================================================
      // 2. CEK TOKEN
      // =====================================================

      if (!result?.token) {
        throw new Error(
          "Token login tidak ditemukan."
        );
      }

      // =====================================================
      // 3. HAPUS DATA LOGIN LAMA
      // =====================================================

      localStorage.removeItem(
        "adminUser"
      );

      // =====================================================
      // 4. SIMPAN TOKEN BARU
      // =====================================================

      localStorage.setItem(
        "adminToken",
        result.token
      );

      console.log(
        "Token admin berhasil disimpan."
      );

      // =====================================================
      // 5. AMBIL DATA ADMIN + RESTAURANT
      // =====================================================

      const meResult =
        await getMe();

      console.log(
        "Response /me:",
        meResult
      );

      // Backend:
      //
      // {
      //   data: {
      //      id,
      //      name,
      //      email,
      //      restaurant_id,
      //      restaurant: {...}
      //   }
      // }

      const adminUser =
        meResult?.data;

      // =====================================================
      // 6. VALIDASI DATA ADMIN
      // =====================================================

      if (!adminUser) {
        throw new Error(
          "Data admin tidak ditemukan."
        );
      }

      console.log(
        "Admin yang login:",
        adminUser
      );

      // =====================================================
      // 7. CEK RESTAURANT ID
      // =====================================================

      if (!adminUser.restaurant_id) {
        setError(
          "Akun admin belum terhubung ke restoran. Silakan hubungkan akun admin dengan restoran terlebih dahulu."
        );

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminUser"
        );

        return;
      }

      // =====================================================
      // 8. SIMPAN DATA ADMIN + RESTAURANT
      // =====================================================

      localStorage.setItem(
        "adminUser",
        JSON.stringify(
          adminUser
        )
      );

      console.log(
        "Restaurant ID:",
        adminUser.restaurant_id
      );

      console.log(
        "Restaurant:",
        adminUser.restaurant
      );

      // =====================================================
      // 9. MASUK DASHBOARD
      // =====================================================

      navigate(
        "/admin/dashboard"
      );

    } catch (err) {
      console.error(
        "Gagal login:",
        err
      );

      // =====================================================
      // ERROR DARI BACKEND
      // =====================================================

      const backendMessage =
        err?.response?.data?.message;

      if (backendMessage) {
        setError(
          backendMessage
        );

        return;
      }

      // =====================================================
      // ERROR UMUM
      // =====================================================

      setError(
        err?.message ||
          "Email atau password salah."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // TAMPILAN
  // =========================================================

  return (
    <main className="admin-login-page">

      <div className="admin-login-container">

        <div className="admin-login-card">

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="admin-login-header">

            <div className="admin-login-logo">
              H
            </div>

            <p className="admin-login-label">
              HOSHI RAMEN
            </p>

            <h1>
              Admin Login
            </h1>

            <p>
              Masuk untuk mengelola restoran.
            </p>

          </div>

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================== */}

          <form
            className="admin-login-form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="admin-form-group">

              <label htmlFor="admin-email">
                Email
              </label>

              <input
                id="admin-email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(event) => {
                  setEmail(
                    event.target.value
                  );

                  setError("");
                }}
              />

            </div>

            {/* PASSWORD */}

            <div className="admin-form-group">

              <label htmlFor="admin-password">
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(event) => {
                  setPassword(
                    event.target.value
                  );

                  setError("");
                }}
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading
                ? "Memproses..."
                : "Masuk"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}

export default LoginPage;