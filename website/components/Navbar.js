import Link from "next/link";
import { BookOpen, Headphones, HelpCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-xl text-emerald-800">শাইখের বয়ান</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/bayans" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1 font-medium transition-colors">
              <Headphones className="h-4 w-4" />
              <span>বয়ান সমূহ</span>
            </Link>
            <Link href="/fatwas" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1 font-medium transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span>ফতোয়া</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
