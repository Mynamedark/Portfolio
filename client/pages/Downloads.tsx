import { motion } from "framer-motion";
import { Download, FileText, Shield, Search, CheckCircle2 } from "lucide-react";

const resources = [
  {
    title: "Professional CV / Resume",
    description: "Detailed overview of my investigative experience, technical stack, and educational background.",
    icon: FileText,
    filename: "Dharam_Kathiriya_OSINT_Resume.pdf"
  },
  {
    title: "OSINT Methodology Whitepaper",
    description: "A professional brief on my investigative framework, from data collection to intelligence reporting.",
    icon: Search,
    filename: "OSINT_Methodology_Kathiriya.pdf"
  },
  {
    title: "Sample Intelligence Report",
    description: "An anonymized report demonstrating my ability to document and communicate complex digital findings.",
    icon: Shield,
    filename: "Sample_Intelligence_Report.pdf"
  }
];

export default function Downloads() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Resources & Credentials</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              Document <span className="text-muted-foreground italic">Repository.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access professional materials designed for recruiters and clients in the cybersecurity and intelligence sectors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-muted/30 border border-border flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
              >
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <resource.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {resource.description}
                </p>
                <button className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-full bg-foreground text-background font-bold hover:opacity-90 transition-all">
                  <Download className="w-5 h-5" /> Download PDF
                </button>
              </motion.div>
            ))}
          </div>

          {/* Differentiators */}
          <div className="mt-32 p-12 md:p-20 rounded-[3rem] bg-foreground text-background">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight text-center">Competitive Differentiators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: "Real Investigation Experience",
                  desc: "I don't just use tools; I conduct real-world investigations into threat actor ecosystems."
                },
                {
                  title: "Methodical Precision",
                  desc: "Every finding is verified through multiple sources and documented to legal standards."
                },
                {
                  title: "Technical Depth",
                  desc: "A background in computer applications allows me to understand the 'how' behind the 'who'."
                },
                {
                  title: "Actionable Results",
                  desc: "I provide intelligence that supports immediate decision-making and risk mitigation."
                }
              ].map((diff, index) => (
                <div key={index} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">{diff.title}</h4>
                    <p className="text-background/70 leading-relaxed">{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
