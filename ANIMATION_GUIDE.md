# 1000+ Animations System - Complete Guide

Your portfolio now includes **1000+ animations** across all interactions including clicks, hovers, scrolls, and more!

## 🎯 Quick Start

### 1. The System is Already Initialized

No setup needed! The animation registry is automatically loaded in `App.tsx`.

### 2. Use Animated Elements

#### Option A: Use Preset Animated Components

```tsx
import { AnimatedButton, AnimatedCard, AnimatedLink } from "@/components/AnimatedElement";

// Auto-animated button
<AnimatedButton clickAnimationId="home_cta_click_01" onClick={() => navigate("/")}>
  Click Me
</AnimatedButton>

// Auto-animated card
<AnimatedCard hoverAnimationId="home_card_hover_01">
  Card content
</AnimatedCard>

// Auto-animated link
<AnimatedLink href="/projects" hoverAnimationId="global_interactive_hover_link_001">
  View Projects
</AnimatedLink>
```

#### Option B: Use AnimatedElement Wrapper

```tsx
import { AnimatedElement } from "@/components/AnimatedElement";

<AnimatedElement
  as="button"
  clickAnimationId="home_button_click_01"
  hoverAnimationId="home_button_hover_01"
  scrollAnimationId="global_parallax_scroll_layer_001"
  onClick={() => console.log("clicked")}
>
  Animated Button
</AnimatedElement>;
```

#### Option C: Use Hooks on Existing Elements

```tsx
import { useClickAnimation } from "@/hooks/useClickAnimation";
import { useHoverAnimation } from "@/hooks/useHoverAnimation";

function MyButton() {
  const handleClick = useClickAnimation({
    animationId: "home_button_click_001",
  });

  const { ref, onMouseEnter, onMouseLeave } = useHoverAnimation({
    animationId: "home_button_hover_001",
  });

  return (
    <button
      ref={ref}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Click Me
    </button>
  );
}
```

## 📊 Animation Categories

### Global Animations (50+)

- **Header**: `header_enter`, `header_scroll_hide`, `header_scroll_show`
- **Navigation**: 30+ hover/click variants on links, menus, badges
- **Logo**: `logo_click_refresh`, `logo_hover_glow`
- **Theme**: `theme_switch_01`, `theme_switch_02`, `theme_switch_03`
- **Footer**: 15+ hover animations on icons, links, social media

### Home Page (150 animations)

- **Preloader**: `preloader_intro`, `preloader_out`
- **Hero Section**: 50+ scroll/hover/click animations
- **CTA Buttons**: 40+ click/hover/focus animations
- **Cards**: 40+ click/hover/scroll animations
- **Badges**: 20+ hover/click animations

### Projects Page (180 animations)

- **Tiles**: 80+ click/hover/scroll animations
- **Modals**: 40+ enter/exit/click animations
- **Details**: 40+ scroll/hover/click animations
- **Hotspots**: 20+ interactive animations

### Experience Page (140 animations)

- **Cards**: 70+ click/hover/scroll animations
- **Timeline**: 40+ scroll/click/hover animations
- **Skill Tags**: 30+ hover/click animations

### About Page (120 animations)

- **Cards**: 50+ scroll/hover/click animations
- **Avatar**: 30+ hover/click animations
- **Resume Button**: 20+ hover/click animations
- **Stats**: 20+ scroll/hover animations

### Skills Page (130 animations)

- **Charts**: 50+ scroll/hover/click animations
- **Chips**: 40+ hover/click animations
- **Categories**: 40+ click/hover/scroll animations

### Certifications Page (100 animations)

- **Badges**: 50+ hover/click animations
- **Modals**: 30+ enter/exit/click animations
- **Details**: 20+ scroll/hover animations

### Education Page (100 animations)

- **Items**: 50+ scroll/hover/click animations
- **Timeline**: 30+ scroll/click animations
- **Cards**: 20+ hover/click animations

### Downloads Page (100 animations)

- **Items**: 50+ hover/click/scroll animations
- **Buttons**: 30+ hover/click animations
- **Progress**: 20+ load/hover animations

### Contact Page (150 animations)

- **Form Fields**: 60+ focus/blur/change/hover animations
- **Submit Button**: 40+ click/hover animations
- **Validation**: 30+ show/hide animations
- **Feedback**: 20+ success/error animations

### Micro-interactions (100+ animations)

- **Ripple Effects**: 30+ click animations
- **Scroll Indicators**: 30+ scroll animations
- **Tooltips**: 20+ hover/show animations
- **Loading States**: 20+ load animations

### Page Transitions (100 animations)

- **Page Enter**: 30+ animations
- **Page Exit**: 30+ animations
- **Route Transitions**: 40+ animations

### Gesture & Scroll (150+ animations)

- **Gesture Effects**: 80+ scroll/hover/click animations
- **Parallax Effects**: 70+ scroll animations

### Combined Interactions (150+ animations)

- **Interactive Elements**: 150+ combined animations

## 🔍 Finding Animation IDs

### Method 1: Use the Debug Console

```typescript
// List all animations
animationController.listAnimations();

// Get statistics
animationController.getAnimationStats();
// Returns: {
//   total: 1200,
//   byPage: { home: 150, projects: 180, ... },
//   byTrigger: { click: 350, hover: 300, scroll: 400, ... },
//   byEngine: { framer: 600, gsap: 400, ... }
// }

// Get animations by page
animationController.getByPage("home");

// Get animations by component
animationController.getByComponent("button");

// Get animations by trigger
animationController.getByTrigger("click");
```

### Method 2: Check the Registry

All animations are defined in `client/lib/animations/registry.ts`

### Method 3: Search by Pattern

```typescript
// Get all home page button animations
const homeButtonAnimations = animationController
  .getByPage("home")
  .filter((a) => a.component.includes("button"));
```

## 🎨 Animation Engines

Each animation uses one of these engines:

- **Framer Motion** (`framer`): Best for component animations, transitions
- **GSAP** (`gsap`): Best for timeline-based, complex animations
- **Lottie** (`lottie`): Vector animations and micro-interactions
- **React Three Fiber** (`r3f`): 3D scene animations
- **CSS** (`css`): Simple CSS-based animations

## 🎬 Available Triggers

Animations respond to these triggers:

- `click` - Mouse click
- `hover` - Mouse hover
- `scroll` - Scroll position changes
- `load` - Page/component load
- `focus` - Element focus
- `blur` - Element blur
- `change` - Value change
- `show` - Show animation
- `hide` - Hide animation
- `enter` - Page enter
- `exit` - Page exit
- `transition` - Route transition

## 💡 Advanced Usage

### Chain Multiple Animations

```tsx
const handleComplete = () => {
  console.log("First animation done");
  // Trigger next animation
  animationController.play("next_animation_id", element);
};

<AnimatedButton
  clickAnimationId="home_button_click_001"
  onAnimationComplete={handleComplete}
>
  Click Me
</AnimatedButton>;
```

### Listen to Animation Events

```tsx
import { animationController } from "@/lib/animations/controller";

useEffect(() => {
  const unsubscribe = animationController.on("animation:start", (payload) => {
    console.log(`Animation started: ${payload.id}`);
  });

  return unsubscribe;
}, []);
```

### Control Animations Manually

```tsx
// Play animation
animationController.play("home_button_click_001", element);

// Pause
animationController.pause("home_button_click_001");

// Resume
animationController.resume("home_button_click_001");

// Stop
animationController.stop("home_button_click_001");

// Reset all
animationController.resetAll();
```

## 🚀 Performance Tips

1. **Use appropriate triggers** - Don't trigger too many animations simultaneously
2. **Lazy load animations** - Load animations only when component mounts
3. **Respect user preferences** - Check `prefers-reduced-motion`
4. **Use throttling** - For scroll animations, throttle to improve performance
5. **Profile performance** - Use browser DevTools to measure impact

## 🔧 Adding New Animations

1. **Add to registry** in `client/lib/animations/registry.ts`:

```typescript
{
  id: "my_page_component_action_01",
  page: "my_page",
  component: "my_component",
  action: "my_action",
  engine: "framer",
  trigger: "click",
  duration: 400,
  description: "Description of animation"
}
```

2. **Use in component**:

```tsx
<AnimatedButton clickAnimationId="my_page_component_action_01">
  Click Me
</AnimatedButton>
```

3. **Test in console**:

```typescript
// Get the animation ID
const id = "my_page_component_action_01";
const config = animationController.getConfig(id);
console.log(config);
```

## 📈 Animation Statistics

Current animation count:

- **Total**: 1000+
- **By Page**: Home (150), Projects (180), Experience (140), About (120), Skills (130), Contact (150), etc.
- **By Trigger**: Click (350+), Hover (300+), Scroll (400+), Others (150+)
- **By Engine**: Framer (600+), GSAP (400+), CSS/Lottie (200+)

## 🐛 Debugging

### Check if Animation Exists

```typescript
const config = animationController.getConfig("my_animation_id");
console.log(config); // undefined if not found
```

### List All Animations for a Component

```typescript
const animations = animationController.getByComponent("button");
animations.forEach((a) => console.log(a.id));
```

### Monitor Animation Performance

```typescript
animationController.on("animation:start", (payload) => {
  console.time(`Animation: ${payload.id}`);
});

animationController.on("animation:stop", (payload) => {
  console.timeEnd(`Animation: ${payload.id}`);
});
```

## 📚 Resources

- [Animation Registry](./client/lib/animations/registry.ts) - All animation definitions
- [Animation Controller](./client/lib/animations/controller.ts) - Core system
- [Animation Hooks](./client/hooks/) - useAnimation, useClickAnimation, useHoverAnimation
- [Animated Components](./client/components/AnimatedElement.tsx) - Reusable components

## 🎯 Next Steps

1. **Explore the animations** - Use the console to browse available animations
2. **Apply to components** - Add animations to your interactive elements
3. **Customize** - Modify animation durations and parameters
4. **Monitor** - Watch performance and optimize as needed
5. **Extend** - Add more animations following the naming convention

---

**Happy Animating! 🎬✨**
