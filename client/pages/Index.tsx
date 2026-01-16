import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Radar,
  Shield,
  Database,
  Target,
  Code,
} from "lucide-react";

export default function Index() {
  const highlights = [
    {
      icon: Radar,
      title: "OSINT Intelligence",
      description:
        "Advanced open-source intelligence gathering, threat actor tracking, and digital footprint analysis",
      animId: "highlight_card_osint",
    },
    {
      icon: Database,
      title: "Digital Forensics",
      description:
        "Evidence collection, preservation, and analysis with law enforcement standards",
      animId: "highlight_card_crime",
    },
    {
      icon: Code,
      title: "Secure Development",
      description:
        "Secure web & mobile applications with OWASP principles and secure coding practices",
      animId: "highlight_card_dev",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto max-w-7xl px-4 py-20 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 md:space-y-8"
            >
              <motion.div variants={textVariants} className="space-y-2">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 w-fit data-cursor-interactive shadow-sm shadow-primary/20"
                >
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Cyber Investigator
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                >
                  Dharam
                  <br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(18,194,233,0.3)]">
                    Kathiriya
                  </span>
                </motion.h1>

                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-xl md:text-2xl font-semibold text-primary">
                    OSINT Specialist & Cybercrime Analyst
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                    A professional cyber investigator specializing in digital
                    forensics, OSINT, and secure software development.
                    Uncovering truth through data.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="group relative w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-neon hover:shadow-neon-purple data-cursor-interactive overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get in Touch
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                  <Link
                    to="/projects"
                    className="group relative w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground text-secondary font-semibold transition-all duration-300 data-cursor-interactive hover:shadow-secondary overflow-hidden"
                  >
                    <span className="relative z-10">View Operations</span>
                    <div className="absolute inset-0 bg-secondary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </Link>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border/50"
                >
                  <div>
                    <p className="text-2xl font-bold text-primary">2+</p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Years Exp.
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">3+</p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Certifications
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">10+</p>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Cases Solved
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Visual Element (Rotating Card) + 3D Background Visibility Area */}
            <div className="hidden lg:flex items-center justify-center h-[600px] w-full relative">
              {/* 
                  We want the 3D background (Globe) to be visible here.
                  However, we can also restore the "Visual Element" (Rotating Card) 
                  but make it semi-transparent or styled to complement the 3D scene.
                  
                  If the user wants the 3D animation (Globe) to be the main focus,
                  we can keep this area clear or add a minimal HUD overlay.
                  
                  Let's restore the rotating card but make it a "Holographic" overlay 
                  so the 3D globe behind it is still visible.
               */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-80 h-96 rounded-2xl border border-primary/20 bg-background/10 backdrop-blur-[2px] overflow-hidden flex items-center justify-center group hover:border-primary/50 transition-colors duration-500"
              >
                {/* Animated border/scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-scanline pointer-events-none" />

                {/* Center icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-6xl opacity-80 drop-shadow-[0_0_15px_rgba(18,194,233,0.5)]"
                >
                  🔍
                </motion.div>

                {/* Decorative rings */}
                <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl scale-90" />
                <div className="absolute inset-0 border border-secondary/10 rounded-2xl scale-75" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized in cybercrime investigation, OSINT methodology, and
              secure application development
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    translateY: -12,
                  }}
                  className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden cursor-pointer data-cursor-interactive hover:shadow-primary"
                  data-cursor="interactive"
                  data-animation-id="card_hover_01"
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  <div className="relative z-10 space-y-4">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground">
                      {highlight.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden text-center"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
            />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to collaborate?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you need OSINT analysis, cybercrime investigation
                support, or secure application development, let's discuss how I
                can help secure your digital assets.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 data-cursor-interactive"
                data-cursor="interactive"
              >
                Start a Conversation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
