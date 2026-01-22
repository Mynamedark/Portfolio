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
    <div className="flex flex-col min-h-screen bg-transparent pt-20">
      {/* Header */}
      <section className="py-32">
        <div className="container px-4 mx-auto text-center max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md mx-auto">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Channel: Secure Uplink</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-10 leading-none">
              Initiate <span className="text-muted-foreground/40 italic font-light">Contact.</span>
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Whether you need targeted OSINT research, a comprehensive digital footprint audit, or strategic threat intelligence, I am ready to support your mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={revealVariants}
                className="p-12 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-border flex flex-col items-center text-center hover:border-primary/50 transition-all duration-500 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                  <method.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight">{method.title}</h3>
                <p className="text-lg font-bold text-foreground mb-6 break-all font-mono opacity-80">{method.value}</p>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Alternative CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="p-16 md:p-24 rounded-[4rem] bg-foreground text-background text-center relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-none italic font-light opacity-90">Ready to secure your <span className="font-bold opacity-100 not-italic">digital perimeter?</span></h2>
            <p className="text-2xl text-background/60 mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              I specialize in high-stakes investigations where accuracy and discretion are paramount. Let's discuss your requirements in a secure environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="mailto:dharamkathiriya265@gmail.com" className="px-12 py-6 rounded-full bg-background text-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 flex items-center gap-4 text-xl shadow-xl">
                Send Secure Email <Send className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/dharam-k-726742372" target="_blank" rel="noopener noreferrer" className="px-12 py-6 rounded-full border-2 border-background/10 hover:bg-background/5 transition-all flex items-center gap-4 text-xl font-bold">
                Connect via LinkedIn <MessageSquare className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Support Info */}
      <section className="py-24 border-t border-border bg-background/20 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Response Time</h4>
              <p className="text-xl font-bold">Within 24 Operational Hours</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Encryption Policy</h4>
              <p className="text-xl font-bold">PGP Available Upon Request</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Operational Status</h4>
              <p className="text-xl font-bold flex items-center justify-center md:justify-start gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Active & Accepting Missions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
