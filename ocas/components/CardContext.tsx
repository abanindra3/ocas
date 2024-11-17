'use client'
import React, { createContext, useContext, useState } from 'react';

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
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  updateProductStock: (productId: number, quantityDifference: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setTotal(prev => prev + item.price);
  };

  const removeFromCart = (id: number) => {
    const removedItem = cart.find(item => item.id === id);
    if (removedItem) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
      setTotal(prev => prev - (removedItem.price * removedItem.quantity));
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
    setTotal(prevTotal => calculateTotal(cart));
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  const updateProductStock = (productId: number, quantityDifference: number) => {
    // This function would need to be implemented based on your product management logic
  };

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      updateProductStock
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// import React, { createContext, useContext, useState } from 'react';

// interface CartContextType {
//   cartItems: string[];
//   total: number;
//   addToCart: (item: string, price: number) => void;
//   removeFromCart: (item: string, price: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [cartItems, setCartItems] = useState<string[]>([]);
//   const [total, setTotal] = useState(0);

//   const addToCart = (item: string, price: number) => {
//     setCartItems([...cartItems, item]);
//     setTotal(prev => prev + price);
//   };

//   const removeFromCart = (item: string, price: number) => {
//     const index = cartItems.indexOf(item);
//     if (index > -1) {
//       const newItems = [...cartItems];
//       newItems.splice(index, 1);
//       setCartItems(newItems);
//       setTotal(prev => prev - price);
//     }
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     setTotal(0);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart }}>
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