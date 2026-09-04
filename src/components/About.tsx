"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Download, User, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function About() {
  const t = useTranslations("About");
  const [profile, setProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase.from("profiles").select("*").limit(1).single();
        if (data && !error) {
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center md:text-left">{t("title") || "About Me"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1 - Profile Photo */}
            <div className="md:col-span-5 lg:col-span-4 bg-card border border-border rounded-3xl overflow-hidden relative group min-h-[300px] md:min-h-[400px] flex items-center justify-center">
              {profile?.profile_image_url ? (
                <img src={profile.profile_image_url} alt={profile.full_name || "Profile"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 bg-secondary-text/5 flex flex-col items-center justify-center text-secondary-text z-0 group-hover:scale-105 transition-transform duration-700">
                  <User size={64} className="mb-4 opacity-50" />
                  <span className="text-sm font-medium tracking-widest uppercase opacity-50">Profile Photo Placeholder</span>
                </div>
              )}
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-500 z-10" />
            </div>
            
            {/* Card 2 - Introduction & Info */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
              
              {/* Intro Card */}
              <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-colors duration-300 flex-1">
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  Hello, I'm {profile?.display_name || profile?.full_name || "Dilfu"}.
                </h3>
                <p className="text-secondary-text leading-relaxed text-lg mb-8 max-w-2xl whitespace-pre-wrap">
                  {profile?.long_bio || profile?.short_bio || t("introText")}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="bg-background/50 border border-border rounded-2xl p-5 flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">{t("locationTitle") || "Location"}</h4>
                      <p className="text-secondary-text font-medium mt-1">{profile?.location || t("locationText")}</p>
                    </div>
                  </div>

                  {/* Focus */}
                  <div className="bg-background/50 border border-border rounded-2xl p-5 flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Code2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">{t("focusTitle") || "Current Focus"}</h4>
                      <p className="text-secondary-text font-medium mt-1">{profile?.current_focus || t("focusText")}</p>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-background/50 border border-border rounded-2xl p-5 flex items-start space-x-4 sm:col-span-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">{t("educationTitle") || "Education"}</h4>
                      <p className="text-secondary-text font-medium mt-1">{profile?.education || t("educationText")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Button Card */}
              <div className="bg-card border border-border rounded-3xl p-6 md:p-8 hover:border-primary/50 transition-colors duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-semibold text-foreground">{t("resumeTitle") || "Resume / CV"}</h4>
                  <p className="text-sm text-secondary-text mt-1">{t("resumeSubtitle") || "Download my latest resume"}</p>
                </div>
                {profile?.cv_url ? (
                  <a href={profile.cv_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300 font-medium whitespace-nowrap w-full sm:w-auto justify-center">
                    <span>{t("downloadResume") || "Download CV"}</span>
                    <Download size={18} />
                  </a>
                ) : (
                  <button disabled className="flex items-center space-x-2 bg-secondary text-secondary-text px-6 py-3 rounded-full opacity-50 cursor-not-allowed font-medium whitespace-nowrap w-full sm:w-auto justify-center">
                    <span>Not Available</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
