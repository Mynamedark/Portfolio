import { useEffect, useRef, useCallback } from "react";
import {
  animationScheduler,
  AnimationPriority,
} from "@/lib/animations/scheduler";

interface UseScheduledAnimationOptions {
  animationId: string;
  duration?: number;
  priority?: AnimationPriority;
  onComplete?: () => void;
  enabled?: boolean;
}

/**
 * Hook for scheduling animations with priority system
 * Respects prefers-reduced-motion and low power mode
 */
export function useScheduledAnimation({
  animationId,
  duration = 300,
  priority = "normal",
  onComplete,
  enabled = true,
}: UseScheduledAnimationOptions) {
  const cancelRef = useRef<(() => void) | null>(null);

  const schedule = useCallback(() => {
    if (!enabled) return;

    cancelRef.current = animationScheduler.schedule(
      animationId,
      () => {
        onComplete?.();
      },
      duration,
      priority,
    );
  }, [animationId, duration, priority, onComplete, enabled]);

  const cancel = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current();
      cancelRef.current = null;
    }
  }, []);

  useEffect(() => {
    schedule();
    return () => cancel();
  }, [schedule, cancel]);

  return {
    schedule,
    cancel,
    isReducedMotion: animationScheduler.isPrefersReducedMotion(),
    isLowPowerMode: animationScheduler.isLowPowerMode(),
  };
}
