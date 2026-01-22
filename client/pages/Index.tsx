import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Search,
  Globe,
  Database,
  FileText,
  Mail,
  Linkedin,
  ChevronRight,
  Target,
  Terminal,
  Activity,
  Lock,
} from "lucide-react";

export default function Index() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

    const skills = [
      {
        category: "Intelligence Disciplines",
        items: ["OSINT", "HUMINT", "SOCMINT", "GEOINT", "IMINT"],
        icon: Search,
      },
      {
        category: "Technical Tools",
        items: ["Maltego", "Shodan", "Censys", "Dehashed", "Data Breach Analysis"],
        icon: Database,
      },
      {
        category: "Methodology",
        items: ["Fraud Investigation", "Analytical Reasoning", "Evidence Preservation", "Privacy Protection"],
        icon: Shield,
      }
    ];

    const featuredProjects = [
      {
        title: "Fake Social Media Account Fraud",
        context: "Identifying fraudulent activities through impersonated social media profiles.",
        tools: "SOCMINT, Maltego, Advanced IMINT",
        outcome: "Uncovered a coordinated scam network of 25+ fake profiles.",
        icon: Activity
      },
      {
        title: "Mobile & Email Fraud Investigation",
        context: "Analysis of suspicious communications linked to phishing campaigns.",
        tools: "OSINT Framework, Email Header Analysis, HUMINT",
        outcome: "Traced smishing attacks back to source, preventing further data loss.",
        icon: Terminal
      }
    ];

  return (
      <div className="flex flex-col min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-48 md:pb-64">
          <div className="container px-6 mx-auto relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary">Status: Operational</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-[0.95] md:leading-[0.9]">
                Open-Source <span className="text-muted-foreground/40 italic font-light">Intelligence</span> & Cyber Research
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-14 font-medium border-l-2 border-primary/30 pl-6 md:pl-8">
                Specialized in uncovering digital truth through methodical investigation, threat tracking, and actionable data-driven intelligence.
              </motion.p>
              
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link
                    to="/projects"
                    className="btn-primary inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg group"
                  >
                    Launch Operations
                    <Target className="ml-3 w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                  </Link>
                  <Link
                    to="/downloads"
                    className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-border bg-background/20 backdrop-blur-md text-foreground font-bold hover:bg-muted/50 transition-all text-base sm:text-lg"
                  >
                    Get Credentials
                  </Link>
                </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Brief Section */}
        <section className="py-20 md:py-32 relative border-t border-border bg-background/40 backdrop-blur-sm">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
              >
                <h2 className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.3em] text-primary mb-6">Investigative Profile</h2>
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">Methodical rigor meets <span className="text-muted-foreground italic">technical depth.</span></h3>
                <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                  <p>
                    I operate at the intersection of digital investigation and open-source intelligence. With a background in Computer Applications, I specialize in tracing digital footprints and analyzing complex threat ecosystems.
                  </p>
                  <p>
                    My methodology combines evidence-based research with advanced technical monitoring to deliver defensible findings for high-stakes decision-making.
                  </p>
                  <Link to="/about" className="inline-flex items-center text-base md:text-lg font-bold text-foreground hover:text-primary transition-colors group py-2">
                    Read Full Dossier <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                className="relative p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-muted/20 border border-border backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl md:text-2xl tracking-tight">Intelligence Network</h4>
                    <p className="text-sm md:text-base text-muted-foreground font-medium">Global reconnaissance & investigation.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <div className="flex justify-between items-center p-5 md:p-6 rounded-xl md:rounded-2xl bg-background/40 border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Identified Assets</span>
                    <span className="font-mono text-2xl md:text-3xl font-bold text-primary">100+</span>
                  </div>
                  <div className="flex justify-between items-center p-5 md:p-6 rounded-xl md:rounded-2xl bg-background/40 border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Analysis Tools</span>
                    <span className="font-mono text-2xl md:text-3xl font-bold text-primary">30+</span>
                  </div>
                  <div className="flex justify-between items-center p-5 md:p-6 rounded-xl md:rounded-2xl bg-background/40 border border-border/50">
                    <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Years of Ops</span>
                    <span className="font-mono text-2xl md:text-3xl font-bold text-primary">02</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="py-20 md:py-32 bg-secondary/40 backdrop-blur-md border-y border-border">
          <div className="container px-6 mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.4em] text-primary mb-6">Capabilities</h2>
              <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight text-foreground">The Technical <span className="italic font-light text-muted-foreground/40">Arsenal.</span></h3>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  variants={revealVariants}
                  className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-background/40 border border-border hover:border-primary/50 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                    <skill.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 tracking-tight text-foreground">{skill.category}</h4>
                  <ul className="space-y-3 md:space-y-4">
                    {skill.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 md:gap-4 text-muted-foreground text-base md:text-lg font-medium group-hover:text-foreground transition-colors">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 md:py-32 border-t border-border bg-background/20 backdrop-blur-sm">
          <div className="container px-6 mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-10"
            >
              <div>
                <h2 className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.3em] text-primary mb-6">Operational Log</h2>
                <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight leading-none">Recent <span className="text-muted-foreground/40 italic font-light">Missions.</span></h3>
              </div>
              <Link to="/projects" className="inline-flex items-center px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-border hover:border-primary transition-all font-bold text-base md:text-lg group">
                Explore All Operations <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-8 md:gap-10">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  variants={revealVariants}
                  className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-border bg-muted/5 hover:bg-muted/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <project.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h4>
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 leading-relaxed font-medium">
                      {project.context}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Tactical Stack</p>
                        <p className="text-base md:text-lg font-bold text-foreground">{project.tools}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Intelligence Yield</p>
                        <p className="text-base md:text-lg font-bold text-foreground italic">"{project.outcome}"</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <div className="w-full aspect-square max-w-[280px] md:max-w-[320px] rounded-[1.5rem] md:rounded-[2.5rem] bg-background/40 border border-border flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <Search className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground/10 group-hover:scale-125 group-hover:text-primary/20 transition-all duration-1000" />
                      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 -rotate-45" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 md:py-48 relative overflow-hidden border-t border-border">
          <div className="container px-6 mx-auto relative z-10 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-8 md:mb-12 tracking-tighter leading-none">Initiate an <span className="text-primary italic">Investigation.</span></h2>
              <p className="text-lg md:text-2xl text-muted-foreground mb-10 md:mb-16 font-medium leading-relaxed">
                Ready to secure your digital footprint or track emerging threats? Let's discuss how my methodology can support your mission.
              </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                  <Link to="/contact" className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all duration-500 text-lg md:text-xl shadow-neon">
                    Contact the Specialist
                  </Link>
                  <a href="https://linkedin.com/in/dharamkathiriya" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 rounded-full border-2 border-border font-bold hover:bg-muted/50 transition-all text-lg md:text-xl backdrop-blur-md">
                    LinkedIn Signal
                  </a>
                </div>
            </motion.div>
          </div>
          
          {/* Background Grid Accent */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0,transparent_70%)] -z-10" />
        </section>
      </div>
  );
}
