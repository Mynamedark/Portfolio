import React from "react";
import { Button, ButtonProps } from "./button";
import { useClickAnimation } from "@/hooks/useClickAnimation";

interface AnimatedButtonProps extends ButtonProps {
  /**
   * Animation ID to trigger on click
   * If not provided, a default animation based on variant will be used
   */
  clickAnimationId?: string;

  /**
   * Animation ID to trigger on hover
   */
  hoverAnimationId?: string;

  /**
   * Callback when animation completes
   */
  onAnimationComplete?: () => void;
}

/**
 * Enhanced Button component with built-in animation support
 *
 * Usage:
 * <AnimatedButton variant="default" clickAnimationId="home_button_click_01">
 *   Click Me
 * </AnimatedButton>
 */
export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      clickAnimationId,
      hoverAnimationId,
      onAnimationComplete,
      variant,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    // Determine default animation ID based on variant
    const defaultClickAnimation = `global_interactive_click_${variant || "button"}_001`;
    const defaultHoverAnimation = `global_interactive_hover_${variant || "button"}_001`;

    const handleClickAnimation = useClickAnimation({
      animationId: clickAnimationId || defaultClickAnimation,
      onComplete: () => {
        onAnimationComplete?.();
        onClick?.({} as React.MouseEvent<HTMLButtonElement>);
      },
    });

    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovering(true);
      if (hoverAnimationId || defaultHoverAnimation) {
        // Trigger hover animation here if needed
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovering(false);
      onMouseLeave?.(e);
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        onClick={handleClickAnimation}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  },
);

AnimatedButton.displayName = "AnimatedButton";
