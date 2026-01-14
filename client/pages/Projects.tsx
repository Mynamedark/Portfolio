import { motion, Variants } from "framer-motion";
import { Folder, ArrowRight, Calendar, Tag } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_projects = [
  {
    id: 1,
    title: "OSINT Threat Actor Attribution",
    category: "OSINT Investigation",
    date: "2025",
    description:
      "Comprehensive OSINT investigation tracking threat actor infrastructure, communication patterns, and attribution analysis.",
    tags: ["OSINT", "Threat Analysis", "Attribution"],
    findings: [
      "Identified 15+ infrastructure assets",
      "Correlated multiple communication channels",
      "Produced detailed attribution report",
    ],
  },
  {
    id: 2,
    title: "Phishing Campaign Analysis",
    category: "Cybercrime Investigation",
    date: "2025",
    description:
      "Analysis of sophisticated phishing campaign targeting financial institutions with focus on attack infrastructure and victim impact.",
    tags: ["Phishing", "Fraud Analysis", "Email Forensics"],
    findings: [
      "Traced email infrastructure",
      "Identified phishing domain network",
      "Supported law enforcement documentation",
    ],
  },
  {
    id: 3,
    title: "Secure Web Application Development",
    category: "Secure Development",
    date: "2023-2024",
    description:
      "Design and implementation of a secure web application with comprehensive authentication, encryption, and OWASP compliance.",
    tags: ["Web Development", "Security", "Backend"],
    findings: [
      "Zero critical vulnerabilities",
      "Full OWASP Top 10 compliance",
      "Advanced authentication system",
    ],
  },
  {
    id: 4,
    title: "Digital Evidence Collection & Preservation",
    category: "Digital Forensics",
    date: "2025",
    description:
      "Forensic investigation involving collection, preservation, and analysis of digital evidence from multiple sources.",
    tags: ["Forensics", "Evidence", "Investigation"],
    findings: [
      "Preserved evidence integrity",
      "Generated expert reports",
      "Timeline reconstruction",
    ],
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects(parsed.length > 0 ? parsed : DEFAULT_projects);
      } catch {
        setProjects(DEFAULT_projects);
      }
    } else {
      setProjects(DEFAULT_projects);
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
            Case Studies & Projects
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            Selected investigations, case studies, and technical projects
            showcasing expertise in OSINT, cybercrime analysis, and secure
            development.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto max-w-7xl px-4 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                rotateX: 2, 
                rotateY: 2,
                boxShadow: "0 20px 40px -10px rgba(18, 194, 233, 0.2)"
              }}
              className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 overflow-hidden transition-all duration-300"
            >
              {/* Neon Glow Edge */}
              <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-500 pointer-events-none" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Folder className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-primary/80 font-medium mb-4">
                  {project.category}
                </p>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {project.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300 cursor-pointer">
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </div> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Cases Analyzed", value: "10+" },
            { label: "Years Experience", value: "2+" },
            { label: "Investigations Completed", value: "15+" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card/50 text-center hover:border-primary/50 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
            Need Help with Your Investigation?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need OSINT analysis, cybercrime investigation support,
            or secure application development, I can help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Start a Project
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
