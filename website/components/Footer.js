import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1f4e3d] mt-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c4a962] to-transparent opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#c4a962] rounded-full opacity-5 blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3a735b] rounded-full opacity-10 blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-14 text-center relative z-10">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-[#c4a962] opacity-40 flex-1 max-w-[80px]"></div>
          <span className="text-[#c4a962] text-xl">✦</span>
          <div className="h-px bg-[#c4a962] opacity-40 flex-1 max-w-[80px]"></div>
        </div>

        {/* Main quote */}
        <p className="text-xl md:text-2xl font-bold text-[#fcfaf7] leading-relaxed mb-4 tracking-wide">
          "সোহবতে আহলুল্লাহ—নফসের ইসলাহ ও ক্বলবের নূরের সবচেয়ে নিশ্চিত মাধ্যম।"
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 mb-10">
          <div className="h-px bg-[#c4a962] opacity-40 flex-1 max-w-[80px]"></div>
          <span className="text-[#c4a962] text-xl">✦</span>
          <div className="h-px bg-[#c4a962] opacity-40 flex-1 max-w-[80px]"></div>
        </div>

        {/* Khanqah name */}
        <p className="text-[#d4c398] font-bold text-lg mb-1">খানকায়ে ইয়াদগারে হাকিমুল উম্মত</p>
        <p className="text-[#b8cfc0] text-sm font-medium mb-8">
          জামিয়া ইসলামিয়া ইউনুছিয়া মাদ্রাসা, ব্রাহ্মণবাড়িয়া
        </p>

        {/* Bottom Links */}
        <div className="pt-8 border-t border-[#c4a962]/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#b8cfc0] text-xs font-medium">
            © {new Date().getFullYear()} শায়খের বয়ান। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 text-xs font-bold text-[#c8dbd0]">
            <Link href="/" className="text-[#c8dbd0] hover:text-[#fcfaf7] transition-colors">Home</Link>
            <span className="text-[#c4a962]/30">|</span>
            <div className="flex gap-3 items-center">
              <span className="text-[#b8cfc0] font-medium">Support:</span>
              <a href="https://github.com/opin-novice" target="_blank" rel="noopener noreferrer" className="text-[#c8dbd0] hover:text-[#fcfaf7] transition-colors border-b border-transparent hover:border-[#fcfaf7]">GitHub</a>
              <a href="mailto:sayedashraf.opin@gmail.com" className="text-[#c8dbd0] hover:text-[#fcfaf7] transition-colors border-b border-transparent hover:border-[#fcfaf7]">Email</a>
            </div>
            <span className="text-[#c4a962]/30">|</span>
            <Link href="/privacy" className="text-[#c8dbd0] hover:text-[#fcfaf7] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
