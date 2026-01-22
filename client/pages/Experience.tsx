import { motion, Variants } from "framer-motion";
import { Shield, Target, Activity, Terminal, Briefcase, Globe, Database, Search } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export default function Experience() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const experiences = [
    {
      company: "Independent Investigation Services",
      role: "OSINT & Cybercrime Research Specialist",
      period: "2025 - Present",
      description: "Providing high-stakes digital investigation services for private clients and legal teams. Specialized in asset tracing, threat actor profiling, and infrastructure analysis.",
      deliverables: [
        "Actionable intelligence reports for legal proceedings.",
        "Darknet monitoring for potential data breaches.",
        "Methodical tracking of digital footprints for HNWIs.",
        "Identity verification and cross-border profiling."
      ],
      icon: Search
    },
    {
      company: "Technical Research & Development",
      role: "Security-Focused Application Developer",
      period: "2023 - 2024",
      description: "Designed and implemented secure application architectures with a focus on data integrity and user privacy. Leveraged modern stacks to build robust investigative tools.",
      deliverables: [
        "Developed custom OSINT automation scripts in Python.",
        "Built secure web platforms with zero-trust principles.",
        "Conducted internal security audits and vulnerability assessments.",
        "Optimized data collection pipelines for efficiency."
      ],
      icon: Terminal
    }
  ];

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
      <section className="py-16 md:py-32 relative z-10">
        <div className="container px-4 mx-auto">
            <div className="max-w-4xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8 backdrop-blur-md"
              >
                <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">Log: Professional Record</span>
              </motion.div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-6 md:mb-10 leading-[0.9] font-display">
                  Operational <br className="hidden sm:block" />
                  <span className="text-muted-foreground/40 italic font-light">Experience.</span>
                </h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-6 md:pl-8 font-sans"
              >
                A record of professional engagements where technical depth and investigative rigor were deployed to solve complex digital challenges.
              </motion.p>
            </div>
        </div>
      </section>

      {/* Experience List */}
      <section className="pb-24 md:pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <SpotlightCard
                key={index}
                index={index}
                className="p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 shadow-2xl"
              >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
                    <div className="lg:col-span-4 space-y-6 md:space-y-8">
                      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                        <exp.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3 text-foreground font-display">{exp.company}</h3>
                        <p className="text-lg md:text-2xl text-primary font-bold italic opacity-80 font-display">{exp.role}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 mt-4 md:mt-6">
                          <span className="text-[10px] md:text-sm text-primary font-mono uppercase tracking-widest font-bold font-display">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-8 space-y-8 md:space-y-12">
                      <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-medium font-sans">
                        {exp.description}
                      </p>
                      
                      <div className="pt-6 md:pt-8 border-t border-border/50">
                        <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 md:mb-8 flex items-center gap-2 font-display">
                          <Activity className="w-3 h-3 md:w-4 md:h-4" /> Operational Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                          {exp.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 md:gap-4 text-base md:text-xl text-foreground font-medium group-hover:translate-x-2 transition-transform duration-300 font-sans">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 md:mt-2.5 flex-shrink-0 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/5 rounded-full blur-2xl md:blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
