import { motion, Variants } from "framer-motion";
import { Search, Shield, Globe, Database, ArrowUpRight, Activity, Terminal, Lock } from "lucide-react";

const projects = [
  {
    title: "Cryptocurrency Asset Tracing & Recovery Support",
    context: "A high-stakes financial fraud investigation involving cross-chain transfers and obfuscation techniques used by threat actors to launder stolen assets.",
    tools: "Blockchain Explorers (Etherscan, Blockchain.com), Maltego, OSINT Framework, custom Python scripts for wallet monitoring.",
    findings: "Mapped the flow of 150+ BTC across 12 intermediate wallets, identifying a recurring pattern that linked back to a high-risk offshore exchange. Provided a comprehensive report that assisted legal teams in initiating freeze requests.",
    value: "Demonstrates advanced blockchain forensic capability and the ability to produce actionable evidence for legal proceedings.",
    icon: Database
  },
  {
    title: "Threat Actor Infrastructure Analysis: 'Operation Phantom'",
    context: "Identifying the origin and command-and-control (C2) infrastructure of a regional phishing group targeting financial institutions.",
    tools: "Shodan, Censys, DomainTools, Passive DNS, WHOIS history analysis, Google Dorks.",
    findings: "Successfully identified 12 interconnected domains and mapped the underlying VPS provider. Discovered an unsecured development server that revealed the threat actor's naming conventions and potential location.",
    value: "Showcases deep infrastructure research skills and the ability to proactively identify and neutralize emerging threats.",
    icon: Shield
  },
  {
    title: "Digital Footprint Audit & Exposure Remediation",
    context: "A comprehensive profiling mission for a high-net-worth individual to identify potential vectors for social engineering and targeted attacks.",
    tools: "Social Media Intelligence (SOCMINT), Data Breach Monitoring platforms, Dehashed, HaveIBeenPwned API.",
    findings: "Identified 3 critical exposure points, including leaked credentials on darknet forums and inadvertent geolocation disclosure through public social media posts. Remediated all points and established a continuous monitoring protocol.",
    value: "Highlights the capability to conduct thorough SOCMINT and provide high-value defensive intelligence.",
    icon: Search
  },
  {
    title: "Vulnerability Assessment of Critical Infrastructure",
    context: "Scanning for exposed Industrial Control Systems (ICS) and SCADA systems in a specific geographic region to assess national security risks.",
    tools: "Shodan, Censys, BinaryEdge, custom Nmap scripts (within legal boundaries).",
    findings: "Discovered 45 exposed systems with default configurations, including water treatment control panels and energy grid monitors. Reported findings through responsible disclosure channels.",
    value: "Demonstrates an understanding of critical infrastructure security and the responsible use of reconnaissance tools.",
    icon: Globe
  }
];

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
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Archive: Case Files</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Documented <span className="text-muted-foreground/40 italic font-light">Intelligence.</span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8">
              A selection of high-stakes investigations demonstrating methodical research, technical proficiency, and the production of actionable intelligence reports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-48">
        <div className="container px-4 mx-auto">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                transition={{ delay: index * 0.1 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 p-12 rounded-[3rem] border border-border bg-background/40 backdrop-blur-md hover:bg-muted/10 transition-all duration-500 overflow-hidden"
              >
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <project.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Context</h4>
                        <p className="text-lg text-muted-foreground leading-relaxed font-medium">{project.context}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Tactical Stack</h4>
                        <p className="text-lg text-muted-foreground leading-relaxed font-medium">{project.tools}</p>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Analysis Findings</h4>
                        <p className="text-lg text-foreground font-bold leading-relaxed">{project.findings}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Operational Value</h4>
                        <p className="text-lg text-muted-foreground italic leading-relaxed font-medium opacity-70">"{project.value}"</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                  <div className="lg:col-span-4 flex items-center justify-center">
                    <div className="w-full aspect-square max-w-[320px] rounded-[2.5rem] bg-muted/20 border border-border flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
                      <Search className="w-24 h-24 text-muted-foreground/10 group-hover:text-primary/10 transition-all duration-700" />
                      <div className="absolute bottom-8 right-8 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                        <ArrowUpRight className="w-7 h-7" />
                      </div>
                    </div>
                  </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section className="py-32 border-t border-border bg-foreground text-background">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <h3 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-none">Need Targeted <span className="text-primary italic">Research?</span></h3>
            <p className="text-2xl text-background/70 mb-16 font-medium leading-relaxed">
              Whether it's due diligence, threat actor profiling, or digital asset tracing, I provide the intelligence you need to make informed decisions.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all text-xl shadow-2xl">
              Commission an Investigation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
