# WAFRIVET — Frontend Developer Guide

**Next.js (Web) · React Native (Mobile) · 4 Apps**

---

## Overview

Four separate Next.js apps in one Turborepo monorepo. One shared React Native app that deep-links into herd and shop flows. One shared component library used across all four web apps. One shared auth package that handles cookie reading and role detection.

---

## Tech Stack

- **Web framework** — Next.js (App Router)
- **Mobile** — React Native (Expo)
- **Monorepo** — Turborepo
- **Styling** — Tailwind CSS
- **Component library** — Shadcn/ui (base) + custom Wafrivet components
- **State management** — Zustand (global) + React Query (server state)
- **Forms** — React Hook Form + Zod
- **Animations** — Framer Motion (web) · Reanimated (mobile)
- **Maps** — Google Maps (web) · React Native Maps (mobile)
- **Charts** — Recharts
- **Icons** — Lucide React
- **HTTP client** — Axios with interceptors
- **Push notifications** — Expo Notifications (mobile)

---

## Monorepo Structure

```txt
wafrivet/
│
├── apps/
│   ├── web/                  wafrivet.com (marketing site)
│   ├── app/                  app.wafrivet.com (auth + dashboard)
│   ├── herd/                 herd.wafrivet.com (animals + AI + NFC)
│   ├── shop/                 shop.wafrivet.com (marketplace + finance + intelligence)
│   └── mobile/               React Native app (Expo)
│
├── packages/
│   ├── ui/                   shared component library
│   ├── auth/                 shared auth logic (cookie, role detection, redirect)
│   ├── api/                  shared Axios instance + all API call functions
│   ├── types/                shared TypeScript types across all apps
│   ├── utils/                shared utility functions
│   └── config/               shared Tailwind config, ESLint, TypeScript config
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Shared Packages

### packages/ui/

The component library. Every component built here, imported into all four web apps and mobile. Never build the same component twice across apps.

```txt
packages/ui/
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   ├── Badge/
│   ├── Avatar/
│   ├── Modal/
│   ├── Sheet/
│   ├── Tabs/
│   ├── Table/
│   ├── Dropdown/
│   ├── Toast/
│   ├── Skeleton/
│   ├── Spinner/
│   ├── EmptyState/
│   ├── ErrorBoundary/
│   ├── PageHeader/
│   ├── StatCard/
│   ├── AlertBanner/
│   ├── AnimalCard/
│   ├── ProductCard/
│   ├── OrderStatusBadge/
│   ├── SeverityBadge/
│   └── RoleBadge/
├── layouts/
│   ├── DashboardLayout/
│   ├── AuthLayout/
│   └── MarketingLayout/
└── index.ts
```

### packages/auth/

```txt
packages/auth/
├── useAuth.ts             hook — returns current user, role, loading state
├── useRequireAuth.ts      hook — redirects to login if not authenticated
├── useRequireRole.ts      hook — redirects if wrong role
├── getServerAuth.ts       server-side — reads JWT cookie in Next.js server components
├── getCookieOptions.ts    cookie config (domain, secure, httpOnly)
└── redirectByRole.ts      returns correct subdomain per role
```

### packages/api/

```txt
packages/api/
├── client.ts              Axios instance — base URL, cookie credentials, interceptors
├── auth.api.ts
├── user.api.ts
├── animal.api.ts
├── event.api.ts
├── diagnose.api.ts
├── nfc.api.ts
├── vitals.api.ts
├── monitor.api.ts
├── valuation.api.ts
├── product.api.ts
├── cart.api.ts
├── order.api.ts
├── checkout.api.ts
├── bnpl.api.ts
├── credit.api.ts
├── wallet.api.ts
├── chemist.api.ts
├── distributor.api.ts
├── shipment.api.ts
├── insights.api.ts
└── notification.api.ts
```

### packages/types/

```txt
packages/types/
├── user.types.ts
├── animal.types.ts
├── event.types.ts
├── diagnosis.types.ts
├── nfc.types.ts
├── product.types.ts
├── order.types.ts
├── finance.types.ts
├── insights.types.ts
├── notification.types.ts
└── api.types.ts           standard API response envelope, pagination types
```

---

## App 1 — Marketing Site

**`apps/web/` → `wafrivet.com`**

### File Structure

```txt
apps/web/
├── app/
│   ├── layout.tsx                root layout — font, metadata
│   ├── page.tsx                  homepage (all sections)
│   ├── pricing/
│   │   └── page.tsx
│   ├── how-it-works/
│   │   └── page.tsx
│   ├── for/
│   │   ├── farmers/
│   │   │   └── page.tsx
│   │   ├── vets/
│   │   │   └── page.tsx
│   │   ├── chemists/
│   │   │   └── page.tsx
│   │   └── distributors/
│   │       └── page.tsx
│   ├── product/
│   │   └── page.tsx              all 7 modules overview
│   └── investors/
│       └── page.tsx
│
├── components/
│   ├── nav/
│   │   ├── Navbar.tsx
│   │   ├── ProductDropdown.tsx   module cards (7 modules)
│   │   ├── ForDropdown.tsx       neumorphic 2x2 persona grid
│   │   └── MobileMenu.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── ProductModules.tsx
│   │   ├── HowItWorks.tsx        scroll-pinned, hand + phone, 7 steps
│   │   ├── AIDiagnosisSpotlight.tsx
│   │   ├── PersonaSection.tsx
│   │   ├── InvestorSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── FooterCTA.tsx
│   │
│   └── ui/
│       ├── PhoneFrame.tsx        phone mockup wrapper
│       ├── VideoLoop.tsx         looping video player (HowItWorks)
│       └── ScrollTimeline.tsx    left timeline for HowItWorks
│
├── public/
│   ├── videos/
│   │   ├── step-1-diagnose.mp4
│   │   ├── step-2-marketplace.mp4
│   │   ├── step-3-records.mp4
│   │   ├── step-4-nfc.mp4
│   │   ├── step-5-ussd.mp4
│   │   ├── step-6-finance.mp4
│   │   └── step-7-intelligence.mp4
│   └── images/
│
└── next.config.ts
```

### Pages & Sections

**Homepage (`/`)**  
Renders all sections in sequence:

- Navbar with Product and For dropdowns
- Hero
- StatsBar
- ProblemSection
- ProductModules (7 module cards)
- HowItWorks (scroll-pinned, phone video)
- AIDiagnosisSpotlight
- PricingSection
- InvestorSection
- FooterCTA
- Footer

**HowItWorks — Special Implementation Notes**  
This is the most complex section on the site. The section is scroll-pinned using GSAP ScrollTrigger. The right side shows a hand holding a phone with a looping video. The left side is a vertical timeline with 7 steps. As the user scrolls through each step, the left timeline highlights the active step and the video on the right crossfades to the corresponding clip. There are 7 video clips — one per module. Each clip loops until the user scrolls to the next step. Use GSAP `pin: true` with `scrub: 1` on the section container. Video swaps are triggered at scroll thresholds. Pre-load all 7 clips on section mount.

**For Dropdown — Special Implementation Notes**  
Neumorphic 2×2 grid inside the nav dropdown. Four cards: Farmers, Vets, Chemists, Distributors. Each card has an icon, a hook line, two body lines, and a CTA link to the persona page. The grid opens on hover (desktop) and tap (mobile). The background behind the cards uses a soft inset shadow to create the neumorphic depth effect.

---

## App 2 — Auth Hub

**`apps/app/` → `app.wafrivet.com`**

### File Structure

```txt
apps/app/
├── app/
│   ├── layout.tsx
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── verify/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx             dashboard shell with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx           overview + role-aware quick links
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── notifications/
│   │   │   └── page.tsx
│   │   ├── wallet/
│   │   │   ├── page.tsx           balance, pending, totals
│   │   │   ├── transactions/
│   │   │   │   └── page.tsx
│   │   │   └── withdraw/
│   │   │       └── page.tsx
│   │   │
│   │   └── admin/
│   │       ├── layout.tsx         admin-only guard
│   │       ├── page.tsx           platform overview
│   │       ├── users/
│   │       │   ├── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       ├── orders/
│   │       │   └── page.tsx
│   │       ├── products/
│   │       │   └── page.tsx
│   │       ├── chemists/
│   │       │   └── page.tsx
│   │       ├── bnpl/
│   │       │   └── page.tsx
│   │       ├── ussd/
│   │       │   └── page.tsx
│   │       ├── voice/
│   │       │   └── page.tsx
│   │       └── settings/
│   │           └── page.tsx
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── RoleSelector.tsx      visual role picker (farmer/vet/chemist/distributor)
│   │   ├── OTPInput.tsx          6-digit OTP input
│   │   └── ForgotPasswordForm.tsx
│   │
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── RoleQuickLinks.tsx    role-aware shortcut cards to herd/shop
│   │   └── NotificationBell.tsx
│   │
│   ├── wallet/
│   │   ├── WalletCard.tsx        balance + pending display
│   │   ├── TransactionList.tsx
│   │   ├── TransactionItem.tsx
│   │   └── WithdrawForm.tsx
│   │
│   └── admin/
│       ├── PlatformStats.tsx
│       ├── UserTable.tsx
│       ├── OrderTable.tsx
│       ├── BNPLTable.tsx
│       ├── USSDSessionTable.tsx
│       ├── VoiceCallTable.tsx
│       └── SettingsForm.tsx
│
└── next.config.ts
```

### Pages Detail

**Signup (`/signup`)**  
Three-step flow in one page. Step 1: name and phone. Step 2: role selection — four visual cards (farmer, vet, chemist, distributor) with icon, title, and one-line description. Clicking one selects it and highlights it. Step 3: password. Progress indicator at top. On submit, calls register API, then redirects to `/verify`.

**Verify (`/verify`)**  
Single page with a 6-digit OTP input. Phone number displayed masked. Resend button with 60-second countdown. On success, JWT cookie is set by the backend and the frontend calls `redirectByRole()` from the auth package to send the user to the correct subdomain.

**Dashboard (`/dashboard`)**  
Not a complex page — just an overview. Shows the user's name, role badge, unread notification count, wallet balance, and two or three quick link cards pointing to herd or shop depending on role. This page exists so every user has a home base at `app.wafrivet.com` regardless of which module they use.

**Admin section (`/admin`)**  
Route-guarded to `admin` role only. All admin pages are data-heavy tables with filters and sort. No complex UI — clean data display, action buttons per row, confirmation modals for destructive actions.

---

## App 3 — Herd

**`apps/herd/` → `herd.wafrivet.com`**

### File Structure

```txt
apps/herd/
├── app/
│   ├── layout.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx               herd shell with sidebar
│   │   │
│   │   ├── page.tsx                 herd home — animal grid + stats + alerts
│   │   │
│   │   ├── animals/
│   │   │   ├── page.tsx             full herd list with filters
│   │   │   ├── add/
│   │   │   │   └── page.tsx         register new animal
│   │   │   └── [id]/
│   │   │       ├── page.tsx         animal profile (tabbed)
│   │   │       ├── events/
│   │   │       │   └── page.tsx     full event timeline
│   │   │       ├── diagnose/
│   │   │       │   └── page.tsx     launch diagnosis for this animal
│   │   │       └── vitals/
│   │   │           └── page.tsx     NFC vital readings + history
│   │   │
│   │   ├── diagnose/
│   │   │   ├── page.tsx             diagnosis home — select animal or quick start
│   │   │   ├── camera/
│   │   │   │   └── page.tsx         live camera diagnosis
│   │   │   ├── chat/
│   │   │   │   └── page.tsx         text/voice chat diagnosis
│   │   │   └── sessions/
│   │   │       ├── page.tsx         diagnosis history
│   │   │       └── [id]/
│   │   │           └── page.tsx     session detail + transcript
│   │   │
│   │   ├── monitor/
│   │   │   ├── page.tsx             all monitored animals + status
│   │   │   └── alerts/
│   │   │       └── page.tsx         active alerts list
│   │   │
│   │   ├── valuations/
│   │   │   └── page.tsx
│   │   │
│   │   └── search/
│   │       └── page.tsx             vet-only: search any animal by WAF ID
│
├── components/
│   │
│   ├── herd/
│   │   ├── HerdGrid.tsx             animal card grid with status dots
│   │   ├── HerdList.tsx             alternative list view
│   │   ├── HerdStats.tsx            total, healthy, at-risk, flagged
│   │   ├── HerdFilters.tsx          species, status, health flag filters
│   │   ├── AnimalCard.tsx           card with photo, WAF ID, status, last event
│   │   └── AlertsList.tsx           at-risk animals strip
│   │
│   ├── animal/
│   │   ├── AnimalHeader.tsx         photo, WAF ID, species, status badge
│   │   ├── AnimalTabBar.tsx         Overview / Timeline / Vitals / Diagnose
│   │   ├── AnimalOverviewTab.tsx    quick stats, active alerts, quick actions
│   │   ├── AnimalTimelineTab.tsx    event feed with filter
│   │   ├── AnimalVitalsTab.tsx      latest reading, 7-day chart, alert list
│   │   ├── AnimalDiagnoseTab.tsx    launch camera/chat, past sessions
│   │   ├── AddAnimalForm.tsx        multi-step registration form
│   │   ├── LogEventForm.tsx         event type selector + dynamic fields
│   │   ├── EventCard.tsx            single event in timeline
│   │   └── ValuationCard.tsx        valuation result display
│   │
│   ├── diagnose/
│   │   ├── DiagnoseHome.tsx         animal selector + channel picker
│   │   ├── CameraView.tsx           live camera feed + AI overlay + Q&A
│   │   ├── AIOverlay.tsx            floating diagnosis UI on top of camera
│   │   ├── FollowUpQA.tsx           Q&A bubble list during diagnosis
│   │   ├── DiagnosisResultCard.tsx  primary diagnosis, severity, differentials
│   │   ├── TreatmentPlan.tsx        drug, dosage, duration display
│   │   ├── DiagnosisActions.tsx     order medicine / book vet / save buttons
│   │   ├── ChatInterface.tsx        WhatsApp-style chat for text diagnosis
│   │   ├── ChatMessage.tsx          single message bubble
│   │   ├── SessionCard.tsx          past session summary card
│   │   └── SessionDetail.tsx        full transcript + result
│   │
│   ├── monitor/
│   │   ├── MonitorGrid.tsx          tagged animals with status dots
│   │   ├── MonitorCard.tsx          single animal monitoring card
│   │   ├── AlertCard.tsx            alert detail + resolve action
│   │   ├── VitalChart.tsx           7-day temp/weight chart (Recharts)
│   │   └── VitalInputForm.tsx       manual vital entry
│   │
│   └── nfc/
│       ├── NFCScanPrompt.tsx        \"Ready to scan\" UI
│       └── NFCRegisterForm.tsx      link NFC tag to animal
│
└── next.config.ts
```

### Pages Detail

**Herd Home (`/`)**  
Default view for farmers. Stats bar at top (total animals, healthy, at-risk, flagged). Below that, the animal grid. Each animal card has a photo, WAF ID, species, breed, and a coloured status dot (green = healthy, yellow = warning, red = critical). Farmers with active alerts see an alert strip pinned above the grid. Filter bar: species, status, health flag. Toggle between grid and list view.

For vets, the home page shows a different layout — their flagged patients list and a search bar to find any animal by WAF ID.

**Animal Profile (`/animals/[id]`)**  
The most important page in the app. Four tabs:

- **Overview** — quick stats (last healthy, weight, valuation, credit tier), active alerts if any, last 3 events preview, quick action buttons (Diagnose, Log Event, Order Medicine, Request Valuation)
- **Timeline** — full chronological event feed. Filter by event type. Each event card shows date, type badge, who logged it, key details, and an expand arrow for full detail.
- **Vitals** — latest reading displayed large (temp, weight, behaviour). 7-day chart below. Active alert cards if any. Manual entry button.
- **Diagnose** — shortcut to launch camera or chat diagnosis pre-linked to this animal. List of past diagnosis sessions for this animal below.

**Camera Diagnosis (`/diagnose/camera`)**  
Full-screen camera view. No navigation visible. Camera activates on load. AI overlay appears in the bottom third — shows what the AI is detecting in real time. Follow-up questions appear as a floating card that slides up from the bottom. The farmer answers by tapping options or typing. On diagnosis complete, the camera fades and the result card slides up from the bottom. Three action buttons at the bottom: Order Medicine (green), Book Vet (outline), Save to Records (outline).

**Chat Diagnosis (`/diagnose/chat`)**  
WhatsApp-style layout. AI messages on the left, user messages on the right. AI initiates with a greeting and asks the first question. Input bar at the bottom with mic button for voice input. When the AI is ready to diagnose, it returns a structured result card that appears inline in the chat as a special bubble — not just text. Same three action buttons appear below the result card.

---

## App 4 — Shop

**`apps/shop/` → `shop.wafrivet.com`**

### File Structure

```txt
apps/shop/
├── app/
│   ├── layout.tsx
│   │
│   ├── (farmer)/
│   │   ├── layout.tsx                    farmer shell with bottom nav
│   │   ├── page.tsx                      marketplace home
│   │   ├── products/
│   │   │   ├── page.tsx                  browse + filter
│   │   │   └── [id]/
│   │   │       └── page.tsx              product detail
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx                  payment method selection
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx                  order history
│   │   │   └── [id]/
│   │   │       └── page.tsx              order detail + tracking
│   │   └── finance/
│   │       ├── page.tsx                  credit score + BNPL + wallet
│   │       ├── bnpl/
│   │       │   └── page.tsx
│   │       └── loan/
│   │           └── page.tsx
│   │
│   ├── (chemist)/
│   │   ├── layout.tsx                    chemist shell with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx                  chemist overview
│   │   ├── dashboard/
│   │   │   ├── inventory/
│   │   │   │   ├── page.tsx
│   │   │   │   └── add/
│   │   │   │       └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── earnings/
│   │   │   │   └── page.tsx
│   │   │   ├── insights/
│   │   │   │   └── page.tsx
│   │   │   └── finance/
│   │   │       └── page.tsx              BNPL approvals per farmer
│   │
│   └── (distributor)/
│       ├── layout.tsx                    distributor shell with sidebar
│       ├── distributor/
│       │   ├── page.tsx                  network overview
│       │   ├── chemists/
│       │   │   └── page.tsx
│       │   ├── orders/
│       │   │   └── page.tsx
│       │   ├── shipments/
│       │   │   ├── page.tsx
│       │   │   └── [id]/
│       │   │       └── page.tsx
│       │   ├── insights/
│       │   │   └── page.tsx
│       │   └── settlements/
│       │       └── page.tsx
│
├── components/
│   │
│   ├── marketplace/
│   │   ├── MarketplaceHome.tsx           search bar, category pills, nearby chemists
│   │   ├── SearchBar.tsx                 with live suggestions
│   │   ├── CategoryPills.tsx
│   │   ├── NearbyChemists.tsx            horizontal scroll
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx               name, price, chemist, stock, BNPL badge
│   │   ├── ProductFilters.tsx            category, species, price range, distance
│   │   ├── ProductDetail.tsx             full product page
│   │   ├── ChemistProfile.tsx            rating, verified badge, delivery radius
│   │   └── BNPLBadge.tsx                 \"Pay in 14 days\" indicator
│   │
│   ├── cart/
│   │   ├── CartSheet.tsx                 slide-up cart preview
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx               subtotal, delivery fee, total
│   │   └── EmptyCart.tsx
│   │
│   ├── checkout/
│   │   ├── CheckoutForm.tsx              delivery address input
│   │   ├── PaymentMethodSelector.tsx     card / bank / USSD / BNPL
│   │   ├── BNPLToggle.tsx               shows if eligible, fee, due date
│   │   ├── USSDReference.tsx            reference code display for USSD pay
│   │   └── CheckoutSuccess.tsx
│   │
│   ├── orders/
│   │   ├── OrderList.tsx
│   │   ├── OrderCard.tsx                status badge, total, chemist name
│   │   ├── OrderDetail.tsx              full order + items + timeline
│   │   ├── OrderStatusStepper.tsx       placed → confirmed → packed → transit → delivered
│   │   ├── TrackingMap.tsx              live Google Maps with rider pin
│   │   └── ReorderButton.tsx
│   │
│   ├── finance/
│   │   ├── CreditScoreRing.tsx          circular score display (0-100)
│   │   ├── CreditBreakdown.tsx          factor breakdown bars
│   │   ├── BNPLCard.tsx                 active agreement summary
│   │   ├── BNPLHistory.tsx
│   │   ├── LoanReferralForm.tsx
│   │   └── WalletSummary.tsx            balance + quick withdraw
│   │
│   ├── chemist/
│   │   ├── ChemistDashboardStats.tsx    orders today, revenue, low stock count
│   │   ├── ChemistOrderList.tsx         incoming orders with accept/reject
│   │   ├── ChemistOrderCard.tsx
│   │   ├── OrderStatusUpdater.tsx       status change dropdown
│   │   ├── InventoryTable.tsx           all products + stock levels
│   │   ├── AddProductForm.tsx
│   │   ├── StockUpdateInput.tsx
│   │   ├── EarningsChart.tsx            Recharts bar chart
│   │   ├── SettlementList.tsx
│   │   ├── FarmerBNPLToggle.tsx
│   │   └── ChemistInsightsDashboard.tsx stockout + forecast + top sellers
│   │
│   ├── distributor/
│   │   ├── DistributorDashboardStats.tsx
│   │   ├── ChemistNetworkTable.tsx
│   │   ├── StockoutHeatmap.tsx          geographic map with colour coding
│   │   ├── DemandForecastTable.tsx      product × week grid
│   │   ├── ShipmentList.tsx
│   │   ├── ShipmentDetail.tsx
│   │   ├── CreateShipmentForm.tsx
│   │   ├── DriverAssignSelect.tsx
│   │   ├── PriceIndexChart.tsx
│   │   └── SettlementTable.tsx
│   │
│   └── insights/
│       ├── StockoutRiskCard.tsx         risk level badge + days remaining
│       ├── ForecastChart.tsx            Recharts bar chart per product
│       ├── TopSellersList.tsx
│       ├── SlowMoversList.tsx
│       ├── ReorderSuggestions.tsx
│       ├── NetworkDemandTable.tsx
│       └── MarketPriceTable.tsx
│
└── next.config.ts
```

### Pages Detail

**Marketplace Home (`/`)**  
Farmer view. Top section: large search bar, category pills (antibiotics, vaccines, supplements, equipment). Below: \"Chemists near you\" horizontal scroll of chemist cards. Below: featured/recent products grid. Floating cart button bottom right showing item count.

The page is role-aware on load. If a chemist hits `/`, they are immediately redirected to `/dashboard`. If a distributor hits `/`, they go to `/distributor`. Role detection happens in the layout using the auth package — no flash.

**Product Detail (`/products/[id]`)**  
Product name, NAFDAC number, price large. Cold chain badge if relevant. Dosage and strength. Expiry and batch info. Chemist profile card below: name, rating stars, verified badge, delivery radius, distance from user. BNPL badge if eligible. \"Add to Cart\" button pinned to bottom. Related products at the bottom.

**Checkout (`/checkout`)**  
Single page. Delivery address at top. Payment method selector — four options as cards: Paystack Card, Bank Transfer, USSD Reference, BNPL (grayed out with lock icon if not eligible). BNPL option shows the fee and due date when selected. Order summary on the right (desktop) or above the confirm button (mobile). One confirm button — disabled until address and payment method are selected.

**Chemist Dashboard (`/dashboard`)**  
Four stat cards at top: Orders Today, Revenue Today, Low Stock Alerts, Pending Payouts. Below: two columns. Left column: incoming orders list (newest first) with accept/reject buttons per order. Right column: low stock alerts with reorder suggestions. Navigation sidebar for all other chemist pages.

**Chemist Insights (`/dashboard/insights`)**  
Three sections. Top: stockout risk cards — one per at-risk product, showing risk level badge, current stock, days until stockout, reorder suggestion. Middle: 2-week demand forecast — bar chart per product, toggle between weekly view and table view. Bottom: top sellers list and slow movers list side by side.

**Distributor Network Overview (`/distributor`)**  
Map at top showing chemist locations with colour-coded pins (green = OK, yellow = medium risk, red = high risk stockout). Below: stats bar (total chemists, active shipments, total demand this week). Below: pending shipments list. Below: chemist network table with per-chemist stock status.

---

## React Native App

**`apps/mobile/`**

### File Structure

```txt
apps/mobile/
├── app/
│   ├── _layout.tsx               root layout — Expo Router
│   ├── index.tsx                 splash → auth check → redirect
│   │
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── verify.tsx
│   │   └── forgot-password.tsx
│   │
│   ├── (farmer)/
│   │   ├── _layout.tsx           bottom tab navigator
│   │   ├── home.tsx              herd home
│   │   ├── diagnose.tsx          diagnosis home
│   │   ├── shop.tsx              marketplace home
│   │   ├── orders.tsx            order history
│   │   └── profile.tsx
│   │
│   ├── (vet)/
│   │   ├── _layout.tsx
│   │   ├── home.tsx              patient search + flagged animals
│   │   ├── search.tsx            animal search by WAF ID
│   │   └── profile.tsx
│   │
│   ├── animals/
│   │   ├── [id].tsx              animal profile
│   │   ├── add.tsx               register animal
│   │   └── [id]/
│   │       ├── events.tsx
│   │       ├── vitals.tsx
│   │       └── log-event.tsx
│   │
│   ├── diagnose/
│   │   ├── camera.tsx            live camera diagnosis
│   │   ├── chat.tsx              chat diagnosis
│   │   ├── result.tsx            diagnosis result
│   │   └── sessions/
│   │       └── [id].tsx
│   │
│   ├── shop/
│   │   ├── products/
│   │   │   └── [id].tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   └── orders/
│   │       └── [id].tsx
│   │
│   └── nfc/
│       ├── scan.tsx
│       └── register.tsx
│
├── components/
│   ├── herd/
│   │   ├── AnimalCard.tsx
│   │   ├── AnimalGrid.tsx
│   │   ├── HerdStats.tsx
│   │   └── EventCard.tsx
│   │
│   ├── diagnose/
│   │   ├── CameraView.tsx
│   │   ├── AIOverlay.tsx
│   │   ├── FollowUpCard.tsx
│   │   ├── DiagnosisResult.tsx
│   │   ├── DiagnosisActions.tsx
│   │   ├── ChatBubble.tsx
│   │   └── ChatInput.tsx
│   │
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── CartItem.tsx
│   │   ├── OrderCard.tsx
│   │   ├── OrderStatusBar.tsx
│   │   └── TrackingMap.tsx
│   │
│   ├── nfc/
│   │   ├── NFCScanPrompt.tsx
│   │   └── AnimalLookupCard.tsx
│   │
│   └── shared/
│       ├── BottomTabBar.tsx
│       ├── Header.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── Spinner.tsx
│       ├── EmptyState.tsx
│       └── Toast.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useCamera.ts
│   ├── useNFC.ts
│   ├── useLocation.ts
│   └── usePushNotifications.ts
│
├── store/
│   ├── auth.store.ts
│   ├── cart.store.ts
│   └── diagnosis.store.ts
│
└── app.json
```

### Mobile-Specific Notes

**Navigation**  
Expo Router with file-based routing. Root index checks auth state — if no token, goes to login. If token exists, reads role and pushes to the correct tab navigator. Farmer sees a 5-tab bottom nav: Herd, Diagnose, Shop, Orders, Profile. Vet sees a 3-tab nav: Patients, Search, Profile.

**Camera Diagnosis**  
Uses Expo Camera. The camera view is full-screen with a transparent overlay. The AI overlay component sits on top using absolute positioning. Follow-up questions slide up from the bottom as a bottom sheet. On diagnosis complete, camera fades to 20% opacity and the result card slides up and takes over the screen.

**NFC**  
Uses `react-native-nfc-manager`. NFC scan screen activates the reader on mount and deactivates on unmount. On a successful scan, the animal profile page is pushed with the animal ID. NFC write (tag registration) happens on the register screen — writes the WAF ID to the tag. Both read and write must handle the case where NFC is unavailable or disabled on the device — show a clear error state with instructions to enable NFC in settings.

**Cart**  
Cart state lives in Zustand and persists to AsyncStorage. When a user taps \"Order Medicine\" from a diagnosis result, the `recommended_product_search` string is passed to the shop home as a deep link parameter and the search is pre-filled. The cart is shared across web and mobile via the API — it is server-side, not device-local. Zustand just caches the last known state for optimistic UI.

**Push Notifications**  
Uses Expo Notifications. On signup, request permission and register the device token. Store the token server-side against the user account. When the backend fires a notification (order update, animal alert, BNPL due), it sends to the Expo push endpoint with the stored token.

---

## State Management

**Zustand stores (global, client-side)**\n- `auth.store` — current user, role, loading state\n- `cart.store` — cart items, item count, total (cached from server)\n- `diagnosis.store` — active diagnosis session, transcript, current result\n- `notification.store` — unread count, notification feed\n\n**React Query (server state)**\nEvery API call goes through React Query. Cache keys are structured consistently:\n- `['animals']` — herd list\n- `['animal', id]` — single animal profile\n- `['animal', id, 'events']` — event timeline\n- `['diagnose', 'sessions']` — diagnosis history\n- `['products']` — product browse\n- `['orders']` — order list\n- `['order', id]` — order detail\n- `['cart']` — current cart\n- `['credit-score']` — farmer credit score\n- `['insights', 'forecast']` — demand forecast\n- `['notifications']` — notification feed\n\nOn mutation success (new order, new event, status update), invalidate the relevant query keys so the UI refreshes automatically.

---

## Routing & Auth Guard

Every protected app (app, herd, shop) has a root layout that runs an auth check on the server using `getServerAuth()` from the auth package. If no valid cookie, redirect to `app.wafrivet.com/login`. If wrong role for the app, redirect to the correct subdomain.

The role-to-app mapping:
- `farmer` → herd (primary), shop (secondary)
- `vet` → herd only
- `chemist` → shop/dashboard only
- `distributor` → shop/distributor only
- `admin` → app/admin only

This check happens in the Next.js layout at the server level — no client-side flash, no spinner, no layout shift.

---

## Key Rules for the Frontend Dev

**Never store the JWT manually**  
The backend sets the cookie. The frontend never touches it. Axios is configured with `withCredentials: true` so the cookie is sent automatically on every request. Never store the token in localStorage.

**Role detection happens once**  
Read the user role from the `/api/auth/me` response on app mount. Store it in Zustand. Every other component reads from the store — never calls the auth endpoint again until a page refresh.

**Role-aware layouts, not role-aware pages**  
Don't build separate pages for each role if the layout is the same. Build one page and let the layout swap the shell (sidebar for chemist vs bottom nav for farmer). Only build separate pages when the content is genuinely different.

**All API calls go through the shared api package**  
Never call `fetch` or a bare Axios instance directly in a component. Every API function lives in `packages/api/`. This is how the entire frontend stays consistent and how changes to the API URL or headers only need to happen in one place.

**Camera diagnosis on mobile only**  
The camera diagnosis channel is a React Native feature. The web version of the diagnose page should default to chat. Do not try to build a camera diagnosis flow in Next.js — the browser camera API is unreliable and the Gemini integration works best with the native camera.

**Optimistic UI on order status updates**  
When a chemist taps \"Confirm Order\", update the UI immediately before the API call resolves. Use React Query's `onMutate` for this. If the API call fails, roll back with `onError`.

**Soft navigation between herd and shop**  
When a farmer taps \"Order Medicine\" from a diagnosis result in herd, they are navigating from `herd.wafrivet.com` to `shop.wafrivet.com`. This is a full page navigation between subdomains — not client-side routing. Use `window.location.href` with the correct URL and query params. The shop home picks up the query params and pre-fills the search.

**Video preloading in HowItWorks**  
All 7 video clips must be preloaded when the user scrolls the HowItWorks section into the viewport. Use an IntersectionObserver to trigger preloading. Never preload on page load — it kills the initial page performance. Use `video.preload = 'auto'` after the section is in view.

**Mobile — handle NFC unavailability**  
Not all Android phones have NFC. Always check `NfcManager.isSupported()` before rendering NFC features. If not supported, show a message explaining the limitation and offer manual WAF ID entry as an alternative.

**Tailwind config shared across all apps**  
The Tailwind config including the Wafrivet colour palette, font sizes, and custom tokens lives in `packages/config/tailwind.config.ts`. Every app extends this — never define colours or spacing locally in an app.

**No inline styles**  
Tailwind classes only. If a design requires something Tailwind cannot handle, add a custom token to the shared config — not an inline style in a component.

---

## Environment Variables Per App

Each app has its own `.env.local`. They all share the same API URL but have their own public keys.

```txt
NEXT_PUBLIC_API_URL=https://api.wafrivet.com
NEXT_PUBLIC_APP_URL=https://app.wafrivet.com
NEXT_PUBLIC_HERD_URL=https://herd.wafrivet.com
NEXT_PUBLIC_SHOP_URL=https://shop.wafrivet.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
```

---

That's the full frontend guide. Same format as the backend — structure, pages, components, rules, decisions already made. Nothing for the dev to figure out, just build.
</user_query>  \n\nIn plan mode, I should create FRONTEND guide md then create a plan to tackle monorepo conversion. Need ask questions. We'll create `FRONTEND_DEVELOPER_GUIDE.md` in repo root similar to backend. But we already created earlier? We created `FRONTEND_DEVELOPER_GUIDE.md` with content; must check. We'll use Read tool to ensure exists and possibly update; but in plan mode we can edit markdown. Need also create plan file with steps; but instruction: ask user for more info if needed. We need clarifications for monorepo conversion: do we convert current Vite app into apps/web Next? or keep Vite and create monorepo around it? Also choice of package manager (pnpm) and whether this repo becomes `wafrivet` root, renaming. We'll ask 2 critical questions.\n\nAlso user says PUT THIS in an md... We can update existing md file to match full content exactly; might differ. We'll simply overwrite with given content (exact). This is an edit to markdown file. Allowed in plan mode. We'll use Read to check existing file and then ApplyPatch update file. We'll then ask questions using AskQuestion.\n\nThen create plan using CreatePlan tool for monorepo migration (big). Need to include steps: initialize turborepo, create apps/ packages/, move current code into apps/web maybe as Vite or migrate to Next with incremental. But user said want monorepo now that landing set. I'd propose: Phase 0 snapshot; Phase1 create turborepo skeleton, set pnpm workspaces; Phase2 migrate landing to apps/web (either keep Vite or migrate Next). We'll need answer.\n\nLet's proceed: read existing FRONTEND_DEVELOPER_GUIDE.md first. Then patch to match new text. Then AskQuestion on migration strategy.\n"}}We're in analysis; ignore. We'll do tool calls: Read file. Then ApplyPatch update entire file with provided content; but huge. Might be long but ok. We'll do update by replacing all content using ApplyPatch with context of first lines maybe. Might be too large. But manageable.\n\nThen AskQuestion. Let's do.``` Use functions.Read on path. Then apply patch with replacing. Let's go. Note: plan mode: only markdown edits; yes. We'll do.\n\nThen CreatePlan after answers. Need not now. We'll ask.\n"})? Wait need tool calls in analysis? We'll do in final? But system wants in plan mode and no execution? editing markdown allowed. We'll do now with tools. Let's proceed. File exists already from earlier, may not match. We'll update.\n\nOk. We'll do tool calls.``` Let's craft patch: Update file entire content. Use ApplyPatch update file by replacing from first line to end maybe with unique old_string; easier to delete and add? apply patch supports update with hunks. We'll replace whole file by removing old content and adding new; include first few lines context from current file? Need read to know. Let's read first 20 lines. We'll do Read with limit. Then patch. Let's go.}\n\nNow proceed tool calls. Use Read and then ApplyPatch. We'll do."} without confusion. We'll implement. We'll also ask question. Let's do tool calls. We'll answer in commentary then tool. Let's proceed.``` and no web tools. We'll do. We'll ensure minimal output. Let's go. This is analysis, but we'll produce tool calls in commentary. We'll comply. There's plan mode but it's okay. We'll do. Let's. We'll create AskQuestion after patch. We'll not create plan yet. We'll ask 2 questions. Ok. Proceed.  "
