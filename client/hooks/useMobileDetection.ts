import { useEffect, useState } from "react";

interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isTouchEnabled: boolean;
  supportsWebGL: boolean;
  reduceAnimations: boolean;
}

/**
 * Detect device capabilities and mobile status
 */
export function useMobileDetection(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isTouchEnabled: false,
    supportsWebGL: true,
    reduceAnimations: false,
  });

  useEffect(() => {
    // Detect mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    // Detect tablet (but not phone)
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !isMobile;

    // Detect touch
    const isTouchEnabled =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0);

    // Detect WebGL support
    const canvas = document.createElement("canvas");
    const supportsWebGL =
      !!window.WebGLRenderingContext &&
      (canvas.getContext("webgl") !== null ||
        canvas.getContext("experimental-webgl") !== null);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setCapabilities({
      isMobile,
      isTablet,
      isTouchEnabled,
      supportsWebGL,
      reduceAnimations: prefersReducedMotion,
    });
  }, []);

  return capabilities;
}

/**
 * Check if should disable 3D scenes based on device
 */
export function shouldDisable3D(capabilities: DeviceCapabilities): boolean {
  return capabilities.isMobile || !capabilities.supportsWebGL;
}
