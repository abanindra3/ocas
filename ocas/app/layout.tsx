// 'use client'

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { CartProvider } from '@/components/CardContext'

// interface Product {
//   id: number
//   name: string
//   price: number
//   stock: number
//   isVeg: boolean
//   rating: number
//   image: string
// }

// interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   isVeg: boolean
//   rating: number
//   image: string
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const router = useRouter()
//   const [userType, setUserType] = useState<"admin" | "customer" | null>(null)
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
//   ])

//   const [cart, setCart] = useState<CartItem[]>([])

//   const clearCart = () => {
//     setCart([])
//   }

//   const updateProductStock = (productId: number, quantityDifference: number) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId
//           ? { ...product, stock: product.stock + quantityDifference }
//           : product
//       )
//     )
//   }

//   // Redirect based on user type
//   if (userType === "admin") {
//     router.push('/admin')
//   } else if (userType === "customer") {
//     router.push('/dashboard')
//   }

//   return (
//     <html lang="en">
//       <body>
//         <CartProvider>
//           <div className="min-h-screen bg-gray-100">
//             {children}
//           </div>
//         </CartProvider>
//       </body>
//     </html>
//   )
// }
// app/layout.tsx
import { ProductProvider } from "@/app/ProductContest"; // Ensure the correct path
import { CartProvider } from "@/components/CardContext"; // Ensure this path is correct
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Ordering App",
  description: "Order your favorite food items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={inter.className}>
          <ProductProvider>
            <CartProvider>{children}</CartProvider>
          </ProductProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
