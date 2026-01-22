import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { GlobalBackground3D, BackgroundVariant } from "./GlobalBackground3D";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

    const getVariant = (pathname: string): BackgroundVariant => {
      switch (pathname) {
        case "/":
          return "threat-intel-globe";
        case "/about":
          return "digital-network-mesh";
        case "/experience":
          return "osint-node-network";
        case "/contact":
          return "cyber-dragon";
        case "/projects":
          return "data-streams";
        case "/education":
          return "digital-network-mesh";
        case "/downloads":
          return "osint-node-network";
        case "/certifications":
          return "signal-scanning";
        case "/skills":
          return "osint-node-network";
        default:
          return "osint-node-network";
      }
    };


  const variant = getVariant(location.pathname);

  return (
    <div className="min-h-screen flex flex-col text-foreground relative transition-colors duration-500">
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-20] bg-background transition-colors duration-500"
      />

        <GlobalBackground3D variant={variant} />


      <CustomCursor />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
