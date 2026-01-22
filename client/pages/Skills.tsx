import { motion, Variants } from "framer-motion";
import { Search, Shield, Globe, Database, Terminal, Lock, Activity, Target, Cpu, Server, Network, Eye } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export default function Skills() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const skillCategories = [
    {
      title: "Intelligence Disciplines",
      icon: Search,
      skills: [
        { name: "OSINT (Open Source Intelligence)", level: 98 },
        { name: "HUMINT (Human Intelligence)", level: 85 },
        { name: "SOCMINT (Social Media Intelligence)", level: 95 },
        { name: "GEOINT (Geospatial Intelligence)", level: 90 },
        { name: "IMINT (Imagery Intelligence)", level: 88 },
        { name: "Threat Actor Profiling", level: 92 }
      ]
    },
    {
      title: "Technical Arsenal",
      icon: Terminal,
      skills: [
        { name: "Maltego & Spiderfoot", level: 90 },
        { name: "Shodan, Censys & BinaryEdge", level: 85 },
        { name: "Nmap & Network Recon", level: 80 },
        { name: "Blockchain Forensics", level: 75 },
        { name: "Python for OSINT Automation", level: 85 },
        { name: "SQL & Database Analysis", level: 80 }
      ]
    },
    {
      title: "Cybersecurity & Methodology",
      icon: Shield,
      skills: [
        { name: "Intelligence Reporting", level: 95 },
        { name: "Analytical Reasoning", level: 90 },
        { name: "Evidence Preservation", level: 85 },
        { name: "Privacy & Operational Security", level: 90 },
        { name: "Phishing & Fraud Analysis", level: 85 },
        { name: "Cyber Law & Ethics", level: 80 }
      ]
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
                <Cpu className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">System Specs: Expertise</span>
              </motion.div>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-none font-display">
                Technical <br />
                <span className="text-muted-foreground/40 italic font-light">Proficiency.</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8 font-sans"
              >
                A comprehensive breakdown of my investigative capabilities, technical toolset, and analytical methodology honed through real-world investigations.
              </motion.p>
            </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-32">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                className="relative"
              >
                  <div className="flex items-center gap-8 mb-20">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5">
                      <category.icon className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground font-display">{category.title}</h2>
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.skills.map((skill, skillIndex) => (
                        <SpotlightCard
                          key={skillIndex}
                          index={skillIndex}
                          className="p-10 rounded-[2.5rem] bg-card/30 backdrop-blur-xl border border-border group hover:border-primary/50 transition-all duration-500 shadow-xl"
                        >
                          <div className="flex justify-between items-center mb-8 relative z-10">
                            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors font-display">{skill.name}</span>
                            <span className="text-sm font-mono text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 font-display">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden relative z-10">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className="h-full bg-primary relative shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                              />
                          </div>
                        </SpotlightCard>
                      ))}
                    </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Carousel/Grid */}
      <section className="py-48 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="mb-24"
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 text-center">Equipment & Assets</h2>
            <h3 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground leading-none">The Investigative <br /><span className="text-muted-foreground/40 italic font-light">Stack.</span></h3>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["Maltego", "Shodan", "Censys", "Spiderfoot", "Python", "Metasploit", "Nmap", "Wireshark", "Burp Suite", "OSINT Framework", "Trello", "MindManager"].map((tool, index) => (
              <motion.span
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 2 : -2 }}
                className="px-10 py-5 rounded-3xl bg-card/30 border border-border text-xl font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary/50 transition-all duration-300 cursor-default text-foreground backdrop-blur-md shadow-lg"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
