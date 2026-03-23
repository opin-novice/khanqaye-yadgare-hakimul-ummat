import { Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  icons: {
    icon: "/logo_1.png",
    apple: "/logo_1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${hindSiliguri.variable} ${amiri.variable} font-bengali min-h-screen flex flex-col bg-[#fcfaf7] text-[#2c3e30] antialiased selection:bg-[#c4a962] selection:text-white`}>
        <Navbar />
        <main className="flex-grow flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
