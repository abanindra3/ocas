'use client'

import React, { createContext, useContext, useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  isVeg: boolean
  rating: number
  image: string
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateStock: (id: number, newStock: number) => void
}

// Initial products data with correct image paths
const initialProducts: Product[] = [
  { id: 1, name: "Veggie Burger", price: 45, stock: 50, isVeg: true, rating: 4.9, image: "/images/vburg.webp" },
  { id: 2, name: "Chicken Sandwich", price: 40, stock: 40, isVeg: false, rating: 5.0, image: "/images/chwich.webp" },
  { id: 3, name: "Veg Pasta", price: 40, stock: 30, isVeg: true, rating: 4.8, image: "/images/vpasta.webp" },
  { id: 4, name: "Fish Finger", price: 60, stock: 50, isVeg: false, rating: 4.6, image: '/images/ffinger.webp' },
  { id: 5, name: "Chicken Biryani", price: 100, stock: 40, isVeg: false, rating: 4.5, image: "/images/cbiryani.webp" },
  { id: 6, name: "Bada Paw", price: 35, stock: 30, isVeg: true, rating: 4.4, image: "/images/badapaw.webp" },
  { id: 7, name: "Idli", price: 30, stock: 50, isVeg: true, rating: 4.2, image: '/images/idli.webp' },
  { id: 8, name: "Dosa", price: 50, stock: 40, isVeg: true, rating: 4.5, image: "/images/dosa.webp" },
  { id: 9, name: "Veg Momos", price: 50, stock: 30, isVeg: true, rating: 4.75, image: "/images/vmomos.webp" },
  { id: 10, name: "Chicken Momos", price: 60, stock: 30, isVeg: false, rating: 4.9, image: "/images/nvmomos.webp" },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addProduct = (product: Product) => {
    // Ensure new products have the correct image path format
    const newProduct = {
      ...product,
      image: product.image.startsWith('/images/') ? product.image : `/images/${product.image}`
    }
    setProducts(prev => [...prev, newProduct])
  }

  const updateStock = (id: number, newStock: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    )
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateStock }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}