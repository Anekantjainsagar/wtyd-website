// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Utils/Navbar";
import StoreProvider from "@/store/store-provider";
import Footer from "@/components/Utils/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wtyd - We Tech Your Dreams",
  description: "Learn. Build. Succeed. - Your Tech Journey Starts Here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            <UserProvider>
              <Toaster />
              <Navbar />
              {children}
              <Footer />
            </UserProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
