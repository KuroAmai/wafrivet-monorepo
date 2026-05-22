# @wafrivet/email — Backend integration

## Package

| Field | Value |
|-------|--------|
| **Package name** | `@wafrivet/email` |
| **Entry** | `packages/email/src/index.ts` (monorepo workspace) |
| **Render** | `render` from `@wafrivet/email` (re-export of `@react-email/render`) |

### Install (monorepo)

Add to your API app `package.json`:

```json
{
  "dependencies": {
    "@wafrivet/email": "*"
  }
}
```

From repo root: `npm install`.

### Render example

```ts
import { render, OTPVerification } from "@wafrivet/email";
import type { OTPVerificationProps } from "@wafrivet/email";

const props: OTPVerificationProps = {
  name: "Ada",
  otp_code: "482916",
  expires_in_minutes: 10,
};

const html = await render(OTPVerification(props));
// Send `html` via Resend, SES, etc.
```

### Production assets (logo & checklist icons)

Set before rendering emails that use remote images:

```bash
EMAIL_ASSET_BASE_URL=https://shop.wafrivet.com
```

- Header logo: `https://shop.wafrivet.com/logo.svg` (always absolute)
- Welcome/checklist icons: `{EMAIL_ASSET_BASE_URL}/icons/{name}.svg` when env is set; otherwise preview uses `/static/icons/` (dev only)

Mirror `packages/email/src/templates/static/icons/*.svg` to `https://shop.wafrivet.com/icons/` for production.

---

## Template exports (import names)

All templates are **named exports** from `@wafrivet/email`. Each component is a React function; pass props and pass the result to `render()`.

| Export name | Category | Source file |
|-------------|----------|-------------|
| `OTPVerification` | auth | `templates/auth/OTPVerification.tsx` |
| `PasswordReset` | auth | `templates/auth/PasswordReset.tsx` |
| `PasswordChanged` | auth | `templates/auth/PasswordChanged.tsx` |
| `Welcome` | onboarding | `templates/onboarding/Welcome.tsx` |
| `OrderConfirmation` | orders | `templates/orders/OrderConfirmation.tsx` |
| `OrderReceived` | orders | `templates/orders/OrderReceived.tsx` |
| `OrderInTransit` | orders | `templates/orders/OrderInTransit.tsx` |
| `OrderDelivered` | orders | `templates/orders/OrderDelivered.tsx` |
| `OrderRejected` | orders | `templates/orders/OrderRejected.tsx` |
| `OrderCancelled` | orders | `templates/orders/OrderCancelled.tsx` |
| `BNPLCreated` | finance | `templates/finance/BNPLCreated.tsx` |
| `BNPLReminder24Hours` | finance | `templates/finance/BNPLReminder24Hours.tsx` |
| `BNPLOverdue` | finance | `templates/finance/BNPLOverdue.tsx` |
| `BNPLPaymentSuccess` | finance | `templates/finance/BNPLPaymentSuccess.tsx` |
| `RefundProcessed` | finance | `templates/finance/RefundProcessed.tsx` |
| `LowStock` | stock | `templates/stock/LowStock.tsx` |
| `OutOfStock` | stock | `templates/stock/OutOfStock.tsx` |
| `DiagnosisComplete` | health | `templates/health/DiagnosisComplete.tsx` |
| `ChemistApproved` | chemist | `templates/chemist/ChemistApproved.tsx` |
| `DailyDigest` | admin | `templates/admin/DailyDigest.tsx` |

Type-only exports: `{TemplateName}Props` for each row above, plus `WelcomeRole`, `DiagnosisSeverity`, `PendingAction` (DailyDigest).

---

## Props reference

### Auth

**`OTPVerificationProps`**
```ts
{
  name: string;
  otp_code: string;
  expires_in_minutes: number;
}
```

**`PasswordResetProps`**
```ts
{
  name: string;
  reset_url: string;
  expires_in_minutes: number;
}
```

**`PasswordChangedProps`**
```ts
{
  name: string;
  changed_at: string;
  secure_url: string;
}
```

### Onboarding

**`WelcomeProps`**
```ts
{
  name: string;
  role: "farmer" | "vet" | "chemist" | "distributor"; // WelcomeRole
  dashboard_url: string;
}
```

### Orders

**`OrderConfirmationProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  items: Array<{ name: string; qty: number; unit_price: number; total: number }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  chemist_name: string;
  chemist_distance: string;
  estimated_delivery_time: string;
  tracking_url: string;
}
```

**`OrderReceivedProps`**
```ts
{
  chemist_name: string;
  farmer_name: string;
  farmer_location: string;
  order_id: string;
  items: Array<{ name: string; qty: number; total: number }>;
  total: number;
  confirm_deadline: string;
  dashboard_url: string;
}
```

**`OrderInTransitProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  chemist_name: string;
  estimated_arrival: string;
  tracking_url: string;
}
```

**`OrderDeliveredProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  items: Array<{ name: string; qty: number }>;
  animal_waf_id: string | null;
  chemist_name: string;
  record_url: string;
  rating_url: string;
}
```

**`OrderRejectedProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  chemist_name: string;
  rejection_reason: string;
  refund_amount: number;
  refund_days: number;
  search_url: string;
}
```

**`OrderCancelledProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  reason: string;
  refund_amount: number | null;
  shop_url: string;
}
```

### Finance / BNPL

**`BNPLCreatedProps`**
```ts
{
  farmer_name: string;
  order_id: string;
  order_total: number;
  fee_ngn: number;
  fee_pct: number;
  total_due: number;
  due_date: string;
  agreement_id: string;
  pay_url: string;
}
```

**`BNPLReminder24HoursProps`**
```ts
{
  farmer_name: string;
  total_due: number;
  due_date: string;
  agreement_id: string;
  pay_url: string;
}
```

**`BNPLOverdueProps`**
```ts
{
  farmer_name: string;
  total_due: number;
  days_overdue: number;
  agreement_id: string;
  pay_url: string;
}
```

**`BNPLPaymentSuccessProps`**
```ts
{
  farmer_name: string;
  amount_paid: number;
  payment_date: string;
  agreement_id: string;
  credit_url: string;
}
```

**`RefundProcessedProps`**
```ts
{
  farmer_name: string;
  amount: number;
  order_id: string;
  days_to_reflect: number;
}
```

### Stock (chemist)

**`LowStockProps`**
```ts
{
  chemist_name: string;
  product_name: string;
  current_stock: number;
  days_remaining: number;
  reorder_qty: number;
  reorder_url: string;
  dashboard_url: string;
}
```

**`OutOfStockProps`**
```ts
{
  chemist_name: string;
  product_name: string;
  reorder_url: string;
  dashboard_url: string;
}
```

### Health

**`DiagnosisCompleteProps`**
```ts
{
  user_name: string;
  waf_id: string | null;
  primary_diagnosis: string;
  confidence_pct: number;
  severity: "mild" | "moderate" | "critical";
  drug_name: string;
  dosage: string;
  duration: string;
  differentials: Array<{ name: string; probability: number }>;
  order_url: string;
  session_url: string;
}
```

### Chemist

**`ChemistApprovedProps`**
```ts
{
  chemist_name: string;
  business_name: string;
  dashboard_url: string;
}
```

### Admin

**`PendingAction`**
```ts
{
  type: string;
  description: string;
  url: string;
}
```

**`DailyDigestProps`**
```ts
{
  date: string;
  new_signups: number;
  orders_placed: number;
  orders_completed: number;
  gmv_ngn: number;
  bnpl_agreements: number;
  diagnosis_sessions: number;
  animals_registered: number;
  ussd_sessions: number;
  active_alerts: number;
  pending_actions: PendingAction[];
  admin_dashboard_url?: string; // defaults to https://app.wafrivet.com/admin
}
```

---

## Optional shared imports

```ts
import {
  render,
  emailColors,
  logoUrl,
  iconUrl,
  Base,
  Footer,
} from "@wafrivet/email";
```

Templates compose `Footer` internally with `unsubscribeUrl` — wire per-user unsubscribe links when sending.

---

## Preview (developers)

```bash
npm run dev -w @wafrivet/email
```

Open http://localhost:3030 — each `.tsx` under `src/templates/` with a default export appears in the sidebar.
