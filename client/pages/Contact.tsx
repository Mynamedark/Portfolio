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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-[3rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30" />

            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-none italic font-light opacity-90 text-foreground">Ready to secure your <span className="font-bold opacity-100 not-italic text-primary">digital perimeter?</span></h2>
            <p className="text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
              I specialize in high-stakes investigations where accuracy and discretion are paramount. Let's discuss your requirements in a secure environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a href="mailto:dharamkathiriya265@gmail.com" className="px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all duration-500 flex items-center gap-4 text-xl shadow-xl shadow-primary/20">
                Send Secure Email <Send className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/dharam-k-726742372" target="_blank" rel="noopener noreferrer" className="px-12 py-6 rounded-full border-2 border-border hover:bg-secondary/20 transition-all flex items-center gap-4 text-xl font-bold text-foreground">
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
