"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function Hero() {
  const t = useTranslations("Hero");
  const [heroData, setHeroData] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchHero() {
      try {
        const { data, error } = await supabase.from("hero").select("*").limit(1).single();
        if (data && !error) {
          setHeroData(data);
        }
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    }
    fetchHero();
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 pt-16 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1,
            },
          },
        }}
        className="relative z-10 max-w-4xl mx-auto pointer-events-none"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-secondary-text text-lg sm:text-xl font-medium tracking-wide mb-4"
        >
          {heroData?.greeting || t("greeting")}
        </motion.h2>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-foreground dark:text-primary mb-6 dark:[text-shadow:0_0_20px_var(--primary-glow)]"
        >
          {heroData?.display_name || "Dilfu"}
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="text-xl sm:text-2xl text-secondary-text mb-10 font-light"
        >
          {heroData?.job_title || t("role")}
        </motion.p>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="flex flex-col sm:flex-row justify-center gap-4 pointer-events-auto"
        >
          <a
            href={heroData?.primary_cta_link || "#projects"}
            className="px-8 py-3 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-background transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)]"
          >
            {heroData?.primary_cta_text || t("viewProjects")}
          </a>
          <a
            href={heroData?.secondary_cta_link || "#contact"}
            className="px-8 py-3 bg-card border border-border text-foreground font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_var(--primary-glow)]"
          >
            {heroData?.secondary_cta_text || t("contactMe")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
