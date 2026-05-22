import { Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type PasswordResetProps = {
  name: string;
  reset_url: string;
  expires_in_minutes: number;
};

export default function PasswordReset({
  name,
  reset_url,
  expires_in_minutes,
}: PasswordResetProps) {
  return (
    <Base
      preview={`Reset your Wafrivet password — link expires in ${expires_in_minutes} minutes.`}
    >
      <Text style={greeting}>Hi {name},</Text>
      <Text style={bodyText}>
        We got a request to reset your Wafrivet password.
      </Text>
      <Section style={buttonSection}>
        <Button href={reset_url} label="Reset my password" />
      </Section>
      <Text style={expiryText}>
        This link expires in {expires_in_minutes} minutes.
      </Text>
      <Divider />
      <Text style={disclaimer}>
        Didn&apos;t request this? Ignore this email. Your account is safe.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

PasswordReset.PreviewProps = {
  name: "Ada",
  reset_url: "https://www.wafrivet.com/reset-password?token=preview",
  expires_in_minutes: 30,
} satisfies PasswordResetProps;

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
  margin: "0 0 24px",
};

const buttonSection = {
  margin: "0 0 24px",
};

const expiryText = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
  textAlign: "center" as const,
};

const disclaimer = {
  color: emailColors.textSubtle,
  fontSize: "12px",
  lineHeight: "18px",
  margin: 0,
  textAlign: "center" as const,
};
