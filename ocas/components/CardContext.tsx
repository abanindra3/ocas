// 'use client'
// import React, { createContext, useContext, useState } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   isVeg: boolean;
//   rating: number;
//   image: string;
// }

// interface CartContextType {
//   cart: CartItem[];
//   total: number;
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   updateProductStock: (productId: number, quantityDifference: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [total, setTotal] = useState(0);

//   const calculateTotal = (items: CartItem[]) => {
//     return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   const addToCart = (item: CartItem) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map(cartItem =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//     setTotal(prev => prev + item.price);
//   };

//   const removeFromCart = (id: number) => {
//     const removedItem = cart.find(item => item.id === id);
//     if (removedItem) {
//       setCart(prevCart => prevCart.filter(item => item.id !== id));
//       setTotal(prev => prev - (removedItem.price * removedItem.quantity));
//     }
//   };

//   const updateQuantity = (id: number, newQuantity: number) => {
//     setCart(prevCart =>
//       prevCart.map(item =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, newQuantity) }
//           : item
//       )
//     );
//     setTotal(prevTotal => calculateTotal(cart));
//   };

//   const clearCart = () => {
//     setCart([]);
//     setTotal(0);
//   };

//   const updateProductStock = (productId: number, quantityDifference: number) => {
//     // This function would need to be implemented based on your product management logic
//   };

//   return (
//     <CartContext.Provider value={{
//       cart,
//       total,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart,
//       updateProductStock
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  rating: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  updateCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const updateCart = (items: CartItem[]) => {
    setCart(items);
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    localStorage.removeItem('canteenCart');
  };

  return (
    <CartContext.Provider value={{ cart, total, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
