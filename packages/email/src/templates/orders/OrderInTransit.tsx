import { Column, Row, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { ChecklistIcon } from "../../components/ChecklistIcon";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type OrderInTransitProps = {
  farmer_name: string;
  order_id: string;
  chemist_name: string;
  estimated_arrival: string;
  tracking_url: string;
};

export default function OrderInTransit({
  farmer_name,
  order_id,
  chemist_name,
  estimated_arrival,
  tracking_url,
}: OrderInTransitProps) {
  return (
    <Base preview="Your medicine is on the way. Track it live.">
      <Text style={greeting}>Hi {farmer_name},</Text>
      <Row style={statusRow}>
        <Column style={iconColumn}>
          <ChecklistIcon icon="truck" />
        </Column>
        <Column style={statusColumn}>
          <Text style={statusText}>Your order is on the way.</Text>
        </Column>
      </Row>
      <Text style={bodyText}>{chemist_name} has dispatched your order.</Text>
      <Text style={arrivalText}>
        Estimated arrival: {estimated_arrival}
      </Text>
      <Text style={bodyText}>
        Track your delivery in real time on the map.
      </Text>
      <Section style={buttonSection}>
        <Button href={tracking_url} label="Track live on map" />
      </Section>
      <Text style={phoneNote}>
        Keep your phone close — the rider may call when they arrive.
      </Text>
      <Divider />
      <Text style={orderIdText}>Order #{order_id}</Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

OrderInTransit.PreviewProps = {
  farmer_name: "Chidi Okafor",
  order_id: "WRV-28491",
  chemist_name: "Green Valley Vet Pharmacy",
  estimated_arrival: "Today, 3:30–4:30 PM",
  tracking_url: "https://shop.wafrivet.com/orders/WRV-28491/track",
} satisfies OrderInTransitProps;

const greeting = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const statusRow = {
  margin: "0 0 16px",
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

const bodyText = {
  color: emailColors.textMuted,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const arrivalText = {
  color: emailColors.textPrimary,
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: "22px",
  margin: "0 0 16px",
};

const buttonSection = {
  margin: "0 0 16px",
};

const phoneNote = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px",
};

const orderIdText = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
  textAlign: "center" as const,
};
