"use client";
import "./globals.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="space-y-4">
        {!userId ? (
          <Button
            onClick={() => router.push("/admin")}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
