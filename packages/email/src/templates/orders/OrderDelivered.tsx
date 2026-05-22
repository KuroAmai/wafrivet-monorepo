import { Column, Link, Row, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { ChecklistIcon } from "../../components/ChecklistIcon";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type OrderDeliveredProps = {
  farmer_name: string;
  order_id: string;
  items: Array<{ name: string; qty: number }>;
  animal_waf_id: string | null;
  chemist_name: string;
  record_url: string;
  rating_url: string;
};

export default function OrderDelivered({
  farmer_name,
  order_id,
  items,
  animal_waf_id,
  chemist_name,
  record_url,
  rating_url,
}: OrderDeliveredProps) {
  const preview = animal_waf_id
    ? "Delivered. Treatment logged to your herd."
    : "Delivered. Your order has arrived.";

  return (
    <Base preview={preview}>
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Row style={statusRow}>
        <Column style={iconColumn}>
          <ChecklistIcon icon="package" />
        </Column>
        <Column style={statusColumn}>
          <Text style={statusText}>Your order has been delivered.</Text>
        </Column>
      </Row>
      <Divider />
      <Text style={sectionHeader}>ORDER #{order_id}</Text>
      <Text style={chemistInfo}>Delivered by {chemist_name}</Text>
      <Section style={lineItemsSection}>
        {items.map((item, index) => (
          <Text
            key={`${item.name}-${item.qty}-${index}`}
            style={lineItemName}
          >
            {item.name} × {item.qty}
          </Text>
        ))}
      </Section>
      {animal_waf_id ? (
        <>
          <Text style={bodyText}>
            This treatment has been logged to {animal_waf_id}&apos;s health
            record in your herd.
          </Text>
          <Section style={buttonSection}>
            <Button
              href={record_url}
              label="View animal's updated record"
            />
          </Section>
        </>
      ) : (
        <Section style={buttonSection}>
          <Button href={record_url} label="View order details" />
        </Section>
      )}
      <Divider />
      <Text style={ratingHeading}>
        How was your experience with {chemist_name}?
      </Text>
      <Row style={starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Column key={star} style={starColumn}>
            <Link href={rating_url} style={starLink}>
              ⭐
            </Link>
          </Column>
        ))}
      </Row>
      <Text style={ratingNote}>
        Your rating helps other farmers find trusted chemists on Wafrivet.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

export const orderDeliveredPreviewWithAnimal = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  items: [
    { name: "Albendazole 10% Oral Suspension", qty: 2 },
    { name: "Oxytetracycline LA Injection", qty: 1 },
    { name: "Disposable Syringes (10ml, pack of 20)", qty: 3 },
  ],
  animal_waf_id: "WAF-1042",
  chemist_name: "Green Valley Vet Pharmacy",
  record_url: "https://herd.wafrivet.com/animals/WAF-1042/health",
  rating_url: "https://shop.wafrivet.com/orders/WRV-28491/rate",
} satisfies OrderDeliveredProps;

export const orderDeliveredPreviewWithoutAnimal = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28492",
  items: [
    { name: "Vitamin B Complex Injection", qty: 1 },
    { name: "Wound Spray Antiseptic", qty: 2 },
  ],
  animal_waf_id: null,
  chemist_name: "Green Valley Vet Pharmacy",
  record_url: "https://shop.wafrivet.com/orders/WRV-28492",
  rating_url: "https://shop.wafrivet.com/orders/WRV-28492/rate",
} satisfies OrderDeliveredProps;

OrderDelivered.PreviewProps = orderDeliveredPreviewWithAnimal;

const greeting = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const statusRow = {
  margin: "0 0 8px",
  width: "100%",
};

const iconColumn = {
  width: "36px",
  verticalAlign: "middle" as const,
  paddingRight: "12px",
};

const statusColumn = {
  verticalAlign: "middle" as const,
};

const statusText = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  margin: 0,
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

const chemistInfo = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
};

const lineItemsSection = {
  margin: "0 0 16px",
  width: "100%",
};

const lineItemName = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 4px",
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

const ratingHeading = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  margin: "0 0 12px",
  textAlign: "center" as const,
};

const starsRow = {
  margin: "0 0 12px",
  width: "100%",
};

const starColumn = {
  textAlign: "center" as const,
  verticalAlign: "middle" as const,
  width: "20%",
};

const starLink = {
  color: emailColors.textPrimary,
  fontSize: "28px",
  lineHeight: "32px",
  textDecoration: "none",
};

const ratingNote = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};
