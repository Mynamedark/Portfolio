import { motion, Variants } from "framer-motion";
import { CheckCircle2, Shield, Search, Globe, Database, FileText, Target, Award, BookOpen, Terminal } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

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
      <section className="py-16 md:py-32 relative z-10">
        <div className="container px-4 mx-auto">
            <div className="max-w-4xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8 backdrop-blur-md"
              >
                <Target className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">Dossier: DHARAM KATHIRIYA</span>
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-6 md:mb-10 leading-[0.9] font-display">
                A commitment to <br className="hidden sm:block" />
                <span className="text-muted-foreground/40 italic font-light">digital truth.</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-6 md:pl-8 font-sans"
              >
                Based in India, I operate at the forefront of digital investigations, helping organizations navigate the complexities of the cybercrime ecosystem through methodical open-source intelligence.
              </motion.p>
            </div>
        </div>
      </section>

          {/* Philosophy Section */}
          <section className="py-16 md:py-32 relative z-10">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <SpotlightCard
                    index={0}
                    className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl transition-all duration-500 shadow-2xl"
                  >
                    <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 tracking-tight flex items-center gap-3 md:gap-4 text-foreground font-display">
                      <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary" /> Investigative Rigor
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-medium font-sans">
                      In an era of information overload, the value lies not in the volume of data, but in the accuracy of its interpretation. My approach to OSINT is rooted in the principles of evidence preservation and analytical reasoning. I don't just find information; I verify it to ensure it meets the highest standards of credibility for recruiters, clients, and legal environments.
                    </p>
                  </SpotlightCard>
                  <SpotlightCard
                    index={1}
                    className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl transition-all duration-500 shadow-2xl"
                  >
                    <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 tracking-tight flex items-center gap-3 md:gap-4 text-foreground font-display">
                      <Terminal className="w-6 h-6 md:w-8 md:h-8 text-primary" /> Technical Foundation
                    </h3>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-medium font-sans">
                      My background in Computer Applications provides the technical depth necessary to understand how cybercriminals exploit infrastructure. This dual-competency in investigation and development allows me to bridge the gap between abstract threats and technical vulnerabilities, delivering reports that are both comprehensive and actionable.
                    </p>
                  </SpotlightCard>
                </div>

            </div>
          </section>

            {/* International Operations Section */}
            <section className="py-24 md:py-48 relative overflow-hidden z-10">
              <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
              <div className="container px-4 mx-auto">
                <SpotlightCard
                  index={0}
                  className="max-w-5xl mx-auto p-8 md:p-24 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl overflow-visible"
                >
                  <div className="text-center">
                    <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 md:mb-6 font-display">Global reach</h2>
                    <h3 className="text-3xl md:text-8xl font-bold tracking-tight mb-8 md:mb-12 leading-[0.9] font-display text-foreground">International <br className="hidden sm:block" /><span className="text-muted-foreground/40 italic font-light">Collaboration.</span></h3>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-medium mb-10 md:mb-16 font-sans">
                      Operating without borders, I provide OSINT and cybersecurity services to global organizations. My workflow is engineered for high-stakes international collaboration, ensuring investigative precision across time zones and jurisdictions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
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
                          <span className="text-primary font-bold text-lg md:text-2xl mb-1 md:mb-2 font-display">{item.label}</span>
                          <span className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold opacity-60 font-display text-center">{item.desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </section>

          {/* Experience Timeline */}
          <section className="py-16 md:py-32 relative z-10">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 md:mb-6 font-display">Operational History</h2>
                <h3 className="text-4xl md:text-8xl font-bold tracking-tight leading-[0.9] font-display text-foreground">Professional <br className="hidden sm:block" /><span className="text-muted-foreground/40 italic font-light">Journey.</span></h3>
              </div>
            
            <div className="max-w-5xl mx-auto relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
              
                <div className="space-y-12 md:space-y-24">
                  {timelineEvents.map((event, index) => (
                    <SpotlightCard
                      key={index}
                      index={index}
                      className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      {/* Dot */}
                      <div className="absolute left-0 md:left-1/2 top-0 md:top-12 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                      
                      <div className="w-full md:w-1/2 px-4 md:px-16 text-center md:text-left">
                        <div className={`${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} p-8 md:p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl shadow-xl hover:border-primary/30 transition-colors duration-500`}>
                          <span className="text-xs font-bold text-primary mb-2 md:mb-4 block uppercase tracking-widest font-display">{event.year}</span>
                          <h4 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 tracking-tight text-foreground font-display">{event.title}</h4>
                          <p className="text-lg md:text-xl text-primary font-bold mb-4 md:mb-6 italic opacity-70 font-sans">{event.organization}</p>
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium font-sans">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 hidden md:block" />
                    </SpotlightCard>
                  ))}
                </div>

            </div>
          </div>
        </section>

          {/* Capabilities Grid */}
          <section className="py-24 md:py-48 relative z-10">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16 md:mb-24">
                <h3 className="text-4xl md:text-8xl font-bold tracking-tight text-foreground text-center leading-[0.9] font-display">Core <br className="hidden sm:block" /><span className="text-muted-foreground/40 italic font-light">Capabilities.</span></h3>
              </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <SpotlightCard 
                    key={index} 
                    index={index}
                    className="p-8 md:p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl group hover:border-primary/50 transition-all duration-500 shadow-xl"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 md:mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                      <cap.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-3 md:mb-4 font-display">{cap.title}</h4>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium group-hover:text-foreground transition-colors font-sans">
                      {cap.desc}
                    </p>
                  </SpotlightCard>
                ))}
              </div>

          </div>
        </section>
    </div>

  );
}
