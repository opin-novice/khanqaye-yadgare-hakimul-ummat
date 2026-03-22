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
    <section className="w-full bg-white flex flex-col items-center">
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
              Mobile: Taller height for a "more fulfilling" look (300px min).
              Desktop: Naturally wide.
              Using object-cover ensures it fills the container without distortion (some cropping on sides on mobile).
            */}
            <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[500px]">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots (Now placed BELOW the photo) */}
      <div className="flex justify-center gap-3 py-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 shadow-sm rounded-full ${
              activeIndex === index 
                ? "bg-[#c4a962] scale-110 w-8 h-2.5" 
                : "bg-[#e8dfce] hover:bg-[#c4a962]/50 w-2.5 h-2.5"
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
