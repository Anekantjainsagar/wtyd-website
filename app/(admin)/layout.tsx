import "../globals.css";
import type { Metadata } from "next";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";
import { ConfirmProvider } from "@/app/(admin)/Components/Utils/ConfirmProvier";

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
        <div className="w-full h-full flex items-start">
          <AuthProvider>
            <AdminProvider>
              <ConfirmProvider>
                <Toaster />
                <Sidebar />
                <div className="w-[85vw]">
                  <Navbar />
                  <div className="p-4">{children}</div>
                </div>
              </ConfirmProvider>
            </AdminProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
