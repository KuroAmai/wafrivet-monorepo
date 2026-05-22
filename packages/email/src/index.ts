/**
 * @wafrivet/email — React Email templates for backend rendering.
 * Import templates and `render` from this package; see BACKEND.md for props reference.
 */

// Shared layout & UI
export { Base } from "./components/Base";
export type { BaseProps } from "./components/Base";
export { Header } from "./components/Header";
export { Footer } from "./components/Footer";
export type { FooterProps } from "./components/Footer";
export { Button } from "./components/Button";
export type { EmailButtonProps } from "./components/Button";
export { Divider } from "./components/Divider";
export { StatRow } from "./components/StatRow";
export type { StatRowProps } from "./components/StatRow";
export { AlertBanner } from "./components/AlertBanner";
export type { AlertBannerProps } from "./components/AlertBanner";
export { RoleBadge } from "./components/RoleBadge";
export type { RoleBadgeProps, WelcomeRole } from "./components/RoleBadge";
export { ChecklistIcon } from "./components/ChecklistIcon";
export type { ChecklistIconProps } from "./components/ChecklistIcon";

// Theme
export {
  emailColors,
  logoUrl,
  iconUrl,
  iconSrc,
  alertVariants,
} from "./theme/colors";

// Render HTML for sending (use from @react-email/render or re-exported below)
export { render } from "@react-email/render";

// --- Auth ---
export { default as OTPVerification } from "./templates/auth/OTPVerification";
export type { OTPVerificationProps } from "./templates/auth/OTPVerification";

export { default as PasswordReset } from "./templates/auth/PasswordReset";
export type { PasswordResetProps } from "./templates/auth/PasswordReset";

export { default as PasswordChanged } from "./templates/auth/PasswordChanged";
export type { PasswordChangedProps } from "./templates/auth/PasswordChanged";

// --- Onboarding ---
export { default as Welcome } from "./templates/onboarding/Welcome";
export type { WelcomeProps } from "./templates/onboarding/Welcome";

// --- Orders ---
export { default as OrderConfirmation } from "./templates/orders/OrderConfirmation";
export type { OrderConfirmationProps } from "./templates/orders/OrderConfirmation";

export { default as OrderReceived } from "./templates/orders/OrderReceived";
export type { OrderReceivedProps } from "./templates/orders/OrderReceived";

export { default as OrderInTransit } from "./templates/orders/OrderInTransit";
export type { OrderInTransitProps } from "./templates/orders/OrderInTransit";

export { default as OrderDelivered } from "./templates/orders/OrderDelivered";
export type { OrderDeliveredProps } from "./templates/orders/OrderDelivered";

export { default as OrderRejected } from "./templates/orders/OrderRejected";
export type { OrderRejectedProps } from "./templates/orders/OrderRejected";

export { default as OrderCancelled } from "./templates/orders/OrderCancelled";
export type { OrderCancelledProps } from "./templates/orders/OrderCancelled";

// --- Finance / BNPL ---
export { default as BNPLCreated } from "./templates/finance/BNPLCreated";
export type { BNPLCreatedProps } from "./templates/finance/BNPLCreated";

export { default as BNPLReminder24Hours } from "./templates/finance/BNPLReminder24Hours";
export type { BNPLReminder24HoursProps } from "./templates/finance/BNPLReminder24Hours";

export { default as BNPLOverdue } from "./templates/finance/BNPLOverdue";
export type { BNPLOverdueProps } from "./templates/finance/BNPLOverdue";

export { default as BNPLPaymentSuccess } from "./templates/finance/BNPLPaymentSuccess";
export type { BNPLPaymentSuccessProps } from "./templates/finance/BNPLPaymentSuccess";

export { default as RefundProcessed } from "./templates/finance/RefundProcessed";
export type { RefundProcessedProps } from "./templates/finance/RefundProcessed";

// --- Stock (chemist) ---
export { default as LowStock } from "./templates/stock/LowStock";
export type { LowStockProps } from "./templates/stock/LowStock";

export { default as OutOfStock } from "./templates/stock/OutOfStock";
export type { OutOfStockProps } from "./templates/stock/OutOfStock";

// --- Health ---
export { default as DiagnosisComplete } from "./templates/health/DiagnosisComplete";
export type {
  DiagnosisCompleteProps,
  DiagnosisSeverity,
} from "./templates/health/DiagnosisComplete";

// --- Chemist ---
export { default as ChemistApproved } from "./templates/chemist/ChemistApproved";
export type { ChemistApprovedProps } from "./templates/chemist/ChemistApproved";

// --- Admin ---
export { default as DailyDigest } from "./templates/admin/DailyDigest";
export type {
  DailyDigestProps,
  PendingAction,
} from "./templates/admin/DailyDigest";
