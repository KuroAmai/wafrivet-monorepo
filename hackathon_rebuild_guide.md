# 🐄 Herd Console: Hackathon Rebuild Blueprint

This document outlines the architecture, design system, and core logic required to rebuild the **Herd Console** (Wafrivet's livestock management layer) on a clean repository.

## 1. Core Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0
- **Routing**: `react-router-dom`
- **Icons**: `@phosphor-icons/react` (Essential for the operational look)
- **Notifications**: `sonner`
- **PWA**: `vite-plugin-pwa`
- **Components**: `@heroui/react` (Base components)

---

## 2. The "Chemist-Minimalist" Design System

The app follows a high-density, professional operational aesthetic.

### Color Palette
- **Primary (Action)**: `#2D4D31` (Deep Forest Green)
- **Background**: `#F9FAFB` (Soft Gray/White)
- **Surface**: `#FFFFFF` (Pure White)
- **Accents**: 
  - Emerald: `emerald-500` (Success/Optimal)
  - Red: `red-500` (Critical Alert)
  - Orange: `orange-500` (High Priority)

### UI Philosophy
- **Pill Shapes**: Use `rounded-[40px]` or `rounded-full` for cards and buttons.
- **Glassmorphism**: Use `bg-white/80 backdrop-blur-xl` for headers and nav bars.
- **Typography**: Heavy weights (`font-black`) for headers, wide tracking (`tracking-widest`) and all-caps for labels.
- **High Density**: Keep information compact but breathable using large padding (`p-6` or `p-8`) inside cards.

---

## 3. Architecture & Routing

### Required Routes
| Path | Component | Purpose |
| :--- | :--- | :--- |
| `/` | `Dashboard` | High-level operational overview & quick search. |
| `/animals` | `AnimalList` | Searchable registry of all livestock. |
| `/animal/:id` | `AnimalDetail` | Live vitals, health history, and medical records. |
| `/animal/:id/add-record` | `AddRecord` | Form to log vaccinations or treatments. |
| `/history` | `History` | Chronological log of all system interactions. |
| `/alerts` | `HealthAlerts` | Prioritized feed of critical health warnings. |
| `/farms` | `Farms` | Facility list and management access. |
| `/farms/:id/portal` | `FarmPortal` | Environmental telemetry for a specific facility. |

---

## 4. Key Feature Implementations

### A. The Dashboard Vitals
Implement a grid of stat cards. Use high-contrast "change" indicators (e.g., `+12` or `Critical`) to give immediate operational feedback.

### B. Animal Intelligence (Registry)
- **Search Logic**: Filter a JSON list of animals by name or WAF-ID.
- **Status Indicators**: Pulse animation for `Warning` or `Critical` statuses to draw the eye.

### C. PWA Installation Logic
To make the app feel native during a demo:
1. **iOS Detection**: Check `navigator.userAgent` for iPhone/iPad.
2. **Custom Banner**: Show instructions to "Tap Share > Add to Home Screen" for iOS.
3. **Automated Prompt**: Use the `beforeinstallprompt` event for Android/Chrome.

---

## 5. Development Setup Snippet

### `vite.config.ts` (PWA Configuration)
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Herd Console',
        short_name: 'Herd',
        theme_color: '#2D4D31',
        icons: [
          { src: '/logo.svg', sizes: '192x192', type: 'image/svg+xml' }
        ]
      },
      devOptions: { enabled: true }
    })
  ]
});
```

### Layout Wrapper (`App.tsx`)
Ensure your `main` content area has `pb-32` to avoid being covered by the `BottomNav`. Always use a centered `max-w-xl` container to simulate a mobile app experience on desktop.

---

## 6. Winning Hackathon Tips
1. **Mock Telemetry**: Use `setInterval` to fluctuate vitals like "Temperature" or "Heart Rate" on the Animal Profile page to make the demo feel alive.
2. **Success Toasts**: Always use `toast.success()` after a form submission (like Adding a Record) to provide satisfying feedback.
3. **Smooth Transitions**: Use Tailwind's `animate-in fade-in slide-in-from-bottom-4` on page containers to create a premium app feel.
