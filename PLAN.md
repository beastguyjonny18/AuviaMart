# AuviaMart Design Document & Implementation Plan

## 1. Project Overview
AuviaMart is a high-end, full-stack e-commerce platform designed with a "Phone-First" responsive strategy and a premium aesthetic. It features a deep teal and gold palette, sophisticated typography, and fluid animations.

## 2. Technical Specification
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Authentication:** Firebase Admin SDK (Server Actions + Secure Cookies)
- **Database:** Firestore (nam5)
- **State Management:** Zustand (Cart, Wishlist)
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
- [x] Initialize Next.js project with Tailwind and TypeScript.
- [x] Configure brand colors and fonts.
- [x] Implement ThemeProvider and basic Layout (Desktop & Mobile).

### Phase 2: Navigation & Global UI
- [x] Desktop Navbar with sticky behavior and logo-shrink animation.
- [x] Mobile Bottom Tab Bar with glassmorphism.
- [x] Announcement Ticker and floating WhatsApp pulse button.

### Phase 3: Authentication Flow (Secure Server-Side)
- [x] Sign In / Sign Up split-screen layouts.
- [x] Form validation and password strength meter.
- [x] Firebase Admin integration with Server Actions & Middleware.

### Phase 4: Homepage & Product Catalog
- [x] Hero Carousel with Framer Motion transitions.
- [x] Homepage sections: "Standards", "Exclusives".
- [ ] Connect Product Listing Page to Firestore.
- [ ] Product Detail Page dynamic routing.

### Phase 5: Commerce & Admin
- [x] Zustand Cart/Wishlist implementation.
- [ ] Admin Dashboard: Connect KPI Cards and Charts to Firestore.
- [ ] Implement CRUD for Products in Admin Dashboard.

## 5. Visual Consistency & Quality
- **Dark Mode:** Rigorous inversion testing to ensure Brand Teal remains accessible.
- **Performance:** Next.js `<Image>` optimization and route-level code splitting.
- **Accessibility:** ARIA labels, focus rings, and reduced-motion support.

---

### User Approval Required
Do you approve this design and roadmap? Once approved, I will begin Phase 1.
