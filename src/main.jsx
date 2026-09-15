import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.jsx";
import CartProvider from "./context/CartProvider.jsx";
import { AdminProfileProvider } from "./context/AdminProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProfileProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AdminProfileProvider>
  </StrictMode>
);