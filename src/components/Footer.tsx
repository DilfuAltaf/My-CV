import { MessageCircle } from "lucide-react";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <span className="font-bold text-xl tracking-tighter">Dilfu</span>
          <p className="text-secondary-text text-sm mt-2">© {new Date().getFullYear()} Dilfu Altaf Athaya Rifi. All rights reserved.</p>
        </div>
        
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/dlfthya._/" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-all hover:[filter:drop-shadow(0_0_10px_var(--primary-glow))]">
            <span className="sr-only">Instagram</span>
            <InstagramIcon size={24} />
          </a>
          <a href="https://www.linkedin.com/in/dilfu-altaf-994a62329/" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-all hover:[filter:drop-shadow(0_0_10px_var(--primary-glow))]">
            <span className="sr-only">LinkedIn</span>
            <LinkedinIcon size={24} />
          </a>
          <a href="https://wa.me/6285780617085" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-all hover:[filter:drop-shadow(0_0_10px_var(--primary-glow))]">
            <span className="sr-only">WhatsApp</span>
            <MessageCircle size={24} />
          </a>
          <a href="https://github.com/dlfthya" target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-all hover:[filter:drop-shadow(0_0_10px_var(--primary-glow))]">
            <span className="sr-only">GitHub</span>
            <GithubIcon size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
