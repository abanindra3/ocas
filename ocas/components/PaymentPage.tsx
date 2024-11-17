import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useCart } from '@/components/CardContext';

export default function PaymentPage() {

  const { total, clearCart, cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create the new order
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        items: [...cart], // Create a copy of the cart items
        total,
        status: "Processing",
      };

      // Get existing orders from localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful",
        description: `Your payment of $${total.toFixed(2)} has been processed.`,
      });

      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <div className="mx-auto max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-white text-center">Payment</h1>
        <Card>
          <CardHeader>
            <CardTitle>Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment}>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="cardCVV">CVV</Label>
                      <Input
                        id="cardCVV"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="mt-4">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}

              <div className="mt-6 text-right text-lg font-semibold">Total: ${total.toFixed(2)}</div>
            </form>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : (paymentMethod === "cash" ? "Place Order" : "Pay Now")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}



// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { toast } from '@/components/ui/use-toast'

// interface PaymentPageProps {
//   total: number
//   clearCart: () => void
// }

// export default function PaymentPage({ total, clearCart }: PaymentPageProps) {
//   const [paymentMethod, setPaymentMethod] = useState('card')
//   const [cardNumber, setCardNumber] = useState('')
//   const [cardName, setCardName] = useState('')
//   const [cardExpiry, setCardExpiry] = useState('')
//   const [cardCVV, setCardCVV] = useState('')
//   const [upiId, setUpiId] = useState('')
//   const navigate = useNavigate()

//   const handlePayment = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Simulate payment processing
//     setTimeout(() => {
//       toast({
//         title: "Payment Successful",
//         description: `Your payment of $${total.toFixed(2)} has been processed.`,
//       })
//       clearCart()
//       navigate('/order-confirmation')
//     }, 2000)
//   }

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

//               {paymentMethod === 'card' && (
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

//               {paymentMethod === 'upi' && (
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

//               <div className="mt-6 text-right text-lg font-semibold">
//                 Total: ${total.toFixed(2)}
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter>
//             <Button className="w-full" onClick={handlePayment}>
//               {paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }