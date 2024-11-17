import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { initializeApp } from "firebase/app";

import { auth, db, } from '@/components/ui/firebase';
import { getAnalytics, isSupported } from 'firebase/analytics';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjNNRLBKl0hklysTwmHNnOtYCV_UQn3jE",
  authDomain: "isl-sih-4c812.firebaseapp.com",
  projectId: "isl-sih-4c812",
  storageBucket: "isl-sih-4c812.firebasestorage.app",
  messagingSenderId: "452342571294",
  appId: "1:452342571294:web:d3456f34d9619f012aa90f",
  measurementId: "G-VG5HK4E3JJ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const auth = getAuth(app);

  export default function Login({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const initFirebaseAnalytics = async () => {
        try {
          await isSupported();
          getAnalytics(app);
        } catch (error) {
          console.error('Error initializing Firebase Analytics:', error);
        }
      };
  
      initFirebaseAnalytics();
    }, []);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email-address">Email address</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Sign in
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// export default function Login({ setIsLoggedIn }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Here you would typically validate the credentials
//     setIsLoggedIn(true)
//     navigate('/dashboard')
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
//       <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back!</h2>
//           <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4 rounded-md shadow-sm">
//             <div>
//               <Label htmlFor="email-address">Email address</Label>
//               <Input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Email address"
//               />
//             </div>
//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           <div>
//             <Button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//               Sign in
//             </Button>
//           </div>
//         </form>
//         <div className="text-center">
//           <p className="mt-2 text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }