<HEAD
# Portfolio
=======
# Dharam Kathiriya - Cyber Crime Investigator & OSINT Specialist Portfolio

A professional, responsive cybersecurity portfolio website built with React, Vite, Tailwind CSS, Framer Motion, and Three.js. Features 100+ unique animations, custom cursor behavior, smooth scroll transitions, and a clean dim-neutral professional design.

## 🎨 Design System

**Theme**: Dim-Neutral Professional Cybersecurity

- **Header**: #F4F6F8 (light neutral)
- **Background**: #E9EDF1 (dim neutral)
- **Primary Accent**: #2F80ED (muted professional blue)
- **Secondary Accent**: #7E8A97 (slate gray)
- **Text Primary**: #1A222C (charcoal)
- **Text Secondary**: #6C757D (slate)
- **Divider**: #D2D8DE (subtle border)

**No neon colors, no pure black background, purely professional and accessible.**

## 📋 Features

✅ **100+ Animations**

- 20+ Home page animations (hero, stats, cards, CTAs)
- 30+ Projects page animations (tiles, 3D hotspots, modals)
- 20+ Skills page animations (radar, bars, chips)
- 15+ About/Experience animations (timeline, cards)
- 10+ Header/Footer/Contact animations (nav, social, form)

✅ **Custom Cursor**

- Desktop: Custom circular cursor
- Enlarges on interactive elements
- Ripple effect on click
- Mobile: Native cursor (auto-disabled on touch devices)

✅ **Scroll Animations**

- Background color transitions on scroll
- Fog density changes
- Particle speed variations
- Scroll-triggered element reveals

✅ **Accessibility**

- WCAG 2.1 AA compliance
- `prefers-reduced-motion` support
- Keyboard navigation
- Focus indicators
- Semantic HTML
- ARIA labels

✅ **Performance**

- Lighthouse score: Desktop ≥85, Mobile ≥75
- GPU-optimized animations
- Frameloop="demand" for R3F
- Lazy loading for 3D scenes
- Mobile fallback (Lottie/SVG)

✅ **Pages**

- Home (hero, highlights, stats, CTA)
- About (bio, mission, timeline, skills)
- Experience (role cards, responsibilities, skills)
- Projects (case studies, 3D hotspot scenes)
- Skills (investigation & technical skills)
- Certifications (badge grid, flip animation)
- Education (degree card, coursework)
- Contact (form, contact methods, validation)
- Downloads (resources, why work with me)
- 404 (error page)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone repository
git clone <repo-url>
cd portfolio

# Install dependencies
npm install
# or
pnpm install

# Create .env file (if needed for external APIs)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test

# Lint code
npm run lint
```

## 📁 Project Structure

```
portfolio/
├── client/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── CustomCursor.tsx
│   │   └── Preloader.tsx
│   ├── pages/
│   │   ├── Index.tsx         # Home page
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Certifications.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   ├── Downloads.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   │   ├── useAnimation.ts
│   │   ├── useClickAnimation.ts
│   │   ├── useHoverAnimation.ts
│   │   └── useAnimationRegistry.ts
│   ├── lib/
│   │   ├── animations/
│   │   │   ├── controller.ts
│   │   │   ├── registry.ts
│   │   │   └── README.md
│   │   └── utils.ts
│   ├── global.css
│   ├── main.tsx
│   ├── App.tsx
│   └── vite-env.d.ts
├── public/                   # Static assets
├── animation_manifest.csv    # 114+ animation IDs
├── QA_CHECKLIST.md          # QA testing checklist
├── README.md                # This file
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🎬 Animation System

All animations are managed through a central animation registry system with support for:

- **Framer Motion**: Scroll triggers, page transitions, micro-interactions
- **GSAP**: Timeline animations, particle effects, number counters
- **CSS**: Smooth transitions, keyframe animations
- **Lottie**: Vector animations, success confetti

See `client/lib/animations/README.md` for detailed animation documentation.

## 🎯 Key Technologies

- **React 18**: UI framework
- **Vite**: Build tool (5x faster than webpack)
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **React Router**: Page navigation
- **Lucide React**: Icon library
- **shadcn/ui**: Component library
- **GSAP**: Advanced animations
- **Three.js + React-Three-Fiber**: 3D scenes (planned)

## 📊 Animation Manifest

The `animation_manifest.csv` file contains 114+ animations with metadata:

- Animation ID
- Page & Component
- Trigger (Load, Hover, Click, Scroll)
- Animation Engine
- Duration
- Description

**Usage**: Reference this file for animation auditing, testing, and documentation.

## 🧪 QA Testing

See `QA_CHECKLIST.md` for comprehensive testing requirements covering:

- ✅ Cursor behavior
- ✅ Click animations
- ✅ Scroll transitions
- ✅ Project hotspot interactions
- ✅ Animation coverage (100+)
- ✅ Reduced motion support
- ✅ Mobile responsiveness
- ✅ Lighthouse performance (≥85 desktop)
- ✅ Accessibility (WCAG AA)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables in Vercel dashboard if needed
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Manual Deployment

```bash
# Build static site
npm run build

# Output goes to dist/ directory
# Deploy dist/ folder to any static host
```

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android 90+

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation fully supported
- Screen reader friendly
- Color contrast ≥ 4.5:1 for normal text
- Focus indicators clearly visible
- Reduced motion respected

## 🎨 Customization

### Theme Colors

Edit `client/global.css` and `tailwind.config.ts`:

```css
:root {
  --primary: 217 85% 62%; /* #2F80ED */
  --background: 210 15% 93%; /* #E9EDF1 */
  --foreground: 210 24% 15%; /* #1A222C */
  /* ... other colors ... */
}
```

### Animations

Add animations to `client/lib/animations/registry.ts` and reference the ID in components using hooks:

```tsx
const { ref } = useHoverAnimation({ animationId: "my_hover_01" });
const click = useClickAnimation({ animationId: "my_click_01" });
```

## 📝 Content

Edit page content in respective page files:

- `client/pages/Index.tsx` - Home content
- `client/pages/About.tsx` - Bio, mission, timeline
- `client/pages/Experience.tsx` - Job roles
- `client/pages/Projects.tsx` - Case studies
- `client/pages/Skills.tsx` - Skills & competencies
- `client/pages/Contact.tsx` - Contact form
- `client/pages/Downloads.tsx` - Resources

## 🔧 Configuration

### Vite Config

- SPA mode (no server-side rendering)
- Optimized for production
- Fast HMR in development

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/`)
- ESNext target

### Tailwind

- JIT mode (generates only used styles)
- CSS variables for theming
- Dark mode support

## 📦 Dependencies

See `package.json` for complete list. Key dependencies:

- react: ^18.0
- react-router-dom: ^6.0
- framer-motion: ^10.0
- tailwindcss: ^3.0
- typescript: ^5.0
- vite: ^4.0

## 🐛 Troubleshooting

### Animations stuttering?

- Check GPU acceleration in DevTools
- Disable browser extensions
- Test in incognito mode

### Custom cursor not showing?

- Not on mobile (expected)
- Check browser console for errors
- Ensure `display: none` not applied to cursor

### Performance issues?

- Run `npm run build` and check bundle size
- Use Lighthouse to identify bottlenecks
- Disable unused animations in registry

## 📚 Documentation

- `PORTFOLIO_SETUP.md` - Initial setup notes
- `animation_manifest.csv` - All 114+ animations
- `QA_CHECKLIST.md` - Testing checklist
- `client/lib/animations/README.md` - Animation system docs

## 📄 License

This portfolio is personal property of Dharam Kathiriya. All rights reserved.

## 📧 Contact

- **Email**: dharamkathiriya265@gmail.com
- **Phone**: +91 98793-79605
- **LinkedIn**: [Dharam K](https://linkedin.com/in/dharam-k-726742372)

---

**Built with ❤️ by Dharam Kathiriya**
>>>>>>> b1e453d (Initial commit)
#   P o r t f o l i o 
 
 
