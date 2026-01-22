import { motion, Variants } from "framer-motion";
import { Award, Shield, Lock, Globe, Microscope, CheckCircle2, ExternalLink } from "lucide-react";

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
      color: "from-green-500 to-emerald-500",
      verificationUrl: "#"
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
      color: "from-blue-500 to-cyan-500",
      verificationUrl: "#"
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
      color: "from-purple-500 to-pink-500",
      verificationUrl: "#"
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
      color: "from-orange-500 to-red-500",
      verificationUrl: "#"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-20">
      {/* Header */}
      <section className="py-32">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dossier: Verified Credentials</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Technical <span className="text-muted-foreground/40 italic font-light">Validation.</span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8">
              A comprehensive record of professional certifications and verified expertise in the fields of OSINT and digital investigation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certs Grid */}
      <section className="pb-48">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={revealVariants}
                className="group p-10 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-5 blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border">
                    {cert.issuedDate}
                  </span>
                </div>
                
                <div className="flex-grow space-y-4">
                  <div className="space-y-1">
                    <p className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                      {cert.category}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tight">{cert.title}</h3>
                  </div>
                  <p className="text-lg text-primary font-bold opacity-80">{cert.issuer}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium pt-2">
                    {cert.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                  <a 
                    href={cert.verificationUrl}
                    className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cert.color} animate-pulse`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Verification Section */}
      <section className="py-32 bg-foreground text-background">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <h3 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-none italic font-light opacity-50">Defensible <span className="opacity-100 font-bold not-italic">Findings.</span></h3>
            <p className="text-2xl text-background/60 mb-16 font-medium leading-relaxed">
              Every investigation I conduct is supported by a foundation of technical expertise and verified methodology, ensuring reports meet the rigorous requirements of professional and legal environments.
            </p>
            <div className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-background/10 border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">System Integrity: 100% Verified</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
