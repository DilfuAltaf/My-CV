"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function DataFlowBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <svg
        className="absolute w-full h-full opacity-40"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Subtle curved lines representing data flow with neon glow */}
        <motion.path
          style={{ filter: "drop-shadow(0 0 4px rgba(24,255,120,0.4))" }}
          d="M-10,40 C20,20 40,70 70,30 C90,0 110,50 120,30"
          fill="none"
          stroke="#18FF78"
          strokeWidth="0.05"
          strokeDasharray="2 4"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          style={{ filter: "drop-shadow(0 0 3px rgba(24,255,120,0.3))" }}
          d="M-10,70 C30,80 50,10 80,40 C100,60 110,20 120,40"
          fill="none"
          stroke="#18FF78"
          strokeWidth="0.03"
          strokeDasharray="1 3"
          initial={{ strokeDashoffset: -100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M-10,20 C30,10 60,60 100,20 C110,10 120,20 130,20"
          fill="none"
          stroke="#F5F7F5"
          strokeWidth="0.02"
          strokeDasharray="1 5"
          initial={{ strokeDashoffset: 50 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {/* Subtle vignettes to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050706]/60 to-[#050706]"></div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the hero content - very subtle to maintain readability
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] w-full flex flex-col justify-center bg-[#050706] text-[#F5F7F5] overflow-hidden"
    >
      <DataFlowBackground />
      
      <motion.div 
        style={{ y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex flex-col items-start justify-center pt-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="mb-8 flex items-center space-x-4">
            <span className="h-[1px] w-8 bg-[#18FF78] opacity-80 shadow-[0_0_8px_rgba(24,255,120,0.5)]"></span>
            <h2 className="text-[#18FF78] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium [text-shadow:0_0_8px_rgba(24,255,120,0.4)]">
              Creative Developer
            </h2>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-[0.95] mb-8 text-[#F5F7F5]"
          >
            DILFU <br className="hidden sm:block" />
            ALTAF
          </motion.h1>

          {/* Support Text */}
          <motion.p 
            variants={itemVariants}
            className="text-[#7D857F] text-lg sm:text-xl md:text-2xl max-w-xl mb-14 font-light leading-relaxed"
          >
            I build digital experiences that feel as good as they work.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 bg-[#0D110F] text-[#F5F7F5] border border-[#7D857F]/20 hover:border-[#18FF78] hover:bg-[#050706] hover:text-[#18FF78] hover:shadow-[0_0_12px_rgba(24,255,120,0.15)] hover:[text-shadow:0_0_8px_rgba(24,255,120,0.4)] transition-all duration-300 text-sm tracking-widest uppercase font-medium relative group overflow-hidden flex items-center justify-center rounded-sm"
            >
              <span className="relative z-10">Explore my work</span>
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 bg-transparent text-[#7D857F] hover:text-[#18FF78] hover:[text-shadow:0_0_8px_rgba(24,255,120,0.4)] transition-all duration-300 text-sm tracking-widest uppercase font-medium flex items-center space-x-3 group"
            >
              <span>Get in touch</span>
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Metadata */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-6 sm:left-12 md:left-24 flex flex-col text-[10px] sm:text-xs text-[#18FF78] opacity-70 tracking-[0.2em] uppercase font-mono space-y-2 [text-shadow:0_0_8px_rgba(24,255,120,0.3)]"
        >
          <span>Jakarta, Indonesia</span>
          <span>2026</span>
        </motion.div>

      </motion.div>
    </section>
  );
}
