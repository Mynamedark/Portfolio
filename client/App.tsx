import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Preloader } from "@/components/Preloader";
import { Layout } from "@/components/Layout";
import { useAnimationRegistry } from "@/hooks/useAnimationRegistry";
import { useAnimationDelegation } from "@/hooks/useAnimationDelegation";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Education from "./pages/Education";
import Contact from "./pages/Contact";
import Downloads from "./pages/Downloads";
import NotFound from "./pages/NotFound";
import Gradients from "./pages/Gradients";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

function AppContent() {
  // Initialize animation registry
  useAnimationRegistry();
  // Enable data-attribute based animation delegation
  useAnimationDelegation();

  const [showPreloader, setShowPreloader] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply theme
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handlePreloaderSkip = () => {
    setShowPreloader(false);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <Preloader
        isVisible={showPreloader}
        onComplete={handlePreloaderComplete}
        onSkip={handlePreloaderSkip}
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <About />
              </Layout>
            }
          />
          <Route
            path="/experience"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Experience />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Projects />
              </Layout>
            }
          />
          <Route
            path="/skills"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Skills />
              </Layout>
            }
          />
          <Route
            path="/certifications"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Certifications />
              </Layout>
            }
          />
          <Route
            path="/education"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Education />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/downloads"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Downloads />
              </Layout>
            }
          />
          <Route
            path="/gradients"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <Gradients />
              </Layout>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <Layout isDark={isDark} onThemeToggle={handleThemeToggle}>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
