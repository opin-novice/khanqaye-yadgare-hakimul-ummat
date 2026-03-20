export default function AudioPlayer({ currentBayan }) {
  if (!currentBayan) {
    return (
      <div className="w-full p-8 bg-[#fcfaf7] border border-[#e8dfce] rounded-[2rem] text-center text-[#708474] font-medium shadow-sm transition-all duration-300">
        <div className="w-16 h-16 mx-auto bg-[#f3eee1] rounded-full flex items-center justify-center mb-4 shadow-inner">
          <svg className="w-7 h-7 text-[#a0843c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12-3c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" /></svg>
        </div>
        <p className="text-lg">একটি বয়ান বেছে নিন</p>
      </div>
    );
  }
  
  if (!currentBayan.audioUrl) {
    return (
      <div className="w-full p-8 bg-[#fcfaf7] border border-[#e8dfce] rounded-[2rem] text-center text-[#708474] font-medium shadow-sm transition-all duration-300">
        অডিও পাওয়া যায়নি
      </div>
    );
  }

  return (
    <div className="w-full p-8 bg-[#1f4e3d] border border-[#163a2d] rounded-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 transform translate-y-0">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#c4a962] rounded-full opacity-10 blur-3xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3a735b] rounded-full opacity-20 blur-2xl -ml-10 -mb-10"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-[#fcfaf7] text-[#1f4e3d] text-xs font-bold px-3 py-1.5 rounded-lg tracking-wider mb-2 inline-block shadow-sm">
            এখন বাজছে
          </div>
          <div className="w-8 h-8 rounded-full bg-[#28634e] flex items-center justify-center animate-pulse">
            <svg className="w-4 h-4 text-[#c4a962]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          </div>
        </div>
        
        <p className="font-bold text-[#fcfaf7] mb-2 text-xl leading-snug drop-shadow-sm line-clamp-2">{currentBayan.title}</p>
        <p className="text-[#d4c398] text-sm mb-6 font-medium tracking-wide">{currentBayan.category}</p>
        
        <audio controls className="w-full h-12 rounded-xl accent-[#c4a962] bg-[#fcfaf7] shadow-inner" autoPlay src={currentBayan.audioUrl}>
          লোড হচ্ছে...
        </audio>
      </div>
    </div>
  );
}
