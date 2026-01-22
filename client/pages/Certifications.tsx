import { motion, Variants } from "framer-motion";
import { Award, Shield, CheckCircle2, Target, Activity, FileText } from "lucide-react";

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
      title: "Intelligence Track – Advanced Course",
      issuer: "National Cyber Crime Training Center, Government of India",
      date: "2026",
      description: "Advanced specialized training in cyber intelligence operations, multi-source data synthesis, and complex digital threat investigation.",
      skills: ["Cyber Intel", "Evidence Synthesis", "Threat Investigation"],
      icon: FileText
    },
    {
      title: "OSINT Professional Certification",
      issuer: "Cyber Intelligence Academy",
      date: "2024",
      description: "Advanced training in open-source intelligence gathering, digital profiling, and investigative methodology.",
      skills: ["Advanced Search", "Image/Video Forensics", "Identity Verification"],
      icon: Shield
    },
    {
      title: "Cybercrime Investigation Specialist",
      issuer: "Technical Security Institute",
      date: "2023",
      description: "Comprehensive study of cybercrime patterns, threat actor motivations, and legal documentation standards.",
      skills: ["Fraud Analysis", "Darknet Monitoring", "Evidence Preservation"],
      icon: Activity
    },
    {
      title: "Security+ & Network Defense",
      issuer: "Professional Development Board",
      date: "2023",
      description: "Foundational cybersecurity training covering network security, threat management, and secure architecture.",
      skills: ["Network Recon", "Risk Management", "Vulnerability Scanning"],
      icon: Target
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={revealVariants}
                className="group p-10 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-500 flex flex-col h-full"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  <cert.icon className="w-8 h-8 text-primary" />
                </div>
                
                <div className="flex-grow space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">{cert.title}</h3>
                  <p className="text-lg text-primary font-bold opacity-80">{cert.issuer}</p>
                  <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">{cert.date}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium pt-4">
                    {cert.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-3">
                    {cert.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-1.5 rounded-full bg-muted/50 border border-border text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                        {skill}
                      </span>
                    ))}
                  </div>
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
