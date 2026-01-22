import { Linkedin, Mail, Terminal, Activity, Shield, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-24 border-t border-border bg-background/50 backdrop-blur-xl relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 md:mb-24">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-xs font-black tracking-tighter shadow-neon">
                  DK
                </div>
                <div className="flex flex-col">
                  <span className="font-bold tracking-tight text-xl text-foreground font-display">Dharam Kathiriya</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-mono font-bold">Cyber Intelligence Specialist</span>
                </div>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-medium font-sans">
                Operating at the intersection of OSINT and technical research to deliver high-fidelity digital intelligence for global missions.
              </p>
              <div className="flex items-center gap-6">
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://www.linkedin.com/in/dharam-k-726742372" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="mailto:dharamkathiriya265@gmail.com" 
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">Navigation</h4>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium hover:translate-x-1 duration-300 w-fit">Home</Link>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium hover:translate-x-1 duration-300 w-fit">About Dossier</Link>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors font-medium hover:translate-x-1 duration-300 w-fit">Operations Log</Link>
                <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors font-medium hover:translate-x-1 duration-300 w-fit">System Specs</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium hover:translate-x-1 duration-300 w-fit">Secure Channel</Link>
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-display">System Stats</h4>
              <div className="space-y-4 font-mono text-[10px] text-muted-foreground">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-primary" />
                    <span>UPTIME:</span>
                  </div>
                  <span className="text-foreground font-bold">99.99%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-primary" />
                    <span>SECURITY:</span>
                  </div>
                  <span className="text-foreground font-bold italic">MAX_OPS</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-primary" />
                    <span>THREAT_LVL:</span>
                  </div>
                  <span className="text-red-500 font-bold">MINIMAL</span>
                </div>
              </div>
            </div>
          </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Terminal className="w-3 h-3 text-primary" />
            <span>&copy; {currentYear} Dharam Kathiriya • Encrypted Communication Protocol V2.0</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold text-center md:text-right">
            Methodical Investigation <span className="text-primary mx-2">•</span> Actionable Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
