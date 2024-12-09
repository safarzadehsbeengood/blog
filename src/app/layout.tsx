import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { JetBrains_Mono } from 'next/font/google'
import "../styles/globals.css";
import Navbar from '@/components/NavBar'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "My personal blog built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.className} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
