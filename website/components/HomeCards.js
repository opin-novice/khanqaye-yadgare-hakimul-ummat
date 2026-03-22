"use client";

import Image from "next/image";

export default function HomeCards() {
  const cards = [
    { src: "/card_1.png", alt: "Khanqah Card 1" },
    { src: "/card_2.png", alt: "Khanqah Card 2" },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4">
      <div 
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] snap-center"
          >
            <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-xl border border-[#e8dfce] hover:border-[#c4a962] transition-all duration-500">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Swipe Indicator (for mobile) */}
      <div className="flex justify-center gap-2 mt-2 sm:hidden">
        <div className="w-2 h-2 rounded-full bg-[#1f4e3d]"></div>
        <div className="w-2 h-2 rounded-full bg-[#e8dfce]"></div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
