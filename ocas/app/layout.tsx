
import { ProductProvider } from "@/app/ProductContest"; // Ensure the correct path
import { CartProvider } from "@/components/CardContext"; // Ensure this path is correct
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Ordering App",
  description: "Order your favorite food items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={inter.className}>
          <ProductProvider>
            <CartProvider>{children}</CartProvider>
          </ProductProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
