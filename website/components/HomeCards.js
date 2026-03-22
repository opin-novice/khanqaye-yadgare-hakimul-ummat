"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomeCards({ newsTicker = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
      {/* Carousel Container - Fade Transition */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[550px] overflow-hidden">
        {currentCards.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-3 py-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index
                ? "bg-[#c4a962] w-8 h-2.5"
                : "bg-[#e8dfce] w-2.5 h-2.5"
            }`}
          />
        ))}
      </div>

      {/* News Ticker / Marquee Section */}
      {newsTicker && (
        <div className="w-full bg-[#1f4e3d] py-3 overflow-hidden border-y border-[#c4a962]/30 shadow-sm">
          <div className="whitespace-nowrap flex marquee-animation">
            <span className="text-[#fcfaf7] text-lg font-bold px-4">
              {newsTicker}
            </span>
            {/* Duplicate for seamless infinite scroll */}
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
