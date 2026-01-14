# Portfolio QA Checklist

## Cursor & Pointer Behavior

- [ ] **Desktop Cursor**: Custom circular cursor displays on desktop (non-mobile)
- [ ] **Mobile Cursor**: Native cursor displays on mobile/touch devices
- [ ] **Interactive Hover**: Cursor enlarges when hovering over:
  - [ ] Buttons (all buttons throughout site)
  - [ ] Links (all navigation links)
  - [ ] Interactive cards
  - [ ] Form inputs
- [ ] **Click Ripple**: Ripple effect appears on click
- [ ] **Ripple Duration**: Ripple animates for ~600ms
- [ ] **Performance**: Custom cursor doesn't cause jank/lag

## Animation Interactions

### Home Page (20+ animations)

- [ ] Hero fade-in on load
- [ ] Name slides in from left
- [ ] Tagline slides in from right
- [ ] CTA buttons hover with glow effect
- [ ] CTA buttons scale on click
- [ ] Stats count animate on scroll into view
- [ ] Highlight cards stagger-enter
- [ ] Highlight cards lift on hover
- [ ] Highlight cards modal opens on click
- [ ] Bottom CTA section fades in on scroll

### About Page (15+ animations)

- [ ] Timeline events slide-fade in sequence
- [ ] Timeline connector lines draw
- [ ] Mission/Approach sections slide from sides
- [ ] Skill competencies animate in with checkmarks

### Experience Page (15+ animations)

- [ ] Experience cards stagger-enter
- [ ] Cards expand on hover
- [ ] Tags pop on hover
- [ ] Filter chips toggle with animation
- [ ] Modal opens/closes with zoom-fade

### Projects Page (30+ animations)

- [ ] Project tiles stagger-enter
- [ ] Tiles lift on hover
- [ ] 3D scene camera orbits
- [ ] Hotspots ripple on load
- [ ] Hotspot interactions show modals
- [ ] Evidence modals fade-zoom open/close
- [ ] Scene fades out when modal closes

### Skills Page (20+ animations)

- [ ] Radar chart sweeps on load
- [ ] Skill bars fill on scroll
- [ ] Skill chips pop on click
- [ ] Section headline fades in

### Certifications Page (10+ animations)

- [ ] Badge grid stagger-enters
- [ ] Badges flip on click
- [ ] Verify link underlines expand

### Education Page (10+ animations)

- [ ] Degree card slides in
- [ ] Coursework expands smoothly
- [ ] Academic projects stagger-enter

### Contact Page (10+ animations)

- [ ] Form fields glow on focus
- [ ] Submit button scales on hover
- [ ] Form validation shakes on error
- [ ] Success confetti animates
- [ ] Success modal shows and auto-closes after 6s

### Header/Footer (10+ animations)

- [ ] Logo scales on hover
- [ ] Nav link underlines expand
- [ ] Header shadow appears on scroll
- [ ] Footer fades in from bottom
- [ ] Social icons pulse on hover

## Scroll Behavior & Background

- [ ] **Background Color**: Background color shifts subtly as page scrolls
- [ ] **Fog Density**: Fog density increases with scroll depth
- [ ] **Particle Speed**: Particles move faster at bottom of page
- [ ] **Smooth Scroll**: Page scrolls smoothly (scroll-behavior: smooth)
- [ ] **Scroll Triggers**: Animations trigger when elements enter viewport
- [ ] **Scroll Margin**: 100px margin before viewport triggers animations

## Project Hotspot Interactions

- [ ] **Scene Loads**: 3D scene renders with camera orbiting
- [ ] **Hotspots Visible**: 3+ hotspots per project visible
- [ ] **Hotspot Ripple**: Ripple animation plays on hotspot load
- [ ] **Hotspot Click**: Clicking hotspot opens evidence modal
- [ ] **Modal Overlay**: Modal appears with semi-transparent backdrop
- [ ] **Modal Close**: Modal closes smoothly on background click
- [ ] **Scene Fade**: Scene fades when modal opens

## Animation Manifest

- [ ] **114+ Animations**: Verify animation_manifest.csv has 114+ entries
- [ ] **Home Animations**: 20+ animations (hero, stats, cards, buttons)
- [ ] **Projects Animations**: 30+ animations (tiles, hotspots, modals)
- [ ] **Skills Animations**: 20+ animations (radar, bars, chips)
- [ ] **About/Exp Animations**: 15+ animations (timeline, cards)
- [ ] **Header/Footer/Contact**: 10+ animations (nav, social, form)
- [ ] **Animation IDs**: All animations have unique IDs
- [ ] **Manifest Complete**: All columns filled (ID, Page, Component, Trigger, Engine, Type, Duration, Description)

## Reduced Motion Support

- [ ] **Prefers-Reduced-Motion**: Respected when enabled in OS settings
- [ ] **Animation Duration**: Animations run at 0.01ms when reduced-motion enabled
- [ ] **Transitions Duration**: Transitions run at 0.01ms when reduced-motion enabled
- [ ] **Scroll Behavior**: Auto when reduced-motion enabled
- [ ] **Test**: Use DevTools to toggle `prefers-reduced-motion: reduce`
- [ ] **Verification**: All animations should be near-instant with reduced-motion

## Mobile Responsiveness

- [ ] **Viewport**: All pages responsive at 320px (mobile)
- [ ] **Viewport**: All pages responsive at 768px (tablet)
- [ ] **Viewport**: All pages responsive at 1024px (desktop)
- [ ] **Mobile Menu**: Header menu works on mobile
- [ ] **Touch Events**: Interactive elements work with touch
- [ ] **No Horizontal Scroll**: No horizontal scroll on any viewport
- [ ] **Text Readability**: Text is readable on mobile (16px+ minimum)
- [ ] **Image Scaling**: Images scale properly on all viewports
- [ ] **Mobile Fallback**: Custom cursor disabled on mobile

## Accessibility

- [ ] **Keyboard Navigation**: Can navigate entire site with Tab key
- [ ] **Focus Visible**: Focus states visible (outline on focused elements)
- [ ] **Focus Colors**: Focus colors meet WCAG AA contrast (at least 3:1)
- [ ] **ARIA Labels**: Buttons and interactive elements have proper labels
- [ ] **Skip Link**: Skip-to-main-content link present (if needed)
- [ ] **Link Underlines**: Links are visually distinguishable
- [ ] **Form Labels**: Form inputs have associated labels
- [ ] **Error Messages**: Error messages are clear and descriptive
- [ ] **Semantic HTML**: Page uses semantic HTML (h1, nav, main, footer, etc.)

## Color & Contrast

- [ ] **Primary Color**: #2F80ED (muted professional blue)
- [ ] **Background**: #E9EDF1 (dim neutral light)
- [ ] **Text Primary**: #1A222C (charcoal)
- [ ] **Text Secondary**: #6C757D (slate)
- [ ] **Header**: #F4F6F8 (light neutral)
- [ ] **Divider**: #D2D8DE (subtle gray)
- [ ] **Contrast Ratio**: All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- [ ] **No Neon**: No pure bright neon colors
- [ ] **No Pure Black**: Background is not pure black
- [ ] **Theme Consistency**: Colors consistent across all pages

## Performance (Lighthouse)

- [ ] **Lighthouse Score**: Desktop ≥ 85
- [ ] **Mobile Score**: Mobile ≥ 75
- [ ] **First Contentful Paint**: < 2.5s
- [ ] **Largest Contentful Paint**: < 4s
- [ ] **Cumulative Layout Shift**: < 0.1
- [ ] **Time to Interactive**: < 5s
- [ ] **Unused CSS**: Minimal unused CSS
- [ ] **Unused JavaScript**: Minimal unused JS
- [ ] **Image Optimization**: Images properly optimized
- [ ] **Font Loading**: Fonts load efficiently

## Form Testing

- [ ] **Contact Form**: All fields render correctly
- [ ] **Name Field**: Validates non-empty
- [ ] **Email Field**: Validates email format
- [ ] **Subject Field**: Validates non-empty
- [ ] **Message Field**: Accepts multiline input
- [ ] **Submit Button**: Disables while submitting
- [ ] **Loading State**: Shows loading spinner on submit
- [ ] **Success State**: Shows success message after 6s
- [ ] **Error State**: Shows error with shake animation
- [ ] **Form Reset**: Form clears after successful submission
- [ ] **Focus Management**: Focus moves after modal closes

## Page Coverage

- [ ] **Home Page**: Fully styled and animated
- [ ] **About Page**: Fully styled and animated
- [ ] **Experience Page**: Fully styled and animated
- [ ] **Projects Page**: Fully styled with 3D scenes
- [ ] **Skills Page**: Fully styled with charts
- [ ] **Certifications Page**: Fully styled with badge flips
- [ ] **Education Page**: Fully styled with timeline
- [ ] **Contact Page**: Fully styled with form
- [ ] **Downloads Page**: Resources section complete
- [ ] **404 Page**: 404 page styled and functional

## Cross-Browser Testing

- [ ] **Chrome**: All animations smooth
- [ ] **Firefox**: All animations smooth
- [ ] **Safari**: All animations smooth
- [ ] **Edge**: All animations smooth
- [ ] **Mobile Safari (iOS)**: Works on iPhone
- [ ] **Chrome Mobile**: Works on Android
- [ ] **Custom Cursor**: Works in all browsers

## Meta & SEO

- [ ] **Page Title**: `Dharam Kathiriya - Cyber Crime Investigator & OSINT Specialist`
- [ ] **Meta Description**: Professional cybersecurity portfolio
- [ ] **Favicon**: Favicon displays in browser tab
- [ ] **OG Image**: OG meta tags for social sharing
- [ ] **OG Title**: Social share shows proper title
- [ ] **OG Description**: Social share shows proper description
- [ ] **Robots Meta**: Allows indexing

## Deployment

- [ ] **Vercel Deployment**: Site deployed to Vercel
- [ ] **Custom Domain**: Custom domain pointing to Vercel
- [ ] **HTTPS**: Site uses HTTPS
- [ ] **Build Success**: Vercel build succeeds without errors
- [ ] **Environment Variables**: All env vars properly configured
- [ ] **Analytics**: (Optional) Analytics tracking implemented

## Edge Cases

- [ ] **Rapid Clicks**: Clicking buttons rapidly doesn't break animations
- [ ] **Page Resize**: Resizing window doesn't break layout
- [ ] **Scroll to Top**: Scrolling to top of page works smoothly
- [ ] **Network Slow**: Page works on slow 3G connection
- [ ] **Offline**: Site structure visible offline (with service worker if implemented)
- [ ] **Long Content**: Pages with long content scroll smoothly
- [ ] **Empty States**: Empty modals/sections handled gracefully

## Documentation

- [ ] **README.md**: Installation & build instructions provided
- [ ] **animation_manifest.csv**: All 114+ animations documented
- [ ] **ANIMATION_GUIDE.md**: Animation system documented
- [ ] **QA_CHECKLIST.md**: This checklist is complete

## Sign-Off

- [ ] All checklist items verified
- [ ] No critical issues remaining
- [ ] All animations are smooth and performant
- [ ] Mobile experience is excellent
- [ ] Accessibility meets WCAG AA standards
- [ ] Ready for production deployment

**Date Completed:** ****\_\_****
**QA Lead:** ****\_\_****
**Notes:** ****\_\_****
