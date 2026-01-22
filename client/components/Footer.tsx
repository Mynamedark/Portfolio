import { Linkedin, Mail, ArrowUpRight, Globe, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 overflow-hidden bg-background border-t border-white/5">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">Dharam.</span>
            </Link>
            <p className="text-muted-foreground text-lg max-w-sm mb-8 font-ui">
              Open-Source Intelligence Specialist & Cyber Researcher focused on digital truth and actionable data-driven intelligence.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/dharam-k-726742372" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:dharamkathiriya265@gmail.com"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Navigation</h4>
            <nav className="flex flex-col gap-4 font-ui">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group">
                Home <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" />
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group">
                About <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" />
              </Link>
              <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group">
                Projects <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" />
              </Link>
              <Link to="/skills" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group">
                Skills <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all ml-1" />
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact</h4>
            <div className="flex flex-col gap-4 font-ui">
              <p className="text-muted-foreground">Available for specialized investigative mandates and strategic intelligence consulting.</p>
              <Link to="/contact" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                Initiate Contact <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground font-ui">
            &copy; {currentYear} Dharam Kathiriya. Built for the modern web.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Privacy Policy</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Terms of Service</span>
          </div>
        </div>
      </div>
      
      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-primary/5 to-transparent pointer-events-none -z-10" />
    </footer>
  );
}
