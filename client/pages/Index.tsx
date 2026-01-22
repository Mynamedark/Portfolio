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
      category: "OSINT Skills",
      items: ["Data Collection", "Identity Verification", "Threat Actor Tracking", "Darknet Monitoring", "Digital Profiling"],
      icon: Search,
    },
    {
      category: "Technical Tools",
      items: ["Maltego", "Spiderfoot", "Shodan", "Google Dorks", "WHOIS & DNS Analysis"],
      icon: Database,
    },
    {
      category: "Methodology",
      items: ["Intelligence Reporting", "Analytical Reasoning", "Evidence Preservation", "Privacy Protection"],
      icon: Shield,
    }
  ];

  const featuredProjects = [
    {
      title: "Cryptocurrency Asset Tracing",
      context: "Financial fraud investigation involving cross-chain transfers.",
      tools: "Blockchain Explorers, Maltego, OSINT Framework",
      outcome: "Successfully identified the primary cash-out point at a high-risk exchange.",
      icon: Activity
    },
    {
      title: "Threat Actor Infrastructure Analysis",
      context: "Mapping the digital footprint of a regional phishing group.",
      tools: "Shodan, Censys, DomainTools, Passive DNS",
      outcome: "Identified 12 interconnected domains and the underlying VPS provider.",
      icon: Terminal
    },
    {
      title: "Digital Footprint Audit",
      context: "Comprehensive profiling for a high-net-worth individual.",
      tools: "Social Media Intelligence, Data Breach Monitoring",
      outcome: "Remediated 3 critical exposure points and secured leaked credentials.",
      icon: Lock
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-32 md:pt-48 md:pb-64">
        <div className="container px-4 mx-auto relative z-10">
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
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Status: Operational</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-[0.9]">
              Open-Source <span className="text-muted-foreground/40 italic font-light">Intelligence</span> & Cyber Research
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-14 font-medium border-l-2 border-primary/30 pl-8">
              Specialized in uncovering digital truth through methodical investigation, threat tracking, and actionable data-driven intelligence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground text-background font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 group text-lg"
              >
                Launch Operations
                <Target className="ml-3 w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
              </Link>
              <Link
                to="/downloads"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full border border-border bg-background/20 backdrop-blur-md text-foreground font-bold hover:bg-muted/50 transition-all text-lg"
              >
                Get Credentials
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="py-32 relative border-t border-border bg-background/40 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-6">Investigative Profile</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">Methodical rigor meets <span className="text-muted-foreground italic">technical depth.</span></h3>
              <div className="space-y-8 text-xl text-muted-foreground leading-relaxed font-medium">
                <p>
                  I operate at the intersection of digital investigation and open-source intelligence. With a background in Computer Applications, I specialize in tracing digital footprints and analyzing complex threat ecosystems.
                </p>
                <p>
                  My methodology combines evidence-based research with advanced technical monitoring to deliver defensible findings for high-stakes decision-making.
                </p>
                <Link to="/about" className="inline-flex items-center text-lg font-bold text-foreground hover:text-primary transition-colors group py-2">
                  Read Full Dossier <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="relative p-12 rounded-[2.5rem] bg-muted/20 border border-border backdrop-blur-xl"
            >
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-2xl tracking-tight">Intelligence Network</h4>
                  <p className="text-muted-foreground font-medium">Global reconnaissance & investigation.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="flex justify-between items-center p-6 rounded-2xl bg-background/40 border border-border/50">
                  <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Identified Assets</span>
                  <span className="font-mono text-3xl font-bold text-primary">100+</span>
                </div>
                <div className="flex justify-between items-center p-6 rounded-2xl bg-background/40 border border-border/50">
                  <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Analysis Tools</span>
                  <span className="font-mono text-3xl font-bold text-primary">30+</span>
                </div>
                <div className="flex justify-between items-center p-6 rounded-2xl bg-background/40 border border-border/50">
                  <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Years of Ops</span>
                  <span className="font-mono text-3xl font-bold text-primary">02</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-32 bg-foreground text-background">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="mb-24"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary mb-6">Capabilities</h2>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tight">The Technical <span className="italic font-light opacity-50">Arsenal.</span></h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                variants={revealVariants}
                className="p-12 rounded-[3rem] bg-background/5 border border-white/10 hover:bg-background/10 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  <skill.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-8 tracking-tight">{skill.category}</h4>
                <ul className="space-y-4">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-background/60 text-lg font-medium group-hover:text-background/90 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
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
      <section className="py-32 border-t border-border bg-background/20 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10"
          >
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-6">Operational Log</h2>
              <h3 className="text-4xl md:text-7xl font-bold tracking-tight leading-none">Recent <span className="text-muted-foreground/40 italic font-light">Missions.</span></h3>
            </div>
            <Link to="/projects" className="inline-flex items-center px-10 py-5 rounded-full border-2 border-border hover:border-primary transition-all font-bold text-lg group">
              Explore All Operations <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-10">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={revealVariants}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 p-12 rounded-[3rem] border border-border bg-muted/5 hover:bg-muted/10 transition-all duration-500 overflow-hidden"
              >
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-4 mb-8">
                    <project.icon className="w-8 h-8 text-primary" />
                    <h4 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h4>
                  </div>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium">
                    {project.context}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Tactical Stack</p>
                      <p className="text-lg font-bold text-foreground">{project.tools}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Intelligence Yield</p>
                      <p className="text-lg font-bold text-foreground italic">"{project.outcome}"</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex items-center justify-center">
                  <div className="w-full aspect-square max-w-[320px] rounded-[2.5rem] bg-background/40 border border-border flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Search className="w-24 h-24 text-muted-foreground/10 group-hover:scale-125 group-hover:text-primary/20 transition-all duration-1000" />
                    <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                      <ArrowRight className="w-8 h-8 -rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 relative overflow-hidden border-t border-border">
        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter leading-none">Initiate an <span className="text-primary italic">Investigation.</span></h2>
            <p className="text-2xl text-muted-foreground mb-16 font-medium leading-relaxed">
              Ready to secure your digital footprint or track emerging threats? Let's discuss how my methodology can support your mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link to="/contact" className="px-12 py-6 rounded-full bg-foreground text-background font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-xl shadow-2xl">
                Contact the Specialist
              </Link>
              <a href="https://linkedin.com/in/dharamkathiriya" target="_blank" rel="noopener noreferrer" className="px-12 py-6 rounded-full border-2 border-border font-bold hover:bg-muted/50 transition-all text-xl backdrop-blur-md">
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
