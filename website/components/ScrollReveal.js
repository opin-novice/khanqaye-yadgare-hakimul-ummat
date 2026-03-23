"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    setHasMounted(true);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.05 }); // Lower threshold for better mobile trigger

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // On server or before mount, show content but without animation class
  // To prevent "flashing" or hidden content if JS is slow
  const showContent = !hasMounted || isVisible;

  return (
    <div
      ref={domRef}
      className={`${className} ${showContent ? (isVisible ? "animate-fade-up" : "") : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
