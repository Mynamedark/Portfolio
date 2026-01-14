import { motion, Variants } from "framer-motion";
import { BookOpen, Calendar, MapPin, Award } from "lucide-react";
import { useEffect, useState } from "react";

const DEFAULT_education = [
  {
    id: 1,
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Uka Tarsadia University",
    period: "2022 – 2025",
    location: "Gujarat, India",
    gpa: "3.8/4.0",
    description:
      "Comprehensive computer science education with strong focus on cybersecurity, application development, and software engineering principles.",
    highlights: [
      "Specialization in Cybersecurity & Application Development",
      "Focus on Secure Coding Practices & OWASP Standards",
      "Hands-on experience with Digital Forensics Tools",
      "Research Projects in Network Security & Cryptography",
    ],
    relevantCoursework: [
      "Cybersecurity Fundamentals",
      "Network Security & Cryptography",
      "Web Application Security",
      "Database Design & SQL",
      "Secure Software Development",
      "Digital Forensics & Investigation",
      "Incident Response & Threat Analysis",
      "API Security & Authentication",
      "Systems Administration",
      "Linux & Unix Systems",
    ],
  },
];

const DEFAULT_additionalTraining = [
  {
    title: "CSI Linux Certification Program",
    provider: "CSI Linux",
    focus: "Digital Forensics & Cyber Investigation",
    status: "Completed",
  },
  {
    title: "Security Blue Team Training",
    provider: "Security Blue Team",
    focus: "Dark Web Operations & Threat Intelligence",
    status: "Completed",
  },
  {
    title: "Advanced OSINT Techniques",
    provider: "Cybrary",
    focus: "Open Source Intelligence & Digital Evidence",
    status: "Completed",
  },
];

export default function Education() {
  const [education, setEducation] = useState<any[]>([]);
  const [additionalTraining, setAdditionalTraining] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("education");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEducation(parsed.length > 0 ? parsed : DEFAULT_education);
      } catch {
        setEducation(DEFAULT_education);
      }
    } else {
      setEducation(DEFAULT_education);
    }
    setAdditionalTraining(DEFAULT_additionalTraining);
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
            Education & Training
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            Academic background and professional training in computer science,
            cybersecurity, and digital forensics.
          </p>
        </motion.div>
      </section>

      {/* Degree Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-card/50 overflow-hidden hover:border-primary/50 transition-all duration-300 p-8 md:p-12"
            >
              {/* Background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {edu.degree}
                    </h2>
                    <p className="text-lg font-semibold text-primary mb-4">
                      {edu.institution}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-5xl flex-shrink-0"
                  >
                    <BookOpen className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                    Key Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {edu.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-muted-foreground text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Coursework */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                    Relevant Coursework
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {edu.relevantCoursework.map((course, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        {course}
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

      {/* Additional Training */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Training & Certifications
          </h2>
          <p className="text-muted-foreground">
            Continuous professional development and specialized training
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {additionalTraining.map((training, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ translateY: -4 }}
              className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">
                {training.title}
              </h3>
              <p className="text-sm text-primary font-semibold mb-2">
                {training.provider}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {training.focus}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-semibold text-green-400">
                  {training.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Learning Philosophy */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Commitment to Excellence
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Education is not just formal degrees, but continuous learning and
            professional development. I am committed to staying current with
            emerging cybersecurity threats, forensic methodologies, and secure
            development practices to provide the best possible service.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
