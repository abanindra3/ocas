// OrdersPage.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: number;
  date: string;
  items: string[];  
  total: number;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      // Load orders from localStorage with validation
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        // Validate that orders have the correct structure
        const validOrders = parsedOrders.map((order: any) => ({
          id: order.id || Date.now(),
          date: order.date || new Date().toLocaleDateString(),
          items: Array.isArray(order.items) ? order.items : [],  // Ensure items is always an array
          total: order.total || 0,
          status: order.status || 'Processing'
        }));
        setOrders(validOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]); // Set to empty array if there's an error
    }
  }, []);

  const renderItems = (items: string[]) => {
    if (!Array.isArray(items) || items.length === 0) {
      return 'No items';
    }
    return items.join(', ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold text-gray-800">
            Canteen Dashboard
          </Link>
          <Link href="/cart" className="text-xl font-bold text-gray-800">
            Cart
          </Link>
        </div>
      </nav>

      {/* Orders Content */}
      <div className="p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold text-white">Your Recent Orders</h1>
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="transition-transform hover:scale-105">
                  <CardHeader>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>{order.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">Items: {renderItems(order.items)}</p>
                    <p className="text-lg font-bold">Total: ${(order.total || 0).toFixed(2)}</p>
                    <p className="mt-2 text-sm font-medium text-blue-600">Status: {order.status || 'Processing'}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

