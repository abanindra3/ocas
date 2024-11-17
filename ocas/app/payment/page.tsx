
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
                <RadioGroupItem value="card" id="card" />
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
