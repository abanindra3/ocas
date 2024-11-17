// // OrderConfirmationPage.tsx

// import { useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// export default function OrderConfirmationPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to dashboard if accessed directly without an order
//     const orders = JSON.parse(localStorage.getItem('orders') || '[]');
//     if (orders.length === 0) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
//       <div className="mx-auto max-w-md space-y-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Order Confirmed!</CardTitle>
//           </CardHeader>
//           <CardContent className="text-center space-y-4">
//             <p className="mb-4">Thank you for your order. Your food will be ready soon.</p>
//             <div className="space-x-4">
//               <Button onClick={() => navigate('/dashboard')} className="bg-green-600 text-white">
//                 Go to Dashboard
//               </Button>
//               <Button onClick={() => navigate('/orders')} variant="outline">
//                 View Orders
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if accessed directly without an order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length === 0) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <div className="mx-auto max-w-md space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="mb-4">Thank you for your order. Your food will be ready soon.</p>
            <div className="space-x-4">
              <Button onClick={() => router.push('/dashboard')} className="bg-green-600 text-white">
                Go to Dashboard
              </Button>
              <Button onClick={() => router.push('/orders')} variant="outline">
                View Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
