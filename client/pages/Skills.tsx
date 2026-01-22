import { motion } from "framer-motion";
import { Search, Shield, Database, Globe, Lock, Terminal, FileText, CheckCircle2 } from "lucide-react";

const skillGroups = [
  {
    title: "OSINT & Intelligence",
    icon: Search,
    description: "Methodical gathering and analysis of publicly available data to produce actionable intelligence.",
    skills: [
      "Open Source Intelligence (OSINT)",
      "Identity & Asset Tracing",
      "Threat Actor Profiling",
      "Digital Footprint Analysis",
      "Darknet Monitoring",
      "SOCMINT (Social Media Intelligence)"
    ]
  },
  {
    title: "Technical Stack",
    icon: Terminal,
    description: "Deep technical proficiency in investigative tools and security-focused development.",
    skills: [
      "Maltego & Spiderfoot",
      "Shodan & Censys",
      "Google Dorks & Advanced Search",
      "WHOIS & DNS Forensics",
      "Python for Automation",
      "Blockchain Forensics"
    ]
  },
  {
    title: "Methodology & Reporting",
    icon: FileText,
    description: "Translating complex digital evidence into clear, defensible, and professional reports.",
    skills: [
      "Intelligence Report Writing",
      "Evidence Preservation",
      "Analytical Reasoning",
      "Privacy & OPSEC",
      "Legal Standards Alignment",
      "Critical Infrastructure Assessment"
    ]
  }
];

export default function Skills() {
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
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Competency & Tools</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              The <span className="text-muted-foreground italic">Investigative Stack.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A comprehensive toolset and methodology designed to uncover hidden connections and provide clarity in complex digital environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Bento Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-muted/30 border border-border flex flex-col items-start hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <group.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{group.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {group.description}
                </p>
                <div className="mt-auto w-full space-y-3">
                  {group.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                      <CheckCircle2 className="w-4 h-4 text-primary/60" />
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Cloud Section */}
      <section className="py-24 border-t border-border bg-foreground text-background">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Specialized Tools</h3>
            <p className="text-background/70">
              I utilize industry-standard and custom-built tools to ensure comprehensive data collection and verification.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["Maltego", "Spiderfoot", "Shodan", "Censys", "Figma", "Burp Suite", "Wireshark", "Metasploit", "CSI Linux", "Hunchly", "ExifTool", "Wayback Machine", "Sherlock", "Social Analyzer", "Crt.sh", "HaveIBeenPwned"].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-background/10 border border-background/20 text-sm font-bold hover:bg-background hover:text-foreground transition-all cursor-default"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
