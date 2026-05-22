import { Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type BNPLReminder24HoursProps = {
  farmer_name: string;
  total_due: number;
  due_date: string;
  agreement_id: string;
  pay_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function BNPLReminder24Hours({
  farmer_name,
  total_due,
  due_date,
  agreement_id,
  pay_url,
}: BNPLReminder24HoursProps) {
  return (
    <Base
      preview={`${formatNgn(total_due)} due tomorrow. Pay now to stay on track.`}
    >
      <Text style={greeting}>Hi {farmer_name},</Text>
      <AlertBanner type="warning" message="Payment due tomorrow" />
      <Text style={bodyText}>Your BNPL payment is due tomorrow.</Text>
      <StatRow
        rows={[
          { label: "Amount due", value: formatNgn(total_due) },
          { label: "Due date", value: due_date },
          { label: "Agreement #", value: agreement_id },
        ]}
      />
      <Text style={bodyText}>
        Pay now to protect your Wafrivet credit score and keep your BNPL
        access for future marketplace purchases.
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

BNPLReminder24Hours.PreviewProps = {
  farmer_name: "Chidi Okafor",
  total_due: 32970,
  due_date: "15 Jun 2026",
  agreement_id: "BNPL-2026-00842",
  pay_url: "https://shop.wafrivet.com/finance/agreements/BNPL-2026-00842/pay",
} satisfies BNPLReminder24HoursProps;

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
