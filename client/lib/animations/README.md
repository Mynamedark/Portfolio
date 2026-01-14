# Animation Controller System

A centralized animation management system for handling 100+ animations across the Dharam Kathiriya portfolio.

## Overview

The Animation Controller provides:

- **Central Registry**: All animations defined in one place with metadata
- **Event Bus**: Emit and listen to animation events
- **Engine Support**: GSAP, Framer Motion, Lottie, React-Three-Fiber, and CSS
- **State Management**: Track animation playback states
- **Developer Hooks**: Easy-to-use React hooks for animations

## Quick Start

### 1. Initialize the Animation Registry

In your App component (usually at the top level):

```typescript
import { useAnimationRegistry } from "@/hooks/useAnimationRegistry";

function App() {
  useAnimationRegistry();

  return (
    // Your app content
  );
}
```

### 2. Use Animations in Components

#### Using the `useAnimation` Hook

```typescript
import { useAnimation } from "@/hooks/useAnimation";

export function HeroSection() {
  const { ref, play, pause, stop } = useAnimation("home_hero_enter", {
    autoPlay: true,
    onComplete: () => console.log("Hero animation done!"),
  });

  return (
    <div ref={ref}>
      <h1>Welcome</h1>
    </div>
  );
}
```

#### Using the `useClickAnimation` Hook

```typescript
import { useClickAnimation } from "@/hooks/useClickAnimation";

export function Button() {
  const handleClick = useClickAnimation({
    animationId: "home_cta_click_01",
    onComplete: () => navigate("/projects"),
  });

  return <button onClick={handleClick}>View Projects</button>;
}
```

#### Using the `useHoverAnimation` Hook

```typescript
import { useHoverAnimation } from "@/hooks/useHoverAnimation";

export function Card() {
  const { ref, onMouseEnter, onMouseLeave } = useHoverAnimation({
    animationId: "home_card_hover_01",
  });

  return (
    <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      Card content
    </div>
  );
}
```

### 3. Register Custom Animations

To add new animations to the system:

1. **Add to the registry** (`client/lib/animations/registry.ts`):

```typescript
{
  id: "my_page_component_action_01",
  page: "my_page",
  component: "my_component",
  action: "my_action",
  engine: "framer", // or "gsap", "lottie", "r3f", "css"
  trigger: "click",
  duration: 500,
  description: "My animation description",
}
```

2. **Implement the animation callback** in the appropriate engine handler

3. **Use in your component** with the hooks above

## Animation Naming Convention

```
{page}_{component}_{action}_{sequence}
```

**Examples:**

- `home_hero_enter_01` - Home page, hero component, enter action
- `projects_tile_click_01` - Projects page, tile component, click action
- `contact_submit_success` - Contact page, submit feedback, success state

## Supported Engines

### Framer Motion (`framer`)

Use for component-level animations, transitions, and interactive effects.

```typescript
import { motion } from "framer-motion";

// Animations handled automatically by motion components
```

### GSAP (`gsap`)

Use for timeline-based, complex animations and DOM manipulation.

```typescript
import gsap from "gsap";

// Implement in animation callback
animationController.registerAnimation(config, (element, cfg) => {
  gsap.to(element, { duration: cfg.duration, opacity: 1 });
});
```

### Lottie (`lottie`)

Use for vector animations and micro-interactions.

```typescript
import Lottie from "lottie-react";

// Use in components with animation ID reference
<Lottie animationData={data} />
```

### React-Three-Fiber (`r3f`)

Use for 3D scene animations and complex 3D interactions.

```typescript
import { Canvas } from "@react-three/fiber";

// Implement in Canvas components
```

### CSS (`css`)

Use for simple CSS animations and transitions.

```css
@keyframes my-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-my_animation {
  animation: my-animation 0.5s ease-out;
}
```

## Event Bus

Listen to animation events throughout your app:

```typescript
import { animationController } from "@/lib/animations/controller";

// Listen to animation start
animationController.on("animation:start", (payload) => {
  console.log(`Started: ${payload.id}`);
});

// Listen to animation stop
animationController.on("animation:stop", (payload) => {
  console.log(`Stopped: ${payload.id}`);
});

// Listen to all animations reset
animationController.on("animation:reset-all", () => {
  console.log("All animations reset");
});
```

## Available Events

- `animation:start` - When an animation starts
- `animation:stop` - When an animation stops
- `animation:pause` - When an animation is paused
- `animation:resume` - When an animation resumes
- `animation:reset-all` - When all animations are reset
- `animation:error` - When an animation error occurs

## Controller API

### Methods

```typescript
// Play an animation
animationController.play(animationId, element, context);

// Pause an animation
animationController.pause(animationId);

// Resume a paused animation
animationController.resume(animationId);

// Stop an animation
animationController.stop(animationId);

// Reset all animations
animationController.resetAll();

// Get animation config
animationController.getConfig(animationId);

// Get animation state
animationController.getState(animationId);

// Get animations by page/component/trigger
animationController.getByPage(page);
animationController.getByComponent(component);
animationController.getByTrigger(trigger);

// List all animations (debugging)
animationController.listAnimations();
```

## Debugging

### List All Registered Animations

```typescript
// In browser console
window.animationController?.listAnimations();
```

### Check Animation State

```typescript
animationController.getState("home_hero_enter");
// Returns: { isPlaying: boolean, isPaused: boolean, progress: number }
```

### Get Animations by Page

```typescript
const homeAnimations = animationController.getByPage("home");
console.log(homeAnimations);
```

## Performance Tips

1. **Lazy load 3D scenes** - Only initialize when needed
2. **Use appropriate engines** - GSAP for timelines, Framer for components
3. **Compress animation assets** - Use optimized Lottie/model files
4. **Implement fallbacks** - Provide static alternatives for low-power devices
5. **Respect prefers-reduced-motion** - Skip animations if user prefers

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  // Play animation
}
```

## Examples

### Full Page Animation Timeline

```typescript
import { useEffect } from "react";
import { animationController } from "@/lib/animations/controller";

export function HomePage() {
  useEffect(() => {
    // Create a sequence of animations
    const animationSequence = async () => {
      // Wait for preloader
      await playAnimation("preloader_intro");
      // Then hero enters
      await playAnimation("hero_enter");
      // Then cards stagger
      await playAnimation("home_cards_stagger");
    };

    animationSequence();
  }, []);

  return /* ... */;
}

async function playAnimation(id: string): Promise<void> {
  const element = document.getElementById(id);
  if (element) {
    animationController.play(id, element);
    // Wait for completion
    return new Promise((resolve) => {
      const unsubscribe = animationController.on(
        "animation:stop",
        (payload) => {
          if (payload.id === id) {
            unsubscribe();
            resolve();
          }
        },
      );
    });
  }
}
```

## Adding New Animations

### Step 1: Define in Registry

Add to `client/lib/animations/registry.ts`:

```typescript
{
  id: "my_animation_id",
  page: "my_page",
  component: "my_component",
  action: "my_action",
  engine: "framer",
  trigger: "click",
  duration: 400,
  description: "What this animation does",
}
```

### Step 2: Implement Animation Logic

In your component or animation handler:

```typescript
// Using hooks
const { ref, play } = useAnimation("my_animation_id");

// Or manual control
animationController.play("my_animation_id", element);
```

### Step 3: Test

```typescript
// In browser console
animationController.play("my_animation_id", document.querySelector("#element"));
```

## Resources

- [Animation Registry](./registry.ts) - All animation definitions
- [Controller API](./controller.ts) - Core animation system
- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://greensock.com/docs/)
- [Lottie Docs](https://lottiefiles.com/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
