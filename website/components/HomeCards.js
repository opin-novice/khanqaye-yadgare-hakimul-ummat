"use client";

import { useState, useEffect, useRef } from "react";

export default function HomeCards({ newsTicker = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  const desktopCards = ["/card_1.png", "/card_2.png"];
  const mobileCards = ["/mobile_card_1.png", "/mobile_card_2.png"];

  // Handle responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-swipe functionality with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentCards = isMobile ? mobileCards : desktopCards;

  return (
    <section className="w-full bg-white flex flex-col items-center">
      {/* 
        Carousel Container - Fade Transition 
        Using h-auto to ensure images dictate their own height without CROPPING.
      */}
      <div className="relative w-full overflow-hidden">
        {/* We use a hidden placeholder image of the first card to maintain the aspect ratio of the container automatically */}
        <img 
          src={currentCards[0]} 
          alt="spacer" 
          className="w-full h-auto opacity-0 invisible pointer-events-none" 
        />
        
        {currentCards.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Standard img w-full h-auto is the most reliable way to avoid any cropping */}
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots (Placed strictly BELOW the photo) */}
      <div className="flex justify-center gap-3 py-4 bg-white w-full">
        {currentCards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === index
                ? "bg-[#c4a962] w-8 h-2.5"
                : "bg-[#e8dfce] w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      {/* News Ticker / Marquee Section */}
      {newsTicker && (
        <div className="w-full bg-[#1f4e3d] py-3 overflow-hidden border-y border-[#c4a962]/30 shadow-sm relative z-20">
          <div className="whitespace-nowrap flex marquee-animation">
            <span className="text-[#fcfaf7] text-lg font-bold px-4">
              {newsTicker}
            </span>
            <span className="text-[#fcfaf7] text-lg font-bold px-4">
              {newsTicker}
            </span>
            <span className="text-[#fcfaf7] text-lg font-bold px-4">
              {newsTicker}
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .marquee-animation {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
