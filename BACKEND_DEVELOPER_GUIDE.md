# WAFRIVET — Backend Developer Guide

Node.js / Express · PostgreSQL · Prisma

## Overview

One backend serves all four apps. Every subdomain reads the same JWT cookie. Every request hits the same API. Role-based middleware determines what each user can see and do.

The backend lives at api.wafrivet.com. All four frontends call this one URL.

## Tech Stack

- Runtime — Node.js
- Framework — Express.js
- Database — PostgreSQL
- ORM — Prisma
- Cache — Redis (rate limiting, session store)
- Auth — JWT via httpOnly cookie on .wafrivet.com
- Payments — Paystack
- AI — Google Gemini 1.5 Pro
- SMS / USSD / Voice — Africa's Talking
- Media storage — Cloudinary
- Maps / Proximity — Google Maps API
- Background jobs — node-cron
- Environment — dotenv

## File Structure

```
wafrivet-backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js                Prisma client instance
│   │   ├── redis.js             Redis client
│   │   ├── paystack.js          Paystack SDK setup
│   │   ├── gemini.js            Gemini SDK setup
│   │   ├── africastalking.js    Africa's Talking SDK setup
│   │   ├── cloudinary.js        Cloudinary SDK setup
│   │   └── cors.js              Allowed origins (all 4 subdomains)
│   │
│   ├── middleware/
│   │   ├── auth.js              Verify JWT, attach user to req
│   │   ├── role.js              Role-based access guard
│   │   ├── validate.js          Request body validation (Zod)
│   │   ├── upload.js            Multer config for media
│   │   ├── rateLimiter.js       Per-route rate limiting via Redis
│   │   ├── audit.js             Log all writes to audit table
│   │   └── errorHandler.js      Global error handler
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── animal.routes.js
│   │   ├── event.routes.js
│   │   ├── diagnose.routes.js
│   │   ├── nfc.routes.js
│   │   ├── vitals.routes.js
│   │   ├── monitor.routes.js
│   │   ├── valuation.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   ├── order.routes.js
│   │   ├── checkout.routes.js
│   │   ├── bnpl.routes.js
│   │   ├── credit.routes.js
│   │   ├── wallet.routes.js
│   │   ├── chemist.routes.js
│   │   ├── distributor.routes.js
│   │   ├── shipment.routes.js
│   │   ├── insights.routes.js
│   │   ├── notification.routes.js
│   │   ├── ussd.routes.js
│   │   ├── voice.routes.js
│   │   ├── webhook.routes.js
│   │   └── admin.routes.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── animal.controller.js
│   │   ├── event.controller.js
│   │   ├── diagnose.controller.js
│   │   ├── nfc.controller.js
│   │   ├── vitals.controller.js
│   │   ├── monitor.controller.js
│   │   ├── valuation.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── checkout.controller.js
│   │   ├── bnpl.controller.js
│   │   ├── credit.controller.js
│   │   ├── wallet.controller.js
│   │   ├── chemist.controller.js
│   │   ├── distributor.controller.js
│   │   ├── shipment.controller.js
│   │   ├── insights.controller.js
│   │   ├── notification.controller.js
│   │   ├── ussd.controller.js
│   │   ├── voice.controller.js
│   │   ├── webhook.controller.js
│   │   └── admin.controller.js
│   │
│   ├── services/
│   │   ├── auth.service.js           Register, login, OTP, JWT issue
│   │   ├── otp.service.js            Generate, send, verify OTPs
│   │   ├── gemini.service.js         Camera diagnosis, chat diagnosis
│   │   ├── paystack.service.js       Init payment, verify, transfer, charge auth
│   │   ├── africastalking.service.js SMS send, USSD handler, Voice handler
│   │   ├── cloudinary.service.js     Upload media, delete media
│   │   ├── notification.service.js   In-app + SMS notification dispatch
│   │   ├── credit.service.js         Credit score computation logic
│   │   ├── forecast.service.js       Demand forecast + stockout risk logic
│   │   ├── valuation.service.js      Animal valuation calculation
│   │   └── audit.service.js          Write to audit log
│   │
│   ├── jobs/
│   │   ├── bnpl.reminders.js         Daily 8am — check due dates, send SMS reminders, mark overdue
│   │   ├── credit.recompute.js       Daily midnight — recompute all farmer credit scores
│   │   ├── forecast.generate.js      Every Monday 6am — generate 2-week forecasts per chemist
│   │   ├── stockout.check.js         Hourly — check stock levels, fire low stock alerts
│   │   └── vitals.alert.js           Every 30 mins — check vital thresholds, fire animal alerts
│   │
│   ├── utils/
│   │   ├── jwt.js                    Sign and verify tokens
│   │   ├── hash.js                   bcrypt helpers
│   │   ├── paginate.js               Standard pagination helper
│   │   ├── geoUtils.js               Distance calculation (Haversine)
│   │   ├── wafId.js                  WAF ID generator (WAF-2026-00001)
│   │   └── responseFormatter.js      Standard success/error response shape
│   │
│   ├── app.js                        Express setup, middleware, route mounting
│   └── server.js                     HTTP server, cron job init
│
├── tests/
│   ├── auth/
│   ├── animals/
│   ├── orders/
│   ├── diagnosis/
│   └── finance/
│
├── .env
├── .env.example
├── docker-compose.yml
└── package.json
```

## Database Tables

These are all the tables the dev needs to create via Prisma schema.

### Auth & Users

- User — all roles in one table, role field discriminates
- Chemist — extended profile for chemist users
- Distributor — extended profile for distributor users
- ChemistDistributor — join table linking chemists to their distributor

### Animals & Health

- Animal — core animal record, one row per animal
- AnimalEvent — every health event ever logged (treatment, vaccination, death, sale etc.)
- DiagnosisSession — every AI diagnosis session, all channels
- Valuation — valuation history per animal

### NFC & Monitoring

- NFCTag — registered NFC tags, linked to animals
- VitalReading — every vital reading (manual or BLE)
- MonitorAlert — active and resolved alerts per animal

### Marketplace

- Product — chemist product listings
- Cart — one cart per farmer (persistent)
- CartItem — items in a cart
- Order — every placed order
- OrderItem — line items per order

### Logistics

- Shipment — distributor bulk shipments
- ShipmentItem — products per shipment per chemist destination
- Driver — distributor driver profiles

### Finance

- BNPLAgreement — one per BNPL order, tracks repayment
- CreditScore — one per farmer, recomputed daily
- Wallet — one per user, all roles
- WalletTransaction — every credit and debit on a wallet

### Intelligence

- ForecastRecord — weekly demand forecast per chemist per product
- StockoutAlert — active stockout risks per chemist per product
- PriceIndex — weekly price snapshots per product per region

### Comms

- Notification — every in-app notification
- USSDSession — every USSD session log
- VoiceCall — every voice call log

### Audit

- AuditLog — every write operation across the platform, permanently stored

## Enums

The dev needs to define these as Prisma enums or PostgreSQL enums.

- Role — farmer, vet, chemist, distributor, admin
- Species — cattle, goat, sheep, pig, poultry, other
- Sex — male, female
- AnimalStatus — active, sold, dead, transferred
- EventType — birth, vaccination, treatment, weight_check, pregnancy, offspring, sale, death, transfer, clinical_note
- DiagnosisChannel — camera, chat, voice
- TagType — passive_nfc, ble_ear_tag, rumen_bolus
- Behaviour — normal, lethargic, aggressive, off_feed
- VitalSource — manual, ble_auto
- AlertType — fever, hypothermia, prolonged_lying, separation, inactivity, no_reading
- Severity — warning, critical
- ProductCategory — antibiotic, vaccine, supplement, anthelmintic, equipment, diagnostic, other
- ColdChain — ambient, refrigerated, frozen
- PaymentMethod — paystack_card, paystack_bank, ussd, bnpl
- PaymentStatus — pending, paid, failed, refunded
- OrderStatus — placed, confirmed, packed, in_transit, delivered, cancelled
- ShipmentStatus — pending, ready, in_transit, delivered, failed
- BNPLStatus — active, repaid, overdue, defaulted
- CreditTier — none, basic, standard, premium
- RiskLevel — high, medium, low
- WalletTxType — commission, withdrawal, refund, bnpl_repayment
- WalletTxStatus — pending, confirmed, failed
- NotificationType — order_placed, order_confirmed, order_packed, order_in_transit, order_delivered, order_cancelled, diagnosis_complete, animal_alert, bnpl_due_soon, bnpl_overdue, stockout_risk, commission_earned, low_stock, general
- AuditAction — create, update, delete, login, logout

## All API Endpoints

Every endpoint listed with method, path, auth requirement, and which roles can access it.

### Auth

- POST  /api/auth/register              Public
- POST  /api/auth/otp/send              Public
- POST  /api/auth/otp/verify            Public        → sets cookie on success
- POST  /api/auth/login                 Public        → sets cookie on success
- POST  /api/auth/logout                Authenticated → clears cookie
- GET   /api/auth/me                    Authenticated → returns user + role profile
- POST  /api/auth/refresh               Authenticated → reissues JWT
- POST  /api/auth/forgot-password       Public
- POST  /api/auth/reset-password        Public

### Users

- GET   /api/users/profile              Authenticated → own profile
- PATCH /api/users/profile              Authenticated → update name, location, photo
- PATCH /api/users/profile/photo        Authenticated → upload profile photo (Cloudinary)

### Animals

- POST  /api/animals                    farmer, vet
- GET   /api/animals                    farmer           → own herd only
- GET   /api/animals/search             vet, admin       → search by waf_id, name, owner phone
- GET   /api/animals/:id                farmer, vet, chemist, admin
- PATCH /api/animals/:id                owner farmer, vet, admin
- DELETE /api/animals/:id               owner farmer, admin   → soft delete (set status)
- GET   /api/herd/stats                 farmer           → total, healthy, at_risk counts
- GET   /api/herd/alerts                farmer           → all animals with active alerts

### Animal Events

- POST  /api/animals/:id/events         farmer, vet
- GET   /api/animals/:id/events         farmer, vet, chemist, admin   → paginated timeline
- GET   /api/animals/:id/events/:evtId  farmer, vet, admin
- PATCH /api/animals/:id/events/:evtId  vet, admin     → edit notes only, cannot change type

### AI Diagnosis

- POST  /api/diagnose/camera            farmer, vet    → rate limited (20/hour)
- POST  /api/diagnose/chat/new          farmer, vet    → start new session
- POST  /api/diagnose/chat/:sessionId   farmer, vet    → send message to existing session
- GET   /api/diagnose/sessions          farmer, vet    → own history, paginated
- GET   /api/diagnose/sessions/:id      farmer, vet    → full session + transcript
- POST  /api/diagnose/:sessionId/save   farmer, vet    → save result as animal event
- POST  /api/diagnose/:sessionId/order  farmer         → create pre-filled cart from result

### NFC

- POST  /api/nfc/register               farmer         → link tag UID to animal
- GET   /api/nfc/scan/:tagId            Authenticated  → returns animal profile for that tag
- PATCH /api/nfc/tags/:tagId            farmer         → reassign tag to different animal
- DELETE /api/nfc/tags/:tagId           farmer, admin  → unlink tag from animal

### Vitals

- POST  /api/vitals                     farmer         → log manual vital reading
- GET   /api/animals/:id/vitals         farmer, vet    → vital history, last 30 days
- POST  /api/monitor/telemetry          internal only  → receive BLE data from Farm Hub

### Monitoring & Alerts

- GET   /api/monitor/animals            farmer         → all tagged animals + current status
- GET   /api/monitor/alerts             farmer         → all active alerts
- PATCH /api/monitor/alerts/:id         farmer         → resolve alert, log action taken

### Valuation

- POST  /api/animals/:id/valuation      farmer         → request valuation computation
- GET   /api/animals/:id/valuation      farmer, chemist, admin → latest + history
- GET   /api/valuations                 admin          → all platform valuations

### Products

- POST  /api/products                   chemist
- GET   /api/products                   Authenticated  → browse (query: lat, lng, radius, category, species, q, page)
- GET   /api/products/:id               Authenticated  → full detail + chemist profile
- PATCH /api/products/:id               chemist (own), admin
- DELETE /api/products/:id              chemist (own), admin  → soft delete
- GET   /api/chemist/products           chemist        → own inventory + stock levels + alerts
- PATCH /api/products/:id/stock         chemist        → update stock quantity only

### Cart

- GET   /api/cart                       farmer         → current cart with items
- POST  /api/cart/items                 farmer         → add item or update qty if exists
- PATCH /api/cart/items/:itemId         farmer         → change quantity
- DELETE /api/cart/items/:itemId        farmer         → remove item
- DELETE /api/cart                      farmer         → clear entire cart
- POST  /api/cart/from-diagnosis        farmer         → build cart from diagnosis session

### Orders

- POST  /api/orders                     farmer         → place order (validates stock first)
- GET   /api/orders                     farmer, chemist, distributor, admin  → role-aware list
- GET   /api/orders/:id                 farmer (own), chemist (their orders), admin
- PATCH /api/orders/:id/status          chemist        → confirmed, packed, dispatched
- GET   /api/orders/:id/tracking        farmer, chemist → live tracking data
- POST  /api/orders/:id/cancel          farmer         → before confirmed status only

### Checkout

- POST  /api/checkout/initiate          farmer         → validate cart, init Paystack or create BNPL
- POST  /api/checkout/verify            farmer         → verify Paystack reference server-side
- POST  /api/checkout/ussd-reference    farmer         → generate USSD payment reference code

### BNPL

- POST  /api/finance/bnpl/check         farmer         → check eligibility for a given amount
- GET   /api/finance/bnpl               farmer         → list own agreements
- POST  /api/finance/bnpl/request       farmer         → create agreement (called from checkout only)
- POST  /api/finance/bnpl/:id/repay     farmer         → trigger manual repayment
- GET   /api/finance/bnpl/overdue       admin          → all overdue agreements platform-wide
- PATCH /api/finance/bnpl/:id           admin          → manually update status

### Credit Score

- GET   /api/finance/credit-score       farmer         → score, tier, breakdown, max BNPL
- POST  /api/finance/credit-score/refresh farmer       → force recompute
- POST  /api/finance/loan/apply         farmer         → submit loan referral (requires premium tier)
- GET   /api/finance/loan/status        farmer         → referral status

### Wallet

- GET   /api/wallet                     Authenticated  → balance, pending, totals
- GET   /api/wallet/transactions        Authenticated  → paginated history
- GET   /api/wallet/transactions/:id    Authenticated  → single transaction detail
- POST  /api/wallet/withdraw            Authenticated  → request withdrawal (Paystack transfer)

### Chemist Dashboard

- GET   /api/chemist/dashboard          chemist        → orders today, low stock, revenue summary
- GET   /api/chemist/orders             chemist        → incoming orders (filter by status, date)
- GET   /api/chemist/orders/:id         chemist        → order detail
- PATCH /api/chemist/orders/:id         chemist        → accept/reject or update status
- GET   /api/chemist/earnings           chemist        → revenue chart + settlement history
- PATCH /api/chemist/profile            chemist        → update business info, delivery radius, bank details
- POST  /api/chemist/farmers/:farmerId/bnpl  chemist   → toggle BNPL eligibility for a specific farmer

### Distributor Dashboard

- GET   /api/distributor/dashboard          distributor → active shipments, alerts, chemist statuses
- GET   /api/distributor/chemists           distributor → linked chemist network + stock snapshots
- POST  /api/distributor/chemists/:id/link  distributor → link a chemist to the network
- GET   /api/distributor/orders             distributor → bulk order list
- GET   /api/distributor/settlements        distributor → invoices: pending, paid, overdue

### Shipments

- POST  /api/shipments                  distributor    → create shipment (items + destinations)
- GET   /api/shipments                  distributor    → all shipments
- GET   /api/shipments/:id              distributor    → shipment detail + items
- PATCH /api/shipments/:id              distributor    → assign driver, update status

### Data Intelligence

- GET   /api/insights/stockout          chemist        → stockout risk per product
- GET   /api/insights/forecast          chemist        → 2-week demand forecast per product
- GET   /api/insights/top-sellers       chemist        → top products this period
- GET   /api/insights/slow-movers       chemist        → below velocity threshold
- GET   /api/insights/reorder           chemist        → automated reorder suggestions
- GET   /api/insights/network/demand    distributor    → aggregated demand across chemist network
- GET   /api/insights/network/stockout  distributor    → network-wide stockout map data
- GET   /api/insights/network/chemists  distributor    → per-chemist performance table
- GET   /api/insights/pricing           chemist, distributor → market price index
- GET   /api/insights/disease-trends    admin          → platform-wide health event data
- GET   /api/insights/platform          admin          → full platform analytics overview

### Notifications

- GET   /api/notifications              Authenticated  → paginated feed
- PATCH /api/notifications/:id/read     Authenticated  → mark single as read
- POST  /api/notifications/read-all     Authenticated  → mark all as read
- DELETE /api/notifications/:id         Authenticated  → delete notification

### USSD (Webhook — Public, no auth)

- POST  /api/ussd/webhook               Public         → Africa's Talking USSD session handler

Four functions handled inside this one webhook based on session state:

- Pay order by reference
- Check order status
- Look up animal by NFC ID
- Change language

### Voice (Webhook — Public, no auth)

- POST  /api/voice/webhook              Public         → Africa's Talking voice call handler
- POST  /api/voice/sms-followup         Internal       → send SMS with treatment summary after call

### Paystack Webhook (Public — verify signature before processing)

- POST  /api/webhooks/paystack          Public         → handles: charge.success, transfer.success, transfer.failed

### Admin

- GET   /api/admin/dashboard            admin          → platform GMV, users, orders, sessions
- GET   /api/admin/users                admin          → all users with filters
- PATCH /api/admin/users/:id            admin          → update role, activate/deactivate
- GET   /api/admin/orders               admin          → all orders across platform
- GET   /api/admin/products             admin          → all product listings
- PATCH /api/admin/products/:id         admin          → NAFDAC verify, flag/unflag
- GET   /api/admin/chemists             admin          → all chemist profiles
- PATCH /api/admin/chemists/:id/verify  admin          → mark NAFDAC verified
- GET   /api/admin/bnpl                 admin          → all BNPL agreements with filters
- PATCH /api/admin/bnpl/:id             admin          → manually update agreement status
- GET   /api/admin/ussd/sessions        admin          → USSD session logs + analytics
- GET   /api/admin/voice/calls          admin          → voice call logs + outcomes
- PATCH /api/admin/settings             admin          → update BNPL terms, credit limits, fee percentages

## Background Jobs

Five cron jobs. All live in src/jobs/. Initialised in server.js on startup.

- bnpl.reminders.js — runs daily at 8am\n  Finds all active BNPL agreements due the next day. Sends SMS reminder to each farmer. Marks reminder_sent = true. Also marks any agreements past their due date as overdue.\n- credit.recompute.js — runs daily at midnight\n  Loops through every farmer account. Recomputes credit score from four factors: completed orders, BNPL repayment history, livestock valuation, account age. Updates the CreditScore table.\n- forecast.generate.js — runs every Monday at 6am\n  Loops through every chemist. For each active product, pulls the last 8 weeks of order data, computes moving average, applies trend factor, saves 2-week forecast. Also updates StockoutAlert records based on current stock vs average daily sales.\n- stockout.check.js — runs every hour\n  Finds all products at or below their reorder threshold. Fires in-app notification to the chemist for each. Does not resend if notification was already sent within 24 hours.\n- vitals.alert.js — runs every 30 minutes\n  Checks all recent vital readings for threshold violations (temperature too high/low, behaviour flags). Creates MonitorAlert records and fires SMS + in-app notification to farmer for critical alerts. Also checks all NFC-tagged animals for no-reading in the past 48 hours and sends a check-in nudge.\n
## Key Rules for the Dev

### Auth cookie

Set on .wafrivet.com (dot prefix is mandatory — this makes it valid on all subdomains). Must be httpOnly: true and secure: true. This is what makes one login work across all four apps.

### Soft deletes everywhere

Every table has a deleted_at column. Never run a hard delete. Every query must include deleted_at: null in the where clause. This is non-negotiable for livestock health data — records are permanent.

### Audit logging

Every POST, PATCH, and DELETE must write to AuditLog — user ID, table, action, record ID, before/after state. This runs in middleware, not in the controller.

### Role-aware queries

The same endpoint often serves multiple roles. The controller checks req.user.role and scopes the query accordingly. Farmers only see their own animals and orders. Chemists only see orders for their shop. Vets can search any animal. Admin sees everything.

### Paystack webhook signature

Always verify the x-paystack-signature header before processing any Paystack webhook. Never update order status from a redirect alone — only from the verified webhook.

### BNPL creation

The BNPLAgreement record is created atomically inside the same database transaction as the Order. Never create one without the other. Never create a BNPL agreement unless the eligibility check has passed server-side — do not trust the frontend.

### Order → herd auto-log

When an order's status is updated to delivered, the order controller must call the animal events service internally to create a treatment event on the linked animal_id, referencing the order_id. This closes the loop between shop and herd automatically.

### Paystack amounts

Paystack uses kobo. Always multiply NGN amounts by 100 before sending to Paystack. Always divide by 100 when reading back.

### Media uploads

Never store binary data in the database. All images and videos go to Cloudinary. Store only the secure_url. For camera diagnosis frames — send the base64 directly to Gemini, then optionally push to Cloudinary and store the URL.

### WAF ID format

WAF-YYYY-NNNNN — year is dynamic, number is zero-padded count. Generated server-side on animal creation. Never client-generated.

### Pagination

All list endpoints must support page and limit query params. Default limit is 20. Max limit is 100. Use the shared paginate.js util.

### USSD responses

Prefix with CON if the session should continue (show another menu). Prefix with END if the session is complete. Africa's Talking reads this prefix to decide whether to keep the session open.

### Cross-origin cookies

CORS must be configured with credentials: true and explicit allowed origins for all four subdomains. Wildcard * will not work with credentialed requests.

## Environment Variables Reference

- NODE_ENV
- PORT
- API_URL
- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- JWT_EXPIRES_IN
- COOKIE_DOMAIN
- PAYSTACK_SECRET_KEY
- PAYSTACK_PUBLIC_KEY
- PAYSTACK_WEBHOOK_SECRET
- GEMINI_API_KEY
- AT_API_KEY
- AT_USERNAME
- AT_SENDER_ID
- AT_USSD_SHORTCODE
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- GOOGLE_MAPS_API_KEY
- BNPL_DURATION_DAYS
- BNPL_FEE_TIER_1
- BNPL_FEE_TIER_2
- BNPL_FEE_TIER_3
- BNPL_MAX_BASIC
- BNPL_MAX_STANDARD
- BNPL_MAX_PREMIUM
- CREDIT_SCORE_BASIC_MIN
- CREDIT_SCORE_STANDARD_MIN
- CREDIT_SCORE_PREMIUM_MIN
- VITAL_TEMP_HIGH
- VITAL_TEMP_LOW
- VITAL_NO_READING_HOURS
- WALLET_HOLD_HOURS
- WALLET_MIN_WITHDRAWAL_NGN

That's the full guide. Everything the dev needs to start building without a single line of implementation code — just structure, endpoints, rules, and decisions already made.

