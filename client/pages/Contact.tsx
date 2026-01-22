import { motion, Variants } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare, Shield, Target, Activity } from "lucide-react";
export default function Contact() {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Direct Intelligence Request",
      value: "dharamkathiriya265@gmail.com",
      link: "mailto:dharamkathiriya265@gmail.com",
      description: "For detailed investigative inquiries, project proposals, and secure communication.",
    },
    {
      icon: Linkedin,
      title: "Professional Network",
      value: "linkedin.com/in/dharamkathiriya",
      link: "https://www.linkedin.com/in/dharam-k-726742372",
      description: "Connect for industry networking, professional endorsements, and career-related discussions.",
    },
    {
      icon: MapPin,
      title: "Operational Base",
      value: "Gujarat, India",
      description: "Available for global remote contracts, decentralized investigations, and cross-border collaboration.",
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
        <div className="container px-4 mx-auto text-center max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="p-16 md:p-24 rounded-[3.5rem] md:rounded-[5rem] border border-border bg-card/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/5 group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </motion.div>

              <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tight leading-none text-foreground font-display">
                Ready to secure your <br />
                <span className="text-muted-foreground/40 italic font-light">digital perimeter?</span>
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-16"
              >
                <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed font-sans">
                  I specialize in high-stakes investigations where accuracy and discretion are paramount. Let's discuss your requirements in a secure environment.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                  <motion.a 
                    href="mailto:dharamkathiriya265@gmail.com" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-7 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-[0_0_50px_-12px_var(--primary)] transition-all duration-300 flex items-center gap-4 text-2xl shadow-2xl group/btn font-display"
                  >
                    Send Secure Email <Send className="w-7 h-7 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/dharam-k-726742372" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-14 py-7 rounded-full border-2 border-border bg-card/50 backdrop-blur-md hover:bg-secondary/30 transition-all flex items-center gap-4 text-2xl font-bold text-foreground shadow-xl group/link font-display"
                  >
                    Connect via LinkedIn <MessageSquare className="w-7 h-7 group-link:scale-110 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>

            {/* Decorative background logic */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* Footer Support Info */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="space-y-6 p-10 rounded-[2.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-xl hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">Response Time</h4>
                <p className="text-2xl font-bold text-foreground font-display">Within 24 Operational Hours</p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                transition={{ delay: 0.1 }}
                className="space-y-6 p-10 rounded-[2.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-xl hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">Encryption Policy</h4>
                <p className="text-2xl font-bold text-foreground font-display">PGP Available Upon Request</p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                transition={{ delay: 0.2 }}
                className="space-y-6 p-10 rounded-[2.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-xl hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">Operational Status</h4>
                <p className="text-2xl font-bold text-foreground flex items-center gap-3 font-display">
                  Active & Accepting Missions
                </p>
              </motion.div>
            </div>
        </div>
      </section>
    </div>

  );
}
