"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Download } from "lucide-react";

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-12">{t("title") || "About Me"}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-colors duration-300">
            <h3 className="text-2xl font-semibold mb-4">{t("introTitle") || "Hello, I'm Dilfu."}</h3>
            <p className="text-secondary-text leading-relaxed text-lg">
              {t("introText") || "I am a passionate Frontend Developer specializing in building exceptional digital experiences. I focus on writing clean, elegant, and efficient code to create user-friendly web applications."}
            </p>
            <button className="mt-8 flex items-center space-x-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
              <span>{t("downloadResume") || "Download Resume"}</span>
              <Download size={18} />
            </button>
          </div>
          
          {/* Side Cards */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border border-border rounded-3xl p-8 flex items-start space-x-4 hover:border-primary/50 transition-colors duration-300 flex-1">
              <MapPin className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-medium text-foreground">{t("locationTitle") || "Location"}</h4>
                <p className="text-secondary-text mt-1">{t("locationText") || "Jakarta, Indonesia"}</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-3xl p-8 flex items-start space-x-4 hover:border-primary/50 transition-colors duration-300 flex-1">
              <GraduationCap className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-medium text-foreground">{t("educationTitle") || "Education"}</h4>
                <p className="text-secondary-text mt-1">{t("educationText") || "Computer Science"}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
