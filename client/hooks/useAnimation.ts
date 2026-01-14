import { useRef, useCallback, useEffect } from "react";
import { animationController } from "@/lib/animations/controller";

interface UseAnimationOptions {
  autoPlay?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onStop?: () => void;
}

/**
 * Hook to manage animations in React components
 *
 * Usage:
 * const { play, pause, stop } = useAnimation("home_hero_enter_01");
 *
 * <div ref={ref} onClick={() => play()}>Click me</div>
 */
export function useAnimation(
  animationId: string,
  options: UseAnimationOptions = {},
) {
  const { autoPlay = false, onComplete, onStart, onStop } = options;
  const elementRef = useRef<HTMLElement>(null);

  // Play animation
  const play = useCallback(() => {
    if (elementRef.current) {
      animationController.play(animationId, elementRef.current);
      onStart?.();
    }
  }, [animationId, onStart]);

  // Pause animation
  const pause = useCallback(() => {
    animationController.pause(animationId);
  }, [animationId]);

  // Resume animation
  const resume = useCallback(() => {
    animationController.resume(animationId);
  }, [animationId]);

  // Stop animation
  const stop = useCallback(() => {
    animationController.stop(animationId);
    onStop?.();
  }, [animationId, onStop]);

  // Auto-play on mount if enabled
  useEffect(() => {
    if (autoPlay && elementRef.current) {
      play();
    }
  }, [autoPlay, play]);

  // Listen to animation events
  useEffect(() => {
    const unsubscribe = animationController.on("animation:stop", (payload) => {
      if (payload.id === animationId) {
        onComplete?.();
      }
    });

    return unsubscribe;
  }, [animationId, onComplete]);

  return {
    ref: elementRef,
    play,
    pause,
    resume,
    stop,
    isPlaying: animationController.getState(animationId)?.isPlaying ?? false,
    isPaused: animationController.getState(animationId)?.isPaused ?? false,
  };
}
