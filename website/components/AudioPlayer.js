export default function AudioPlayer({ currentBayan }) {
  if (!currentBayan) {
    return (
      <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-gray-500 font-medium">
        একটি বয়ান বেছে নিন
      </div>
    );
  }
  
  if (!currentBayan.audioUrl) {
    return (
      <div className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-gray-500 font-medium">
        অডিও পাওয়া যায়নি
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
      <p className="font-bold text-emerald-800 mb-2 truncate">{currentBayan.title}</p>
      <audio controls className="w-full h-10" autoPlay src={currentBayan.audioUrl}>
        লোড হচ্ছে...
      </audio>
    </div>
  );
}
