import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth, db } from '@/components/ui/firebase';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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

export default function Register({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [studentId, setStudentId] = useState('')
  const [userType, setUserType] = useState('student')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, { displayName: name })

      await addDoc(collection(db, 'users'), {
        name,
        email,
        studentId,
        userType,
        phone,
        uid: user.uid
      })

      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error registering user:', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our canteen community today!</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <Label htmlFor="student-id">Student ID</Label>
              <Input
                id="student-id"
                name="studentId"
                type="text"
                autoComplete="off"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Student ID"
              />
            </div>
            <div>
              <Label>User Type</Label>
              <RadioGroup defaultValue="student" onValueChange={setUserType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staff" id="staff" />
                  <Label htmlFor="staff">Staff</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Register
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}




// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { initializeApp } from 'firebase/app'
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import { getFirestore, collection, addDoc } from 'firebase/firestore'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { auth, db } from '@/components/ui/firebase';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAjNNRLBKl0hklysTwmHNnOtYCV_UQn3jE",
//   authDomain: "isl-sih-4c812.firebaseapp.com",
//   projectId: "isl-sih-4c812",
//   storageBucket: "isl-sih-4c812.firebasestorage.app",
//   messagingSenderId: "452342571294",
//   appId: "1:452342571294:web:d3456f34d9619f012aa90f",
//   measurementId: "G-VG5HK4E3JJ"
// };

// const app = initializeApp(firebaseConfig);
// //const auth = getAuth(app);
// //const db = getFirestore(app);

// export default function Register({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [phone, setPhone] = useState('')
//   const [studentId, setStudentId] = useState('')
//   const [userType, setUserType] = useState('student')
//   const navigate = useNavigate()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     try {
//       // Create the user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//       const user = userCredential.user

//       // Update the user's display name in Firebase Authentication
//       await updateProfile(user, { displayName: name })

//       // Store additional user data in Firebase Firestore
//       await addDoc(collection(db, 'users'), {
//         name,
//         email,
//         studentId,
//         userType,
//         phone,
//         uid: user.uid
//       })

//       setIsLoggedIn(true)
//       navigate('/dashboard')
//     } catch (error) {
//       console.error('Error registering user:', error)
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
//       <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-2xl">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
//           <p className="mt-2 text-sm text-gray-600">Join our canteen community today!</p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-4 rounded-md shadow-sm">
//             <div>
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Full Name"
//               />
//             </div>
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
//                 autoComplete="new-password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//             <div>
//               <Label htmlFor="student-id">Student ID</Label>
//               <Input
//                 id="student-id"
//                 name="studentId"
//                 type="text"
//                 autoComplete="off"
//                 required
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//                 className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                 placeholder="Student ID"
//               />
//             </div>
//             <div>
//               <Label>User Type</Label>
//               <RadioGroup defaultValue="student" onValueChange={setUserType}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="student" id="student" />
//                   <Label htmlFor="student">Student</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="staff" id="staff" />
//                   <Label htmlFor="staff">Staff</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           </div>

//           <div>
//             <Button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//               Register
//             </Button>
//           </div>
//         </form>
//         <div className="text-center">
//           <p className="mt-2 text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
