import { motion, Variants } from "framer-motion";
import { BookOpen, GraduationCap, Award, Target, Activity, CheckCircle2 } from "lucide-react";

export default function Education() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const education = [
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Uka Tarsadia University",
      location: "Gujarat, India",
      period: "2022 - 2025",
      focus: "Comprehensive study of software development, database management, and network security. Specialized projects in secure application architecture.",
      icon: GraduationCap
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-20">
      {/* Header */}
      <section className="py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Archive: Academic Record</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Academic <span className="text-muted-foreground/40 italic font-light">Foundation.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8"
            >
              A record of formal education providing the technical depth and theoretical framework necessary for complex digital investigations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Education List */}
      <section className="pb-48">
        <div className="container px-4 mx-auto">
          <div className="space-y-16">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
                transition={{ delay: index * 0.1 }}
                className="group relative p-12 rounded-[3.5rem] border border-border bg-background/40 backdrop-blur-md hover:bg-muted/10 transition-all duration-500 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                      <edu.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2">{edu.degree}</h3>
                      <p className="text-xl text-primary font-bold opacity-80">{edu.institution}</p>
                      <p className="text-lg text-muted-foreground font-mono mt-4 uppercase tracking-widest">{edu.period}</p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8 flex flex-col justify-center">
                    <p className="text-2xl text-muted-foreground leading-relaxed font-medium mb-10">
                      {edu.focus}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="p-8 rounded-3xl bg-muted/20 border border-border">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Location</h4>
                        <p className="text-xl font-bold text-foreground">{edu.location}</p>
                      </div>
                      <div className="p-8 rounded-3xl bg-muted/20 border border-border">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Status</h4>
                        <p className="text-xl font-bold text-foreground flex items-center gap-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                          Degree Candidate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-32 bg-secondary/40 backdrop-blur-md border-y border-border">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <h3 className="text-5xl md:text-8xl font-bold mb-10 tracking-tight leading-none italic font-light text-muted-foreground/40 text-center">Continuous <span className="text-foreground font-bold not-italic">Evolution.</span></h3>
            <p className="text-2xl text-muted-foreground mb-0 font-medium leading-relaxed">
              In the rapidly shifting landscape of cybercrime, formal education is only the beginning. I complement my academic background with daily research into emerging threat patterns and investigative techniques.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
