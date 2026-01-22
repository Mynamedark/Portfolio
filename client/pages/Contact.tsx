import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Direct Intelligence Request",
      value: "dharamkathiriya265@gmail.com",
      link: "mailto:dharamkathiriya265@gmail.com",
      description: "For detailed investigative inquiries and project proposals.",
    },
    {
      icon: Linkedin,
      title: "Professional Network",
      value: "linkedin.com/in/dharamkathiriya",
      link: "https://www.linkedin.com/in/dharam-k-726742372",
      description: "Connect for industry networking and endorsements.",
    },
    {
      icon: MapPin,
      title: "Operational Base",
      value: "Gujarat, India",
      description: "Available for global remote contracts and collaboration.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-20">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Initiate Contact</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              Open for <span className="text-muted-foreground italic">Operation.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you need targeted OSINT research, a digital footprint audit, or threat intelligence, I am ready to support your mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-32">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2rem] bg-muted/30 border border-border flex flex-col items-center text-center hover:border-primary/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <method.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{method.title}</h3>
                <p className="text-sm font-bold text-foreground mb-4 break-all">{method.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Simple Contact Form / Alternative CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[3rem] bg-foreground text-background text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight italic">Ready to secure your perimeter?</h2>
            <p className="text-xl text-background/70 mb-12 max-w-2xl mx-auto">
              I specialize in high-stakes investigations where accuracy and discretion are paramount. Let's discuss your requirements in a secure environment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:dharamkathiriya265@gmail.com" className="px-10 py-5 rounded-full bg-background text-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2">
                Send Direct Email <Send className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/dharam-k-726742372" target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-full border border-background/20 hover:bg-background/10 transition-all flex items-center gap-2">
                LinkedIn Message <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
