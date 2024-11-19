
// // 'use client';

// // import { useEffect } from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Trash2, Home, ShoppingCart } from 'lucide-react';
// // import { useCart } from '@/components/CardContext';

// // export default function CartPage() {
// //   const { cart, total, updateCart } = useCart();
// //   const router = useRouter();

// //   // Load cart from localStorage on mount
// //   useEffect(() => {
// //     const savedCart = localStorage.getItem('canteenCart');
// //     if (savedCart) {
// //       const parsedCart = JSON.parse(savedCart);
// //       updateCart(parsedCart); // Ensure this function is stable to avoid infinite loops
// //     }
// //   }, []); // Removed dependencies to prevent re-renders

// //   const updateQuantity = (id:any, newQuantity:any) => {
// //     if (newQuantity < 1) return;
// //     const updatedCart = cart.map((item) =>
// //       item.id === id ? { ...item, quantity: newQuantity } : item
// //     );
// //     updateCart(updatedCart);
// //     localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
// //   };

// //   const removeItem = (id:any) => {
// //     const updatedCart = cart.filter((item) => item.id !== id);
// //     updateCart(updatedCart);
// //     localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
// //   };

// //   const handleCheckout = () => {
// //     router.push('/payment');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-8">
// //       <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg mb-8 shadow-lg">
// //         <Link href="/products" className="text-3xl font-bold text-gray-900 hover:text-gray-700">
// //           Products
// //         </Link>
// //         <div className="flex space-x-6">
// //           <Link href="/" className="hover:text-gray-700">
// //             <Home size={28} />
// //           </Link>
// //           <Link href="/cart" className="hover:text-gray-700">
// //             <ShoppingCart size={28} />
// //           </Link>
// //         </div>
// //       </header>

// //       {cart.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {cart.map((item) => (
// //             <Card key={item.id} className="shadow-lg rounded-lg bg-white">
// //               <CardHeader className="p-4">
// //                 <CardTitle className="text-xl font-semibold text-gray-900">{item.name}</CardTitle>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="flex justify-between items-center mb-4">
// //                   <p className={`text-lg ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
// //                     {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
// //                   </p>
// //                   <p className="text-lg font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <div className="flex items-center space-x-2">
// //                     <Label htmlFor={`quantity-${item.id}`} className="text-gray-700">
// //                       Quantity:
// //                     </Label>
// //                     <Input
// //                       id={`quantity-${item.id}`}
// //                       type="number"
// //                       min={1}
// //                       value={item.quantity}
// //                       onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
// //                       className="w-20"
// //                     />
// //                   </div>
// //                   <Button
// //                     variant="outline"
// //                     onClick={() => removeItem(item.id)}
// //                     className="text-red-600 hover:bg-red-100"
// //                   >
// //                     <Trash2 size={16} />
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //               <CardFooter>
// //                 <p className="text-lg font-medium text-gray-900">
// //                   Total: ₹{(item.price * item.quantity).toFixed(2)}
// //                 </p>
// //               </CardFooter>
// //             </Card>
// //           ))}
// //           <div className="col-span-full mt-8">
// //             <Card className="shadow-lg">
// //               <CardContent>
// //                 <div className="space-y-2">
// //                   <div className="flex justify-between">
// //                     <p className="text-gray-600">Subtotal</p>
// //                     <p className="font-medium">₹{total.toFixed(2)}</p>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <p className="text-gray-600">Tax (5%)</p>
// //                     <p className="font-medium">₹{(total * 0.05).toFixed(2)}</p>
// //                   </div>
// //                   <div className="border-t pt-2 mt-2">
// //                     <div className="flex justify-between">
// //                       <p className="text-lg font-semibold">Total</p>
// //                       <p className="text-lg font-semibold">₹{(total * 1.05).toFixed(2)}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //               <CardFooter>
// //                 <Button
// //                   className="w-full bg-green-600 hover:bg-green-700 text-white"
// //                   onClick={handleCheckout}
// //                 >
// //                   Proceed to Checkout
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="col-span-full text-center py-10">
// //           <p className="text-xl font-medium text-gray-800 mb-4">Your cart is empty.</p>
// //           <Button
// //             onClick={() => router.push('/products')}
// //             className="bg-blue-600 hover:bg-blue-700 text-white"
// //           >
// //             Continue Shopping
// //           </Button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Trash2, Home, ShoppingCart } from 'lucide-react';
// import { useCart } from '@/components/CardContext';

// export default function CartPage() {
//   const { cart, total, updateCart } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     const savedCart = localStorage.getItem('canteenCart');
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       updateCart(parsedCart);
//     }
//   }, []);

//   const updateQuantity = (id:any, newQuantity:any) => {
//     if (newQuantity < 1) return;
//     const updatedCart = cart.map((item) =>
//       item.id === id ? { ...item, quantity: newQuantity } : item
//     );
//     updateCart(updatedCart);
//     localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
//   };

//   const removeItem = (id:any) => {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     updateCart(updatedCart);
//     localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
//   };

//   const handleCheckout = () => {
//     router.push('/payment');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-200 p-8">
//       <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-lg mb-8">
//         <Link href="/products" className="text-3xl font-bold text-gray-800 hover:text-gray-600">
//           Products
//         </Link>
//         <div className="flex space-x-6">
//           <Link href="/" className="text-gray-700 hover:text-gray-500">
//             <Home size={28} />
//           </Link>
//           <Link href="/cart" className="text-gray-700 hover:text-gray-500">
//             <ShoppingCart size={28} />
//           </Link>
//         </div>
//       </header>

//       {cart.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cart.map((item) => (
//             <Card key={item.id} className="shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
//               <CardHeader className="p-4">
//                 <CardTitle className="text-xl font-semibold text-gray-900">{item.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between items-center mb-4">
//                   <p className={`text-lg ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
//                     {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
//                   </p>
//                   <p className="text-lg font-medium text-gray-800">₹{item.price.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center space-x-2">
//                     <Label htmlFor={`quantity-${item.id}`} className="text-gray-700">
//                       Quantity:
//                     </Label>
//                     <Input
//                       id={`quantity-${item.id}`}
//                       type="number"
//                       min={1}
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                       className="w-20 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
//                     />
//                   </div>
//                   <Button
//                     variant="outline"
//                     onClick={() => removeItem(item.id)}
//                     className="text-red-600 hover:bg-red-100"
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <p className="text-lg font-medium text-gray-800">
//                   Total: ₹{(item.price * item.quantity).toFixed(2)}
//                 </p>
//               </CardFooter>
//             </Card>
//           ))}

//           <div className="col-span-full mt-8">
//             <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <p className="text-gray-600">Subtotal</p>
//                     <p className="font-medium">₹{total.toFixed(2)}</p>
//                   </div>
//                   <div className="flex justify-between">
//                     <p className="text-gray-600">Tax (5%)</p>
//                     <p className="font-medium">₹{(total * 0.05).toFixed(2)}</p>
//                   </div>
//                   <div className="border-t pt-2 mt-2">
//                     <div className="flex justify-between">
//                       <p className="text-lg font-semibold">Total</p>
//                       <p className="text-lg font-semibold">₹{(total * 1.05).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
//                   onClick={handleCheckout}
//                 >
//                   Proceed to Checkout
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       ) : (
//         <div className="col-span-full text-center py-10">
//           <p className="text-xl font-medium text-gray-800 mb-4">Your cart is empty.</p>
//           <Button
//             onClick={() => router.push('/products')}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
//           >
//             Continue Shopping
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Home, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/CardContext';

export default function CartPage() {
  const { cart, total, updateCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('canteenCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      updateCart(parsedCart);
    }
  }, []);

  const updateQuantity = (id:any, newQuantity:any) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
    localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
  };

  const removeItem = (id:any) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
    localStorage.setItem('canteenCart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-8">
      <header className="flex justify-between items-center py-4 px-6 bg-white rounded-lg shadow-lg mb-8">
        <Link href="/products" className="text-3xl font-extrabold text-gray-800 hover:text-blue-600">
          Products
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-500">
            <Home size={28} />
          </Link>
          <Link href="/cart" className="text-gray-600 hover:text-blue-500">
            <ShoppingCart size={28} />
          </Link>
        </div>
      </header>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => (
            <Card key={item.id} className="shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-900">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className={`text-sm font-medium ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                    {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </p>
                  <p className="text-lg font-medium text-gray-800">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`quantity-${item.id}`} className="text-gray-700">
                      Quantity:
                    </Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
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
                <p className="text-base font-medium text-gray-800">
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </CardFooter>
            </Card>
          ))}

          <div className="col-span-full mt-8">
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent>
                <div className="space-y-4">
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
                    <p className="text-gray-600">Total</p>
                    <p className="text-gray-600">₹{(total * 1.05).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="col-span-full text-center py-10">
          <p className="text-xl font-medium text-gray-800 mb-4">Your cart is empty.</p>
          <Button
            onClick={() => router.push('/products')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
