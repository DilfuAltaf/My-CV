"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ name, email, message }]);

      if (error) {
        console.error("Error inserting message:", error);
        setStatus("error");
        setErrorMessage(error.message || "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        
        // Redirect to WhatsApp
        const waText = `Halo Dilfu!\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
        const waUrl = `https://wa.me/6285780617085?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, "_blank");
        
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
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
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold mb-6">{t("contactInfo") || "Contact Information"}</h3>
              <div className="space-y-4">
                
                {/* Email Link */}
                <a href="mailto:dilfualtaf07@gmail.com" className="flex items-center p-5 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-secondary-text">dilfualtaf07@gmail.com</p>
                  </div>
                </a>

                {/* GitHub Link */}
                <a href="https://github.com/DilfuAltaf" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4 group-hover:scale-110 transition-transform flex items-center justify-center">
                    <FaGithub size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm uppercase tracking-wider mb-1">GitHub</h4>
                    <p className="text-secondary-text">github.com/DilfuAltaf</p>
                  </div>
                </a>

                {/* LinkedIn Link */}
                <a href="https://www.linkedin.com/in/dilfu-altaf-994a62329/" target="_blank" rel="noopener noreferrer" className="flex items-center p-5 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mr-4 group-hover:scale-110 transition-transform flex items-center justify-center">
                    <FaLinkedin size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm uppercase tracking-wider mb-1">LinkedIn</h4>
                    <p className="text-secondary-text">linkedin.com/in/dilfu-altaf</p>
                  </div>
                </a>

              </div>
            </div>
            
            <div className="order-1 md:order-2 bg-card border border-border rounded-3xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("name") || "Name"}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder={t("namePlaceholder") || "Your Name"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("email") || "Email"}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                    placeholder={t("emailPlaceholder") || "Enter your email"}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t("message") || "Message"}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground resize-none"
                    placeholder={t("messagePlaceholder") || "Tell me about your project..."}
                  />
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-4 rounded-xl"
                    >
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-xl"
                    >
                      <AlertCircle size={20} />
                      <span className="text-sm font-medium">{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full py-4 bg-foreground text-background font-medium rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 disabled:opacity-70 flex justify-center items-center"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Sending...</span>
                    </>
                  ) : status === "success" ? (
                    <span>Sent</span>
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
