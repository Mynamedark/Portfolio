import { motion } from "framer-motion";
import { CheckCircle2, Shield, Search, Globe, Database, FileText } from "lucide-react";

const timelineEvents = [
  {
    year: "2025",
    title: "OSINT & Cybercrime Investigation",
    organization: "Independent Consultant",
    description:
      "Conducting advanced OSINT on threat actors, analyzing phishing and online fraud patterns, supporting documentation for law enforcement standards.",
  },
  {
    year: "2023 - 2024",
    title: "Web & Application Development",
    organization: "Various Security-Focused Projects",
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

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">About the Specialist</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              A commitment to <span className="text-muted-foreground italic">digital truth.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Based in India, I operate at the forefront of digital investigations, helping organizations navigate the complexities of the cybercrime ecosystem through methodical open-source intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 border-y border-border bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Investigative Rigor</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In an era of information overload, the value lies not in the volume of data, but in the accuracy of its interpretation. My approach to OSINT is rooted in the principles of evidence preservation and analytical reasoning. I don't just find information; I verify it to ensure it meets the highest standards of credibility for recruiters, clients, and legal environments.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Technical Foundation</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My background in Computer Applications provides the technical depth necessary to understand how cybercriminals exploit infrastructure. This dual-competency in investigation and development allows me to bridge the gap between abstract threats and technical vulnerabilities, delivering reports that are both comprehensive and actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <h3 className="text-4xl font-bold mb-16 tracking-tight text-center">Professional Journey</h3>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l border-border"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <span className="text-sm font-bold text-primary mb-2 block">{event.year}</span>
                <h4 className="text-2xl font-bold mb-1">{event.title}</h4>
                <p className="text-muted-foreground font-medium mb-4">{event.organization}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-24 border-t border-border bg-foreground text-background">
        <div className="container px-4 mx-auto">
          <h3 className="text-4xl font-bold mb-16 tracking-tight text-center">Core Capabilities</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <div key={index} className="space-y-4">
                <cap.icon className="w-8 h-8 text-primary" />
                <h4 className="text-xl font-bold">{cap.title}</h4>
                <p className="text-background/70 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
