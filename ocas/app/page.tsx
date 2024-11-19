"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser(); // Clerk user hook
  const [userRole, setUserRole] = useState<string | null>(null);

    const features = [
    { title: "Quick Ordering", description: "Place orders with just a few taps", icon: "🍽️" },
    { title: "Real-time Tracking", description: "Track your order status in real-time", icon: "🕒" },
    { title: "Customizable Menu", description: "Personalize your meal preferences", icon: "📋" },
    { title: "Secure Payments", description: "Multiple secure payment options", icon: "💳" },
    { title: "Nutritional Info", description: "Access detailed nutritional information", icon: "🥗" },
    { title: "Feedback System", description: "Rate and review your dining experience", icon: "⭐" },
  ]
  // Set user role once user and metadata are fully loaded
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const role = user.publicMetadata?.role as string | undefined;
      setUserRole(role ?? "user");
    }
  }, [isLoaded, isSignedIn, user]);

  // Handle navigation based on sign-in state and role
  const handleNavigation = () => {
    if (!isLoaded) return; // Wait for Clerk to load
    if (!isSignedIn) {
      router.push("/signin");
    } else if (userRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">OCAS</h1>
          <Button
            onClick={handleNavigation}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
          >
            {!isSignedIn ? "Login" : "Dashboard"}
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative h-screen flex items-center justify-center">
          <Image
            src="/images/landingbg.webp"
            alt="Campus Dining Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                Welcome to <span className="text-blue-400">OCAS</span>
              </h2>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-200">
                Revolutionizing campus dining with our Online Canteen Automation System
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                onClick={handleNavigation}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300"
              >
                {!isSignedIn
                  ? "Get Started"
                  : userRole === "admin"
                  ? "Admin Panel"
                  : "Access Dashboard"}
              </Button>
            </motion.div>
          </div>
        </section>
        <section className="py-20 bg-gray-800">
           <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold mb-8 text-center">Why Choose OCAS?</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-gray-700 border-none hover:bg-gray-600 transition-colors duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <span className="text-4xl mr-4">{feature.icon}</span>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-8">What Our Users Say</h3>
            <ScrollArea className="h-64 w-full rounded-md border p-4">
              {[...Array(5)].map((_, index) => (
                <Card key={index} className="mb-4 bg-gray-700 border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Student {index + 1}</span>
                      <Badge variant="secondary">⭐⭐⭐⭐⭐</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      "OCAS has made campus dining so much more convenient. I love being able to order ahead and skip the lines!"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 OCAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
