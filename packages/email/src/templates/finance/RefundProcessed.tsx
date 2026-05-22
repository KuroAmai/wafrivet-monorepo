import { Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type RefundProcessedProps = {
  farmer_name: string;
  amount: number;
  order_id: string;
  days_to_reflect: number;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function RefundProcessed({
  farmer_name,
  amount,
  order_id,
  days_to_reflect,
}: RefundProcessedProps) {
  return (
    <Base preview={`Refund of ${formatNgn(amount)} is on its way.`}>
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Text style={bodyText}>
        Your refund has been processed and is on its way back to your original
        payment method.
      </Text>
      <StatRow
        rows={[
          { label: "Refund amount", value: formatNgn(amount) },
          { label: "Order #", value: order_id },
          {
            label: "Expected timeline",
            value: `${days_to_reflect} business days`,
          },
        ]}
      />
      <Text style={bodyText}>
        The refund should reflect in your payment account within{" "}
        {days_to_reflect} business days, depending on your bank or card
        provider.
      </Text>
      <Divider />
      <Text style={helpText}>
        Haven&apos;t received your refund after {days_to_reflect} business
        days? Reply to this email with order #{order_id} and our team will
        follow up.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

RefundProcessed.PreviewProps = {
  farmer_name: "Chidi Okafor",
  amount: 31400,
  order_id: "WRV-28491",
  days_to_reflect: 5,
} satisfies RefundProcessedProps;

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

const helpText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};
