/**
 * Animation Controller Service
 *
 * Central registry for managing animations across the portfolio.
 * Naming convention: {page}_{component}_{action}_{seq}
 * Example: home_hero_enter_01, projects_tile_transition_02
 */

export type AnimationEngine = "gsap" | "framer" | "lottie" | "r3f" | "css";
export type AnimationTrigger = "click" | "hover" | "scroll" | "load";

interface AnimationConfig {
  id: string;
  page: string;
  component: string;
  action: string;
  engine: AnimationEngine;
  trigger: AnimationTrigger;
  duration?: number;
  delay?: number;
  fallback?: string;
  description?: string;
}

interface AnimationState {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
}

type AnimationCallback = (
  element: HTMLElement,
  config: AnimationConfig,
) => void;

class AnimationController {
  private registry: Map<string, AnimationConfig> = new Map();
  private callbacks: Map<string, AnimationCallback> = new Map();
  private states: Map<string, AnimationState> = new Map();
  private eventListeners: Map<string, Set<Function>> = new Map();

  /**
   * Register a new animation
   */
  public registerAnimation(
    config: AnimationConfig,
    callback: AnimationCallback,
  ): void {
    this.registry.set(config.id, config);
    this.callbacks.set(config.id, callback);
    this.states.set(config.id, {
      isPlaying: false,
      isPaused: false,
      progress: 0,
    });
  }

  /**
   * Trigger an animation
   */
  public play(
    animationId: string,
    element: HTMLElement,
    context?: Record<string, any>,
  ): void {
    const config = this.registry.get(animationId);
    const callback = this.callbacks.get(animationId);

    if (!config || !callback) {
      console.warn(`Animation not found: ${animationId}`);
      return;
    }

    const state = this.states.get(animationId);
    if (state) {
      state.isPlaying = true;
      state.isPaused = false;
    }

    // Emit event
    this.emit("animation:start", { id: animationId, context });

    // Execute callback
    try {
      callback(element, config);
    } catch (error) {
      console.error(`Error playing animation ${animationId}:`, error);
      this.emit("animation:error", { id: animationId, error });
    }
  }

  /**
   * Pause an animation
   */
  public pause(animationId: string): void {
    const state = this.states.get(animationId);
    if (state) {
      state.isPaused = true;
      state.isPlaying = false;
      this.emit("animation:pause", { id: animationId });
    }
  }

  /**
   * Resume a paused animation
   */
  public resume(animationId: string): void {
    const state = this.states.get(animationId);
    if (state) {
      state.isPaused = false;
      state.isPlaying = true;
      this.emit("animation:resume", { id: animationId });
    }
  }

  /**
   * Stop an animation
   */
  public stop(animationId: string): void {
    const state = this.states.get(animationId);
    if (state) {
      state.isPlaying = false;
      state.isPaused = false;
      state.progress = 0;
      this.emit("animation:stop", { id: animationId });
    }
  }

  /**
   * Reset all animations to initial state
   */
  public resetAll(): void {
    this.states.forEach((state) => {
      state.isPlaying = false;
      state.isPaused = false;
      state.progress = 0;
    });
    this.emit("animation:reset-all", {});
  }

  /**
   * Get animation config
   */
  public getConfig(animationId: string): AnimationConfig | undefined {
    return this.registry.get(animationId);
  }

  /**
   * Get animation state
   */
  public getState(animationId: string): AnimationState | undefined {
    return this.states.get(animationId);
  }

  /**
   * Get all animations by page
   */
  public getByPage(page: string): AnimationConfig[] {
    return Array.from(this.registry.values()).filter((a) => a.page === page);
  }

  /**
   * Get all animations by component
   */
  public getByComponent(component: string): AnimationConfig[] {
    return Array.from(this.registry.values()).filter(
      (a) => a.component === component,
    );
  }

  /**
   * Get all animations by trigger type
   */
  public getByTrigger(trigger: AnimationTrigger): AnimationConfig[] {
    return Array.from(this.registry.values()).filter(
      (a) => a.trigger === trigger,
    );
  }

  /**
   * Event emitter
   */
  public emit(event: string, payload: any): void {
    const listeners = this.eventListeners.get(event) || new Set();
    listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  /**
   * Event listener
   */
  public on(event: string, callback: Function): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.eventListeners.get(event)?.delete(callback);
    };
  }

  /**
   * Get all registered animations (useful for debugging)
   */
  public getAll(): AnimationConfig[] {
    return Array.from(this.registry.values());
  }

  /**
   * List all animations (for CLI/debug)
   */
  public listAnimations(): void {
    console.table(this.getAll());
  }
}

// Singleton instance
export const animationController = new AnimationController();

export default AnimationController;
