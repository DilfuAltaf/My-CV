"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate Supabase insertion for now
    setTimeout(() => {
      setStatus("success");
      // Reset form
      (e.target as HTMLFormElement).reset();
      
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("title") || "Get In Touch"}</h2>
            <p className="text-secondary-text max-w-2xl mx-auto">
              {t("subtitle") || "Have a project in mind or want to explore an opportunity? Let's talk about it."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("contactInfo") || "Contact Information"}</h3>
              <div className="space-y-6">
                <a href="https://wa.me/6285780617085" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group">
                  <div className="p-4 bg-card rounded-2xl border border-border group-hover:border-primary/50 transition-colors">
                    <MessageCircle className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">WhatsApp</h4>
                    <p className="text-secondary-text mt-1">0857-8061-7085</p>
                  </div>
                </a>
                
                <a href="mailto:hello@example.com" className="flex items-start space-x-4 group">
                  <div className="p-4 bg-card rounded-2xl border border-border group-hover:border-primary/50 transition-colors">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email</h4>
                    <p className="text-secondary-text mt-1">hello@example.com</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("name") || "Name"}</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder={t("namePlaceholder") || "John Doe"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("email") || "Email"}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t("message") || "Message"}</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
                    placeholder={t("messagePlaceholder") || "Tell me about your project..."}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-foreground text-background font-medium rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-70 flex justify-center items-center"
                >
                  {status === "loading" ? (
                    <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
                  ) : status === "success" ? (
                    <span>{t("success") || "Message Sent!"}</span>
                  ) : (
                    <span>{t("send") || "Send Message"}</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
