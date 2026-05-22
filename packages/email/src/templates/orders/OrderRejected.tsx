import { Link, Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type OrderRejectedProps = {
  farmer_name: string;
  order_id: string;
  chemist_name: string;
  rejection_reason: string;
  refund_amount: number;
  refund_days: number;
  search_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function OrderRejected({
  farmer_name,
  order_id,
  chemist_name,
  rejection_reason,
  refund_amount,
  refund_days,
  search_url,
}: OrderRejectedProps) {
  return (
    <Base
      preview={`Order update — ${chemist_name} couldn't fulfil your order.`}
    >
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Text style={bodyText}>
        Unfortunately, {chemist_name} was unable to fulfil your order. Your
        payment has been refunded so you can place a new order with another
        chemist nearby.
      </Text>
      <AlertBanner
        type="warning"
        message={`Order #${order_id} was rejected`}
      />
      <Divider />
      <StatRow
        rows={[
          { label: "Chemist", value: chemist_name },
          { label: "Reason", value: rejection_reason },
          { label: "Refund amount", value: formatNgn(refund_amount) },
        ]}
      />
      <Text style={bodyText}>
        A full refund of {formatNgn(refund_amount)} has been initiated to your
        original payment method. Refunds typically take up to {refund_days}{" "}
        business days to appear in your account.
      </Text>
      <Section style={buttonSection}>
        <Button href={search_url} label="Find another chemist" />
      </Section>
      <Text style={helpText}>
        If your refund hasn&apos;t appeared after {refund_days} business days,
        contact{" "}
        <Link href="mailto:hello@wafrivet.com" style={helpLink}>
          hello@wafrivet.com
        </Link>{" "}
        with order #{order_id} and we&apos;ll help track it down.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

OrderRejected.PreviewProps = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  chemist_name: "Green Valley Vet Pharmacy",
  rejection_reason: "Out of stock — Albendazole 10% Oral Suspension",
  refund_amount: 31400,
  refund_days: 5,
  search_url: "https://shop.wafrivet.com/search?near=Ibadan",
} satisfies OrderRejectedProps;

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
  margin: "0 0 16px",
};

const helpText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const helpLink = {
  color: emailColors.green700,
  textDecoration: "underline",
};
