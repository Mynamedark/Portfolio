import { motion, Variants } from "framer-motion";
import { Search, Shield, Globe, Database, Terminal, Lock, Activity, Target, Cpu, Server, Network, Eye } from "lucide-react";

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
      title: "Investigative OSINT",
      icon: Search,
      skills: [
        { name: "Advanced Data Collection", level: 95 },
        { name: "Identity Verification & Profiling", level: 90 },
        { name: "Threat Actor Infrastructure Mapping", level: 85 },
        { name: "Darknet & Underground Monitoring", level: 80 },
        { name: "SOCMINT (Social Media Intelligence)", level: 90 },
        { name: "GEOINT (Geospatial Intelligence)", level: 75 }
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
    <div className="flex flex-col min-h-screen bg-transparent pt-20">
      {/* Header */}
      <section className="py-32">
        <div className="container px-4 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">System Specs: Expertise</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Technical <span className="text-muted-foreground/40 italic font-light">Proficiency.</span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8">
              A comprehensive breakdown of my investigative capabilities, technical toolset, and analytical methodology honed through real-world investigations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-48">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-24">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                className="relative"
              >
                <div className="flex items-center gap-6 mb-16">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-neon">
                    <category.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-[2rem] bg-background/40 backdrop-blur-md border border-border group hover:border-primary/50 transition-all duration-500"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
                        <span className="text-sm font-mono text-primary font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-primary relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Carousel/Grid */}
      <section className="py-32 bg-foreground text-background">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="mb-24"
          >
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight">The Investigation <span className="opacity-50 italic font-light">Stack.</span></h3>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {["Maltego", "Shodan", "Censys", "Spiderfoot", "Python", "Metasploit", "Nmap", "Wireshark", "Burp Suite", "OSINT Framework", "Trello", "MindManager"].map((tool, index) => (
              <motion.span
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="px-8 py-4 rounded-full bg-background/5 border border-white/10 text-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
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
