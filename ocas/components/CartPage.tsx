import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  rating: number;
  image: string;
}

interface CartPageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateProductStock: (productId: number, quantity: number) => void;
}

export default function CartPage({ cart, setCart, updateProductStock }: CartPageProps) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [cart]);

  const updateQuantity = (id: number, newQuantity: number) => {
    const prevItem = cart.find((item) => item.id === id);
    if (prevItem) {
      const quantityDifference = prevItem.quantity - newQuantity;
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, newQuantity || 1) } : item
        )
      );
      updateProductStock(id, quantityDifference);
    }
  };

  const removeItem = (id: number) => {
    const removedItem = cart.find((item) => item.id === id);
    if (removedItem) {
      setCart(cart.filter((item) => item.id !== id));
      updateProductStock(id, removedItem.quantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg mb-8 shadow-lg">
        <Link to="/products" className="text-3xl font-bold text-gray-900 hover:text-gray-700">
          Products
        </Link>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-700">
            <AiOutlineHome size={28} />
          </Link>
          <Link to="/cart" className="hover:text-gray-700">
            <AiOutlineShoppingCart size={28} />
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cart.map((item) => (
          <Card key={item.id} className="shadow-lg rounded-lg bg-white">
            <CardHeader className="p-4">
              <CardTitle className="text-xl font-semibold text-gray-900">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <p className={`text-lg ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                  {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </p>
                <p className="text-lg font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`quantity-${item.id}`} className="text-gray-700">Quantity:</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-lg font-medium text-gray-900">
                Total: ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="shadow-lg bg-green-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-800">Cart Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-gray-800">Total: ₹{total.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/payment')} className="w-full bg-green-600 text-white">
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
