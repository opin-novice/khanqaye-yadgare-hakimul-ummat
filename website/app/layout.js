import { Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const hindSiliguri = Hind_Siliguri({ 
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri"
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri"
});

export const metadata = {
  title: "শায়খের বয়ান",
  description: "প্রতিদিনের বয়ান ও আধ্যাত্মিক শিক্ষা",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} ${amiri.variable} font-bengali min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="flex-grow flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
