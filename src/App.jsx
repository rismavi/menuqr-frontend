import { BrowserRouter, Routes, Route } from "react-router-dom";

import MenuPage from "./pages/customer/MenuPage";
import MenuDetailPage from "./pages/customer/MenuDetailPage";
import CartPage from "./pages/customer/CartPage";
import OrderPage from "./pages/customer/OrderPage";

import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ReportPage from "./pages/admin/ReportPage";
import SettingsPage from "./pages/admin/SettingsPage";
import MenuManagementPage from "./pages/admin/MenuManagementPage";
import CategoryPage from "./pages/admin/CategoryPage";
import VariantPage from "./pages/admin/VariantPage";
import AddonPage from "./pages/admin/AddonPage";
import OrdersPage from "./pages/admin/OrdersPage";
import TablePage from "./pages/admin/TablePage";
import PromoPage from "./pages/admin/PromoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            CUSTOMER
            ========================= */}

        {/* Halaman utama */}
        <Route
          path="/"
          element={<MenuPage />}
        />

        {/* Menu berdasarkan restoran */}
        <Route
          path="/menu/:slug"
          element={<MenuPage />}
        />

        {/* Detail menu berdasarkan restoran + ID menu */}
        <Route
          path="/menu/:slug/:id"
          element={<MenuDetailPage />}
        />

        {/* Keranjang */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Pesanan */}
        <Route
          path="/order"
          element={<OrderPage />}
        />

        {/* =========================
            ADMIN
            ========================= */}

        {/* Login */}
        <Route
          path="/admin/login"
          element={<LoginPage />}
        />

        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={<DashboardPage />}
        />

        {/* Report */}
        <Route
          path="/admin/report"
          element={<ReportPage />}
        />

        {/* Settings */}
        <Route
          path="/admin/settings"
          element={<SettingsPage />}
        />

        {/* Menu Management */}
        <Route
          path="/admin/menu"
          element={<MenuManagementPage />}
        />

        {/* Category */}
        <Route
          path="/admin/category"
          element={<CategoryPage />}
        />

        {/* Variant */}
        <Route
          path="/admin/variant"
          element={<VariantPage />}
        />

        {/* Addon */}
        <Route
          path="/admin/addon"
          element={<AddonPage />}
        />

        {/* Orders */}
        <Route
          path="/admin/orders"
          element={<OrdersPage />}
        />

        {/* Tables */}
        <Route
          path="/admin/tables"
          element={<TablePage />}
        />

        {/* Promo */}
        <Route
          path="/admin/promo"
          element={<PromoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;