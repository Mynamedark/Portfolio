import { motion, Variants } from "framer-motion";
import { Award, ExternalLink, CheckCircle2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const DEFAULT_CERTIFICATIONS = [
  {
    id: 1,
    title: "CSI Linux",
    issuer: "CSI Linux Official",
    category: "Digital Forensics & Cyber Investigation",
    issuedDate: "2025",
    description:
      "Comprehensive certification in digital forensics and cyber investigation using CSI Linux platform. Covers evidence collection, malware analysis, and forensic examination techniques.",
    icon: "🔐",
    color: "from-blue-500 to-cyan-500",
    verificationUrl: "#",
  },
  {
    id: 2,
    title: "Security Blue Team",
    issuer: "Security Blue Team",
    category: "Dark Web Operation & Threat Intelligence",
    issuedDate: "2025",
    description:
      "Advanced certification in dark web operations, threat intelligence gathering, and OSINT methodology. Focus on identifying threat actors and analyzing cybercriminal infrastructure.",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    verificationUrl: "#",
  },
  {
    id: 3,
    title: "Digital Forensics",
    issuer: "Cybrary",
    category: "Forensic Analysis & Evidence Handling",
    issuedDate: "2025",
    description:
      "Professional certification in digital forensics covering evidence preservation, chain of custody, forensic tools, and expert reporting standards for legal proceedings.",
    icon: "🔬",
    color: "from-orange-500 to-red-500",
    verificationUrl: "#",
  },
];

interface Certification {
  id: number;
  title: string;
  issuer: string;
  category: string;
  issuedDate: string;
  description: string;
  icon: string;
  color: string;
  verificationUrl: string;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const savedCerts = localStorage.getItem("certifications");
    if (savedCerts) {
      try {
        setCertifications(JSON.parse(savedCerts));
      } catch {
        setCertifications(DEFAULT_CERTIFICATIONS);
      }
    } else {
      setCertifications(DEFAULT_CERTIFICATIONS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("certifications", JSON.stringify(certifications));
  }, [certifications]);


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      {/* Header */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Certifications & Credentials
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            Professional certifications and credentials validating expertise in
            cybersecurity, digital forensics, and OSINT investigations.
          </p>
        </motion.div>
      </section>

      {/* Certifications Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover={{ translateY: -8 }}
              className="group relative rounded-xl border border-border bg-card/50 overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              {/* Background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              {/* Top accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${cert.color}`} />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="text-4xl sm:text-5xl"
                  >
                    {cert.icon}
                  </motion.div>
                  <Award className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {cert.title}
                </h3>

                <p className="text-sm font-semibold text-primary mb-2">
                  {cert.issuer}
                </p>

                <p className="text-xs text-muted-foreground mb-4">
                  {cert.category}
                </p>

                {/* Issue Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                  <Calendar className="w-3 h-3" />
                  {/* <span>Issued: {cert.issuedDate}</span> */}
                  <span>Issued: 2025</span>

                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {cert.description}
                </p>

                {/* Verification Link */}
                {/* <a
                  href={cert.verificationUrl}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-4 h-4" />
                </a> */}
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills Covered Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expertise Areas
          </h2>
          <p className="text-muted-foreground">
            Skills and knowledge verified through professional certifications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              title: "Digital Forensics",
              items: [
                "Evidence Collection & Preservation",
                "Chain of Custody Documentation",
                "Forensic Tool Proficiency",
                "Report Generation for Legal Proceedings",
              ],
            },
            {
              title: "OSINT & Threat Intelligence",
              items: [
                "Open Source Intelligence Gathering",
                "Dark Web Monitoring",
                "Threat Actor Identification",
                "Infrastructure Analysis",
              ],
            },
            {
              title: "Cyber Investigation",
              items: [
                "Cybercrime Case Analysis",
                "Digital Evidence Examination",
                "Timeline Analysis",
                "Incident Attribution",
              ],
            },
            {
              title: "Forensic Tools",
              items: [
                "CSI Linux Platform",
                "Digital Analysis Tools",
                "Network Monitoring",
                "Vulnerability Assessment Tools",
              ],
            },
          ].map((area, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-6 sm:p-8 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {area.title}
              </h3>
              <ul className="space-y-3">
                {area.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trust Based on Credentials
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Industry-recognized certifications and continuous professional
            development ensure I stay at the forefront of cybersecurity,
            forensics, and OSINT methodologies.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
