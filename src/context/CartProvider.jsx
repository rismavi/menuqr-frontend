import { useState } from 'react';
import { CartContext } from './CartContext';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const updatedItems = [
        ...currentItems,
        item,
      ];

      localStorage.setItem(
        'cartItems',
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    setCartItems((currentItems) => {
      const updatedItems = currentItems.map(
        (item, itemIndex) => {
          if (itemIndex !== index) {
            return item;
          }

          const variantPrice = item.variant
            ? Number(item.variant.price) || 0
            : 0;

          const addonPrice = item.addons
            ? item.addons.reduce(
                (total, addon) =>
                  total + (Number(addon.price) || 0),
                0
              )
            : 0;

          const unitPrice =
            Number(item.price) +
            variantPrice +
            addonPrice;

          return {
            ...item,
            quantity: newQuantity,
            totalPrice: unitPrice * newQuantity,
          };
        }
      );

      localStorage.setItem(
        'cartItems',
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.filter(
        (_, itemIndex) => itemIndex !== index
      );

      localStorage.setItem(
        'cartItems',
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);

    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;