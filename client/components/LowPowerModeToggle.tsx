import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { animationScheduler } from "@/lib/animations/scheduler";

interface LowPowerModeToggleProps {
  showLabel?: boolean;
}

/**
 * Low Power Mode Toggle
 * Disables animations and 3D scenes to save battery
 */
export function LowPowerModeToggle({
  showLabel = true,
}: LowPowerModeToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize from saved preference
    const saved = localStorage.getItem("lowPowerMode");
    if (saved === "true") {
      setIsEnabled(true);
      animationScheduler.setLowPowerMode(true);
    }
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    animationScheduler.setLowPowerMode(newState);

    // Announce to screen readers
    const message = newState
      ? "Low Power Mode enabled. Animations and 3D scenes are disabled."
      : "Low Power Mode disabled. Animations and 3D scenes are enabled.";

    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
        ${
          isEnabled
            ? "bg-yellow-100 text-yellow-900 hover:bg-yellow-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
      `}
      title={
        isEnabled
          ? "Low Power Mode: ON (Animations disabled)"
          : "Low Power Mode: OFF"
      }
      aria-pressed={isEnabled}
    >
      <Zap className="w-4 h-4" />
      {showLabel && (
        <span className="text-xs font-semibold">
          {isEnabled ? "Power Saver" : "Normal"}
        </span>
      )}
    </button>
  );
}
