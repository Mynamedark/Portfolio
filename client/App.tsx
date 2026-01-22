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
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

function AppContent() {
  // Initialize animation registry
  useAnimationRegistry();
  // Enable data-attribute based animation delegation
  useAnimationDelegation();

  const [showPreloader, setShowPreloader] = useState(true);
  useEffect(() => {
    // Force dark theme
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  const handlePreloaderSkip = () => {
    setShowPreloader(false);
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
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/experience"
              element={
                <Layout>
                  <Experience />
                </Layout>
              }
            />
            <Route
              path="/projects"
              element={
                <Layout>
                  <Projects />
                </Layout>
              }
            />
            <Route
              path="/skills"
              element={
                <Layout>
                  <Skills />
                </Layout>
              }
            />
            <Route
              path="/certifications"
              element={
                <Layout>
                  <Certifications />
                </Layout>
              }
            />
            <Route
              path="/education"
              element={
                <Layout>
                  <Education />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
              <Route
                path="/downloads"
                element={
                  <Layout>
                    <Downloads />
                  </Layout>
                }
              />
              <Route path="/admin" element={<Admin />} />

            <Route
              path="*"
              element={
                <Layout>
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
