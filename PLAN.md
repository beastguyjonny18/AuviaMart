# AuviaMart Design Document & Implementation Plan

## 1. Project Overview
AuviaMart is a high-end, full-stack e-commerce platform designed with a "Phone-First" responsive strategy and a premium aesthetic. It features a deep teal and gold palette, sophisticated typography, and fluid animations.

## 2. Technical Specification
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom brand configuration)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Authentication:** NextAuth.js (Email/Password + Google)
- **State Management:** Zustand (Cart, Wishlist, Auth)
- **Theming:** `next-themes` (Dark/Light mode with persistence)
- **Typography:**
  - `Playfair Display`: Headings & Brand accents
  - `Inter`: UI text & Body copy

## 3. Visual Identity
### Color Palette
- **Brand Teal:** `#1a5f7a` (Primary)
- **Brand Navy:** `#0d3b55` (Secondary)
- **Accent Gold:** `#e8a44a` (Highlights)
- **Surface Light:** `#f7f5f0` (Cream background)
- **Surface Dark:** `#0f1a20` (Dark mode background)

### Asset Strategy
- **Logo:** Custom SVG monogram (Double-arch "M").
- **Placeholders:** I will use high-resolution, curated images from Unsplash (via `images.unsplash.com`) to match the "Pure. Curated. Delivered." tagline.
- **Micro-interactions:** Staggered entrance animations, button morphs, and layout-aware transitions using Framer Motion's `layoutId`.

## 4. Implementation Roadmap

### Phase 1: Infrastructure & Theming
- [ ] Initialize Next.js project with Tailwind and TypeScript.
- [ ] Configure `tailwind.config.ts` with brand colors and fonts.
- [ ] Implement `ThemeProvider` and basic Layout (Desktop & Mobile).
- [ ] Setup Lucide icons and base UI components (Button, Input, Card).

### Phase 2: Navigation & Global UI
- [ ] Desktop Navbar with sticky behavior and logo-shrink animation.
- [ ] Mobile Bottom Tab Bar with glassmorphism and active indicator.
- [ ] Announcement Ticker and floating WhatsApp pulse button.

### Phase 3: Authentication Flow
- [ ] Sign In / Sign Up split-screen layouts.
- [ ] Form validation and password strength meter.
- [ ] NextAuth.js integration (mocked for prototype).

### Phase 4: Homepage & Product Catalog
- [ ] Hero Carousel with Framer Motion transitions.
- [ ] Homepage sections: "Standards", "Exclusives", "Blog".
- [ ] Product Listing Page with Filter Sidebar and Sort.
- [ ] Product Detail Page with image gallery and tabbed info.

### Phase 5: Commerce & Admin
- [ ] Zustand Cart/Wishlist implementation.
- [ ] Slide-out Cart Drawer and Checkout page.
- [ ] Admin Dashboard: KPI Cards, Charts (Recharts), and Kanban Order board.

## 5. Visual Consistency & Quality
- **Dark Mode:** Rigorous inversion testing to ensure Brand Teal remains accessible.
- **Performance:** Next.js `<Image>` optimization and route-level code splitting.
- **Accessibility:** ARIA labels, focus rings, and reduced-motion support.

---

### User Approval Required
Do you approve this design and roadmap? Once approved, I will begin Phase 1.
