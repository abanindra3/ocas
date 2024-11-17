'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Home, ShoppingCart } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  isVeg: boolean
  rating: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const router = useRouter()

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('canteenCart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCart(parsedCart)
      // Calculate total
      const newTotal = parsedCart.reduce((sum: number, item: CartItem) => 
        sum + item.price * item.quantity, 0)
      setTotal(newTotal)
    }
  }, [])

  // Update quantity of an item
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCart(updatedCart)
    localStorage.setItem('canteenCart', JSON.stringify(updatedCart))
    
    // Update total
    const newTotal = updatedCart.reduce((sum, item) => 
      sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('canteenCart', JSON.stringify(updatedCart))
    
    // Update total
    const newTotal = updatedCart.reduce((sum, item) => 
      sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }

  // Handle checkout
  const handleCheckout = () => {
    // Clear cart
    localStorage.removeItem('canteenCart')
    setCart([])
    setTotal(0)
    // Redirect to checkout success page
    router.push('/payment')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg mb-8 shadow-lg">
        <Link href="/products" className="text-3xl font-bold text-gray-900 hover:text-gray-700">
          Products
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-gray-700">
            <Home size={28} />
          </Link>
          <Link href="/cart" className="hover:text-gray-700">
            <ShoppingCart size={28} />
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cart.length > 0 ? (
          <>
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
                        className="w-20"
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
            <div className="col-span-full mt-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">₹{total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Tax (5%)</p>
                      <p className="font-medium">₹{(total * 0.05).toFixed(2)}</p>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between">
                        <p className="text-lg font-semibold">Total</p>
                        <p className="text-lg font-semibold">₹{(total * 1.05).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl font-medium text-gray-800 mb-4">Your cart is empty.</p>
            <Button
              onClick={() => router.push('/products')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
