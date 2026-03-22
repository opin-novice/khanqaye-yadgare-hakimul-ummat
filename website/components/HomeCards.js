"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function HomeCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  
  const cards = [
    { src: "/card_1.png", alt: "Khanqah Banner 1" },
    { src: "/card_2.png", alt: "Khanqah Banner 2" },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full relative group bg-white">
      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full snap-center"
          >
            {/* 
              To ensure the photos are NOT CROPPED and stay UNEDITED:
              We use a simple <img> with w-full h-auto inside the snap-container.
              But for Next.js Image component, we'll use sizes and style for auto-height.
            */}
            <div className="w-full h-auto">
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-auto block"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-md border-2 border-white ${
              activeIndex === index 
                ? "bg-[#c4a962] scale-125 px-4" 
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
