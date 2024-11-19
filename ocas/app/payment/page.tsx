'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/components/CardContext';
import { CreditCard, Smartphone, Truck, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PaymentPage() {
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderDetails = {
        items: cart,
        totalAmount: total,
        paymentMethod,
      };
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
      clearCart();
      toast({ 
        title: 'Payment Successful!', 
        description: 'Thank you for your purchase.',
        action: <CheckCircle className="text-green-500" />
      });
      router.push('/order-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto shadow-xl bg-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center text-white">Secure Payment</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-extrabold mb-4 text-white">Order Summary</h2>
              <ScrollArea className="h-64 rounded-md border border-gray-600 p-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-600">
                    <span className="font-bold">{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4 text-right">
                <p className="text-lg font-extrabold">
                  Total Amount: <span className="text-2xl font-extrabold text-blue-400">₹{total.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mb-4 text-white">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer font-bold">
                    <CreditCard className="mr-2" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center cursor-pointer font-bold">
                    <Smartphone className="mr-2" />
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center cursor-pointer font-bold">
                    <Truck className="mr-2" />
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <Label htmlFor="cardNumber" className="font-bold">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="bg-gray-700 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="font-bold">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" className="bg-gray-700 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="font-bold">CVV</Label>
                      <Input id="cvv" placeholder="123" className="bg-gray-700 text-white" />
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <Label htmlFor="upiId" className="font-bold">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" className="bg-gray-700 text-white" />
                </motion.div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handlePayment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-lg font-bold"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </motion.div>
              ) : (
                'Pay Now'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
