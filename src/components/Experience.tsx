"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchExperience() {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .order("display_order", { ascending: true })
          .order("start_date", { ascending: false });
        
        if (data && !error) setExperiences(data);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, []);

  if (loading) return null;

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl font-bold text-foreground">Work Experience</h2>
            <p className="text-secondary-text mt-2">My professional journey.</p>
          </div>

          {experiences.length === 0 ? (
            <div className="bg-card/30 border border-border rounded-3xl p-12 text-center flex flex-col items-center">
              <Briefcase size={48} className="text-secondary-text/50 mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No experience added</h3>
              <p className="text-secondary-text max-w-md mx-auto">
                Anda belum menambahkan pengalaman kerja. Silakan login ke Admin Dashboard dan tambahkan pengalaman Anda agar muncul di sini!
              </p>
            </div>
          ) : (
            <div className="relative border-l-2 border-primary/20 ml-3 md:ml-6 space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8 md:pl-10"
                >
                  {/* Timeline Dot */}
                  <div className="absolute w-6 h-6 bg-primary rounded-full -left-[13px] top-1 border-4 border-background shadow-[0_0_10px_var(--primary-glow)]" />
                  
                  <div className="bg-card/40 backdrop-blur-sm border border-border p-6 sm:p-8 rounded-3xl hover:border-primary/50 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <p className="text-primary font-medium text-lg mt-1">{exp.company}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 px-3 py-1 bg-secondary text-secondary-text text-sm rounded-full font-medium inline-block border border-border">
                        {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                        {" - "} 
                        {exp.current_job ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present')}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <p className="text-secondary-text leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
