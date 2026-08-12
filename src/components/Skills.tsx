"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNestjs, SiVuedotjs, SiFlutter, SiPython, SiGo, SiPhp, SiJavascript, SiHtml5, SiCss } from "react-icons/si";

const skillsData = [
  // Fundamentals
  { name: "JavaScript", level: "Advanced", icon: SiJavascript, color: "#F7DF1E", span: "col-span-2 md:col-span-2 md:row-span-1" },
  { name: "HTML5", level: "Advanced", icon: SiHtml5, color: "#E34F26", span: "col-span-1 md:col-span-1 md:row-span-1" },
  { name: "CSS3", level: "Advanced", icon: SiCss, color: "#1572B6", span: "col-span-1 md:col-span-1 md:row-span-1" },
  
  // Core Tech
  { name: "Next.js", level: "Advanced", icon: SiNextdotjs, color: "", span: "col-span-2 md:col-span-2 md:row-span-2" },
  { name: "React", level: "Advanced", icon: SiReact, color: "#61DAFB", span: "col-span-1 md:col-span-1 md:row-span-1" },
  { name: "TypeScript", level: "Advanced", icon: SiTypescript, color: "#3178C6", span: "col-span-1 md:col-span-1 md:row-span-1" },
  { name: "Tailwind CSS", level: "Advanced", icon: SiTailwindcss, color: "#06B6D4", span: "col-span-2 md:col-span-2 md:row-span-1" },
  
  // Additional Frameworks
  { name: "Flutter", level: "Advanced", icon: SiFlutter, color: "#02569B", span: "col-span-2 md:col-span-2 md:row-span-2" },
  { name: "Vue.js", level: "Intermediate", icon: SiVuedotjs, color: "#4FC08D", span: "col-span-1 md:col-span-1 md:row-span-1" },
  { name: "NestJS", level: "Intermediate", icon: SiNestjs, color: "#E0234E", span: "col-span-1 md:col-span-1 md:row-span-1" },
  
  // Beginners
  { name: "Python", level: "Beginner", icon: SiPython, color: "#3776AB", span: "col-span-1 md:col-span-1 md:row-span-1" },
  { name: "Go", level: "Beginner", icon: SiGo, color: "#00ADD8", span: "col-span-1 md:col-span-1 md:row-span-1" },
  
  // Bottom Banner
  { name: "PHP", level: "Beginner", icon: SiPhp, color: "#777BB4", span: "col-span-2 md:col-span-4 md:row-span-1" },
];

export function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12">{t("title") || "Skills & Expertise"}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense auto-rows-[minmax(140px,auto)] gap-4 md:gap-6">
            {skillsData.map((skill, index) => {
              const isLarge = skill.span.includes("row-span-2") || skill.span.includes("col-span-4");
              return (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 0.98 }}
                  className={`group relative bg-card/40 backdrop-blur-sm border border-border rounded-3xl p-6 flex ${isLarge ? 'flex-col justify-center' : 'flex-col justify-center'} items-center text-center hover:border-primary/80 hover:shadow-[0_0_30px_var(--primary-glow)] transition-all duration-500 overflow-hidden cursor-pointer ${skill.span}`}
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Faint Background Logo Watermark */}
                  <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:opacity-30 transition-all duration-700 z-0 pointer-events-none rotate-12 group-hover:-rotate-12 group-hover:scale-110">
                    <skill.icon className={`${isLarge ? 'w-48 h-48 md:w-64 md:h-64' : 'w-32 h-32 md:w-40 md:h-40'}`} color={skill.color || undefined} />
                  </div>
                  
                  <span className={`${isLarge ? 'text-6xl mb-6' : 'text-4xl mb-4'} group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-500 z-10`}>
                    <skill.icon color={skill.color || undefined} />
                  </span>
                  
                  <div className="z-10 transition-transform duration-500 group-hover:-translate-y-1">
                    <h4 className={`${isLarge ? 'text-xl' : 'text-base'} font-bold text-foreground`}>{skill.name}</h4>
                    <p className="text-sm text-secondary-text mt-1">{skill.level}</p>
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
