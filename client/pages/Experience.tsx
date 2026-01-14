import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_experiences = [
  {
    id: 1,
    title: "OSINT & Cyber Crime Investigation",
    organization: "Independent",
    period: "2025 – Present",
    location: "Remote",
    description:
      "Leading independent investigations into cybercrime and threat intelligence",
    responsibilities: [
      "Conducted advanced OSINT on threat actors and fake profiles",
      "Analyzed phishing, impersonation, and online fintech fraud patterns",
      "Correlated emails, usernames, IPs, and domains across open sources",
      "Supported documentation for law enforcement standards",
      "Studied roles of Cyber Crime Cells & CERT-In in India",
      "Built comprehensive threat intelligence reports",
    ],
    skills: ["OSINT", "Investigation", "Threat Analysis", "Documentation"],
    highlight:
      "Specialized in tracing digital footprints and threat actor attribution",
  },
  {
    id: 2,
    title: "Web & Application Development",
    organization: "Various Projects",
    period: "2023 – 2024",
    location: "Remote/On-site",
    description:
      "Developed secure web and mobile applications with focus on security",
    responsibilities: [
      "Designed secure web & mobile applications from ground up",
      "Implemented robust authentication and validation mechanisms",
      "Built access control systems and permission hierarchies",
      "Designed SQL-backed systems minimizing injection risks",
      "Integrated APIs securely with proper rate limiting",
      "Handled sensitive data with encryption and secure storage",
      "Applied OWASP security practices throughout development",
      "Conducted security code reviews and testing",
    ],
    skills: [
      "Web Development",
      "Mobile Development",
      "SQL",
      "Security",
      "API Design",
    ],
    highlight:
      "Built production-grade applications with security as first-class citizen",
  },
];

export default function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("experiences");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExperiences(parsed.length > 0 ? parsed : DEFAULT_experiences);
      } catch {
        setExperiences(DEFAULT_experiences);
      }
    } else {
      setExperiences(DEFAULT_experiences);
    }
  }, []);

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
            Professional Experience
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            A track record of successfully conducting cybercrime investigations,
            developing secure applications, and contributing to the
            cybersecurity landscape.
          </p>
        </motion.div>
      </section>

      {/* Experience Cards */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 data-cursor-interactive"
              data-cursor="interactive"
            >
              {/* Background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <div className="relative z-10 p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {exp.title}
                      </h2>
                      <p className="text-lg font-semibold text-primary">
                        {exp.organization}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="text-4xl opacity-50"
                    >
                      <Briefcase className="w-8 h-8 text-primary" />
                    </motion.div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Highlight */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-8">
                  <p className="text-sm text-primary font-semibold">
                    ✨ {exp.highlight}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                    Key Responsibilities
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((responsibility, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{responsibility}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary hover:bg-primary/30 transition-colors"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
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

      {/* Statistics Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Years of Experience", value: "2+" },
            { label: "Cases Analyzed", value: "10+" },
            { label: "Projects Completed", value: "15+" },
            { label: "Security Standards", value: "OWASP" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card text-center hover:border-primary/30 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
