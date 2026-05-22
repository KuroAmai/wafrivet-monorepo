import { Link, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type OrderCancelledProps = {
  farmer_name: string;
  order_id: string;
  reason: string;
  refund_amount: number | null;
  shop_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function OrderCancelled({
  farmer_name,
  order_id,
  reason,
  refund_amount,
  shop_url,
}: OrderCancelledProps) {
  return (
    <Base preview={`Your order #${order_id} has been cancelled.`}>
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Text style={bodyText}>Your order has been cancelled.</Text>
      <Divider />
      <StatRow
        rows={[
          { label: "Order #", value: order_id },
          { label: "Reason", value: reason },
        ]}
      />
      {refund_amount != null ? (
        <Text style={bodyText}>
          A refund of {formatNgn(refund_amount)} will be processed to your
          original payment method within 3–5 business days.
        </Text>
      ) : null}
      <Section style={buttonSection}>
        <Button href={shop_url} label="Shop again" />
      </Section>
      <Divider />
      <Text style={supportText}>
        Questions?{" "}
        <Link href="mailto:hello@wafrivet.com" style={supportLink}>
          Reply to this email
        </Link>{" "}
        or{" "}
        <Link href="https://wa.me/2348012345678" style={supportLink}>
          message us on WhatsApp
        </Link>
        .
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

export const orderCancelledPreviewWithRefund = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  reason: "Payment window expired",
  refund_amount: 31400,
  shop_url: "https://shop.wafrivet.com",
} satisfies OrderCancelledProps;

export const orderCancelledPreviewWithoutRefund = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28492",
  reason: "Cancelled before payment was completed",
  refund_amount: null,
  shop_url: "https://shop.wafrivet.com",
} satisfies OrderCancelledProps;

OrderCancelled.PreviewProps = orderCancelledPreviewWithRefund;

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
  margin: "0 0 8px",
};

const supportText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const supportLink = {
  color: emailColors.green700,
  textDecoration: "underline",
};
