import { Column, Row, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { ChecklistIcon } from "../../components/ChecklistIcon";
import { Footer } from "../../components/Footer";
import { RoleBadge, type WelcomeRole } from "../../components/RoleBadge";
import { emailColors } from "../../theme/colors";
import {
  getWelcomeRoleContent,
  type WelcomeChecklistItem,
} from "./welcomeRoleContent";

export type { WelcomeRole };

export type WelcomeProps = {
  name: string;
  role: WelcomeRole;
  dashboard_url: string;
};

export default function Welcome({
  name,
  role,
  dashboard_url,
}: WelcomeProps) {
  const { introParagraph, checklistItems } = getWelcomeRoleContent(role);

  return (
    <Base preview={`Welcome to Wafrivet, ${name}. Here's how to get started.`}>
      <Text style={greeting}>Hi {name},</Text>
      <Text style={bodyText}>You&apos;re in. Welcome to Wafrivet.</Text>
      <RoleBadge role={role} />
      <Text style={bodyText}>{introParagraph}</Text>
      <Text style={checklistHeading}>Here&apos;s what to do first:</Text>
      <WelcomeChecklist items={checklistItems} />
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

function WelcomeChecklist({ items }: { items: WelcomeChecklistItem[] }) {
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

Welcome.PreviewProps = {
  name: "Ada",
  role: "farmer",
  dashboard_url: "https://herd.wafrivet.com",
} satisfies WelcomeProps;

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
