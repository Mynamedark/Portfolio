import { motion, Variants } from "framer-motion";
import { Search, Shield, Globe, Database, ArrowUpRight, Activity, Terminal, Lock, Zap, Cpu, Network } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

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

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  return (
    <SpotlightCard
      index={index}
      className="group relative p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-colors duration-500 overflow-hidden shadow-2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        <div className="lg:col-span-8 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 md:mb-10">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 ${project.color} shadow-lg shadow-primary/5 shrink-0`}
          >
            <project.icon className="w-7 h-7 md:w-8 md:h-8" />
          </motion.div>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight font-display leading-tight">
            {project.title}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                <Terminal className="w-3 h-3" /> Context
              </h4>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium font-sans">{project.context}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                <Cpu className="w-3 h-3" /> Tactical Stack
              </h4>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium font-sans">{project.tools}</p>
            </motion.div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                <Network className="w-3 h-3" /> Analysis Findings
              </h4>
              <p className="text-base md:text-lg text-foreground font-bold leading-relaxed font-sans">{project.findings}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3 flex items-center gap-2 font-display">
                <Zap className="w-3 h-3" /> Operational Value
              </h4>
              <p className="text-base md:text-lg text-muted-foreground italic leading-relaxed font-medium opacity-70 font-sans">"{project.value}"</p>
            </motion.div>
          </div>
        </div>
      </div>
      
        <div className="lg:col-span-4 flex items-center justify-center relative z-10 order-first lg:order-last mb-8 lg:mb-0">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="w-full aspect-square max-w-[240px] md:max-w-[320px] rounded-[2.5rem] md:rounded-[3rem] bg-background/20 border border-border/50 flex items-center justify-center relative group-hover:border-primary/30 transition-all duration-700 overflow-hidden group/img"
          >
            {/* Decorative Animated Circles */}
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-primary/5 rounded-full m-6 md:m-8"
            />
            <motion.div 
              animate={{ 
                rotate: -360,
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-dotted border-primary/10 rounded-full m-12 md:m-16"
            />
            
            <Search className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/10 group-hover/img:text-primary/20 transition-all duration-700 group-hover/img:scale-110" />
          </motion.div>
        </div>
      </div>
    </SpotlightCard>
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
    <div className="flex flex-col min-h-screen bg-transparent pt-16 md:pt-20 relative overflow-hidden">
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
                opacity: Math.random() * 0.3
              }}
              animate={{ 
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
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
          className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[80px] md:blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-[80px] md:blur-[120px]"
        />
      </div>

      {/* Header */}
      <section className="py-16 md:py-32 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8 backdrop-blur-md"
            >
              <Activity className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">
                Archive: Case Files
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-10 leading-[0.9] font-display">
              Documented <br className="hidden sm:block" />
              <span className="text-muted-foreground/40 italic font-light">Intelligence.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-6 md:pl-8 font-sans"
            >
              A selection of high-stakes investigations demonstrating methodical research, technical proficiency, and the production of actionable intelligence reports.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 md:pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="space-y-12 md:space-y-24">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section className="py-24 md:py-48 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                <Lock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 tracking-tight leading-none text-foreground font-display">
              Need Targeted <br className="hidden sm:block" />
              <span className="text-primary italic">Research?</span>
            </h3>
            <p className="text-lg md:text-2xl text-muted-foreground mb-8 md:mb-16 font-medium leading-relaxed max-w-2xl mx-auto font-sans">
              Whether it's due diligence, threat actor profiling, or digital asset tracing, I provide the intelligence you need to make informed decisions.
            </p>
            <motion.a 
              href="/contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[0_0_50px_-12px_var(--primary)] transition-all duration-300 text-lg md:text-xl shadow-2xl group font-display"
            >
              Commission an Investigation
              <ArrowUpRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
