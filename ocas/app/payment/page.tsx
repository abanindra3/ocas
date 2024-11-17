// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "@/components/ui/use-toast";
// import { useCart } from '@/components/CardContext';

// export default function PaymentPage() {

//   const { total, clearCart, cart } = useCart();
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardName, setCardName] = useState("");
//   const [cardExpiry, setCardExpiry] = useState("");
//   const [cardCVV, setCardCVV] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     try {
//       // Create the new order
//       const newOrder = {
//         id: Date.now(),
//         date: new Date().toLocaleDateString(),
//         items: [...cart], // Create a copy of the cart items
//         total,
//         status: "Processing",
//       };

//       // Get existing orders from localStorage
//       const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
//       localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

//       // Simulate payment processing
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       toast({
//         title: "Payment Successful",
//         description: `Your payment of $${total.toFixed(2)} has been processed.`,
//       });

//       clearCart();
//       navigate("/order-confirmation");
//     } catch (error) {
//       toast({
//         title: "Payment Failed",
//         description: "There was an error processing your payment. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
//       <div className="mx-auto max-w-md space-y-8">
//         <h1 className="text-4xl font-bold text-white text-center">Payment</h1>
//         <Card>
//           <CardHeader>
//             <CardTitle>Select Payment Method</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handlePayment}>
//               <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="card" id="card" />
//                   <Label htmlFor="card">Credit/Debit Card</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="cash" id="cash" />
//                   <Label htmlFor="cash">Cash on Delivery</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="upi" id="upi" />
//                   <Label htmlFor="upi">UPI</Label>
//                 </div>
//               </RadioGroup>

//               {paymentMethod === "card" && (
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <Label htmlFor="cardNumber">Card Number</Label>
//                     <Input
//                       id="cardNumber"
//                       value={cardNumber}
//                       onChange={(e) => setCardNumber(e.target.value)}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="cardName">Name on Card</Label>
//                     <Input
//                       id="cardName"
//                       value={cardName}
//                       onChange={(e) => setCardName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </div>
//                   <div className="flex space-x-4">
//                     <div className="flex-1">
//                       <Label htmlFor="cardExpiry">Expiry Date</Label>
//                       <Input
//                         id="cardExpiry"
//                         value={cardExpiry}
//                         onChange={(e) => setCardExpiry(e.target.value)}
//                         placeholder="MM/YY"
//                         required
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <Label htmlFor="cardCVV">CVV</Label>
//                       <Input
//                         id="cardCVV"
//                         value={cardCVV}
//                         onChange={(e) => setCardCVV(e.target.value)}
//                         placeholder="123"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === "upi" && (
//                 <div className="mt-4">
//                   <Label htmlFor="upiId">UPI ID</Label>
//                   <Input
//                     id="upiId"
//                     value={upiId}
//                     onChange={(e) => setUpiId(e.target.value)}
//                     placeholder="yourname@upi"
//                     required
//                   />
//                 </div>
//               )}

//               <div className="mt-6 text-right text-lg font-semibold">Total: ${total.toFixed(2)}</div>
//             </form>
//           </CardContent>
//           <CardFooter>
//             <Button 
//               className="w-full" 
//               onClick={handlePayment}
//               disabled={isProcessing}
//             >
//               {isProcessing ? "Processing..." : (paymentMethod === "cash" ? "Place Order" : "Pay Now")}
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js routing hook
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {toast, useToast } from "@/components/ui/use-toast";
import { useCart } from '@/components/CardContext';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentPage() {
  const { total, clearCart, cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter(); // Next.js router hook

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Basic validation
    if (paymentMethod === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCVV)) {
      toast({
        title: "Invalid Payment Details",
        description: "Please fill out all card details.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "Invalid UPI ID",
        description: "Please provide a valid UPI ID.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    // Simulating payment processing delay
    setTimeout(() => {
      // Simulate saving the order data to localStorage or backend
      const newOrder = {
        items: cart,
        totalAmount: total,
        paymentMethod,
        status: "Success",
      };
      localStorage.setItem("orderDetails", JSON.stringify(newOrder));
      
      // Clear the cart after successful payment
      clearCart();

      // Show success message
      toast({
        title: "Payment Successful!",
        description: "Your payment was processed successfully.",
        //variant: "success",
      });

      // Redirect to order confirmation page
      router.push("/order-confirmation"); // Use router.push for Next.js routing
    }, 2000);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-x-4">
                <RadioGroupItem value="card" id="card"/>
                <RadioGroupItem value="upi" id="upi" />
                <RadioGroupItem value="cod" id="cod"/> 
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <>
              <div>
                <Label>Card Number</Label>
                <Input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                  required
                />
              </div>
              <div>
                <Label>Cardholder Name</Label>
                <Input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Enter cardholder's name"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    value={cardCVV}
                    onChange={(e) => setCardCVV(e.target.value)}
                    placeholder="CVV"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "upi" && (
            <div>
              <Label>UPI ID</Label>
              <Input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter UPI ID"
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
