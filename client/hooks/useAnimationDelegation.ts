import { useEffect } from "react";
import { animationController } from "@/lib/animations/controller";

export function useAnimationDelegation() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest("[data-animation-id]") as HTMLElement | null;
      const id = el?.getAttribute("data-animation-id");
      if (id && el instanceof HTMLElement) {
        animationController.play(id, el);
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest("[data-animation-id]");
      const id = el?.getAttribute("data-animation-id");
      if (id && el) {
        animationController.play(id, el as HTMLElement);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const el = e.target.closest("[data-animation-id]");
      const id = el?.getAttribute("data-animation-id");
      if (id) {
        animationController.stop(id);
      }
    };

    document.body.addEventListener("click", handleClick);
    document.body.addEventListener("mouseover", handleMouseEnter);
    document.body.addEventListener("mouseout", handleMouseLeave);
    return () => {
      document.body.removeEventListener("click", handleClick);
      document.body.removeEventListener("mouseover", handleMouseEnter);
      document.body.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);
}
