import { motion, Variants } from "framer-motion";
import { CheckCircle2, Shield, Search, Globe, Database, FileText, Target, Award, BookOpen, Terminal } from "lucide-react";

export default function About() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const timelineEvents = [
    {
      year: "2025",
      title: "OSINT & Cybercrime Investigation",
      organization: "Independent Specialist",
      description:
        "Conducting advanced OSINT on threat actors, analyzing phishing and online fraud patterns, supporting documentation for law enforcement standards.",
    },
    {
      year: "2023 - 2024",
      title: "Security-First Application Development",
      organization: "Technical Research & Development",
      description:
        "Designed and implemented secure web & mobile applications with strong authentication, validation, and access control mechanisms.",
    },
    {
      year: "2022 - 2025",
      title: "Bachelor of Computer Application",
      organization: "Uka Tarsadia University",
      description:
        "Comprehensive computer science education with focus on cybersecurity and application development.",
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

      {/* Hero Section */}
      <section className="py-32 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
            >
              <Target className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dossier: DHARAM KATHIRIYA</span>
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              A commitment to <br />
              <span className="text-muted-foreground/40 italic font-light">digital truth.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8"
            >
              Based in India, I operate at the forefront of digital investigations, helping organizations navigate the complexities of the cybercrime ecosystem through methodical open-source intelligence.
            </motion.p>
          </div>
        </div>
      </section>

        {/* Philosophy Section */}
        <section className="py-32 relative z-10">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl transition-all duration-500 shadow-2xl"
              >
                <h3 className="text-4xl font-bold mb-8 tracking-tight flex items-center gap-4 text-foreground">
                  <Shield className="w-8 h-8 text-primary" /> Investigative Rigor
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  In an era of information overload, the value lies not in the volume of data, but in the accuracy of its interpretation. My approach to OSINT is rooted in the principles of evidence preservation and analytical reasoning. I don't just find information; I verify it to ensure it meets the highest standards of credibility for recruiters, clients, and legal environments.
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                transition={{ delay: 0.2 }}
                className="p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl transition-all duration-500 shadow-2xl"
              >
                <h3 className="text-4xl font-bold mb-8 tracking-tight flex items-center gap-4 text-foreground">
                  <Terminal className="w-8 h-8 text-primary" /> Technical Foundation
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                  My background in Computer Applications provides the technical depth necessary to understand how cybercriminals exploit infrastructure. This dual-competency in investigation and development allows me to bridge the gap between abstract threats and technical vulnerabilities, delivering reports that are both comprehensive and actionable.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* International Operations Section */}
        <section className="py-48 relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
          <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto text-center p-16 md:p-24 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">Global reach</h2>
              <h3 className="text-5xl md:text-8xl font-bold tracking-tight mb-12 leading-none">International <br /><span className="text-muted-foreground/40 italic font-light">Collaboration.</span></h3>
              <motion.p 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="text-2xl text-muted-foreground leading-relaxed font-medium mb-16"
              >
                Operating without borders, I provide OSINT and cybersecurity services to global organizations. My workflow is engineered for high-stakes international collaboration, ensuring investigative precision across time zones and jurisdictions.
              </motion.p>
              <div className="flex flex-wrap justify-center gap-12">
                {[
                  { label: "Remote Ready", desc: "Seamless global integration" },
                  { label: "Cross-Border", desc: "Multi-jurisdictional expertise" },
                  { label: "Global Sync", desc: "Adapting to any time zone" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    variants={revealVariants}
                    className="flex flex-col items-center"
                  >
                    <span className="text-primary font-bold text-2xl mb-2">{item.label}</span>
                    <span className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-60">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-32 relative z-10">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">Operational History</h2>
              <h3 className="text-5xl md:text-8xl font-bold tracking-tight leading-none">Professional <br /><span className="text-muted-foreground/40 italic font-light">Journey.</span></h3>
            </div>
          
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-24">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealVariants}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:top-12 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                  
                  <div className="w-full md:w-1/2 px-8 md:px-16 text-center md:text-left">
                    <div className={`${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl shadow-xl hover:border-primary/30 transition-colors duration-500`}>
                      <span className="text-sm font-bold text-primary mb-4 block uppercase tracking-widest">{event.year}</span>
                      <h4 className="text-3xl font-bold mb-2 tracking-tight text-foreground">{event.title}</h4>
                      <p className="text-xl text-primary font-bold mb-6 italic opacity-70">{event.organization}</p>
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

        {/* Capabilities Grid */}
        <section className="py-48 relative z-10">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-24">
              <h3 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground text-center leading-none text-foreground">Core <br /><span className="text-muted-foreground/40 italic font-light">Capabilities.</span></h3>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Asset Tracing",
                desc: "Methodical tracking of digital and financial assets across various jurisdictions.",
                icon: Search
              },
              {
                title: "Threat Profiling",
                desc: "Building comprehensive profiles of threat actors and their infrastructure.",
                icon: Shield
              },
              {
                title: "Darknet Monitoring",
                desc: "Active surveillance of underground forums for data breaches and emerging threats.",
                icon: Globe
              },
              {
                title: "Data Verification",
                desc: "Rigorous cross-referencing of open-source data to confirm authenticity.",
                icon: Database
              },
              {
                title: "Secure Development",
                desc: "Integrating security best practices into the application lifecycle.",
                icon: FileText
              },
              {
                title: "Incident Analysis",
                desc: "Post-incident investigations to identify entry points and impact.",
                icon: CheckCircle2
              }
            ].map((cap, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={revealVariants}
                className="p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl group hover:border-primary/50 transition-all duration-500 shadow-xl"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                  <cap.icon className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight text-foreground mb-4">{cap.title}</h4>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium group-hover:text-foreground transition-colors">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
}
