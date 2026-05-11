# 💎 AuviaMart | Project Context

## 🚀 Project Overview
AuviaMart is a premium, full-stack e-commerce platform designed with a "Phone-First" strategy. It features a sophisticated deep teal and gold aesthetic, fluid animations, and a curated shopping experience.

- **Primary Mission:** High-end e-commerce for organic and premium products.
- **Core Aesthetic:** "Pure. Curated. Delivered." using Brand Teal (`#1a5f7a`) and Accent Gold (`#e8a44a`).
- **Target Platform:** Web (Optimized for Mobile/Touch).

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Database/Auth:** Firebase (Firestore & Firebase Admin SDK)
- **State Management:** Zustand (Cart, Wishlist)
- **Animations:** Framer Motion, GSAP
- **Theming:** `next-themes` (Dark/Light mode)
- **Icons:** Lucide React
- **Typography:**
  - `Playfair Display`: Headings & Brand accents
  - `Inter`: UI text & Body copy

## 🏗️ Architecture & Conventions

### Directory Structure
- `src/app`: Routes and Layouts (App Router).
- `src/components`: UI components organized by category (home, layout, products, shared).
- `src/lib`: Core logic, Firebase configs, and actions.
- `src/store`: Zustand stores for global state.
- `public/products`: High-resolution product imagery.

### Authentication & Authorization
- **Middleware:** Auth state is managed via secure session cookies.
- **Admin Access:** Controlled in `src/middleware.ts`. Access to `/dashboard` is restricted to `sololvlar@gmail.com`.
- **Server-Side:** Firebase Admin SDK is used for sensitive operations and server-side verification.

### Styling & UI
- **Responsive:** Always prioritize mobile layouts ("Phone-First").
- **Animations:** Use `Framer Motion` for layout transitions and micro-interactions.
- **Theming:** Use `next-themes`. Ensure accessibility in both Light and Dark modes.
- **Path Aliases:** Use `@/` to reference the `src` directory.

### Performance
- Use Next.js `<Image>` component for all images.
- Optimize animations to ensure 60fps on mobile devices.

## 📜 Key Commands
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

## 📋 Development Workflow
1. **Research:** Check `PLAN.md` for the current implementation phase.
2. **Implementation:** Follow the established design document in `PLAN.md`.
3. **Consistency:** Match the premium aesthetic (Teal/Gold) in all new components.
4. **Validation:** Ensure all new pages are responsive and have appropriate metadata.
