import { motion, Variants } from "framer-motion";
import { BookOpen, GraduationCap, Award, Target, Activity, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

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

      {/* Header */}
      <section className="py-32 relative z-10">
        <div className="container px-4 mx-auto">
            <div className="max-w-4xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
              >
                <BookOpen className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary font-display">Archive: Academic Record</span>
              </motion.div>
              <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-foreground mb-10 leading-none font-display">
                Academic <br />
                <span className="text-muted-foreground/40 italic font-light">Foundation.</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium border-l-2 border-primary/30 pl-8 font-sans"
              >
                A record of formal education providing the technical depth and theoretical framework necessary for complex digital investigations.
              </motion.p>
            </div>
        </div>
      </section>

      {/* Education List */}
      <section className="pb-48 relative z-10">
        <div className="container px-4 mx-auto">
          <div className="space-y-16">
            {education.map((edu, index) => (
              <SpotlightCard
                key={index}
                index={index}
                className="p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 shadow-2xl"
              >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                    <div className="lg:col-span-4 space-y-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                        <edu.icon className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold tracking-tight mb-3 text-foreground font-display">{edu.degree}</h3>
                        <p className="text-2xl text-primary font-bold italic opacity-80 font-display">{edu.institution}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 mt-6">
                          <span className="text-sm text-primary font-mono uppercase tracking-widest font-bold font-display">{edu.period}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <p className="text-2xl text-muted-foreground leading-relaxed font-medium mb-12 font-sans">
                        {edu.focus}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="p-10 rounded-[2rem] bg-card/20 border border-border backdrop-blur-sm group-hover:border-primary/30 transition-colors duration-500 shadow-xl">
                          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2 font-display">
                            <Activity className="w-4 h-4" /> Location
                          </h4>
                          <p className="text-2xl font-bold text-foreground font-display">{edu.location}</p>
                        </div>
                        <div className="p-10 rounded-[2rem] bg-card/20 border border-border backdrop-blur-sm group-hover:border-primary/30 transition-colors duration-500 shadow-xl">
                          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2 font-display">
                            <Target className="w-4 h-4" /> Operational Status
                          </h4>
                          <p className="text-2xl font-bold text-foreground flex items-center gap-3 font-display">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            Degree Candidate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-48 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto text-center max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="p-16 md:p-24 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-5xl md:text-8xl font-bold mb-10 tracking-tight leading-none text-foreground">Continuous <br /><span className="text-muted-foreground/40 italic font-light">Evolution.</span></h3>
            <p className="text-2xl text-muted-foreground mb-0 font-medium leading-relaxed max-w-2xl mx-auto">
              In the rapidly shifting landscape of cybercrime, formal education is only the beginning. I complement my academic background with daily research into emerging threat patterns and investigative techniques.
            </p>
          </motion.div>
        </div>
      </section>
    </div>

  );
}
