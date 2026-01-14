/**
 * Throttle Utility
 * Prevents excessive function calls for scroll, resize, etc.
 */

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 50,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce Utility
 * Delays function call until user stops interacting
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, wait);
  };
}

/**
 * RequestAnimationFrame Throttle
 * Uses RAF for smooth 60fps updates
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T,
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    lastArgs = args;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(this, lastArgs);
        }
        rafId = null;
      });
    }
  };
}

/**
 * Scroll Throttle (minimum 50ms)
 * Optimized for scroll events
 */
export function createScrollThrottle(callback: (scrollY: number) => void) {
  const MIN_INTERVAL = 50; // milliseconds
  let lastCallTime = 0;
  let pendingScrollY = 0;
  let rafId: number | null = null;

  return {
    handle: (scrollY: number) => {
      const now = performance.now();
      pendingScrollY = scrollY;

      if (now - lastCallTime >= MIN_INTERVAL) {
        callback(scrollY);
        lastCallTime = now;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          callback(pendingScrollY);
          lastCallTime = performance.now();
          rafId = null;
        });
      }
    },
    destroy: () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
  };
}
