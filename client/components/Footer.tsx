import { Linkedin, Mail, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.18) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Copyright & Tagline */}
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Dharam Kathiriya
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Cyber Crime Investigator & OSINT Specialist
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              FOLLOW
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/dharam-k-726742372"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted/40 transition-colors text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:dharamkathiriya265@gmail.com"
                className="p-2 rounded-lg hover:bg-muted/40 transition-colors text-foreground"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-xs font-semibold text-muted-foreground">
              CONTACT
            </p>
            <a
              href="mailto:dharamkathiriya265@gmail.com"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:translate-x-1"
            >
              <Mail className="w-4 h-4" />
              dharamkathiriya265@gmail.com
            </a>
            <a
              href="tel:+919879379605"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:translate-x-1"
            >
              <Phone className="w-4 h-4" />
              +91 98793-79605
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            Investigating the digital underworld. Securing the future.
          </p>
        </div>
      </div>
    </footer>
  );
}
