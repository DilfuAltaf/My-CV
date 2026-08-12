"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["900"] });

export function NameScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        if (!textRef.current) return 0;
        const textWidth = textRef.current.getBoundingClientRect().width;
        const windowWidth = window.innerWidth;
        return -(textWidth - windowWidth);
      };

      gsap.to(textRef.current, {
        x: getScrollAmount,
        ease: "none",
        force3D: true, // Forces hardware acceleration
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${textRef.current?.getBoundingClientRect().width || 3000}`, 
          scrub: 0.5, // Reduced from 1 to 0.5 to make it feel less delayed and more responsive
          pin: true,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full flex items-center overflow-hidden bg-white dark:bg-[#09090B]"
    >
      <h1 
        ref={textRef} 
        className={`${outfit.className} w-max shrink-0 inline-block font-black tracking-normal whitespace-nowrap pl-8 pr-8 md:pl-20 md:pr-20 text-black dark:text-primary [text-shadow:0_0_15px_rgba(0,0,0,0.1)] dark:[text-shadow:0_0_20px_var(--primary-glow),_0_0_40px_var(--primary-glow)] will-change-transform`}
        style={{ 
          fontSize: "clamp(120px, 18vw, 320px)",
          wordSpacing: "0.2em",
          WebkitFontSmoothing: "antialiased"
        }}
      >
        DILFU ALTAF ATHAYA RIFI
      </h1>
    </section>
  );
}
