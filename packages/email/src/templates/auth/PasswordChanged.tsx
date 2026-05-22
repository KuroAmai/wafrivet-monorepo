import { Link, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type PasswordChangedProps = {
  name: string;
  changed_at: string;
  secure_url: string;
};

export default function PasswordChanged({
  name,
  changed_at,
  secure_url,
}: PasswordChangedProps) {
  return (
    <Base preview={`Your Wafrivet password was changed on ${changed_at}.`}>
      <Text style={greeting}>Hi {name},</Text>
      <Text style={bodyText}>Your password was successfully changed.</Text>
      <StatRow rows={[{ label: "Changed on", value: changed_at }]} />
      <Text style={bodyText}>
        If this was you, no action is needed — you&apos;re all set.
      </Text>
      <Text style={bodyText}>
        If you didn&apos;t change your password, secure your account right
        away.
      </Text>
      <Section style={buttonSection}>
        <Button
          href={secure_url}
          label="This wasn't me — secure my account"
          variant="danger"
        />
      </Section>
      <Divider />
      <Text style={helpText}>
        Questions?{" "}
        <Link href="mailto:hello@wafrivet.com" style={helpLink}>
          Reply to this email
        </Link>{" "}
        or{" "}
        <Link href="https://wa.me/2348012345678" style={helpLink}>
          message us on WhatsApp
        </Link>
        .
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

PasswordChanged.PreviewProps = {
  name: "Ada",
  changed_at: "22 May 2026, 2:14 PM WAT",
  secure_url: "https://www.wafrivet.com/account/secure?token=preview",
} satisfies PasswordChangedProps;

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

const buttonSection = {
  margin: "0 0 8px",
};

const helpText = {
  color: emailColors.textSubtle,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const helpLink = {
  color: emailColors.green700,
  textDecoration: "underline",
};
