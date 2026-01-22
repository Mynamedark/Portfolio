import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { GlobalBackground3D, BackgroundVariant } from "./GlobalBackground3D";

interface LayoutProps {
  children: ReactNode;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function Layout({ children, isDark, onThemeToggle }: LayoutProps) {
  const location = useLocation();

  const getVariant = (pathname: string): BackgroundVariant => {
    switch (pathname) {
      case "/":
        return "threat-intel-globe";
      case "/about":
        return "digital-network-mesh";
      case "/experience":
        return "security-lattice";
      case "/contact":
        return "signal-scanning";
      case "/projects":
        return "data-streams";
      case "/education":
        return "recon-spiral";
      case "/downloads":
        return "traffic-flow";
      case "/certifications":
        return "encryption-vortex";
      case "/skills":
        return "cyber-matrix";
      default:
        return "threat-intel-globe";
    }
  };

  const variant = getVariant(location.pathname);

  return (
    <div className="min-h-screen flex flex-col text-foreground relative transition-colors duration-500">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-20] bg-background transition-colors duration-500"
      />

      <GlobalBackground3D isDark={isDark} variant={variant} />

      <CustomCursor />
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
