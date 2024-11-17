
'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AiOutlineHome, AiOutlinePlus, AiOutlineEdit, AiOutlineLogout, AiOutlineStar } from 'react-icons/ai'
import { FaLeaf, FaShoppingCart, FaComments, FaLightbulb } from 'react-icons/fa'
import { useToast } from "@/components/ui/use-toast"

interface Product {
  id: number
  name: string
  price: number
  stock: number
  isVeg: boolean
  rating: number
  image: string
}

interface Order {
  id: number
  items: string[]
  total: number
  status: 'processing' | 'dispatched' | 'delivered'
  date: string
}

interface Feedback {
  id: number
  user: string
  comment: string
  rating: number
  date: string
}

interface Suggestion {
  id: number
  user: string
  suggestion: string
  date: string
}

interface AdminDashboardProps {
  initialProducts?: Product[]
  setUserType: (userType: 'admin' | 'customer' | null) => void
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  initialProducts = [],
  setUserType 
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", isVeg: false, image: "" })
  const [activeTab, setActiveTab] = useState("inventory")
  const [orders, setOrders] = useState<Order[]>([])
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls
        setOrders([
          { id: 1, items: ['Burger', 'Fries'], total: 15.99, status: 'processing', date: '2023-06-01' },
          { id: 2, items: ['Pizza', 'Coke'], total: 20.99, status: 'dispatched', date: '2023-06-02' },
        ])
        setFeedbacks([
          { id: 1, user: 'John Doe', comment: 'Great food!', rating: 5, date: '2023-06-01' },
          { id: 2, user: 'Jane Smith', comment: 'Good service', rating: 4, date: '2023-06-02' },
        ])
        setSuggestions([
          { id: 1, user: 'Alice Johnson', suggestion: 'Add more vegan options', date: '2023-06-01' },
          { id: 2, user: 'Bob Williams', suggestion: 'Extend opening hours', date: '2023-06-02' },
        ])
      } catch (error) {
        console.error('Error fetching data:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const newProductData: Product = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        isVeg: newProduct.isVeg,
        rating: 0,
        image: newProduct.image || "/api/placeholder/200/200",
      }
      setProducts([...products, newProductData])
      setNewProduct({ name: "", price: "", stock: "", isVeg: false, image: "" })
      toast({
        title: "Product Added",
        description: `${newProductData.name} has been added to the inventory.`,
      })
    }
  }

  const handleUpdateStock = (id: number, newStock: string) => {
    const updatedStock = parseInt(newStock)
    if (!isNaN(updatedStock) && updatedStock >= 0) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, stock: updatedStock } : product
        )
      )
      toast({
        title: "Stock Updated",
        description: `Product stock has been updated to ${updatedStock}.`,
      })
    }
  }

  const handleUpdateOrderStatus = (orderId: number, newStatus: 'processing' | 'dispatched' | 'delivered') => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} status changed to ${newStatus}.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading dashboard...</p>
      </div>
    )
  }

  const renderInventory = () => {
    if (products.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No products in inventory</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-between">
                {product.name}
                {product.isVeg && <FaLeaf className="text-green-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-4">Price: ₹{product.price.toFixed(2)}</p>
              <div className="flex items-center justify-between">
                <Label htmlFor={`stock-${product.id}`} className="text-gray-600">Current Stock</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id={`stock-${product.id}`}
                    value={product.stock.toString()}
                    onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                    className="w-20 text-right"
                    type="number"
                    min="0"
                  />
                  <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                    {product.stock > 10 ? "In Stock" : "Low Stock"}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <AiOutlineEdit className="mr-2" />
                  Edit Product
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors">
              Admin Dashboard
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                <AiOutlineHome size={24} />
              </Link>
              <Button
                variant="ghost"
                onClick={() => setUserType(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <AiOutlineLogout size={24} />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 rounded-xl bg-gray-200 p-1">
            <TabsTrigger value="inventory" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700">
              <AiOutlineStar className="mr-2 inline-block" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="add-product" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700">
              <AiOutlinePlus className="mr-2 inline-block" />
              Add Product
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700">
              <FaShoppingCart className="mr-2 inline-block" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700">
              <FaComments className="mr-2 inline-block" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700">
              <FaLightbulb className="mr-2 inline-block" />
              Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Inventory</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              {renderInventory()}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="add-product" className="mt-8">
            <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-stock">Initial Stock</Label>
                  <Input
                    id="product-stock"
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="product-veg"
                    checked={newProduct.isVeg}
                    onCheckedChange={(checked) => setNewProduct({ ...newProduct, isVeg: checked })}
                  />
                  <Label htmlFor="product-veg">Vegetarian</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-image">Product Image URL</Label>
                  <Input
                    id="product-image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  <AiOutlinePlus className="mr-2" />
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-xl font-semibold text-gray-800">Order #{order.id}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="font-semibold mb-2">Items: {order.items.join(', ')}</p>
                      <p className="text-lg font-bold text-gray-700 mb-4">Total: ₹{order.total.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Date: {order.date}</p>
                        <Select
                          value={order.status}
                          onValueChange={(value: 'processing' | 'dispatched' | 'delivered') => handleUpdateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="dispatched">Dispatched</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="feedback" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Feedback</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-xl font-semibold text-gray-800">Feedback from {feedback.user}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-2">{feedback.comment}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Date: {feedback.date}</p>
                        <Badge>{feedback.rating} / 5</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Suggestions</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-xl font-semibold text-gray-800">Suggestion from {suggestion.user}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-2">{suggestion.suggestion}</p>
                      <p className="text-gray-600">Date: {suggestion.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminDashboard