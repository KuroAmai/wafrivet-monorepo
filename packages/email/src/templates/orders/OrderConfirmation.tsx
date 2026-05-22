import { Column, Row, Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type OrderConfirmationProps = {
  farmer_name: string;
  order_id: string;
  items: Array<{
    name: string;
    qty: number;
    unit_price: number;
    total: number;
  }>;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  chemist_name: string;
  chemist_distance: string;
  estimated_delivery_time: string;
  tracking_url: string;
};

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function OrderConfirmation({
  farmer_name,
  order_id,
  items,
  subtotal,
  delivery_fee,
  total,
  payment_method,
  chemist_name,
  chemist_distance,
  estimated_delivery_time,
  tracking_url,
}: OrderConfirmationProps) {
  return (
    <Base
      preview={`Your order has been confirmed. ${chemist_name} is preparing it now.`}
    >
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Text style={bodyText}>Your order is confirmed.</Text>
      <AlertBanner type="success" message="Payment received" />
      <Divider />
      <Text style={sectionHeader}>ORDER SUMMARY</Text>
      <Text style={orderIdText}>Order #{order_id}</Text>
      <Section style={lineItemsSection}>
        {items.map((item, index) => (
          <Row key={`${item.name}-${item.qty}-${index}`} style={lineItemRow}>
            <Column style={lineItemCell}>
              <Text style={lineItemName}>
                {item.name} × {item.qty}
              </Text>
            </Column>
            <Column style={lineItemCell} align="right">
              <Text style={lineItemPrice}>{formatNgn(item.total)}</Text>
            </Column>
          </Row>
        ))}
      </Section>
      <StatRow
        rows={[
          { label: "Subtotal", value: formatNgn(subtotal) },
          { label: "Delivery fee", value: formatNgn(delivery_fee) },
          { label: "Total", value: formatNgn(total) },
          { label: "Payment method", value: payment_method },
        ]}
      />
      <Divider />
      <Text style={sectionHeader}>YOUR CHEMIST</Text>
      <Text style={chemistInfo}>
        {chemist_name} · {chemist_distance} away
      </Text>
      <Text style={deliveryEstimate}>
        Estimated delivery: {estimated_delivery_time}
      </Text>
      <Text style={bodyText}>
        {chemist_name} is preparing your order now. We&apos;ll notify you when
        it&apos;s on the way.
      </Text>
      <Section style={buttonSection}>
        <Button href={tracking_url} label="Track your order" />
      </Section>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

OrderConfirmation.PreviewProps = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  items: [
    {
      name: "Albendazole 10% Oral Suspension",
      qty: 2,
      unit_price: 4500,
      total: 9000,
    },
    {
      name: "Oxytetracycline LA Injection",
      qty: 1,
      unit_price: 12500,
      total: 12500,
    },
    {
      name: "Disposable Syringes (10ml, pack of 20)",
      qty: 3,
      unit_price: 2800,
      total: 8400,
    },
  ],
  subtotal: 29900,
  delivery_fee: 1500,
  total: 31400,
  payment_method: "Bank transfer",
  chemist_name: "Green Valley Vet Pharmacy",
  chemist_distance: "4.2 km",
  estimated_delivery_time: "Today, 3:30–4:30 PM",
  tracking_url: "https://shop.wafrivet.com/orders/WRV-28491/track",
} satisfies OrderConfirmationProps;

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

const lineItemsSection = {
  margin: "0 0 8px",
  width: "100%",
};

const lineItemRow = {
  borderBottom: `1px solid ${emailColors.sage100}`,
};

const lineItemCell = {
  padding: "12px 0",
  verticalAlign: "middle" as const,
};

const lineItemName = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
};

const lineItemPrice = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "20px",
  margin: 0,
  textAlign: "right" as const,
};

const chemistInfo = {
  color: emailColors.textPrimary,
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: "22px",
  margin: "0 0 4px",
};

const deliveryEstimate = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const buttonSection = {
  margin: "0 0 24px",
};
