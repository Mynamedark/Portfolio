/**
 * Central Animation Scheduler
 * Manages animation priorities, pause/resume, and lifecycle
 */

export type AnimationPriority = "critical" | "high" | "normal" | "low" | "idle";

export interface ScheduledAnimation {
  id: string;
  priority: AnimationPriority;
  callback: () => void;
  duration: number;
  startTime: number;
  paused: boolean;
  cancelled: boolean;
}

class AnimationScheduler {
  private static instance: AnimationScheduler;
  private queue: Map<string, ScheduledAnimation> = new Map();
  private isPaused = false;
  private prefersReducedMotion = false;
  private lowPowerMode = false;
  private animationFrameId: number | null = null;

  private constructor() {
    this.checkPrefersReducedMotion();
    this.setupVisibilityHandler();
    this.setupLowPowerMode();
  }

  static getInstance(): AnimationScheduler {
    if (!AnimationScheduler.instance) {
      AnimationScheduler.instance = new AnimationScheduler();
    }
    return AnimationScheduler.instance;
  }

  /**
   * Schedule an animation with priority
   */
  schedule(
    id: string,
    callback: () => void,
    duration: number = 300,
    priority: AnimationPriority = "normal",
  ): () => void {
    // Skip if reduced motion is enabled (except for critical)
    if (this.prefersReducedMotion && priority !== "critical") {
      callback();
      return () => {};
    }

    // Skip if low power mode and not critical/high
    if (this.lowPowerMode && !["critical", "high"].includes(priority)) {
      callback();
      return () => {};
    }

    const animation: ScheduledAnimation = {
      id,
      priority,
      callback,
      duration,
      startTime: Date.now(),
      paused: false,
      cancelled: false,
    };

    this.queue.set(id, animation);

    // Cancel function
    return () => {
      const anim = this.queue.get(id);
      if (anim) {
        anim.cancelled = true;
      }
    };
  }

  /**
   * Pause all animations
   */
  pauseAll(): void {
    this.isPaused = true;
    this.queue.forEach((anim) => {
      anim.paused = true;
    });
  }

  /**
   * Resume all animations
   */
  resumeAll(): void {
    this.isPaused = false;
    this.queue.forEach((anim) => {
      anim.paused = false;
      // Reset start time to account for pause duration
      anim.startTime = Date.now() - (anim.startTime - Date.now());
    });
  }

  /**
   * Cancel all animations for a page
   */
  cancelPage(page: string): void {
    const toRemove: string[] = [];
    this.queue.forEach((anim, id) => {
      if (id.startsWith(page)) {
        anim.cancelled = true;
        toRemove.push(id);
      }
    });
    toRemove.forEach((id) => this.queue.delete(id));
  }

  /**
   * Clear all animations
   */
  clearAll(): void {
    this.queue.clear();
  }

  /**
   * Get queue size
   */
  getQueueSize(): number {
    return this.queue.size;
  }

  /**
   * Process animations (called every frame)
   */
  update(): void {
    const now = Date.now();
    const toRemove: string[] = [];

    this.queue.forEach((anim, id) => {
      if (anim.cancelled) {
        toRemove.push(id);
        return;
      }

      if (!anim.paused && !this.isPaused) {
        const elapsed = now - anim.startTime;
        if (elapsed >= anim.duration) {
          try {
            anim.callback();
          } catch (e) {
            console.error(`Animation error (${id}):`, e);
          }
          toRemove.push(id);
        }
      }
    });

    toRemove.forEach((id) => this.queue.delete(id));
  }

  /**
   * Check if prefers-reduced-motion is enabled
   */
  private checkPrefersReducedMotion(): void {
    if (typeof window !== "undefined") {
      this.prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Listen for changes
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .addEventListener("change", (e) => {
          this.prefersReducedMotion = e.matches;
          if (this.prefersReducedMotion) {
            this.pauseAll();
          } else {
            this.resumeAll();
          }
        });
    }
  }

  /**
   * Setup visibility change handler
   */
  private setupVisibilityHandler(): void {
    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.pauseAll();
        } else {
          this.resumeAll();
        }
      });
    }
  }

  /**
   * Setup low power mode
   */
  private setupLowPowerMode(): void {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("lowPowerMode");
      this.lowPowerMode = saved === "true";
    }
  }

  /**
   * Toggle low power mode
   */
  setLowPowerMode(enabled: boolean): void {
    this.lowPowerMode = enabled;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("lowPowerMode", String(enabled));
    }

    if (enabled) {
      this.pauseAll();
    } else {
      this.resumeAll();
    }
  }

  /**
   * Check if low power mode is enabled
   */
  isLowPowerMode(): boolean {
    return this.lowPowerMode;
  }

  /**
   * Check if prefers reduced motion
   */
  isPrefersReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }
}

export const animationScheduler = AnimationScheduler.getInstance();
