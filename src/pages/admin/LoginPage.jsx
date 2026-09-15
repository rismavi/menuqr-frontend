import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/adminService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await loginAdmin({
        email: email.trim(),
        password,
      });

      console.log("Response login:", result);

      // Simpan token jika diberikan oleh backend
      if (result.token) {
        localStorage.setItem("adminToken", result.token);
      }

      // Simpan data user jika tersedia
      if (result.user) {
        localStorage.setItem(
          "adminUser",
          JSON.stringify(result.user)
        );
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Gagal login:", err);

      setError(
        err.response?.data?.message ||
          "Email atau password salah."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-container">

        <div className="admin-login-card">

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

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <form
            className="admin-login-form"
            onSubmit={handleLogin}
          >

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
                  setEmail(event.target.value);
                  setError("");
                }}
              />
            </div>

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
                  setPassword(event.target.value);
                  setError("");
                }}
              />
            </div>

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