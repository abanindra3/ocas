
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useUser } from '@clerk/nextjs'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Switch } from '@/components/ui/switch'
// import { Textarea } from '@/components/ui/textarea'
// import { useToast } from '@/components/ui/use-toast'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'

// interface UserProfile {
//   name: string
//   email: string
//   phone: string
//   address: string
//   dietaryPreferences: string[]
//   notificationPreferences: {
//     email: boolean
//     sms: boolean
//     push: boolean
//   }
//   paymentMethod: string
//   bio: string
// }

// const initialProfile: UserProfile = {
//   name: '',
//   email: '',
//   phone: '',
//   address: '',
//   dietaryPreferences: [],
//   notificationPreferences: {
//     email: true,
//     sms: false,
//     push: true,
//   },
//   paymentMethod: 'credit-card',
//   bio: '',
// }

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<UserProfile>(initialProfile)
//   const [isEditing, setIsEditing] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()
//   const { user } = useUser()

//   useEffect(() => {
//     if (user) {
//       setProfile(prev => ({
//         ...prev,
//         name: user.fullName || '',
//         email: user.emailAddresses[0]?.emailAddress || '',
//       }))
//     }
//   }, [user])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setProfile((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleCheckboxChange = (checked: boolean, preference: string) => {
//     setProfile((prev) => ({
//       ...prev,
//       dietaryPreferences: checked
//         ? [...prev.dietaryPreferences, preference]
//         : prev.dietaryPreferences.filter((p) => p !== preference),
//     }))
//   }

//   const handleNotificationChange = (type: 'email' | 'sms' | 'push', checked: boolean) => {
//     setProfile((prev) => ({
//       ...prev,
//       notificationPreferences: { ...prev.notificationPreferences, [type]: checked },
//     }))
//   }

//   const handleSave = () => {
//     setIsEditing(false)
//     toast({
//       title: 'Profile Updated',
//       description: 'Your profile has been successfully updated.',
//     })
//   }

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
//       <Image 
//         src="/images/profilebg.webp" 
//         alt="Profile Background" 
//         fill 
//         className="absolute inset-0 object-cover opacity-30 z-0" 
//         quality={75}
//       />
//       <div className="relative z-10">
//         <Button
//           variant="ghost"
//           onClick={() => router.push('/dashboard')}
//           className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
//         >
//           <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
//         </Button>

//         <Card className="max-w-4xl mx-auto">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-3xl font-bold text-blue-800">Your Profile</CardTitle>
//               <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
//                 {isEditing ? (
//                   <>
//                     <AiOutlineSave className="mr-2" /> Save Changes
//                   </>
//                 ) : (
//                   <>
//                     <AiOutlineEdit className="mr-2" /> Edit Profile
//                   </>
//                 )}
//               </Button>
//             </div>
//             <CardDescription>Manage your account settings and preferences.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="personal" className="w-full">
//               <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
//                 <TabsTrigger value="personal">Personal Info</TabsTrigger>
//                 <TabsTrigger value="preferences">Preferences</TabsTrigger>
//                 <TabsTrigger value="notifications">Notifications</TabsTrigger>
//                 <TabsTrigger value="payment">Payment</TabsTrigger>
//               </TabsList>
//               <TabsContent value="personal">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Personal Information</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Full Name</Label>
//                         <Input
//                           id="name"
//                           name="name"
//                           value={profile.name}
//                           onChange={handleInputChange}
//                           disabled={!isEditing}
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                           id="email"
//                           name="email"
//                           type="email"
//                           value={profile.email}
//                           onChange={handleInputChange}
//                           disabled={!isEditing}
//                         />
//                       </div>
//                       {/* Rest of the personal info inputs remain the same */}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               {/* Rest of the tabs remain the same */}
//             </Tabs>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button variant="outline" onClick={() => router.push('/dashboard')}>Cancel</Button>
//             <Button onClick={handleSave} disabled={!isEditing}>Save Changes</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  dietaryPreferences: string[]
  notificationPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  paymentMethod: string
  bio: string
}

const initialProfile: UserProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  dietaryPreferences: [],
  notificationPreferences: {
    email: true,
    sms: false,
    push: true,
  },
  paymentMethod: 'credit-card',
  bio: '',
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
      }))
    }
  }, [user])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Display toast or handle save logic
    alert('Profile updated successfully')
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <Image 
        src="/images/profilebg.webp" 
        alt="Profile Background" 
        fill 
        className="absolute inset-0 object-cover opacity-30 z-0" 
        quality={75}
      />
      <div className="relative z-10">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard')}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
        >
          <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
        </Button>

        <div className="max-w-4xl mx-auto p-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-border">
          <Card className="bg-black text-white shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold text-white">Your Profile</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-white border-white"
                >
                  {isEditing ? (
                    <>
                      <AiOutlineSave className="mr-2" /> Save Changes
                    </>
                  ) : (
                    <>
                      <AiOutlineEdit className="mr-2" /> Edit Profile
                    </>
                  )}
                </Button>
              </div>
              <CardDescription className="text-gray-400">
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`bg-gray-800 text-white ${!isEditing ? 'opacity-60' : ''}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`bg-gray-800 text-white ${!isEditing ? 'opacity-60' : ''}`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="text-white border-white"
              >
                Go Back
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isEditing}
                className={`bg-blue-600 text-white ${!isEditing ? 'opacity-60' : ''}`}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}