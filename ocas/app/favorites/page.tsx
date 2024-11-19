'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { AiOutlineArrowLeft, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import CustomerDashboard from "@/app/dashboard/page"
interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  lastOrdered: string
}

const mockFavorites: FavoriteItem[] = [
  {id: 1, name: "Veggie Burger", price: 45,  image: "vburg.webp" , lastOrdered: "2024-03-10" },
  { id: 2, name: "Chicken Sandwich", price: 40,   image: "chwich.webp" , lastOrdered: "2024-03-08" },
  { id: 3, name: "Veg Pasta", price: 40,  image: "vpasta.webp", lastOrdered: "2024-03-05" },
  { id: 4, name: "Fish Finger", price: 60,  image: 'ffinger.webp', lastOrdered: "2024-03-01" },
]

export default function FavoritesAndReorders() {
  const router = useRouter()
  const { toast } = useToast()
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites)

  const handleReorder = (item: FavoriteItem) => {
    toast({
      title: "Item Reordered",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFavorite = (itemId: number) => {
    setFavorites(favorites.filter(item => item.id !== itemId))
    toast({
      title: "Favorite Removed",
      description: "The item has been removed from your favorites.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-8">
      <Button
        variant="ghost"
        onClick={() => router.push('/CustomerDashboard')}
        className="mb-8 flex items-center text-red-600 hover:text-red-800"
      >
        <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-red-800">Favorites & Reorders</CardTitle>
          <CardDescription>Quickly reorder your favorite items or manage your favorites list.</CardDescription>
        </CardHeader>
        <CardContent>
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500 my-8">You haven't added any favorites yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {favorites.map((item) => (
                <Card key={item.id} className="flex overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">Last ordered: {item.lastOrdered}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      <div className="space-x-2">
                        <Button size="sm" onClick={() => handleReorder(item)}>
                          <AiOutlineShoppingCart className="mr-2" /> Reorder
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRemoveFavorite(item.id)}>
                          <AiOutlineHeart className="mr-2" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}