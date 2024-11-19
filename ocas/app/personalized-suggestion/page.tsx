// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { useToast } from '@/components/ui/use-toast'
// import { AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
// import { MdLocalOffer } from 'react-icons/md'

// interface SuggestedItem {
//   id: number
//   name: string
//   price: number
//   image: string
//   category: string
//   isNew: boolean
// }

// const mockSuggestions: SuggestedItem[] = [
//   { id: 1, name: "Veggie Burger", price: 45,  image: '/images/vburg.webp',category: "Vegetarian", isNew: true },
//   {id: 2, name: "Chicken Sandwich", price: 40, image: "/images/chwich.webp", category: "Healthy", isNew: false },
//   {id: 3, name: "Veg Pasta", price: 40,   image: "/images/vpasta.webp", category: "Vegetarian", isNew: false },

// ]



// export default function PersonalizedSuggestions() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [suggestions, setSuggestions] = useState<SuggestedItem[]>(mockSuggestions)

//   const handleAddToCart = (item: SuggestedItem) => {
//     toast({
//       title: "Added to Cart",
//       description: `${item.name} has been added to your cart.`,
//     })
//   }

//   const handleAddToFavorites = (item: SuggestedItem) => {
//     toast({
//       title: "Added to Favorites",
//       description: `${item.name} has been added to your favorites.`,
//     })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-8">
//       <Button
//         variant="ghost"
//         onClick={() => router.push('/dashboard')}
//         className="mb-8 flex items-center text-yellow-600 hover:text-yellow-800"
//       >
//         <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
//       </Button>

//       <Card className="max-w-6xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-yellow-800">Personalized Suggestions</CardTitle>
//           <CardDescription>Discover new items tailored just for you based on your preferences and order history.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {suggestions.map((item) => (
//               <Card key={item.id} className="overflow-hidden">
//                 <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold">₹{item.price.toFixed(2)}</span>
//                     <Badge variant="secondary">{item.category}</Badge>
//                   </div>
//                   {item.isNew && (
//                     <Badge className="mb-2 bg-yellow-500 text-white">New</Badge>
//                   )}
//                   <div className="flex justify-between items-center mt-4">
//                     <Button size="sm" onClick={() => handleAddToCart(item)}>
//                       <AiOutlineShoppingCart className="mr-2" /> Add to Cart
//                     </Button>
//                     <Button size="sm" variant="outline" onClick={() => handleAddToFavorites(item)}>
//                       <AiOutlineHeart className="mr-2" /> Favorite
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="max-w-6xl mx-auto mt-8">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-yellow-800">Special Offers</CardTitle>
//           <CardDescription>Check out these limited-time deals on items you might like!</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 md:grid-cols-2">
//             <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-6">
//               <div className="flex items-center mb-4">
//                 <MdLocalOffer className="text-yellow-600 text-3xl mr-2" />
//                 <h4 className="text-xl font-semibold">Buy One, Get One 50% Off</h4>
//               </div>
//               <p className="mb-4">On all salads and wraps. Limited time offer!</p>
//               <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
//                 View Eligible Items
//               </Button>
//             </Card>
//             <Card className="bg-gradient-to-r from-green-100 to-green-200 p-6">
//               <div className="flex items-center mb-4">
//                 <MdLocalOffer className="text-green-600 text-3xl mr-2" />
//                 <h4 className="text-xl font-semibold">15% Off Your Next Order</h4>
//               </div>
//               <p className="mb-4">Use code HEALTHY15 at checkout. Expires in 24 hours!</p>
//               <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
//                 Apply Coupon
//               </Button>
//             </Card>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdLocalOffer } from 'react-icons/md';

interface SuggestedItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew: boolean;
}

const mockSuggestions: SuggestedItem[] = [
  { id: 1, name: "Veggie Burger", price: 45, image: "/images/vburg.webp", category: "Vegetarian", isNew: true },
  { id: 2, name: "Chicken Sandwich", price: 40, image: "/images/chwich.webp", category: "Healthy", isNew: false },
  { id: 3, name: "Veg Pasta", price: 40, image: "/images/vpasta.webp", category: "Vegetarian", isNew: false },
];

export default function PersonalizedSuggestions() {
  const router = useRouter();
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<SuggestedItem[]>(mockSuggestions);

  const handleAddToCart = (item: SuggestedItem) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleAddToFavorites = (item: SuggestedItem) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} has been added to your favorites.`,
    });
  };

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/dashboard.webp)' }}
    >
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard')}
        className="mb-8 flex items-center text-yellow-600 hover:text-yellow-800"
      >
        <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
      </Button>

      <Card className="max-w-6xl mx-auto bg-black/70 text-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Personalized Suggestions</CardTitle>
          <CardDescription>Discover new items tailored just for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden bg-gray-800/90 hover:scale-105 transition-transform rounded-lg"
              >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">₹{item.price.toFixed(2)}</span>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  {item.isNew && <Badge className="mb-2 bg-yellow-500 text-white">New</Badge>}
                  <div className="flex justify-between items-center mt-4">
                    <Button size="sm" onClick={() => handleAddToCart(item)}>
                      <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddToFavorites(item)}>
                      <AiOutlineHeart className="mr-2" /> Favorite
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-6xl mx-auto mt-8 bg-black/70 text-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Special Offers</CardTitle>
          <CardDescription>Check out these limited-time deals!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6 bg-gradient-to-r from-yellow-100/70 to-yellow-200/70">
              <div className="flex items-center mb-4">
                <MdLocalOffer className="text-yellow-600 text-3xl mr-2" />
                <h4 className="text-xl font-semibold">Buy One, Get One 50% Off</h4>
              </div>
              <p className="mb-4">On all salads and wraps. Limited time offer!</p>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                View Eligible Items
              </Button>
            </Card>
            <Card className="p-6 bg-gradient-to-r from-green-100/70 to-green-200/70">
              <div className="flex items-center mb-4">
                <MdLocalOffer className="text-green-600 text-3xl mr-2" />
                <h4 className="text-xl font-semibold">15% Off Your Next Order</h4>
              </div>
              <p className="mb-4">Use code HEALTHY15 at checkout. Expires in 24 hours!</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Apply Coupon
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
