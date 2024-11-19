// 'use client';

// import Link from 'next/link';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
// import { BiLogOut } from 'react-icons/bi';
// import { SignOutButton } from "@clerk/nextjs";
// import { useState } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   isVeg: boolean;
//   rating: number;
//   image: string;
// }

// export default function CustomerDashboard() {
//   // Move cart state to component level
//   const [cart, setCart] = useState<CartItem[]>([]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Top Navigation Bar */}
//       <header className="flex justify-between items-center py-4 px-6 bg-blue-800 text-white rounded-lg mb-8 shadow-lg">
//         <Link href="/dashboard" className="text-3xl font-bold hover:text-gray-200">
//           Canteen Dashboard
//         </Link>
//         <div className="flex space-x-6">
//           <Link href="/dashboard" className="hover:text-gray-200">
//             <AiOutlineHome size={28} />
//           </Link>
//           <Link href="/cart" className="hover:text-gray-200">
//             <div className="relative">
//               <AiOutlineShoppingCart size={28} />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {cart.length}
//                 </span>
//               )}
//             </div>
//           </Link>
//           <Link href="/profile" className="hover:text-gray-200">
//             <AiOutlineUser size={28} />
//           </Link>
//           <SignOutButton>
//             <button className="hover:text-gray-200 transition-colors">
//               <BiLogOut size={28} />
//             </button>
//           </SignOutButton>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow mx-auto max-w-4xl space-y-8">
//         <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Your Canteen Dashboard</h1>

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {/* Quick Action Cards */}
//           <Link href="/products">
//             <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
//               <CardHeader>
//                 <CardTitle className="text-2xl text-blue-800">Browse Products</CardTitle>
//                 <CardDescription>Explore our delicious menu items</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Discover a wide range of meals, snacks, and beverages.</p>
//               </CardContent>
//             </Card>
//           </Link>

//           <Link href="/orders">
//             <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
//               <CardHeader>
//                 <CardTitle className="text-2xl text-blue-800">Recent Orders</CardTitle>
//                 <CardDescription>View your order history</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Check the status of recent orders and reorder favorites.</p>
//               </CardContent>
//             </Card>
//           </Link>

//           <Link href="/favorites">
//             <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
//               <CardHeader>
//                 <CardTitle className="text-2xl text-blue-800">Favorites & Re-order</CardTitle>
//                 <CardDescription>Quick access to your favorite items</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Reorder your most-loved items with a single click.</p>
//               </CardContent>
//             </Card>
//           </Link>

//           <Link href="/feedback">
//             <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
//               <CardHeader>
//                 <CardTitle className="text-2xl text-blue-800">Feedback Submission</CardTitle>
//                 <CardDescription>Share your experience with us</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Help us improve by providing feedback on orders and items.</p>
//               </CardContent>
//             </Card>
//           </Link>

//           <Link href="/personalized-suggestions">
//             <Card className="transition-transform hover:scale-105 shadow-lg bg-white rounded-lg">
//               <CardHeader>
//                 <CardTitle className="text-2xl text-blue-800">Personalized Suggestions</CardTitle>
//                 <CardDescription>Recommended items just for you</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>Explore items based on your order history and preferences.</p>
//               </CardContent>
//             </Card>
//           </Link>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="mt-12 py-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
//         <p className="text-gray-300">
//           © 2024 Canteen Automation System | 
//           <Link href="/support" className="hover:underline ml-2 mr-2">
//             Support
//           </Link> 
//           | 
//           <Link href="/privacy" className="hover:underline ml-2">
//             Privacy Policy
//           </Link>
//         </p>
//       </footer>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { SignOutButton } from "@clerk/nextjs";
import { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  rating: number;
  image: string;
}

export default function CustomerDashboard() {
  const [cart, setCart] = useState<CartItem[]>([]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Image */}
      <Image
        src="/images/dashboard.webp"
        alt="Dashboard Background"
        fill
        className="absolute inset-0 object-cover opacity-20"
        quality={75}
      />
      {/* Top Navigation Bar */}
      <header className="relative z-10 flex justify-between items-center py-4 px-6 bg-blue-800 text-white rounded-lg mb-8 shadow-lg">
        <Link href="/dashboard" className="text-3xl font-bold hover:text-gray-200">
          Canteen Dashboard
        </Link>
        <div className="flex space-x-6">
          <Link href="/dashboard" className="hover:text-gray-200">
            <AiOutlineHome size={28} />
          </Link>
          <Link href="/cart" className="hover:text-gray-200">
            <div className="relative">
              <AiOutlineShoppingCart size={28} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
          <Link href="/profile" className="hover:text-gray-200">
            <AiOutlineUser size={28} />
          </Link>
          <SignOutButton>
            <button className="hover:text-gray-200 transition-colors">
              <BiLogOut size={28} />
            </button>
          </SignOutButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow mx-auto max-w-4xl space-y-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center">Welcome to Your Canteen Dashboard</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Action Cards */}
          {[
            { title: "Browse Products", description: "Explore our delicious menu items", href: "/products" },
            { title: "Recent Orders", description: "View your order history", href: "/orders" },
            { title: "Favorites & Re-order", description: "Quick access to your favorite items", href: "/favorites" },
            { title: "Feedback Submission", description: "Share your experience with us", href: "/feedback" },
            { title: "Personalized Suggestions", description: "Recommended items just for you", href: "/personalized-suggestion" },
          ].map(({ title, description, href }, idx) => (
            <Link key={idx} href={href}>
              <Card className="p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg shadow-lg transition-transform hover:scale-105">
                <div className="bg-black rounded-lg p-4">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{title}</CardTitle>
                    <CardDescription className="text-gray-400">{description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{description}</p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 py-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
        <p className="text-gray-300">
          © 2024 Canteen Automation System |
          <Link href="/support" className="hover:underline ml-2 mr-2">
            Support
          </Link>
          |
          <Link href="/privacy" className="hover:underline ml-2">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
