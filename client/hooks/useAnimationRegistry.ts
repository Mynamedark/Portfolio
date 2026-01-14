import { useEffect } from "react";
import { animationController } from "@/lib/animations/controller";
import { animationRegistry } from "@/lib/animations/registry";

/**
 * Hook to initialize all animations from the registry
 * Call this once in your app (e.g., in a root layout or App component)
 */
export function useAnimationRegistry() {
  useEffect(() => {
    // Register all animations from the registry
    // Actual animation callbacks will be implemented per animation type
    animationRegistry.forEach((config) => {
      // For now, register with a placeholder callback
      // These will be replaced with actual animation implementations
      animationController.registerAnimation(config, (element, cfg) => {
        console.debug(`Animation triggered: ${cfg.id}`, {
          element,
          engine: cfg.engine,
          trigger: cfg.trigger,
        });

        // Placeholder: Add animation-specific logic based on engine type
        switch (cfg.engine) {
          case "framer":
            // Framer Motion animations will be handled by components
            break;
          case "gsap":
            // GSAP animations will be implemented here
            break;
          case "lottie":
            // Lottie animations will be loaded and played
            break;
          case "r3f":
            // Three.js/React-Three-Fiber animations
            break;
          case "css":
            // CSS animations via class application
            element.classList.add(`animate-${cfg.id}`);
            break;
        }
      });
    });

    console.log(
      `✨ Animation Controller initialized with ${animationRegistry.length} animations`,
    );
  }, []);
}

/**
 * Hook to get animations for a specific page
 */
export function usePageAnimations(page: string) {
  const animations = animationRegistry.filter((a) => a.page === page);
  return animations;
}

/**
 * Hook to get animations for a specific component
 */
export function useComponentAnimations(component: string) {
  const animations = animationRegistry.filter((a) => a.component === component);
  return animations;
}
