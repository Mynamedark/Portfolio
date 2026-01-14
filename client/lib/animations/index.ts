import { animationController } from "./controller";
import type { AnimationConfig } from "./controller";

export function registerAnimation(
  config: AnimationConfig,
  callback: (element: HTMLElement, config: AnimationConfig) => void,
) {
  animationController.registerAnimation(config, callback);
}

export function emitAnimationStart(id: string, context?: Record<string, any>) {
  animationController.emit("animation:start", { id, context });
}

export function emitAnimationStop(id: string, context?: Record<string, any>) {
  animationController.emit("animation:stop", { id, context });
}

export function resetAll() {
  animationController.resetAll();
}

