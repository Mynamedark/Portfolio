import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Award,
  Shield,
  Lock,
  Globe,
  Microscope,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

function Certifications() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Enable Escape key to close modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const certifications = [
    {
      id: 0,
      title: "Intelligence Track – Advanced Course",
      issuer: "National Cyber Crime Training Center (Government of India)",
      category: "Cyber Intelligence & Investigation",
      issuedDate: "2026",
      icon: Shield,
      color: "bg-gradient-green",
      image: "/certificates/Course_Completion_Certificate_Intermediate.jpg",
    },
    {
      id: 1,
      title: "CSI Linux",
      issuer: "CSI Linux Official",
      category: "Digital Forensics & Cyber Investigation",
      issuedDate: "2025",
      icon: Lock,
      color: "bg-gradient-blue",
      image: "/certificates/CSIL-CI_Certification.jpg",
    },
    {
      id: 2,
      title: "Security Blue Team",
      issuer: "Security Blue Team",
      category: "Dark Web Operation & Threat Intelligence",
      issuedDate: "2025",
      icon: Globe,
      color: "bg-gradient-purple",
      image: "/certificates/Introduction_to_Dark_Web_Operations.jpg",
    },
    {
      id: 3,
      title: "Digital Forensics",
      issuer: "Cybrary",
      category: "Forensic Analysis & Evidence Handling",
      issuedDate: "2025",
      icon: Microscope,
      color: "bg-gradient-orange",
      image: "/certificates/cybrary-cert-digital-forensics-basics.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      {/* Header */}
      <section className="py-32 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Award className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Dossier: Verified Credentials
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Technical <br />
              <span className="text-muted-foreground/40 italic font-light">
                Validation.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary/30 pl-8"
            >
              A comprehensive record of professional certifications and verified
              expertise in the fields of OSINT and digital investigation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {certifications.map((cert) => (
              <SpotlightCard
                key={cert.id}
                className="p-8 md:p-12 rounded-[2.5rem] bg-card/30 backdrop-blur-xl border border-border hover:border-primary/50 transition duration-500 flex flex-col h-full shadow-2xl group"
              >
                <div className="flex items-start justify-between mb-10">
                  <div
                    className={`w-20 h-20 rounded-2xl ${cert.color} flex items-center justify-center border border-white/10 shadow-lg`}
                  >
                    <cert.icon className="w-10 h-10 text-white" />
                  </div>

                  <span className="text-sm font-mono uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                    {cert.issuedDate}
                  </span>
                </div>

                <div className="flex-grow space-y-8">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${cert.color} bg-clip-text text-transparent`}
                  >
                    {cert.category}
                  </p>

                  <h3 className="text-4xl font-bold tracking-tight">{cert.title}</h3>

                  <button
                    onClick={() => setActiveCert(cert.image)}
                    className="inline-flex items-center gap-3 text-lg font-bold text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    View Certificate
                  </button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Viewer */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-5xl w-full mx-4 bg-background rounded-xl border border-border shadow-2xl overflow-hidden">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl"
            >
              ✕
            </button>

            <div className="w-full h-[80vh] overflow-auto flex items-center justify-center bg-black">
              {activeCert.toLowerCase().endsWith(".pdf") ? (
                <iframe src={activeCert} className="w-full h-full" />
              ) : (
                <img
                  src={activeCert}
                  alt="certificate"
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            <div className="p-4 border-t border-border flex justify-between items-center bg-background">
              <span className="text-muted-foreground text-sm">Preview Mode</span>
              <a
                href={activeCert}
                download
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certifications;
