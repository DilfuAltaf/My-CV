"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLenis } from "lenis/react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const t = useTranslations("Navbar");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed z-50 transition-all duration-500 ease-out left-1/2 -translate-x-1/2 flex items-center",
        isScrolled 
          ? "top-4 w-[90%] md:w-max rounded-full bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg py-2 px-6 h-14"
          : "top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 py-0 px-4 sm:px-6 lg:px-8 h-16"
      )}
    >
      <div 
        className={cn(
          "flex justify-between items-center w-full transition-all duration-500",
          isScrolled ? "gap-4 md:gap-12" : "max-w-6xl mx-auto"
        )}
      >
        <div className="flex-shrink-0 flex items-center">
          <Link 
            href="/" 
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-bold text-xl tracking-tighter text-foreground dark:text-primary dark:[text-shadow:0_0_10px_var(--primary-glow)]"
          >
            Portofolio
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-secondary-text hover:text-primary transition-all text-sm font-medium hover:[text-shadow:0_0_10px_var(--primary-glow)]"
          >
            {t("about")}
          </a>
          <a 
            href="#skills" 
            onClick={(e) => handleNavClick(e, '#skills')}
            className="text-secondary-text hover:text-primary transition-all text-sm font-medium hover:[text-shadow:0_0_10px_var(--primary-glow)]"
          >
            {t("skills")}
          </a>
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, '#projects')}
            className="text-secondary-text hover:text-primary transition-all text-sm font-medium hover:[text-shadow:0_0_10px_var(--primary-glow)]"
          >
            {t("projects")}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-secondary-text hover:text-primary transition-all text-sm font-medium hover:[text-shadow:0_0_10px_var(--primary-glow)]"
          >
            {t("contact")}
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link href={pathname} locale="en" className="text-secondary-text hover:text-primary transition-all text-sm font-bold hover:[text-shadow:0_0_10px_var(--primary-glow)]">EN</Link>
          <span className="text-border/50 text-xs">|</span>
          <Link href={pathname} locale="id" className="text-secondary-text hover:text-primary transition-all text-sm font-bold hover:[text-shadow:0_0_10px_var(--primary-glow)]">ID</Link>
          
          <div className="w-px h-4 bg-border/50 mx-1 hidden md:block"></div>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-card transition-colors text-secondary-text hover:text-foreground flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
