import { Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type BNPLOverdueProps = {
  farmer_name: string;
  total_due: number;
  days_overdue: number;
  agreement_id: string;
  pay_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatDaysOverdue(days: number): string {
  return days === 1 ? "1 day" : `${days} days`;
}

export default function BNPLOverdue({
  farmer_name,
  total_due,
  days_overdue,
  agreement_id,
  pay_url,
}: BNPLOverdueProps) {
  return (
    <Base preview="Your Wafrivet BNPL payment is overdue.">
      <Text style={greeting}>Hi {farmer_name},</Text>
      <AlertBanner type="danger" message="Payment overdue" />
      <Text style={bodyText}>
        We have not received your BNPL payment. Please pay as soon as possible
        to restore your account.
      </Text>
      <StatRow
        rows={[
          { label: "Amount due", value: formatNgn(total_due) },
          { label: "Days overdue", value: formatDaysOverdue(days_overdue) },
          { label: "Agreement #", value: agreement_id },
        ]}
      />
      <Text style={bodyText}>
        Your Wafrivet credit score updates are paused until this payment is
        received. Unpaid balances may also limit future BNPL and marketplace
        purchases.
      </Text>
      <Section style={buttonSection}>
        <Button href={pay_url} label={`Pay ${formatNgn(total_due)} now`} />
      </Section>
      <Divider />
      <Text style={helpText}>
        Having trouble paying? Reply to this email and our team will help you
        work out a solution.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

BNPLOverdue.PreviewProps = {
  farmer_name: "Chidi Okafor",
  total_due: 32970,
  days_overdue: 3,
  agreement_id: "BNPL-2026-00842",
  pay_url: "https://shop.wafrivet.com/finance/agreements/BNPL-2026-00842/pay",
} satisfies BNPLOverdueProps;

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

const helpText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};
