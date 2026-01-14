import { motion, Variants } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

export default function Contact() {

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "dharamkathiriya265@gmail.com",
      link: "mailto:dharamkathiriya265@gmail.com",
      description: "Send me an email for detailed inquiries",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 98793-79605",
      link: "tel:+919879379605",
      description: "Call for urgent matters",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect on LinkedIn",
      link: "https://www.linkedin.com/in/dharam-k-726742372",
      description: "Professional network and recommendations",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Gujarat, India",
      description: "Available for remote collaboration",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      {/* Header */}
      <section className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Get In Touch
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl">
            Have an investigation need, cybersecurity project, or just want to
            discuss security practices? I'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const Wrapper: any = method.link ? motion.a : motion.div;
            return (
              <Wrapper
                key={index}
                variants={itemVariants}
                {...(method.link
                  ? {
                      href: method.link,
                      target: method.link.startsWith("http")
                        ? "_blank"
                        : undefined,
                      rel: method.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined,
                    }
                  : {})}
                className="group relative p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>

                  <h3 className="font-bold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-primary font-semibold mb-2">
                    {method.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {method.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </Wrapper>
            );
          })}
        </motion.div>
      </section>

      {/* Direct Communication Note */}
      <section className="container mx-auto max-w-4xl px-4 py-12 md:py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 md:p-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Connect?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Reach out directly through email, phone, or LinkedIn. I respond to
            inquiries within 24 hours and am available for remote collaboration
            on cybersecurity projects, OSINT analysis, and digital forensics
            investigations.
          </p>
          <p className="text-sm text-muted-foreground">
            Whether you need consultation, investigation support, or just want
            to discuss security practices, I'm here to help.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
