import { useRef, useCallback } from "react";
import { animationController } from "@/lib/animations/controller";

interface UseHoverAnimationOptions {
  animationId: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

/**
 * Hook for triggering animations on element hover
 *
 * Usage:
 * const { ref, onMouseEnter, onMouseLeave } = useHoverAnimation("home_card_hover_01");
 * <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>Hover me</div>
 */
export function useHoverAnimation({
  animationId,
  onHoverStart,
  onHoverEnd,
}: UseHoverAnimationOptions) {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      const element = event?.currentTarget || elementRef.current;
      if (element) {
        animationController.play(animationId, element);
        onHoverStart?.();
      }
    },
    [animationId, onHoverStart],
  );

  const handleMouseLeave = useCallback(() => {
    animationController.stop(animationId);
    onHoverEnd?.();
  }, [animationId, onHoverEnd]);

  return {
    ref: elementRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}
