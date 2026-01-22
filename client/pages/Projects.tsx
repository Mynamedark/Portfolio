import { motion } from "framer-motion";
import { Search, Shield, Globe, Database, ArrowUpRight } from "lucide-react";

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
  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Operations & Case Studies</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              Documented <span className="text-muted-foreground italic">Intelligence.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A selection of investigations demonstrating methodical research, technical proficiency, and the production of actionable intelligence reports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto">
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 rounded-[2rem] border border-border hover:bg-muted/30 transition-all duration-500 overflow-hidden"
              >
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Context</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.context}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Tools & Methodology</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.tools}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Findings & Outcome</h4>
                        <p className="text-foreground font-medium leading-relaxed">{project.findings}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Operational Value</h4>
                        <p className="text-muted-foreground italic leading-relaxed">{project.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-4 flex items-center justify-center">
                  <div className="w-full aspect-square max-w-[300px] rounded-3xl bg-muted/50 border border-border flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Search className="w-20 h-20 text-muted-foreground/20 group-hover:text-primary/20 transition-colors" />
                    <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hire CTA */}
      <section className="py-24 border-t border-border bg-foreground text-background">
        <div className="container px-4 mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Need Targeted Research?</h3>
          <p className="text-xl text-background/70 mb-12 max-w-2xl mx-auto">
            Whether it's due diligence, threat actor profiling, or digital asset tracing, I provide the intelligence you need to make informed decisions.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all">
            Hire for OSINT Research
          </a>
        </div>
      </section>
    </div>
  );
}
