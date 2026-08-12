"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-secondary-text text-lg sm:text-xl font-medium tracking-wide mb-4">
          {t("greeting")}
        </h2>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-foreground dark:text-primary mb-6 dark:[text-shadow:0_0_20px_var(--primary-glow)]">
          Dilfu
        </h1>
        <p className="text-xl sm:text-2xl text-secondary-text mb-10 font-light">
          {t("role")}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-background transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
          >
            {t("viewProjects")}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-card border border-border text-foreground font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_var(--primary-glow)]"
          >
            {t("contactMe")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
