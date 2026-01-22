import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Lock, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "./ui/ScrambleText";
import { CyberLogo } from "./ui/CyberLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Certifications", href: "/certifications" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-in-out border-b",
        scrolled 
          ? "bg-background/90 backdrop-blur-xl border-primary/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] py-2" 
          : "bg-background/50 backdrop-blur-md border-border/10 py-4"
      )}
    >
      <nav className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            {/* Logo & Name */}
            <Link
              to="/"
              className="group flex items-center gap-4 transition-all duration-300"
            >
              <CyberLogo />
              <div className="flex flex-col">
                <ScrambleText
                  text="Dharam Kathiriya"
                  className="hidden sm:inline-block tracking-tight text-lg font-bold text-foreground group-hover:text-primary transition-colors"
                  triggerOn="hover"
                />
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono"
                >
                  Cyber Intelligence Portfolio
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md overflow-hidden group",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Active Indicator / Hover Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 border-b-2 border-primary z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover Accent */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-0" />
                  </Link>
                );
              })}
            </div>

            {/* Right Section / Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-wider cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                System Status: Secure
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/50 transition-all text-foreground"
                aria-label="Toggle menu"
              >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="lg:hidden overflow-hidden"
              >
              <div className="py-8 grid grid-cols-2 gap-4 border-t border-primary/10 mt-4">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all",
                            isActive 
                              ? "bg-primary/10 border-primary text-primary shadow-primary" 
                              : "bg-muted/20 border-border/50 text-muted-foreground hover:bg-muted/40 hover:border-primary/30"
                        )}
                      >
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pb-8 flex flex-col gap-4"
              >
                <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full" />
                <div className="flex justify-center gap-6">
                   <Lock className="w-4 h-4 text-muted-foreground" />
                   <Shield className="w-4 h-4 text-muted-foreground" />
                   <Cpu className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Global Scanning Effect Bar (Very subtle) */}
      <motion.div
        animate={{
          left: ["-100%", "200%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5,
        }}
        className="absolute bottom-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
      />
    </header>
  );
}
