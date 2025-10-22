import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI LinkedIn Post Generator",
  description: "This Generates a LinkedIn post Using Google Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto max-w-7xl pl-1 pr-1 bg-purple-400`}
      >
        <div className="container shadow-lg sticky z-50 mx-auto max-w-7xl p-4 bg-pink-400 flex items-center justify-between rounded-2xl m-2">
        <h1 className="font-bold text-2xl"><Link href="/"> LinkedIn Post Generator </Link></h1>
        <Navbar />
      </div>
        {children}
      </body>
    </html>
  );
}
