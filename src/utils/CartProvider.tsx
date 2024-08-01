import React, { useState, ReactNode, useMemo, useEffect } from 'react';
import { CartItem } from '../types/CartItem';
import { CartContext } from './CartContext';

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return [];
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(loadCartFromLocalStorage);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) => {
          return cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const changeItemCount = (id: string | number, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        return item.id === id
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item;
      });
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      changeItemCount,
      removeFromCart,
      clearCart,
    }),
    [cart],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
