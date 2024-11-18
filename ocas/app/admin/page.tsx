'use client'

import { AdminDashboardContent } from '@/app/admin/AdminDashboardContent'

export default function AdminPage() {
  return <AdminDashboardContent />
}

//------------------------------------------------------------------------------------------------------------------------------
// 'use client'

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Switch } from "@/components/ui/switch"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { AiOutlineHome, AiOutlinePlus, AiOutlineEdit, AiOutlineLogout, AiOutlineStar } from 'react-icons/ai'
// import { FaLeaf, FaShoppingCart, FaComments, FaLightbulb } from 'react-icons/fa'
// import { useToast } from "@/components/ui/use-toast"
// import { useProductContext } from '@/app/ProductContest'
// import { SignOutButton } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { BiLogOut } from 'react-icons/bi';
// interface Product {
//   id: number
//   name: string
//   price: number
//   stock: number
//   isVeg: boolean
//   rating: number
//   image: string
// }

// interface Order {
//   id: number
//   items: string[]
//   total: number
//   status: 'processing' | 'dispatched' | 'delivered'
//   date: string
// }

// interface Feedback {
//   id: number
//   user: string
//   comment: string
//   rating: number
//   date: string
// }

// interface Suggestion {
//   id: number
//   user: string
//   suggestion: string
//   date: string
// }

// interface AdminDashboardProps {
//   initialProducts?: Product[]
//   setUserType: (userType: 'admin' | 'customer' | null) => void
// }

// const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
//   initialProducts = [],
//   setUserType 
// }) => {
//   // const [products, setProducts] = useState<Product[]>(initialProducts)
//   const [newProduct, setNewProduct] = useState({id:"", name: "", price: "", stock: "", isVeg: false, image: "" })
//   const [activeTab, setActiveTab] = useState("inventory")
//   const [orders, setOrders] = useState<Order[]>([])
//   const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
//   const [suggestions, setSuggestions] = useState<Suggestion[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate API calls
//         setOrders([
//           { id: 1, items: ['Burger', 'Fries'], total: 15.99, status: 'processing', date: '2023-06-01' },
//           { id: 2, items: ['Pizza', 'Coke'], total: 20.99, status: 'dispatched', date: '2023-06-02' },
//         ])
//         setFeedbacks([
//           { id: 1, user: 'John Doe', comment: 'Great food!', rating: 5, date: '2023-06-01' },
//           { id: 2, user: 'Jane Smith', comment: 'Good service', rating: 4, date: '2023-06-02' },
//         ])
//         setSuggestions([
//           { id: 1, user: 'Alice Johnson', suggestion: 'Add more vegan options', date: '2023-06-01' },
//           { id: 2, user: 'Bob Williams', suggestion: 'Extend opening hours', date: '2023-06-02' },
//         ])
//       } catch (error) {
//         console.error('Error fetching data:', error)
//         toast({
//           title: "Error",
//           description: "Failed to load dashboard data",
//           variant: "destructive",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [toast])
//   const { products,  addProduct, updateStock } = useProductContext();
// // Replace handleAddProduct with:
// const handleAddProduct = () => {
//   if (newProduct.name && newProduct.price && newProduct.stock) {
//     const newProductData = {
//       id: parseInt(newProduct.id),
//       name: newProduct.name,
//       price: parseFloat(newProduct.price),
//       stock: parseInt(newProduct.stock),
//       isVeg: newProduct.isVeg,
//       rating: 0,
//       image: newProduct.image || "/api/placeholder/200/200",
//     };
//     addProduct(newProductData);
//     setNewProduct({id:"", name: "", price: "", stock: "", isVeg: false, image: "" });
//     toast({
//       title: "Product Added",
//       description: `${newProductData.name} has been added to the inventory.`,
//     });
//   }
// };

// // Replace handleUpdateStock with:
// const handleUpdateStock = (id: number, newStock: string) => {
//   const updatedStock = parseInt(newStock);
//   if (!isNaN(updatedStock) && updatedStock >= 0) {
//     updateStock(id, updatedStock);
//     toast({
//       title: "Stock Updated",
//       description: `Product stock has been updated to ${updatedStock}.`,
//     });
//   }
// };
//   const handleUpdateOrderStatus = (orderId: number, newStatus: 'processing' | 'dispatched' | 'delivered') => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     )
//     toast({
//       title: "Order Status Updated",
//       description: `Order #${orderId} status changed to ${newStatus}.`,
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl">Loading dashboard...</p>
//       </div>
//     )
//   }


//   const renderInventory = () => {
//     if (!products || products.length === 0) {
//       return (
//         <div className="text-center py-8">
//           <p className="text-gray-500">No products in inventory</p>
//         </div>
//       );
//     }
  
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <Card key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <CardHeader className="bg-gray-50">
//               <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-between">
//                 {product.name}
//                 {product.isVeg && <FaLeaf className="text-green-500" />}
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="mb-4">
//                 <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
//               </div>
//               <p className="text-lg font-semibold text-gray-700 mb-4">Price: ₹{product.price.toFixed(2)}</p>
//               <div className="flex items-center justify-between">
//                 <Label htmlFor={`stock-${product.id}`} className="text-gray-600">Current Stock</Label>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     id={`stock-${product.id}`}
//                     value={product.stock.toString()}
//                     onChange={(e) => handleUpdateStock(product.id, e.target.value)}
//                     className="w-20 text-right"
//                     type="number"
//                     min="0"
//                   />
//                   <Badge variant={product.stock > 10 ? "default" : "destructive"}>
//                     {product.stock > 10 ? "In Stock" : "Low Stock"}
//                   </Badge>
//                 </div>
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <Button variant="outline" size="sm">
//                   <AiOutlineEdit className="mr-2" />
//                   Edit Product
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   };
  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
//       <nav className="bg-white shadow-md sticky top-0 z-10">
//         <div className="container mx-auto px-6 py-3">
//           <div className="flex justify-between items-center">
//             <Link href="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-gray-700 transition-colors">
//               Admin Dashboard
//             </Link>
//             <div className="flex items-center space-x-4">
//               <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
//                 <AiOutlineHome size={24} />
//               </Link>
//               {/* <Button
//                 variant="ghost"
//                 onClick={() => setUserType(null)}
//                 className="text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 <AiOutlineLogout size={24} />
//                 <span className="ml-2">Logout</span>
//               </Button> */}
//               <SignOutButton>
//             <button className="hover:text-gray-200 transition-colors">
//               <BiLogOut size={28} />
//             </button>
//           </SignOutButton>
//             </div>
//           </div>
//         </div>
//       </nav>
                



