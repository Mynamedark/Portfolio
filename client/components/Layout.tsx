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
        return "globe"; // Rotating sphere with orbit ring
      case "/about":
        return "network"; // Interconnected network nodes
      case "/experience":
        return "dna"; // DNA double helix structure
      case "/contact":
        return "hexgrid"; // Hexagonal grid pattern
      case "/projects":
        return "grid"; // Flying through grid effect
      case "/education":
        return "spiral"; // Spiral helix animation
      case "/downloads":
        return "flow"; // Wave-like flowing particles
      case "/certifications":
        return "vortex"; // Swirling vortex effect
      case "/skills":
        return "matrix"; // Matrix-style particle animation
      default:
        return "globe";
    }
  };

  const getGradientClass = (pathname: string, isDark: boolean): string => {
    // Override gradients based on user request
    switch (pathname) {
      case "/":
        // Home: Dark Mode focused: Deep Navy -> Purple
        return isDark
          ? "bg-gradient-to-br from-[#0D324D] to-[#7F5A83]"
          : "bg-gradient-to-br from-white to-gray-100"; // Brighter Light Mode
      case "/about":
        // About: Light Mode focused: Lavender -> Aqua
        return isDark
          ? "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
          : "bg-gradient-to-br from-[#E0E0F5] to-[#E0F7FA]"; // Brighter pastel for Light Mode
      case "/skills": // Services/Solutions theme
        // Dual-mode balanced
        return isDark
          ? "bg-gradient-to-br from-[#1E3B70] to-[#29539B]"
          : "bg-gradient-to-br from-[#E6F4EA] to-[#E0F2F1]"; // Brighter pastel for Light Mode
      case "/projects":
        // Minimal contrast: Dark Neutral
        return isDark ? "bg-[#0F0F0F]" : "bg-[#FAFAFA]"; // Brighter Neutral
      case "/contact":
        // Bright Conversion-Friendly: Neutral-Light
        return isDark ? "bg-[#0F0F0F]" : "bg-[#FAFAFA]"; // Brighter Neutral
      default:
        return "bg-background";
    }
  };

  const variant = getVariant(location.pathname);

  return (
    // Removed gradientClass (bg-background) from here to prevent covering the fixed 3D canvas
    <div className="min-h-screen flex flex-col text-foreground relative transition-colors duration-500">
      {/* 
         Layering Strategy for Visibility:
         1. Base Background Color (z-[-20]): Ensures we have a color (Dark/Light) but it's behind everything.
         2. 3D Canvas (z-[-10]): Sits on top of the base color.
         3. Content (z-0 / default): Sits on top of animations.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-20] bg-background transition-colors duration-500"
      />

      <GlobalBackground3D isDark={isDark} variant={variant} />

      {/* Optional Overlay (if needed later, currently transparent) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[-9] bg-transparent"
      />

      <CustomCursor />
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
