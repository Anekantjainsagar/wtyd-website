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
import { ConfirmProvider } from "../(admin)/Components/Utils/ConfirmProvier";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Software & Mobile App Development | WTYD",
  description:
    "WTYD offers expert software and mobile app development services, providing tailored solutions to drive your business forward.",
  keywords: [
    "Software development",
    "Mobile app development",
    "Web development",
    "IT services",
    "Tech courses",
    "Node.js",
    "Flutter",
    "Android Studio",
  ],
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
              <ConfirmProvider>
                <Toaster />
                <Navbar />
                {children}
                <Footer />
              </ConfirmProvider>
            </UserProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
