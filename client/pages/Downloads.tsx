import { motion, Variants } from "framer-motion";
import { Download, FileText, BookOpen, Award, CheckCircle } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Resume",
    description:
      "Comprehensive CV highlighting OSINT investigations, cybercrime analysis, and secure development expertise.",
    icon: FileText,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "OSINT Methodology Guide",
    description:
      "Detailed guide on OSINT collection techniques, source validation, and evidence preservation.",
    icon: BookOpen,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    title: "Case Study: Phishing Investigation",
    description:
      "In-depth case study demonstrating phishing campaign analysis and threat actor attribution.",
    icon: Award,
    color: "from-amber-400 to-amber-600",
  },
];

const benefits = [
  {
    title: "OSINT Expertise",
    description:
      "Advanced open-source intelligence gathering and digital footprint analysis with proven methodologies",
  },
  {
    title: "Digital Forensics",
    description:
      "Professional evidence collection, preservation, and analysis following investigative standards",
  },
  {
    title: "Cybercrime Analysis",
    description:
      "Deep investigation into phishing, fraud, and identity theft with threat actor attribution",
  },
  {
    title: "Secure Development",
    description:
      "Full-stack security implementation with OWASP compliance and authentication best practices",
  },
  {
    title: "Law Enforcement Support",
    description:
      "Professional documentation and reporting aligned with investigative requirements and standards",
  },
  {
    title: "Quick Turnaround",
    description:
      "Efficient investigation and analysis with detailed findings delivered on tight timelines",
  },
];

export default function Downloads() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
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
            Resources & Testimonials
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            Download resources, case studies, and explore why teams choose to
            work with me for their cybersecurity investigations.
          </p>
        </motion.div>
      </section>

      {/* Download Resources */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Download Resources
          </h2>
          <p className="text-muted-foreground">
            Professional materials and detailed case studies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.id}
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <motion.button
                  whileHover={{ gap: "0.75rem" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Why Work With Me */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Why Work With Me
          </h2>
          <p className="text-muted-foreground">
            Professional expertise you can trust for your investigations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials CTA */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discuss your investigation needs and find out how I can help secure
            and protect your digital assets.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
          >
            Start a Conversation
            <Download className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
