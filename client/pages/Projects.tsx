import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Search, Shield, Globe, Database, ArrowUpRight, Activity, Terminal, Lock, Zap, Cpu, Network } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Fake Social Media Account Fraud Detection",
    context: "Investigating and identifying fraudulent activities conducted through impersonated and synthetic social media profiles used for social engineering and financial scams.",
    tools: "SOCMINT (Social Media Intelligence), Maltego, Advanced Image Analysis (IMINT), Profile metadata extraction, reverse image search engines.",
    findings: "Successfully deanonymized a network of 25+ fake profiles across multiple platforms, uncovering a coordinated 'pig butchering' operation. Identified the primary threat actor's digital footprint and provided evidence to platform security teams.",
    value: "Demonstrates advanced SOCMINT capabilities and the ability to map complex social networks to identify malicious actors.",
    icon: Search,
    color: "text-blue-500"
  },
  {
    title: "Mobile Number & Email Fraud Investigation",
    context: "Detailed analysis of suspicious communications originating from unidentified mobile numbers and email addresses linked to large-scale phishing and credential harvesting campaigns.",
    tools: "OSINT Framework, HLR Lookups, Email header analysis, Data Breach databases (Dehashed), HUMINT-informed verification, custom intelligence gathering scripts.",
    findings: "Traced a series of sophisticated smishing attacks back to a specific regional VOIP provider. Identified 500+ compromised email addresses and alerted the affected organizations, preventing further data loss.",
    value: "Highlights proficiency in communication forensics and the ability to pivot from minimal data points (phone/email) to full threat profiles.",
    icon: Shield,
    color: "text-red-500"
  }
];

function SpotlightCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-colors duration-500 overflow-hidden shadow-2xl"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, var(--primary), transparent 40%)`
          ),
          maskImage: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          opacity: 0.1
        }}
      />

      <div className="lg:col-span-8 flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-6 mb-10">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 ${project.color} shadow-lg shadow-primary/5`}
          >
            <project.icon className="w-8 h-8" />
          </motion.div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
              {project.title}
            </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Context
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">{project.context}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                <Cpu className="w-3 h-3" /> Tactical Stack
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">{project.tools}</p>
            </motion.div>
          </div>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                <Network className="w-3 h-3" /> Analysis Findings
              </h4>
              <p className="text-lg text-foreground font-bold leading-relaxed">{project.findings}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Operational Value
              </h4>
              <p className="text-lg text-muted-foreground italic leading-relaxed font-medium opacity-70">"{project.value}"</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-4 flex items-center justify-center relative z-10">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 1 }}
          className="w-full aspect-square max-w-[320px] rounded-[3rem] bg-background/20 border border-border/50 flex items-center justify-center relative group-hover:border-primary/30 transition-all duration-700 overflow-hidden group/img"
        >
          {/* Decorative Animated Circles */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/5 rounded-full m-8"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dotted border-primary/10 rounded-full m-16"
          />
          
          <Search className="w-24 h-24 text-muted-foreground/10 group-hover/img:text-primary/20 transition-all duration-700 group-hover/img:scale-110" />
          
          <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl hover:scale-110 cursor-pointer">
            <ArrowUpRight className="w-7 h-7" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-20 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }} 
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 2000 - 1000, 
              y: Math.random() * 2000 - 1000,
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Background Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <section className="py-32 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Archive: Case Files
                </span>
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Documented <br />
              <span className="text-muted-foreground/40 italic font-light">Intelligence.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8"
            >
              A selection of high-stakes investigations demonstrating methodical research, technical proficiency, and the production of actionable intelligence reports.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <SpotlightCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section className="py-48 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Lock className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-4xl md:text-8xl font-bold mb-10 tracking-tight leading-none text-foreground">
              Need Targeted <br />
              <span className="text-primary italic">Research?</span>
            </h3>
            <p className="text-2xl text-muted-foreground mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
              Whether it's due diligence, threat actor profiling, or digital asset tracing, I provide the intelligence you need to make informed decisions.
            </p>
            <motion.a 
              href="/contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[0_0_50px_-12px_var(--primary)] transition-all duration-300 text-xl shadow-2xl group"
            >
              Commission an Investigation
              <ArrowUpRight className="ml-2 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

