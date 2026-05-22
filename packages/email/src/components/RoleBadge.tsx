import { Section, Text } from "@react-email/components";
import { emailColors } from "../theme/colors";

export type WelcomeRole = "farmer" | "vet" | "chemist" | "distributor";

export type RoleBadgeProps = {
  role: WelcomeRole;
};

const roleLabels: Record<WelcomeRole, string> = {
  farmer: "Farmer",
  vet: "Vet",
  chemist: "Chemist",
  distributor: "Distributor",
};

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Section style={wrapper}>
      <Text style={pill}>{roleLabels[role]}</Text>
    </Section>
  );
}

const wrapper = {
  margin: "0 0 24px",
  textAlign: "left" as const,
};

const pill = {
  backgroundColor: emailColors.green900,
  borderRadius: "999px",
  color: emailColors.onPrimary,
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 600,
  lineHeight: "16px",
  margin: 0,
  padding: "4px 12px",
};
