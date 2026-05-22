import { Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type OrderReceivedProps = {
  chemist_name: string;
  farmer_name: string;
  farmer_location: string;
  order_id: string;
  items: Array<{ name: string; qty: number; total: number }>;
  total: number;
  confirm_deadline: string;
  dashboard_url: string;
};

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function OrderReceived({
  chemist_name,
  farmer_name,
  farmer_location,
  order_id,
  items,
  total,
  confirm_deadline,
  dashboard_url,
}: OrderReceivedProps) {
  const itemRows = items.map((item) => ({
    label: `${item.name} × ${item.qty}`,
    value: formatNaira(item.total),
  }));

  return (
    <Base
      preview={`New order from ${farmer_name} — ${formatNaira(total)}. Confirm within 30 minutes.`}
    >
      <Text style={greeting}>Hi {chemist_name},</Text>
      <Text style={bodyText}>You have a new order.</Text>
      <AlertBanner
        type="warning"
        message="Action required — confirm within 30 minutes"
      />
      <Text style={orderHeader}>ORDER #{order_id}</Text>
      <Text style={orderMeta}>
        From: {farmer_name} · {farmer_location}
      </Text>
      <StatRow rows={itemRows} />
      <StatRow rows={[{ label: "Order total", value: formatNaira(total) }]} />
      <Text style={bodyText}>Please confirm before {confirm_deadline}.</Text>
      <Text style={noteText}>
        If you don&apos;t confirm within 2 hours, the order will be
        automatically cancelled and the farmer will be refunded.
      </Text>
      <Section style={buttonSection}>
        <Button href={dashboard_url} label="View and confirm order" />
      </Section>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

OrderReceived.PreviewProps = {
  chemist_name: "Dr. Emeka",
  farmer_name: "Ada Okonkwo",
  farmer_location: "Ibadan, Oyo",
  order_id: "WV-28491",
  items: [
    { name: "Albendazole 10%", qty: 2, total: 8500 },
    { name: "Oxytetracycline injection", qty: 1, total: 4200 },
  ],
  total: 12700,
  confirm_deadline: "3:45 PM",
  dashboard_url: "https://shop.wafrivet.com/distributor/orders/WV-28491",
} satisfies OrderReceivedProps;

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

const orderHeader = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  lineHeight: "20px",
  margin: "24px 0 4px",
  textTransform: "uppercase" as const,
};

const orderMeta = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const noteText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 24px",
};

const buttonSection = {
  margin: "0 0 8px",
};
