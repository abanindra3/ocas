import Link from 'next/link'; // Use Next.js Link
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import UserTypeSelection from '@/components/UserTypeSelection'; // Ensure this is being used if needed
import setUserType from '@/components/UserTypeSelection'; // Check if this needs to be invoked somewhere

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  rating: number;
  image: string;
}

interface CustomerDashboardProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CustomerDashboard({ cart, setCart }: CustomerDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center py-4 px-6 bg-blue-800 text-white rounded-lg mb-8 shadow-lg">
        <Link href="/dashboard" className="text-3xl font-bold hover:text-gray-200">
          Canteen Dashboard
        </Link>
        <div className="flex space-x-6">
          <Link href="/dashboard" className="hover:text-gray-200">
            <AiOutlineHome size={28} />
          </Link>
          <Link href="/cart" className="hover:text-gray-200">
            <AiOutlineShoppingCart size={28} />
          </Link>
          <Link href="/profile" className="hover:text-gray-200">
            <AiOutlineUser size={28} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Your Canteen Dashboard</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card Links */}
          <Link href="/products">
            <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">Browse Products</CardTitle>
                <CardDescription>Explore our delicious menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Discover a wide range of meals, snacks, and beverages.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/orders">
            <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">Recent Orders</CardTitle>
                <CardDescription>View your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Check the status of recent orders and reorder favorites.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/favorites">
            <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">Favorites & Re-order</CardTitle>
                <CardDescription>Quick access to your favorite items</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reorder your most-loved items with a single click.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/feedback">
            <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">Feedback Submission</CardTitle>
                <CardDescription>Share your experience with us</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Help us improve by providing feedback on orders and items.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/personalized-suggestions">
            <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">Personalized Suggestions</CardTitle>
                <CardDescription>Recommended items just for you</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Explore items based on your order history and preferences.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
        <p className="text-gray-300">
          © 2024 Canteen Automation System | 
          <Link href="/support" className="hover:underline">
            Support
          </Link> 
          | 
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}


