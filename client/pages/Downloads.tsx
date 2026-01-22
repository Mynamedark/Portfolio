import { motion, Variants } from "framer-motion";
import { Download, FileText, Shield, Search, CheckCircle2, Activity, Target } from "lucide-react";

const resources = [
  {
    title: "Professional CV / Resume",
    description: "Detailed overview of my investigative experience, technical stack, and educational background optimized for ATS and recruiters.",
    icon: FileText,
    filename: "Dharam_Resume_TIA.pdf"
  },
  {
    title: "OSINT Methodology Whitepaper",
    description: "A professional brief on my investigative framework, from data collection and verification to intelligence reporting.",
    icon: Search,
    filename: "OSINT_Methodology_Kathiriya.pdf"
  },
  {
    title: "Sample Intelligence Report",
    description: "An anonymized report demonstrating my ability to document and communicate complex digital findings to stakeholders.",
    icon: Shield,
    filename: "Sample_Intelligence_Report.pdf"
  }
];

export default function Downloads() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

    const floatVariants: Variants = {
      animate: {
        y: [0, -10, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      hover: {
        y: 0,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-transparent pt-20">

      {/* Header */}
      <section className="py-32">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md mx-auto"
            >
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">System: Resource Uplink</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Download <span className="text-muted-foreground/40 italic font-light">Credentials.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Access professional materials and investigative frameworks designed for recruiters and clients in the cybersecurity and intelligence sectors.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  animate="animate"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  variants={{
                    ...revealVariants,
                    ...floatVariants
                  }}
                  className="p-12 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-border flex flex-col items-center text-center hover:border-primary/50 transition-all duration-500 group"
                >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                  <resource.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight">{resource.title}</h3>
                  <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">
                    {resource.description}
                  </p>
                  <a 
                    href={`/download/${resource.filename}`}
                    download={resource.filename}
                    className="mt-auto w-full flex items-center justify-center gap-4 py-5 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all duration-500 text-lg shadow-neon"
                  >
                    <Download className="w-6 h-6" /> Download PDF
                  </a>
                </motion.div>
              ))}
            </div>
  
            {/* Differentiators */}
            <div
              className="mt-32 p-16 md:p-24 rounded-[4rem] bg-secondary/40 backdrop-blur-md border border-border shadow-glass relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
              <h2 className="text-4xl md:text-7xl font-bold mb-20 tracking-tight text-center text-foreground">Competitive <span className="text-muted-foreground/40 italic font-light">Differentiators.</span></h2>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-16"
              >
                {[
                  {
                    title: "Real Investigation Experience",
                    desc: "I don't just use tools; I conduct real-world investigations into threat actor ecosystems and digital fraud patterns."
                  },
                  {
                    title: "Methodical Precision",
                    desc: "Every finding is cross-referenced through multiple independent sources and documented to professional standards."
                  },
                  {
                    title: "Technical Depth",
                    desc: "A formal background in computer applications allows me to understand the technical 'how' behind investigative leads."
                  },
                  {
                    title: "Actionable Intelligence",
                    desc: "I deliver synthesized intelligence that supports immediate decision-making and strategic risk mitigation."
                  }
                ].map((diff, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-4 tracking-tight text-foreground">{diff.title}</h4>
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium group-hover:text-foreground transition-colors">{diff.desc}</p>
                    </div>
                  </div>
                  ))}
                </motion.div>
            </div>
          </div>
        </section>
      
      {/* Summary Footer info */}
      <section className="py-24 border-t border-border bg-background/20 backdrop-blur-sm">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-muted-foreground opacity-40">
            System Integrity • Verified Methodology • Professional Rigor
          </p>
        </div>
      </section>
    </div>
  );
}
