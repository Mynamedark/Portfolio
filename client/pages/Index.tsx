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
  Github,
  ChevronRight,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
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
    },
    {
      title: "Threat Actor Infrastructure Analysis",
      context: "Mapping the digital footprint of a regional phishing group.",
      tools: "Shodan, Censys, DomainTools, Passive DNS",
      outcome: "Identified 12 interconnected domains and the underlying VPS provider.",
    },
    {
      title: "Digital Footprint Audit",
      context: "Comprehensive profiling for a high-net-worth individual.",
      tools: "Social Media Intelligence, Data Breach Monitoring",
      outcome: "Remediated 3 critical exposure points and secured leaked credentials.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-40 md:pb-52">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Available for Remote Work</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8">
              Open-Source Intelligence & <span className="text-muted-foreground italic">Cybercrime Research</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
              Dharam Kathiriya. Specialized in uncovering digital truth through methodical investigation, threat tracking, and data-driven intelligence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all group"
              >
                View Operations
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/downloads"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border bg-transparent text-foreground font-semibold hover:bg-muted/50 transition-all"
              >
                Download CV
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10" />
      </section>

      {/* About Section */}
      <section className="py-24 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Professional Identity</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Bridging investigation with actionable intelligence.</h3>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I am a cybersecurity professional focused on the intersection of digital investigation and open-source intelligence. With a background in Computer Applications, I specialize in tracing digital footprints and analyzing complex cybercrime ecosystems.
                </p>
                <p>
                  My methodology combines traditional investigative rigor with advanced technical tools to monitor darknet forums and support law enforcement standards. I believe in evidence-based research that provides clear, defensible findings for high-stakes decision-making.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 rounded-2xl bg-muted/30 border border-border"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Global Research Capabilities</h4>
                  <p className="text-sm text-muted-foreground">Operating from India, serving clients worldwide.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Cases Resolved</span>
                  <span className="font-mono font-bold">10+</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Tools Mastered</span>
                  <span className="font-mono font-bold">25+</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted-foreground">Years in OSINT</span>
                  <span className="font-mono font-bold">2+</span>
                </div>
              </div>
              
              <Link to="/about" className="mt-8 inline-flex items-center text-sm font-bold text-primary group">
                Read Full Biography <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-muted/20 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Core Competencies</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Specialized Investigation Stack</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <skill.icon className="w-10 h-10 text-primary mb-6" />
                <h4 className="text-xl font-bold mb-6">{skill.category}</h4>
                <ul className="space-y-3">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
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
      <section className="py-24 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Selected Operations</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Case Studies</h3>
            </div>
            <Link to="/projects" className="inline-flex items-center px-6 py-3 rounded-full border border-border hover:bg-muted transition-all font-semibold">
              Explore All Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 rounded-3xl border border-border hover:bg-muted/30 transition-all overflow-hidden"
              >
                <div className="lg:col-span-8">
                  <h4 className="text-2xl font-bold mb-4">{project.title}</h4>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.context}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Methodology/Tools</p>
                      <p className="text-sm font-medium">{project.tools}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Outcome</p>
                      <p className="text-sm font-medium text-foreground">{project.outcome}</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                  <div className="w-full h-full min-h-[200px] rounded-2xl bg-muted flex items-center justify-center border border-border/50 overflow-hidden">
                    <Search className="w-12 h-12 text-muted-foreground/30 group-hover:scale-110 group-hover:text-primary/30 transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 border-t border-border bg-foreground text-background">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Initiate an Investigation.</h2>
            <p className="text-xl text-background/70 mb-12">
              Ready to secure your digital footprint or track emerging threats? Let's discuss how my OSINT methodology can support your mission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 rounded-full bg-background text-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2">
                Contact Me <Mail className="w-5 h-5" />
              </Link>
              <a href="https://linkedin.com/in/dharamkathiriya" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-background/20 hover:bg-background/10 transition-all flex items-center gap-2">
                LinkedIn <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center text-background text-xs font-black tracking-tighter">
              DK
            </div>
            <span className="font-bold tracking-tight">Dharam Kathiriya</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/dharamkathiriya" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/dharamkathiriya" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@dharam.me" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dharam Kathiriya. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
