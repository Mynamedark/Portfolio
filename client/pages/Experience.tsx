import { motion, Variants } from "framer-motion";
import { Shield, Target, Activity, Terminal, Briefcase, Globe, Database, Search } from "lucide-react";

export default function Experience() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const experiences = [
    {
      company: "Independent Investigation Services",
      role: "OSINT & Cybercrime Research Specialist",
      period: "2024 - Present",
      description: "Providing high-stakes digital investigation services for private clients and legal teams. Specialized in asset tracing, threat actor profiling, and infrastructure analysis.",
      deliverables: [
        "Actionable intelligence reports for legal proceedings.",
        "Darknet monitoring for potential data breaches.",
        "Methodical tracking of digital footprints for HNWIs.",
        "Identity verification and cross-border profiling."
      ],
      icon: Search
    },
    {
      company: "Technical Research & Development",
      role: "Security-Focused Application Developer",
      period: "2023 - 2024",
      description: "Designed and implemented secure application architectures with a focus on data integrity and user privacy. Leveraged modern stacks to build robust investigative tools.",
      deliverables: [
        "Developed custom OSINT automation scripts in Python.",
        "Built secure web platforms with zero-trust principles.",
        "Conducted internal security audits and vulnerability assessments.",
        "Optimized data collection pipelines for efficiency."
      ],
      icon: Terminal
    }
  ];

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
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Log: Professional Record</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Operational <span className="text-muted-foreground/40 italic font-light">Experience.</span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8">
              A record of professional engagements where technical depth and investigative rigor were deployed to solve complex digital challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience List */}
      <section className="pb-48">
        <div className="container px-4 mx-auto">
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                transition={{ delay: index * 0.1 }}
                className="group relative p-12 rounded-[3rem] border border-border bg-background/40 backdrop-blur-md hover:bg-muted/10 transition-all duration-500 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <exp.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">{exp.company}</h3>
                      <p className="text-xl text-primary font-bold opacity-80">{exp.role}</p>
                      <p className="text-lg text-muted-foreground font-mono mt-4 uppercase tracking-widest">{exp.period}</p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8 space-y-10">
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                      {exp.description}
                    </p>
                    
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">Key Intelligence Deliverables</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {exp.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-lg text-foreground font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
