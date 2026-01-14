import { motion, Variants } from "framer-motion";
import { CheckCircle2, Award } from "lucide-react";

const timelineEvents = [
  {
    year: "2025",
    title: "OSINT & Cybercrime Investigation",
    organization: "Independent",
    description:
      "Conducting advanced OSINT on threat actors, analyzing phishing and online fraud patterns, supporting documentation for law enforcement standards.",
    icon: "🔍",
  },
  {
    year: "2023-2024",
    title: "Web & Application Development",
    organization: "Various Projects",
    description:
      "Designed and implemented secure web & mobile applications with strong authentication, validation, and access control mechanisms.",
    icon: "💻",
  },
  {
    year: "2022-2025",
    title: "Bachelor of Computer Application",
    organization: "Uka Tarsadia University",
    description:
      "Comprehensive computer science education with focus on cybersecurity and application development.",
    icon: "🎓",
  },
];

export default function About() {
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
      {/* Hero Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Me
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Dharam Kathiriya is a dedicated cybersecurity professional
            specializing in OSINT investigations and cybercrime analysis. With
            practical experience in tracing digital footprints, analyzing
            phishing and online fraud patterns, and supporting
            law-enforcement-aligned reports, I bridge the gap between cybercrime
            investigation and secure application development.
          </p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To contribute meaningfully to cybersecurity by uncovering threats,
              supporting investigations, and building secure applications that
              protect organizations and individuals in the digital realm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Approach</h2>
            <p className="text-muted-foreground leading-relaxed">
              I combine methodical investigation techniques with technical
              expertise to analyze digital evidence, understand threat patterns,
              and implement security best practices that exceed industry
              standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Career Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            My journey in cybersecurity and application development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 md:space-y-12"
        >
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                {/* Timeline marker */}
                <div className="flex flex-col items-center md:items-end">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="text-4xl mb-4 md:mb-0"
                  >
                    {event.icon}
                  </motion.div>
                  <div className="text-sm font-bold text-primary-foreground bg-primary px-4 py-2 rounded-full whitespace-nowrap">
                    {event.year}
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                  <div className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                    {/* Background glow on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-primary font-semibold mb-3">
                        {event.organization}
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Vertical connector line */}
              {index !== timelineEvents.length - 1 && (
                <div className="absolute left-4 md:left-[calc(25%-8px)] top-[120px] md:top-[100px] w-0.5 h-16 bg-gradient-to-b from-primary to-transparent md:h-24" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills Overview */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Key Competencies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Investigation Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">
                Investigation & OSINT
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Open Source Intelligence (OSINT)",
                "Cyber Crime Investigation & Case Analysis",
                "Digital Evidence Collection & Preservation",
                "Phishing & Online Fraud Analysis",
                "Social Media & Dark Web Monitoring",
                "Incident Response Support",
              ].map((skill, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-bold text-foreground">
                Technical & Development
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "Secure Web & Mobile Application Development",
                "SQL & Backend Logic Implementation",
                "API Security & Authentication",
                "OWASP-based Development Practices",
                "Database Design & Optimization",
                "Secure Coding Standards",
              ].map((skill, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
