
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import {Button} from '@/components/ui/button';
import UserTypeSelection  from '@/components/UserTypeSelection';
import setUserType from '@/components/UserTypeSelection';


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
{/* <Button
        onClick={() => setUserType(' ')}
        className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 mb-6"
      >
        Back to Selection
</Button> */}
export default function CustomerDashboard({ cart, setCart }: CustomerDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center py-4 px-6 bg-blue-800 text-white rounded-lg mb-8 shadow-lg">
        <Link to="/dashboard" className="text-3xl font-bold hover:text-gray-200">
          Canteen Dashboard
        </Link>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-200">
            <AiOutlineHome size={28} />
          </Link>
          <Link to="/cart" className="hover:text-gray-200">
            <AiOutlineShoppingCart size={28} />
          </Link>

          <Link to="/ProfilePage" className="hover:text-gray-200">
            <AiOutlineUser size={28} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Your Canteen Dashboard</h1>
      
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/products">
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

          <Link to="/orders">
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

          <Link to="/FavoritesAndReorders">
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

          <Link to="/FeedbackSubmission">
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

          <Link to="/PersonalizedSuggestions">
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
          © 2024 Canteen Automation System | <Link to="/support" className="hover:underline">Support</Link> | <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}



/////////////////////////////////////////////////////////////////////////////////////

// 'use client'
// // import { Link } from 'react-router-dom';
// import { useState } from 'react'
// import Link from 'next/link'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser, AiOutlineBell } from 'react-icons/ai'
// import { MdFavorite, MdFeedback, MdLightbulb } from 'react-icons/md'
// import { FaHistory } from 'react-icons/fa'
// import { useToast } from '@/components/ui/use-toast'

// interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   isVeg: boolean
//   rating: number
//   image: string
// }

// interface CustomerDashboardProps {
//   cart: CartItem[]
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
// }

// export default function CustomerDashboard({ cart, setCart }: CustomerDashboardProps) {
//   const { toast } = useToast()
//   const [notifications, setNotifications] = useState(3)

//   const clearNotifications = () => {
//     setNotifications(0)
//     toast({
//       title: "Notifications cleared",
//       description: "You have no new notifications.",
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Top Navigation Bar */}
//       <header className="sticky top-0 z-10 bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <Link href="/dashboard" className="text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors">
//               Canteen Dashboard
//             </Link>
//             <nav className="flex items-center space-x-6">
//               <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
//                 <AiOutlineHome size={28} />
//               </Link>
//               <Link href="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
//                 <div className="relative">
//                   <AiOutlineShoppingCart size={28} />
//                   {cart.length > 0 && (
//                     <Badge variant="destructive" className="absolute -top-2 -right-2">
//                       {cart.length}
//                     </Badge>
//                   )}
//                 </div>
//               </Link>
//               <Link href="/profile" className="text-gray-600 hover:text-blue-600 transition-colors">
//                 <AiOutlineUser size={28} />
//               </Link>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="relative"
//                 onClick={clearNotifications}
//               >
//                 <AiOutlineBell size={28} />
//                 {notifications > 0 && (
//                   <Badge variant="destructive" className="absolute -top-2 -right-2">
//                     {notifications}
//                   </Badge>
//                 )}
//               </Button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Welcome to Your Canteen Dashboard</h1>

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           <DashboardCard
          
//             href="/products"
//             icon={<AiOutlineShoppingCart className="w-8 h-8 text-blue-500" />}
//             title="Browse Products"
//             description="Explore our delicious menu items"
//           >
//             Discover a wide range of meals, snacks, and beverages.
//           </DashboardCard>

//           <DashboardCard
//             href="/orders"
//             icon={<FaHistory className="w-8 h-8 text-green-500" />}
//             title="Recent Orders"
//             description="View your order history"
//           >
//             Check the status of recent orders and reorder favorites.
//           </DashboardCard>

//           <DashboardCard
//             href="/favorites"
//             icon={<MdFavorite className="w-8 h-8 text-red-500" />}
//             title="Favorites & Re-order"
//             description="Quick access to your favorite items"
//           >
//             Reorder your most-loved items with a single click.
//           </DashboardCard>

//           <DashboardCard
//             href="/feedback"
//             icon={<MdFeedback className="w-8 h-8 text-purple-500" />}
//             title="Feedback Submission"
//             description="Share your experience with us"
//           >
//             Help us improve by providing feedback on orders and items.
//           </DashboardCard>

//           <DashboardCard
//             href="/suggestions"
//             icon={<MdLightbulb className="w-8 h-8 text-yellow-500" />}
//             title="Personalized Suggestions"
//             description="Recommended items just for you"
//           >
//             Explore items based on your order history and preferences.
//           </DashboardCard>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-300 mb-4 md:mb-0">
//               © 2024 Canteen Automation System
//             </p>
//             <nav className="flex space-x-4">
//               <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
//                 Support
//               </Link>
//               <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
//                 Terms of Service
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// function DashboardCard({ href, icon, title, description, children }: {
//   href: string;
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Link href={href}>
//       <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full">
//         <CardHeader>
//           <div className="flex items-center space-x-4">
//             {icon}
//             <div>
//               <CardTitle className="text-2xl text-blue-800">{title}</CardTitle>
//               <CardDescription>{description}</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <p>{children}</p>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }