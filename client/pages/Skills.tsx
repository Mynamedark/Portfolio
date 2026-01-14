import { motion, Variants } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_skillCategories = [
  {
    title: "OSINT & Investigation",
    icon: "🔍",
    skills: [
      {
        name: "Open Source Intelligence (OSINT)",
        proficiency: 95,
        description:
          "Advanced techniques for gathering intelligence from public sources",
      },
      {
        name: "Cyber Crime Investigation",
        proficiency: 90,
        description:
          "Case analysis, threat actor identification, pattern recognition",
      },
      {
        name: "Digital Evidence Collection",
        proficiency: 88,
        description: "Preservation of digital evidence with forensic integrity",
      },
      {
        name: "Threat Intelligence Analysis",
        proficiency: 85,
        description:
          "Analysis of threat patterns, APT tracking, vulnerability research",
      },
      {
        name: "Social Engineering Detection",
        proficiency: 87,
        description:
          "Identifying phishing, impersonation, and social media fraud",
      },
    ],
  },
  {
    title: "Technical & Development",
    icon: "💻",
    skills: [
      {
        name: "Secure Web Development",
        proficiency: 90,
        description:
          "Building secure, scalable web applications with modern frameworks",
      },
      {
        name: "Database Design & SQL",
        proficiency: 88,
        description:
          "Secure database architecture, query optimization, injection prevention",
      },
      {
        name: "API Security",
        proficiency: 87,
        description:
          "RESTful API design, authentication, rate limiting, encryption",
      },
      {
        name: "Authentication Systems",
        proficiency: 89,
        description:
          "OAuth 2.0, JWT, 2FA, session management, secure password handling",
      },
      {
        name: "OWASP Security Practices",
        proficiency: 92,
        description:
          "Implementation of OWASP Top 10 mitigations and best practices",
      },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    tools: [
      "CSI Linux",
      "Security Blue Team Tools",
      "Investigation Dashboards",
      "Secure Coding Environments",
      "Wireshark",
      "Burp Suite",
      "Git & Version Control",
      "Docker & Containerization",
      "Linux/Bash",
      "Python Scripting",
    ],
  },
];

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
      try {
        const parsed = JSON.parse(savedSkills);
        // Group skills by category for display
        const grouped: Record<string, any> = {};
        parsed.forEach((skill: any) => {
          if (!grouped[skill.category]) {
            grouped[skill.category] = [];
          }
          grouped[skill.category].push(skill);
        });

        const categories = Object.entries(grouped).map(([category, items]: [string, any]) => ({
          title: category,
          icon: "🎯",
          skills: items.map((item: any) => ({
            name: item.name,
            proficiency: item.proficiency,
            description: item.name,
          })),
        }));

        setSkills(categories.length > 0 ? categories : DEFAULT_skillCategories);
      } catch {
        setSkills(DEFAULT_skillCategories);
      }
    } else {
      setSkills(DEFAULT_skillCategories);
    }
  }, []);

  const skillCategories = skills;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
            Skills & Expertise
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive skill set spanning cybercrime investigation,
            cybersecurity, secure development, and digital forensics.
          </p>
        </motion.div>
      </section>

      {/* Skills Sections */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border space-y-16">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {category.title}
              </h2>
            </div>

            {/* Skills Grid */}
            {category.skills ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group relative p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-foreground">
                          {skill.name}
                        </h3>
                        <span className="text-sm font-bold text-primary">
                          {skill.proficiency}%
                        </span>
                      </div>

                      {/* Proficiency Bar */}
                      <div className="w-full h-2 rounded-full bg-border mb-4 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
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
            ) : (
              /* Tools Grid */
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                {category.tools?.map((tool, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "hsl(180, 100%, 50%)",
                    }}
                    className="p-4 rounded-lg border border-border bg-card/50 text-center hover:bg-card transition-all duration-300 group cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Certifications Quick Preview */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Verified Credentials
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional certifications validating expertise in cybersecurity
            and digital forensics
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                name: "CSI Linux",
                issuer: "Digital Forensics & Cyber Investigation",
              },
              {
                name: "Security Blue Team",
                issuer: "Dark Web Operation",
              },
              {
                name: "Cybrary",
                issuer: "Digital Forensics",
              },
            ].map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
              >
                <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
