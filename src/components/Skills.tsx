"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, 
  SiNestjs, SiVuedotjs, SiFlutter, SiJavascript, 
  SiHtml5, SiCss, SiPython, SiGo, SiPhp,
  SiFirebase, SiSupabase
} from "react-icons/si";
import { supabase } from "@/lib/supabase";

const IconMap: Record<string, any> = {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, 
  SiNestjs, SiVuedotjs, SiFlutter, SiJavascript, 
  SiHtml5, SiCss, SiPython, SiGo, SiPhp,
  SiFirebase, SiSupabase
};

const fallbackSkills = [
  { name: "JavaScript", level: "Advanced", icon: "SiJavascript" },
  { name: "TypeScript", level: "Advanced", icon: "SiTypescript" },
  { name: "React", level: "Advanced", icon: "SiReact" },
  { name: "Next.js", level: "Expert", icon: "SiNextdotjs" },
  { name: "Tailwind CSS", level: "Expert", icon: "SiTailwindcss" },
  { name: "HTML5", level: "Advanced", icon: "SiHtml5" },
  { name: "CSS3", level: "Advanced", icon: "SiCss" },
  { name: "NestJS", level: "Intermediate", icon: "SiNestjs" },
  { name: "Vue.js", level: "Intermediate", icon: "SiVuedotjs" },
  { name: "Flutter", level: "Beginner", icon: "SiFlutter" },
  { name: "Firebase", level: "Intermediate", icon: "SiFirebase" },
  { name: "Supabase", level: "Intermediate", icon: "SiSupabase" },
  { name: "Python", level: "Beginner", icon: "SiPython" },
  { name: "Go", level: "Beginner", icon: "SiGo" },
  { name: "PHP", level: "Beginner", icon: "SiPhp" }
];

const getBentoSpan = (index: number) => {
  const pattern = [
    "col-span-2 md:col-span-2 md:row-span-2",
    "col-span-1 md:col-span-1 md:row-span-1",
    "col-span-1 md:col-span-1 md:row-span-1",
    "col-span-2 md:col-span-2 md:row-span-1",
    "col-span-2 md:col-span-2 md:row-span-1",
    "col-span-1 md:col-span-1 md:row-span-1",
    "col-span-1 md:col-span-1 md:row-span-1",
    "col-span-2 md:col-span-2 md:row-span-2"
  ];
  return pattern[index % pattern.length];
};

function SkillDots({ level }: { level: string }) {
  const getDots = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 2;
      case 'intermediate': return 3;
      case 'advanced': return 4;
      case 'expert': return 5;
      default: return 3;
    }
  };
  
  const dots = getDots(level);
  
  return (
    <div className="flex space-x-1.5 mt-3 justify-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            i <= dots ? 'bg-primary' : 'bg-border'
          }`} 
        />
      ))}
    </div>
  );
}

export function Skills() {
  const t = useTranslations("Skills");
  const [skills, setSkills] = useState<any[]>(fallbackSkills);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error("Error fetching skills:", error);
          return;
        }

        if (data && data.length > 0) {
          setSkills(data);
        } else {
          // If query succeeds but returns 0 rows, use fallback
          setSkills(fallbackSkills);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    }
    
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="text-3xl font-bold mb-12 text-center md:text-left"
          >
            {t("title") || "Skills & Expertise"}
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[minmax(160px,auto)] gap-4 md:gap-6">
            {skills.map((skill, index) => {
              const IconComponent = IconMap[skill.icon] || SiJavascript;
              const spanClass = getBentoSpan(index);
              const isLarge = spanClass.includes("row-span-2");
              
              return (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ scale: 0.98 }}
                  className={`group relative bg-card/40 backdrop-blur-sm border border-border rounded-3xl p-6 flex flex-col justify-center items-center text-center hover:border-primary/80 hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-500 overflow-hidden cursor-pointer ${spanClass}`}
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Faint Background Logo Watermark */}
                  <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-all duration-700 z-0 pointer-events-none rotate-12 group-hover:-rotate-12 group-hover:scale-110 text-foreground">
                    <IconComponent className={`${isLarge ? 'w-40 h-40' : 'w-24 h-24'}`} />
                  </div>
                  
                  <span className={`${isLarge ? 'text-6xl mb-6' : 'text-4xl mb-4'} group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-500 z-10 text-foreground`}>
                    <IconComponent />
                  </span>
                  
                  <div className="z-10 transition-transform duration-500 group-hover:-translate-y-1">
                    <h4 className="text-xl font-bold text-foreground">{skill.name}</h4>
                    <p className="text-xs font-bold tracking-wider text-secondary-text uppercase mt-2">{skill.level}</p>
                    <SkillDots level={skill.level} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
