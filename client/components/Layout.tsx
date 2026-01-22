import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { GlobalBackground3D, BackgroundVariant } from "./GlobalBackground3D";
import { AnimatePresence, motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const getVariant = (pathname: string): BackgroundVariant => {
    switch (pathname) {
      case "/":
        return "threat-intel-globe";
      case "/contact":
        return "modern-data-lattice";
      default:
        return "modern-data-lattice";
    }
  };

  const variant = getVariant(location.pathname);

  return (
    <div className="min-h-screen flex flex-col text-foreground relative transition-colors duration-500 overflow-x-hidden">
      {/* Background Layer */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-20] bg-background transition-colors duration-500"
      />

      <GlobalBackground3D variant={variant} />

      <CustomCursor />
      <Header />
      
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}
