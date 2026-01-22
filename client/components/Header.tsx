import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

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

export function Header({ isDark, onThemeToggle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card backdrop-blur-sm border-b border-border shadow-sm">
      <nav className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-3 font-bold text-xl text-foreground transition-colors"
            >
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center text-background text-xs font-black tracking-tighter">
                DK
              </div>
              <span className="hidden sm:inline-block tracking-tight text-lg font-semibold">
                Dharam Kathiriya
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Admin Link */}
            <Link
              to="/admin"
              className="p-2 rounded-lg hover:bg-muted/40 transition-colors text-foreground"
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              {/* <Settings className="w-5 h-5" /> */}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-muted/40 transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/40 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted/40 hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-foreground hover:bg-muted/40 hover:text-muted-foreground transition-colors font-semibold"
            >
              Admin Panel
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
