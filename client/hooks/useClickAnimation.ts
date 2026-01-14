import { useCallback } from "react";
import { animationController } from "@/lib/animations/controller";

interface UseClickAnimationOptions {
  animationId: string;
  onComplete?: () => void;
}

/**
 * Hook for triggering animations on element click
 *
 * Usage:
 * const clickHandler = useClickAnimation("home_hero_cta_click_01");
 * <button onClick={clickHandler}>Click me</button>
 */
export function useClickAnimation({
  animationId,
  onComplete,
}: UseClickAnimationOptions) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      animationController.play(animationId, event.currentTarget);

      // Listen for animation completion
      const unsubscribe = animationController.on(
        "animation:stop",
        (payload) => {
          if (payload.id === animationId) {
            onComplete?.();
            unsubscribe();
          }
        },
      );
    },
    [animationId, onComplete],
  );

  return handleClick;
}
