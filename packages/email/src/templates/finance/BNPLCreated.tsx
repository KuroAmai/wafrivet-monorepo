import { Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type BNPLCreatedProps = {
  farmer_name: string;
  order_id: string;
  order_total: number;
  fee_ngn: number;
  fee_pct: number;
  total_due: number;
  due_date: string;
  agreement_id: string;
  pay_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function BNPLCreated({
  farmer_name,
  order_id,
  order_total,
  fee_ngn,
  fee_pct,
  total_due,
  due_date,
  agreement_id,
  pay_url,
}: BNPLCreatedProps) {
  return (
    <Base
      preview={`BNPL confirmed — ${formatNgn(total_due)} due on ${due_date}.`}
    >
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Text style={bodyText}>
        Your Buy Now, Pay Later has been confirmed.
      </Text>
      <Text style={sectionHeader}>BNPL AGREEMENT #{agreement_id}</Text>
      <Text style={orderIdText}>Order #{order_id}</Text>
      <StatRow
        rows={[
          { label: "Order total", value: formatNgn(order_total) },
          {
            label: `BNPL fee (${fee_pct}%)`,
            value: formatNgn(fee_ngn),
          },
          { label: "Total due", value: formatNgn(total_due) },
          { label: "Due date", value: due_date },
        ]}
      />
      <Text style={bodyText}>
        We&apos;ll send you reminders 3 days and 24 hours before your payment
        is due.
      </Text>
      <Text style={bodyText}>
        You can pay early anytime from your Finance dashboard — no extra
        charges for early repayment.
      </Text>
      <Section style={buttonSection}>
        <Button href={pay_url} label="View my agreement" />
      </Section>
      <Divider />
      <Text style={warningText}>
        Late payments may incur additional fees and can affect your Wafrivet
        credit score, which may limit future BNPL or marketplace purchases.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

BNPLCreated.PreviewProps = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  order_total: 31400,
  fee_ngn: 1570,
  fee_pct: 5,
  total_due: 32970,
  due_date: "15 Jun 2026",
  agreement_id: "BNPL-2026-00842",
  pay_url: "https://shop.wafrivet.com/finance/agreements/BNPL-2026-00842",
} satisfies BNPLCreatedProps;

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

const sectionHeader = {
  color: emailColors.textPrimary,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  lineHeight: "16px",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const orderIdText = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const buttonSection = {
  margin: "0 0 24px",
};

const warningText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};
