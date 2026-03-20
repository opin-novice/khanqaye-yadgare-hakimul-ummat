import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"] });

export const metadata = {
  title: "শাইখের আলোচনা ও ফতোয়া",
  description: "শাইখের বয়ান এবং ফতোয়া শোনার ও পড়ার ওয়েবসাইট",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased`}>
        <Navbar />
        <main className="flex-grow flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
