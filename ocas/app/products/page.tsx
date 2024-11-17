// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { ChevronDown, ChevronUp } from 'lucide-react';

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

// interface ProductsPageProps {
//   products?: Product[];
//   setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
//   cart?: CartItem[];
//   setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
// }

// const ProductsPage: React.FC<ProductsPageProps> = ({ 
//   products = [], // Provide default empty array
//   setProducts = () => {}, // Provide default noop function
//   cart = [], 
//   setCart = () => {} 
// }) => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('rating');
//   const [sortDirection, setSortDirection] = useState('desc');
//   const [showVegOnly, setShowVegOnly] = useState(false);

//   const addToCart = (product: Product) => {
//     if (!setCart || !setProducts) {
//       console.error('Cart management functions are not available');
//       return;
//     }

//     if (product.stock > 0) {
//       const existingCartItem = cart.find((item) => item.id === product.id);
//       if (existingCartItem) {
//         setCart(
//           cart.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         );
//       } else {
//         const cartItem = {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//           isVeg: product.isVeg,
//           rating: product.rating,
//           image: product.image,
//         };
//         setCart([...cart, cartItem]);
//       }
//       setProducts(
//         products.map((p) =>
//           p.id === product.id ? { ...p, stock: p.stock - 1 } : p
//         )
//       );
//     }
//   };

//   // Add error state for when products are not available
//   if (!Array.isArray(products)) {
//     return (
//       <div className="p-6 bg-gray-900 min-h-screen text-white flex items-center justify-center">
//         <Card className="bg-gray-800 p-6">
//           <CardHeader>
//             <CardTitle>Error</CardTitle>
//             <CardDescription>Unable to load products. Please try again later.</CardDescription>
//           </CardHeader>
//         </Card>
//       </div>
//     );
//   }

//   const filteredProducts = products.filter((product) => {
//     const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const vegMatch = showVegOnly ? product.isVeg : true;
//     return nameMatch && vegMatch;
//   }).sort((a, b) => {
//     if (sortBy === 'price') {
//       return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
//     } else {
//       return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
//     }
//   });

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex space-x-3">
//           <Button
//             onClick={() => router.push('/cart')}
//             className="bg-blue-600 hover:bg-blue-800 text-white"
//           >
//             Go to Cart ({cart.length})
//           </Button>
//           <Button
//             onClick={() => router.push('/dashboard')}
//             className="bg-gray-700 hover:bg-gray-600 text-white"
//           >
//             Back to Dashboard
//           </Button>
//           <Button
//             onClick={() => setShowVegOnly(!showVegOnly)}
//             className={`${showVegOnly ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
//           >
//             {showVegOnly ? 'Show All' : 'Veg Only'}
//           </Button>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Label htmlFor="search" className="text-gray-400">Search:</Label>
//           <Input
//             id="search"
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="bg-gray-800 text-white border border-gray-700 rounded-lg"
//           />
//           <Label htmlFor="sort" className="text-gray-400">Sort by:</Label>
//           <select
//             id="sort"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="bg-gray-800 text-white px-2 py-1 rounded-lg border border-gray-700"
//           >
//             <option value="rating">Rating</option>
//             <option value="price">Price</option>
//           </select>
//           <Button
//             onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
//             className="bg-gray-700 hover:bg-gray-600 p-2"
//             size="icon"
//           >
//             {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//           </Button>
//         </div>
//       </div>
      
//       {filteredProducts.length === 0 ? (
//         <div className="text-center py-10">
//           <p className="text-gray-400">No products found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <Card key={product.id} className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
//               <CardHeader className="p-4">
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={`/images/${product.image}`}
//                     alt={product.name}
//                     fill
//                     className="object-cover rounded-lg"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
//                 <CardTitle className="mt-2 text-lg font-semibold">{product.name}</CardTitle>
//                 <CardDescription className="text-sm text-gray-400">
//                   {product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <p className="text-xl font-bold">₹{product.price}</p>
//                 <p className="text-sm text-gray-500">Stock: {product.stock}</p>
//                 <p className="text-sm text-gray-500">Rating: {product.rating}</p>
//               </CardContent>
//               <CardFooter className="p-4">
//                 <Button
//                   onClick={() => addToCart(product)}
//                   disabled={product.stock === 0}
//                   className={`w-full ${product.stock === 0 ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
//                 >
//                   {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp } from 'lucide-react'

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

export default function ProductsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [sortDirection, setSortDirection] = useState('desc')
  const [showVegOnly, setShowVegOnly] = useState(false)
  
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

  const addToCart = (product: Product) => {
    if (product.stock > 0) {
      const existingCartItem = cart.find((item) => item.id === product.id)
      if (existingCartItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      } else {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          isVeg: product.isVeg,
          rating: product.rating,
          image: product.image,
        }
        setCart([...cart, cartItem])
      }
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      )
    }
  }

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const vegMatch = showVegOnly ? product.isVeg : true
    return nameMatch && vegMatch
  }).sort((a, b) => {
    if (sortBy === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price
    } else {
      return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating
    }
  })

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <Button
            onClick={() => router.push('/cart')}
            className="bg-blue-600 hover:bg-blue-800 text-white"
          >
            Go to Cart ({cart.length})
          </Button>
          <Button
            onClick={() => router.push('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => setShowVegOnly(!showVegOnly)}
            className={`${showVegOnly ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
          >
            {showVegOnly ? 'Show All' : 'Veg Only'}
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Label htmlFor="search" className="text-gray-400">Search:</Label>
          <Input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg"
          />
          <Label htmlFor="sort" className="text-gray-400">Sort by:</Label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded-lg border border-gray-700"
          >
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
          <Button
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="bg-gray-700 hover:bg-gray-600 p-2"
            size="icon"
          >
            {sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-4">
                <div className="relative w-full h-48">
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardTitle className="mt-2 text-lg font-semibold">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  {product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-xl font-bold">₹{product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-sm text-gray-500">Rating: {product.rating}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full ${product.stock === 0 ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}