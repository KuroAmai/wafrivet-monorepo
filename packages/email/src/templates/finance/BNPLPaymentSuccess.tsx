import { Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type BNPLPaymentSuccessProps = {
  farmer_name: string;
  amount_paid: number;
  payment_date: string;
  agreement_id: string;
  credit_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function BNPLPaymentSuccess({
  farmer_name,
  amount_paid,
  payment_date,
  agreement_id,
  credit_url,
}: BNPLPaymentSuccessProps) {
  return (
    <Base preview="Payment received. You're all clear.">
      <Text style={greeting}>Hi {farmer_name},</Text>
      <AlertBanner type="success" message="BNPL repaid" />
      <Text style={bodyText}>
        We&apos;ve received your BNPL payment. Your agreement is fully settled.
      </Text>
      <StatRow
        rows={[
          { label: "Amount paid", value: formatNgn(amount_paid) },
          { label: "Payment date", value: payment_date },
          { label: "Agreement #", value: agreement_id },
          { label: "Status", value: "Repaid" },
        ]}
      />
      <Text style={bodyText}>
        Your Wafrivet credit score has been updated to reflect this on-time
        payment.
      </Text>
      <Text style={bodyText}>
        Your full BNPL limit is now available for future marketplace
        purchases.
      </Text>
      <Section style={buttonSection}>
        <Button href={credit_url} label="View my credit score" />
      </Section>
      <Divider />
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

BNPLPaymentSuccess.PreviewProps = {
  farmer_name: "Chidi Okafor",
  amount_paid: 32970,
  payment_date: "12 Jun 2026",
  agreement_id: "BNPL-2026-00842",
  credit_url: "https://shop.wafrivet.com/finance/credit",
} satisfies BNPLPaymentSuccessProps;

const greeting = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const bodyText = {
  color: emailColors.textMuted,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const buttonSection = {
  margin: "0 0 24px",
};
