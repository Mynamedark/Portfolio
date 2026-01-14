# Dharam Kathiriya Portfolio - Development Guide

## Project Overview

A production-ready, professional portfolio website for Dharam Kathiriya, Cyber Crime Investigator & OSINT Specialist, built with React, TypeScript, Tailwind CSS, and an advanced Animation Controller system with 100+ animations.

## What's Been Built

### ✅ Core Infrastructure

1. **App Structure & Routing**
   - React Router 6 SPA with all required routes
   - Layout system with persistent Header and Footer
   - 10 main pages + catch-all 404 page

2. **Global Components**
   - **Header**: Sticky navigation with theme toggle, mobile menu, logo
   - **Footer**: Contact info, social links, copyright
   - **Layout**: Wrapper component for consistent page structure
   - **Preloader**: Loading screen with progress bar and skip option
   - **PagePlaceholder**: Reusable placeholder for unfinished pages

3. **Pages Created**
   - `Home` - Hero with CTA buttons and 3 highlight cards
   - `About` - Placeholder (ready for content)
   - `Experience` - Placeholder (ready for content)
   - `Projects` - Placeholder (ready for content)
   - `Skills` - Placeholder (ready for content)
   - `Certifications` - Placeholder (ready for content)
   - `Education` - Placeholder (ready for content)
   - `Contact` - Placeholder (ready for content)
   - `Downloads` - Placeholder (ready for content)
   - `NotFound` - 404 page with styling

4. **Design System**
   - Cyber-themed color palette (dark background, bright cyan/purple accents)
   - Professional typography and spacing
   - Dark mode support with localStorage persistence
   - Responsive design (mobile-first with desktop enhancements)

5. **Animation System**
   - **Animation Controller**: Central registry for 100+ animations
   - **Animation Registry**: Pre-defined 100+ animations across all pages
   - **React Hooks**: `useAnimation`, `useClickAnimation`, `useHoverAnimation`
   - **Event Bus**: Listen to animation events (start, stop, pause, reset)
   - **Engine Support**: GSAP, Framer Motion, Lottie, React-Three-Fiber, CSS

## File Structure

```
client/
├── pages/
│   ├── Index.tsx          # Home page with hero and animations
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Certifications.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Downloads.tsx
│   └── NotFound.tsx
├── components/
│   ├── Header.tsx         # Navigation + theme toggle
│   ├── Footer.tsx         # Contact info + social links
│   ├── Layout.tsx         # Page wrapper
│   ├── Preloader.tsx      # Loading screen
│   └── PagePlaceholder.tsx # Placeholder for unfinished pages
├── lib/
│   └── animations/
│       ├── controller.ts   # Animation controller service
│       ├── registry.ts     # 100+ animation definitions
│       └── README.md       # Animation system documentation
├── hooks/
│   ├── useAnimation.ts     # Base animation hook
│   ├── useClickAnimation.ts
│   ├── useHoverAnimation.ts
│   └── useAnimationRegistry.ts
├── App.tsx                # Main app with routing
├── main.tsx               # Entry point
└── global.css             # Tailwind + theme colors

tailwind.config.ts         # Tailwind configuration
client/global.css          # CSS variables and theme
```

## Key Features Implemented

### 1. Animation Controller System

```typescript
// Initialize in App component
useAnimationRegistry();

// Use in components
const { ref, play } = useAnimation("home_hero_enter");
const clickHandler = useClickAnimation({ animationId: "cta_click_01" });
const { ref, onMouseEnter, onMouseLeave } = useHoverAnimation({
  animationId: "card_hover_01",
});

// Global control
animationController.resetAll();
animationController.emit("animation:start", { id: "my_animation" });
```

### 2. 100+ Pre-Registered Animations

Covering:

- Global animations (header, footer, nav, theme toggle)
- Home page (hero, CTA, cards)
- About page (timeline, avatar)
- Experience page (cards, tags, modal)
- Projects page (tiles, 3D scenes, hotspots)
- Skills page (radar, charts, chips)
- Certifications page (badges)
- Contact page (form, submit, confetti)
- Plus 35+ additional placeholder animations

### 3. Responsive Design

- Mobile-first approach
- Sticky header with mobile menu
- Responsive footer
- Touch-friendly buttons
- Readable typography on all screen sizes

### 4. Theme System

- Light and dark modes
- Persistent theme selection
- Smooth theme transitions
- CSS variable-based color system

## Next Steps - What You Can Build

### Priority 1: Complete Home Page Animations

Add animations to existing Home page:

- Implement `hero_enter` stagger animation
- Add CTA button glow effects
- Implement card hover animations
- Add scroll-triggered animations for highlights section

### Priority 2: Build Out Additional Pages

1. **About Page**
   - Timeline with entry animations
   - Bio section with fade effects
   - Avatar with wave animation
   - Resume download button
   - Add `about_timeline_slide` animations

2. **Experience Page**
   - Experience cards with stagger animations
   - Filter functionality
   - Click to expand modals
   - Implement `exp_card_stagger` and `exp_card_expand` animations

3. **Projects Page**
   - Project grid with tile animations
   - Modal with project details
   - Implement `projects_tile_glance` and `projects_tile_transition`
   - Integrate React-Three-Fiber for 3D scenes (already installed)

### Priority 3: Implement 3D Scenes

Add 3D models and scenes using React-Three-Fiber:

```typescript
// Example 3D scene component
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function ProjectScene() {
  const gltf = useGLTF('/models/project-model.glb');
  return (
    <Canvas>
      <primitive object={gltf.scene} />
    </Canvas>
  );
}
```

### Priority 4: Add Micro-Interactions

Using Framer Motion (already installed):

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleClick}
>
  Hover me
</motion.button>
```

### Priority 5: Form Handling & Validation

For Contact page:

- React Hook Form (already installed) for form management
- Zod (already installed) for validation
- Form submission animations
- Success/error feedback animations

### Priority 6: Add Lottie Animations

For micro-animations and vector animations:

```bash
pnpm add lottie-react
```

Then use in components:

```typescript
import Lottie from 'lottie-react';
import animationData from './animation.json';

<Lottie animationData={animationData} />
```

### Priority 7: GSAP for Complex Timelines

If you need timeline-based animations:

```bash
pnpm add gsap
```

Then in animation callbacks:

```typescript
import gsap from "gsap";

gsap.to(element, { duration: 0.5, opacity: 1 });
```

## How to Use the Animation System

### Register a New Animation

1. Add to `client/lib/animations/registry.ts`:

```typescript
{
  id: "my_page_component_action_01",
  page: "my_page",
  component: "my_component",
  action: "my_action",
  engine: "framer",
  trigger: "click",
  duration: 500,
  description: "My animation",
}
```

2. Use in component:

```typescript
import { useAnimation } from "@/hooks/useAnimation";

export function MyComponent() {
  const { ref, play } = useAnimation("my_page_component_action_01");

  return <div ref={ref} onClick={play}>Click me</div>;
}
```

### Listen to Animation Events

```typescript
animationController.on("animation:start", (payload) => {
  console.log("Started:", payload.id);
});
```

## Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run type checking
pnpm typecheck

# Format code
pnpm format.fix

# Run tests
pnpm test
```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI + Lucide Icons
- **Animation**: Framer Motion + Animation Controller
- **3D**: React-Three-Fiber + Three.js
- **Forms**: React Hook Form + Zod
- **Routing**: React Router 6 (SPA)
- **Backend**: Express (optional, for API endpoints)

## Color Theme

```
Background: #0f172a (dark blue-black)
Foreground: #f8fafc (light text)
Primary: #00d4ff (cyan)
Secondary: #a855f7 (purple)
Card: #1e293b (dark slate)
Border: #334155 (slate)
```

## Deployment

When ready to deploy:

1. **Netlify** (recommended)
   - Connect your GitHub repo
   - Set build command: `pnpm build`
   - Set publish directory: `dist/spa`

2. **Vercel**
   - Similar setup to Netlify
   - Excellent performance optimization

3. **Self-hosted**
   - Run `pnpm build && pnpm start`
   - Serves on the configured port

## Performance Optimizations

- Lazy load page components with React.lazy()
- Implement image optimization for project thumbnails
- Compress 3D models with Draco encoding
- Use CSS animations for simple effects
- Implement prefers-reduced-motion support
- Cache animation assets

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Known Limitations

- 3D scenes require WebGL support
- Animations disabled for users with `prefers-reduced-motion`
- File uploads require backend implementation
- Contact form requires backend email service

## Testing

Add tests for:

- Animation trigger/stop/reset
- Navigation between pages
- Theme toggle persistence
- Preloader skip functionality
- Responsive layout on mobile devices

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/Index';

test('CTA button triggers animation', async () => {
  const { container } = render(<Home />);
  const button = screen.getByText('View Projects');

  await userEvent.click(button);

  // Assert animation was triggered
});
```

## Resources

- [Animation System Docs](./client/lib/animations/README.md)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React-Three-Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Radix UI](https://radix-ui.com/)

## Support

For questions about:

- **Animations**: See `client/lib/animations/README.md`
- **Styling**: Check `tailwind.config.ts` and `client/global.css`
- **Routing**: See `client/App.tsx`
- **Components**: Check component files in `client/components/`

## Notes

- All animations are optional - content is still accessible without JavaScript
- The animation registry can be extended infinitely
- Each page can have its own animation hooks
- The event bus allows global communication about animations
- Dark mode is the default, respecting system preferences

---

**Created**: January 2026
**Portfolio Owner**: Dharam Kathiriya
**Project Type**: Professional Cybersecurity Portfolio
