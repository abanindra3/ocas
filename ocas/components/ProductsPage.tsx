import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button as ShadcnButton, ButtonProps } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  isVeg: boolean;
  rating: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  rating: number; 
  image: string; 
}

interface ProductsPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, setProducts, cart, setCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showVegOnly, setShowVegOnly] = useState(false);

  // const addToCart = (product: Product) => {
  //   if (product.stock > 0) {
  //     const cartItem = { id: product.id, name: product.name, price: product.price, quantity: 1, isVeg: product.isVeg, rating:product.rating, image: product.image };
  //     setCart([...cart, cartItem]);
  //     setProducts(products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)));
  //   }
  // };
  const addToCart = (product: Product) => {
    if (product.stock > 0) {
      // Check if the product is already in the cart
      const existingCartItem = cart.find((item) => item.id === product.id);
      if (existingCartItem) {
        // Update the quantity of the existing cart item
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Add the product as a new cart item
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          isVeg: product.isVeg,
          rating: product.rating,
          image: product.image,
        };
        setCart([...cart, cartItem]);
      }
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        )
      );
    }
  };
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const vegMatch = showVegOnly ? product.isVeg : true;
    return nameMatch && vegMatch;
  }).sort((a, b) => {
    if (sortBy === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    } else {
      return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <Link to="/cart" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition-colors duration-300">
            Go to Cart
          </Link>
          <Link to="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors duration-300">
            Back to Dashboard
          </Link>
          <ShadcnButton onClick={() => setShowVegOnly(!showVegOnly)} className={`py-2 px-4 rounded-md ${showVegOnly ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}>
            {showVegOnly ? 'Show All' : 'Veg Only'}
          </ShadcnButton>
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
          <ShadcnButton
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"
          >
            {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </ShadcnButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-4">
              <img src={`/images/${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
              <CardTitle className="mt-2 text-lg font-semibold">{product.name}</CardTitle>
              <CardDescription className="text-sm text-gray-400">{product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xl font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            </CardContent>
            <CardFooter className="p-4">
              <ShadcnButton 
                onClick={() => addToCart(product)} 
                disabled={product.stock === 0} 
                className={`w-full py-2 rounded-lg ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </ShadcnButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

