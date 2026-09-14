import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MenuPage from './pages/customer/MenuPage';
import MenuDetailPage from './pages/customer/MenuDetailPage';
import CartPage from './pages/customer/CartPage';
import OrderPage from './pages/customer/OrderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MenuPage />}
        />

        <Route
          path="/menu/:id"
          element={<MenuDetailPage />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="/order"
          element={<OrderPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;