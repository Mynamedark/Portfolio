import { motion, Variants } from "framer-motion";
import { Award, Shield, Lock, Globe, Microscope, CheckCircle2, ExternalLink, FileText } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useState } from "react";

export default function Certifications() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const certifications = [
    {
      id: 0,
      title: "Intelligence Track – Advanced Course",
      issuer: "National Cyber Crime Training Center (Government of India)",
      category: "Cyber Intelligence & Investigation",
      issuedDate: "2026",
      description: "Government-issued advanced intelligence training covering cyber investigations, OSINT methodologies, digital profiling, and national-level cyber awareness.",
      icon: Shield,
      color: "bg-gradient-green",
      verificationUrl: "#",
      image: "/certificates/Course_Completion_Certificate_Intermediate.pdf" // Example path
    },
    {
      id: 1,
      title: "CSI Linux",
      issuer: "CSI Linux Official",
      category: "Digital Forensics & Cyber Investigation",
      issuedDate: "2025",
      description:
        "Comprehensive certification in digital forensics and cyber investigation using CSI Linux platform. Covers evidence collection, malware analysis, and forensic examination techniques.",
      icon: Lock,
      color: "bg-gradient-blue",
      verificationUrl: "#",
      image: "/certificates/CSIL-CI_Certification.pdf" // No image yet
    },
    {
      id: 2,
      title: "Security Blue Team",
      issuer: "Security Blue Team",
      category: "Dark Web Operation & Threat Intelligence",
      issuedDate: "2025",
      description:
        "Advanced certification in dark web operations, threat intelligence gathering, and OSINT methodology. Focus on identifying threat actors and analyzing cybercriminal infrastructure.",
      icon: Globe,
      color: "bg-gradient-purple",
      verificationUrl: "#",
      image: "/certificates/Introduction to Dark Web Operations-course.pdf"
    },
    {
      id: 3,
      title: "Digital Forensics",
      issuer: "Cybrary",
      category: "Forensic Analysis & Evidence Handling",
      issuedDate: "2025",
      description:
        "Professional certification in digital forensics covering evidence preservation, chain of custody, forensic tools, and expert reporting standards for legal proceedings.",
      icon: Microscope,
      color: "bg-gradient-orange",
      verificationUrl: "#",
      image: "/certificates/cybrary-cert-digital-forensics-basics.pdf"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-20 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }} 
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Background Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
              >
                <Award className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">Dossier: Verified Credentials</span>
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none font-display">
                Technical <br />
                <span className="text-muted-foreground/40 italic font-light">Validation.</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8 font-sans"
              >
                A comprehensive record of professional certifications and verified expertise in the fields of OSINT and digital investigation.
              </motion.p>
            </div>
        </div>
      </section>

      {/* Certs Grid */}
      <section className="pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {certifications.map((cert, index) => (
                <SpotlightCard
                  key={cert.id}
                  index={index}
                  className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-card/30 backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-500 flex flex-col h-full shadow-2xl group overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${cert.color} opacity-5 blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="flex items-start justify-between mb-10 relative z-10">
                    <div className={`w-20 h-20 rounded-2xl ${cert.color} flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <cert.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-sm font-mono uppercase tracking-widest text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 font-display">
                      {cert.issuedDate}
                    </span>
                  </div>
                  
                  <div className="flex-grow space-y-8 relative z-10">
                    <div className="space-y-3">
                      <p className={`text-xs font-bold uppercase tracking-wider ${cert.color} bg-clip-text text-transparent font-display`}>
                        {cert.category}
                      </p>
                      <h3 className="text-4xl font-bold tracking-tight text-foreground font-display leading-tight">{cert.title}</h3>
                    </div>
                    
                    {cert.image ? (
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border/50 bg-black/20 group/img">
                        <motion.img 
                          src={cert.image} 
                          alt={cert.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1, rotate: 0 }}
                          animate={{ 
                            y: [0, -8, 0],
                            rotate: [0, 0.5, 0, -0.5, 0]
                          }}
                          transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          whileHover={{ 
                            y: 0, 
                            rotate: 0,
                            scale: 1.05,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 flex items-end p-6">
                           <p className="text-white text-sm font-display flex items-center gap-2">
                             <FileText className="w-4 h-4" />
                             Intelligence Document: {cert.title}
                           </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <p className="text-2xl text-primary font-bold italic opacity-80 font-display">{cert.issuer}</p>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium pt-2 font-sans">
                          {cert.description}
                        </p>
                      </div>
                    )}
                  </div>
                  
                    {!cert.image && (
                      <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between relative z-10">
                        <a 
                          href={cert.verificationUrl}
                          className="inline-flex items-center gap-3 text-lg font-bold text-muted-foreground hover:text-primary transition-all duration-300 group/link font-display"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                        <div className={`w-3 h-3 rounded-full ${cert.color} animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]`} />
                      </div>
                    )}
                </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final Verification Section */}
      <section className="py-48 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="p-16 md:p-24 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-5xl md:text-8xl font-bold mb-10 tracking-tight leading-none text-foreground">Defensible <br /><span className="text-muted-foreground/40 italic font-light">Findings.</span></h3>
            <p className="text-2xl text-muted-foreground mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
              Every investigation I conduct is supported by a foundation of technical expertise and verified methodology, ensuring reports meet the rigorous requirements of professional and legal environments.
            </p>
            <div className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-card/30 border border-border backdrop-blur-md shadow-xl">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-foreground">System Integrity: 100% Verified</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
