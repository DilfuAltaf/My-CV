"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function Certificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("display_order", { ascending: true })
          .order("issue_date", { ascending: false });
        
        if (data && !error) setCertificates(data);
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  if (loading) return null;

  return (
    <section id="certificates" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
              <p className="text-secondary-text mt-2">Achievements and credentials.</p>
            </div>
          </div>
          
          {certificates.length === 0 ? (
            <div className="bg-card/30 border border-border rounded-3xl p-12 text-center flex flex-col items-center">
              <Award size={48} className="text-secondary-text/50 mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No certificates yet</h3>
              <p className="text-secondary-text max-w-md mx-auto">
                Anda belum menambahkan sertifikat. Silakan login ke Admin Dashboard dan tambahkan sertifikat Anda agar muncul di sini!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-card border border-border rounded-3xl p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Award size={32} />
                  </div>
                  
                  <h3 className="font-bold text-foreground text-lg leading-tight mb-2">
                    {cert.title}
                  </h3>
                  
                  <p className="text-secondary-text text-sm font-medium mb-4">
                    {cert.issuer}
                  </p>
                  
                  <div className="mt-auto pt-4 w-full border-t border-border flex justify-between items-center text-sm">
                    <span className="text-secondary-text">
                      {cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                    </span>
                    
                    <div className="flex gap-3">
                      {cert.image_url && (
                        <a href={cert.image_url} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-colors" title="View Image">
                          <ImageIcon size={18} />
                        </a>
                      )}
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-primary transition-colors" title="Verify Credential">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
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
