"use client";

import { motion } from "framer-motion";

function AboutBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Subtle decorative connecting energy path */}
        <motion.path
          style={{ filter: "drop-shadow(0 0 4px rgba(24,255,120,0.3))" }}
          d="M-10,10 C30,40 60,10 110,50"
          fill="none"
          stroke="#18FF78"
          strokeWidth="0.04"
          strokeDasharray="2 6"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M-10,90 C40,60 80,100 110,70"
          fill="none"
          stroke="#F5F7F5"
          strokeWidth="0.02"
          strokeDasharray="1 8"
          className="opacity-30"
          initial={{ strokeDashoffset: 80 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {/* Soft gradient fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#050706]/70 to-[#050706]" />
    </div>
  );
}

export function About() {
  // Container staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const metadataItems = [
    {
      label: "FOCUS",
      value: "Frontend & Fullstack Development",
    },
    {
      label: "CURRENTLY",
      value: "Building, learning, and experimenting",
    },
    {
      label: "BASED IN",
      value: "Jakarta, Indonesia",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center bg-[#050706] text-[#F5F7F5] py-28 md:py-36 overflow-hidden border-t border-[#111613]"
    >
      <AboutBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Label + Section Number */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex lg:flex-col justify-between items-baseline lg:items-start space-y-0 lg:space-y-4"
          >
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-6 bg-[#18FF78] opacity-80 shadow-[0_0_8px_rgba(24,255,120,0.5)]" />
              <span className="text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-[#18FF78] [text-shadow:0_0_8px_rgba(24,255,120,0.4)]">
                ABOUT
              </span>
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-light tracking-tighter text-[#18FF78] [text-shadow:0_0_12px_rgba(24,255,120,0.5)]">
              01
            </div>
          </motion.div>

          {/* Right Column: Statement, Description, Metadata */}
          <div className="lg:col-span-8 flex flex-col">
            {/* Statement */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[#F5F7F5] leading-[1.25] mb-8 lg:mb-10 max-w-3xl"
            >
              I'm a developer who enjoys turning ideas into clean, useful, and meaningful digital experiences.
            </motion.h2>

            {/* Introduction Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#7D857F] font-light leading-relaxed mb-12 sm:mb-16 max-w-2xl"
            >
              I'm focused on building modern web applications, exploring new technologies, and creating interfaces that are simple, functional, and enjoyable to use.
            </motion.p>

            {/* Metadata Rows */}
            <motion.div variants={itemVariants} className="w-full border-t border-[#1a211d]">
              {metadataItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="group py-5 sm:py-6 border-b border-[#1a211d] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 transition-colors duration-300 hover:border-[#18FF78]/30"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18FF78] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_6px_#18FF78]" />
                    <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#7D857F] group-hover:text-[#F5F7F5] transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-normal text-[#F5F7F5] sm:text-right group-hover:text-[#18FF78] group-hover:[text-shadow:0_0_8px_rgba(24,255,120,0.3)] transition-all duration-300">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
