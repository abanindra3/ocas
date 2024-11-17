// "use client";

// import { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import AdminDashboard from "@/components/AdminDashboard";
// import CustomerDashboard from "@/components/CustomerDashboard";
// import ProductsPage from "@/components/ProductsPage";
// import OrdersPage from "@/components/OrdersPage";
// import CartPage from "@/components/CartPage";
// import PaymentPage from "@/components/PaymentPage";
// import OrderConfirmationPage from "@/components/OrderConfirmationPage";
// import UserTypeSelection from "@/components/UserTypeSelection"; // Import the UserTypeSelection component
// import { CartProvider } from '@/components/CardContext';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
//   isVeg: boolean;
//   rating: number;
//   image: string;
// }

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   isVeg: boolean;
//   rating: number;
//   image: string;
// }

// export default function App() {
//   const [userType, setUserType] = useState<"admin" | "customer" | null>(null);
//   const [products, setProducts] = useState<Product[]>([
//     { id: 1, name: "Veggie Burger", price: 45, stock: 50, isVeg: true, rating: 4.9, image: 'vburg.webp' },
//     { id: 2, name: "Chicken Sandwich", price: 40, stock: 40, isVeg: false, rating: 5.0, image: "chwich.webp" },
//     { id: 3, name: "Veg Pasta", price:40, stock: 30, isVeg: true, rating: 4.8, image: "vpasta.webp" },
//     { id: 4, name: "Fish Finger", price: 60, stock: 50, isVeg: true, rating: 4.6, image: 'ffinger.webp' },
//     { id: 5, name: "Chicken Biryani", price: 100, stock: 40, isVeg: false, rating: 4.5, image: "cbiryani.webp" },
//     { id: 6, name: "Bada Paw", price: 35, stock: 30, isVeg: true, rating: 4.4, image: "badapaw.webp" },
//     { id: 7, name: "Idli", price:30, stock: 50, isVeg: true, rating: 4.2, image: 'idli.webp' },
//     { id: 8, name: "Dosa", price: 50, stock: 40, isVeg: false, rating: 4.5, image: "dosa.webp" },
//     { id: 9, name: "Veg Momos", price: 50, stock: 30, isVeg: true, rating: 4.75, image: "vmomos.webp" },
//     { id: 10, name: "Chicken Momos", price:60, stock: 30, isVeg: true, rating: 4.9, image: "nvmomos.webp" },
//   ]);

//   const [cart, setCart] = useState<CartItem[]>([]);

//   const clearCart = () => {
//     setCart([]);
//   };

//   const updateProductStock = (productId: number, quantityDifference: number) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId
//           ? { ...product, stock: product.stock + quantityDifference }
//           : product
//       )
//     );
//   };

//   return (
//     <CartProvider>
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           {/* If userType is null, show the UserTypeSelection */}
//           <Route
//             path="/"
//             element={userType === null ? (
//               <UserTypeSelection setUserType={setUserType} />
//             ) : (
//               <Navigate to={userType === "admin" ? "/admin" : "/dashboard"} />
//             )}
//           />

//           <Route
//             path="/admin"
//             element={
//               <AdminDashboard
//                 products={products}
//                 setProducts={setProducts}
//                 updateProductStock={updateProductStock}
//               />
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={<CustomerDashboard cart={cart} setCart={setCart} />}
//           />
//           <Route
//             path="/products"
//             element={
//               <ProductsPage
//                 products={products}
//                 setProducts={setProducts}
//                 cart={cart}
//                 setCart={setCart}
//               />
//             }
//           />
//           <Route
//             path="/cart"
//             element={
//               <CartPage
//                 cart={cart}
//                 setCart={setCart}
//                 updateProductStock={updateProductStock}
//               />
//             }
//           />
//           {/* <Route path="/orders" element={<OrdersPage />} />
//           <Route
//             path="/payment"
//             element={
//               <PaymentPage
//                 total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
//                 clearCart={clearCart}
//               />
//             }
//           /> */}
//           {/* <Route path="/cart" element={<CartPage />} /> */}
//             <Route path="/orders" element={<OrdersPage />} />
            
//             <Route path="/payment" element={<PaymentPage />} />
            
//           <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
//         </Routes>
//       </div>
//     </Router>
//     </CartProvider>
//   );
// }

'use client'

import { useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import AdminDashboard from "@/components/AdminDashboard"
import CustomerDashboard from "@/components/CustomerDashboard"
import ProductsPage from "@/components/ProductsPage"
import OrdersPage from "@/components/OrdersPage"
import CartPage from "@/components/CartPage"
import PaymentPage from "@/components/PaymentPage"
import OrderConfirmationPage from "@/components/OrderConfirmationPage"
import UserTypeSelection from "@/components/UserTypeSelection"
import { CartProvider } from '@/components/CardContext'
import PersonalizedSuggestions from '@/components/PersonalizedSuggestions';
import ProfilePage from '@/components/ProfilePage';
import FavoritesAndReorders from '@/components/FavoritesAndReorders';
import FeedbackSubmission from '@/components/FeedbackSubmission';

interface Product {
  id: number
  name: string
  price: number
  stock: number
  isVeg: boolean
  rating: number
  image: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  isVeg: boolean
  rating: number
  image: string
}

export default function App() {
  const [userType, setUserType] = useState<"admin" | "customer" | null>(null)
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Veggie Burger", price: 45, stock: 50, isVeg: true, rating: 4.9, image: 'vburg.webp' },
    { id: 2, name: "Chicken Sandwich", price: 40, stock: 40, isVeg: false, rating: 5.0, image: "chwich.webp" },
    { id: 3, name: "Veg Pasta", price:40, stock: 30, isVeg: true, rating: 4.8, image: "vpasta.webp" },
    { id: 4, name: "Fish Finger", price: 60, stock: 50, isVeg: true, rating: 4.6, image: 'ffinger.webp' },
    { id: 5, name: "Chicken Biryani", price: 100, stock: 40, isVeg: false, rating: 4.5, image: "cbiryani.webp" },
    { id: 6, name: "Bada Paw", price: 35, stock: 30, isVeg: true, rating: 4.4, image: "badapaw.webp" },
    { id: 7, name: "Idli", price:30, stock: 50, isVeg: true, rating: 4.2, image: 'idli.webp' },
    { id: 8, name: "Dosa", price: 50, stock: 40, isVeg: false, rating: 4.5, image: "dosa.webp" },
    { id: 9, name: "Veg Momos", price: 50, stock: 30, isVeg: true, rating: 4.75, image: "vmomos.webp" },
    { id: 10, name: "Chicken Momos", price:60, stock: 30, isVeg: true, rating: 4.9, image: "nvmomos.webp" },
  ])

  const [cart, setCart] = useState<CartItem[]>([])

  const clearCart = () => {
    setCart([])
  }

  const updateProductStock = (productId: number, quantityDifference: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock + quantityDifference }
          : product
      )
    )
  }

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route
              path="/"
              element={userType === null ? (
                <UserTypeSelection setUserType={setUserType} />
              ) : (
                <Navigate to={userType === "admin" ? "/admin" : "/dashboard"} />
              )}
            />

            <Route
              path="/admin"
              element={
                <AdminDashboard
                  products={products}
                  setProducts={setProducts}
                  updateProductStock={updateProductStock}
                  setUserType={setUserType}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<CustomerDashboard cart={cart} setCart={setCart} />}
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  setCart={setCart}
                  updateProductStock={updateProductStock}
                />
              }
            />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/PersonalizedSuggestions" element={<PersonalizedSuggestions />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/FavoritesAndReorders" element={<FavoritesAndReorders />} />
            <Route path="/FeedbackSubmission" element={<FeedbackSubmission />} />



            
            
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}