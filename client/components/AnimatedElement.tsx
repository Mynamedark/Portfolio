import React, { ReactNode, useEffect } from "react";
import { useClickAnimation } from "@/hooks/useClickAnimation";
import { useHoverAnimation } from "@/hooks/useHoverAnimation";
import { useAnimation } from "@/hooks/useAnimation";
import { cn } from "@/lib/utils";

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;

  // Animation IDs
  clickAnimationId?: string;
  hoverAnimationId?: string;
  scrollAnimationId?: string;
  focusAnimationId?: string;
  loadAnimationId?: string;

  // Element configuration
  as?: React.ElementType;
  onClick?: () => void;
  onHoverComplete?: () => void;

  // Animation behavior
  autoPlay?: boolean;
  loop?: boolean;

  // Other props
  [key: string]: any;
}

/**
 * AnimatedElement - Reusable component for applying animations to any element
 *
 * Usage:
 * <AnimatedElement
 *   clickAnimationId="home_button_click_01"
 *   hoverAnimationId="home_button_hover_01"
 *   as="button"
 *   onClick={() => navigate("/")}
 * >
 *   Click Me
 * </AnimatedElement>
 */
export const AnimatedElement = React.forwardRef<
  HTMLElement,
  AnimatedElementProps
>(
  (
    {
      children,
      className,
      clickAnimationId,
      hoverAnimationId,
      scrollAnimationId,
      focusAnimationId,
      loadAnimationId,
      as: Component = "div",
      onClick,
      onHoverComplete,
      autoPlay = false,
      loop = false,
      ...props
    },
    ref,
  ) => {
    // Click animation
    const handleClickAnimation = useClickAnimation({
      animationId: clickAnimationId,
      onComplete: onClick,
    });

    // Hover animation
    const {
      ref: hoverRef,
      onMouseEnter: onHoverEnter,
      onMouseLeave: onHoverLeave,
    } = useHoverAnimation({
      animationId: hoverAnimationId,
      onComplete: onHoverComplete,
    });

    // Scroll animation
    const { ref: scrollRef, play: playScroll } = useAnimation(
      scrollAnimationId,
      {
        autoPlay,
      },
    );

    // Focus animation
    const { ref: focusRef } = useAnimation(focusAnimationId, {
      autoPlay: false,
    });

    // Load animation
    const { ref: loadRef, play: playLoad } = useAnimation(loadAnimationId, {
      autoPlay,
    });

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLElement) => {
        if (!element) return;

        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;

        if (hoverRef) {
          if (typeof hoverRef === "function") hoverRef(element);
          else hoverRef.current = element;
        }

        if (scrollRef) {
          scrollRef.current = element;
        }

        if (focusRef) {
          focusRef.current = element;
        }

        if (loadRef) {
          loadRef.current = element;
        }
      },
      [ref, hoverRef, scrollRef, focusRef, loadRef],
    );

    const handleFocus = () => {
      if (focusAnimationId) {
        // Play focus animation
      }
      props.onFocus?.();
    };

    const handleBlur = () => {
      props.onBlur?.();
    };

    return (
      <Component
        ref={combinedRef}
        className={cn("transition-all duration-300", className)}
        onClick={clickAnimationId ? handleClickAnimation : onClick}
        onMouseEnter={hoverAnimationId ? onHoverEnter : props.onMouseEnter}
        onMouseLeave={hoverAnimationId ? onHoverLeave : props.onMouseLeave}
        onFocus={focusAnimationId ? handleFocus : props.onFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

AnimatedElement.displayName = "AnimatedElement";

/**
 * Preset animated components for common use cases
 */

export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  Omit<AnimatedElementProps, "as"> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>(({ variant = "primary", ...props }, ref) => {
  const variantClass = {
    primary: "bg-primary text-primary-foreground hover:shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-lg",
    ghost: "hover:bg-accent/10",
  }[variant];

  return (
    <AnimatedElement
      ref={ref}
      as="button"
      className={cn(
        "px-6 py-2 rounded-lg font-semibold transition-all duration-300",
        variantClass,
        props.className,
      )}
      clickAnimationId={
        props.clickAnimationId || "global_interactive_click_button_001"
      }
      hoverAnimationId={
        props.hoverAnimationId || "global_interactive_hover_button_001"
      }
      {...props}
    />
  );
});

AnimatedButton.displayName = "AnimatedButton";

export const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  Omit<AnimatedElementProps, "as">
>(({ ...props }, ref) => {
  return (
    <AnimatedElement
      ref={ref}
      as="div"
      className={cn(
        "rounded-lg border border-border bg-card p-4 hover:shadow-md",
        props.className,
      )}
      clickAnimationId={
        props.clickAnimationId || "global_interactive_click_card_001"
      }
      hoverAnimationId={
        props.hoverAnimationId || "global_interactive_hover_card_001"
      }
      scrollAnimationId={
        props.scrollAnimationId || "global_parallax_scroll_layer_001"
      }
      {...props}
    />
  );
});

AnimatedCard.displayName = "AnimatedCard";

export const AnimatedLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<AnimatedElementProps, "as"> & { href: string }
>(({ ...props }, ref) => {
  return (
    <AnimatedElement
      ref={ref}
      as="a"
      className={cn(
        "hover:text-primary transition-colors duration-200",
        props.className,
      )}
      clickAnimationId={
        props.clickAnimationId || "global_interactive_click_link_001"
      }
      hoverAnimationId={
        props.hoverAnimationId || "global_interactive_hover_link_001"
      }
      {...props}
    />
  );
});

AnimatedLink.displayName = "AnimatedLink";

/**
 * Custom hook for applying animations to existing elements
 */
export function useAnimatedElement(
  clickAnimationId?: string,
  hoverAnimationId?: string,
  scrollAnimationId?: string,
) {
  const handleClickAnimation = useClickAnimation({
    animationId: clickAnimationId,
  });

  const {
    ref: hoverRef,
    onMouseEnter,
    onMouseLeave,
  } = useHoverAnimation({
    animationId: hoverAnimationId,
  });

  const { ref: scrollRef } = useAnimation(scrollAnimationId);

  return {
    ref: hoverRef || scrollRef,
    onClick: clickAnimationId ? handleClickAnimation : undefined,
    onMouseEnter: hoverAnimationId ? onMouseEnter : undefined,
    onMouseLeave: hoverAnimationId ? onMouseLeave : undefined,
  };
}
