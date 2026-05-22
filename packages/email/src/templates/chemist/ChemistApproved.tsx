import { Column, Row, Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { ChecklistIcon } from "../../components/ChecklistIcon";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type ChemistApprovedProps = {
  chemist_name: string;
  business_name: string;
  dashboard_url: string;
};

type ChemistApprovedChecklistItem = {
  icon: string;
  title: string;
  description: string;
};

const checklistItems: ChemistApprovedChecklistItem[] = [
  {
    icon: "pill",
    title: "Add products with NAFDAC numbers",
    description:
      "List your stock with verified NAFDAC numbers so farmers can find and trust it.",
  },
  {
    icon: "package",
    title: "Set your delivery radius",
    description:
      "Tell farmers how far you deliver so the right orders come your way.",
  },
  {
    icon: "clipboard",
    title: "Confirm your bank details",
    description:
      "Add or verify your settlement account so you get paid when orders are fulfilled.",
  },
];

export default function ChemistApproved({
  chemist_name,
  business_name,
  dashboard_url,
}: ChemistApprovedProps) {
  return (
    <Base preview="Your Wafrivet shop is approved and live.">
      <Text style={greeting}>Hi {chemist_name},</Text>
      <AlertBanner type="success" message="Account verified" />
      <Text style={bodyText}>
        Congratulations — <strong>{business_name}</strong> is now live on
        Wafrivet. Farmers in your area can discover your shop and place orders
        today.
      </Text>
      <Text style={checklistHeading}>Here&apos;s what to do first:</Text>
      <ChemistApprovedChecklist items={checklistItems} />
      <Section style={buttonSection}>
        <Button href={dashboard_url} label="Go to your dashboard" />
      </Section>
      <Text style={helpText}>
        Need help getting started? Reply to this email — a real person will
        respond.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

function ChemistApprovedChecklist({
  items,
}: {
  items: ChemistApprovedChecklistItem[];
}) {
  return (
    <Section style={checklistSection}>
      {items.map((item) => (
        <Row key={item.title} style={checklistRow}>
          <Column style={iconColumn}>
            <ChecklistIcon icon={item.icon} />
          </Column>
          <Column style={contentColumn}>
            <Text style={itemTitle}>{item.title}</Text>
            <Text style={itemDescription}>{item.description}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

ChemistApproved.PreviewProps = {
  chemist_name: "Ada",
  business_name: "Green Valley Vet Pharmacy",
  dashboard_url: "https://shop.wafrivet.com/distributor",
} satisfies ChemistApprovedProps;

const greeting = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const bodyText = {
  color: emailColors.textMuted,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const checklistHeading = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
  margin: "0 0 16px",
};

const checklistSection = {
  margin: "0 0 24px",
  width: "100%",
};

const checklistRow = {
  marginBottom: "16px",
};

const iconColumn = {
  width: "36px",
  verticalAlign: "top" as const,
  paddingRight: "12px",
};

const contentColumn = {
  verticalAlign: "top" as const,
};

const itemTitle = {
  color: emailColors.textPrimary,
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: "22px",
  margin: "0 0 4px",
};

const itemDescription = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
};

const buttonSection = {
  margin: "0 0 24px",
};

const helpText = {
  color: emailColors.textSubtle,
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};
