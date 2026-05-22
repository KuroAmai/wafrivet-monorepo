import { Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type OTPVerificationProps = {
  name: string;
  otp_code: string;
  expires_in_minutes: number;
};

export default function OTPVerification({
  name,
  otp_code,
  expires_in_minutes,
}: OTPVerificationProps) {
  return (
    <Base preview={`Your Wafrivet verification code is ${otp_code}`}>
      <Text style={greeting}>Hi {name},</Text>
      <Text style={bodyText}>
        Use this code to verify your Wafrivet account.
      </Text>
      <Text style={otpCode}>{otp_code}</Text>
      <Text style={expiryText}>
        This code expires in {expires_in_minutes} minutes.
      </Text>
      <Divider />
      <Text style={disclaimer}>
        Didn&apos;t request this? Ignore this email. Your account is safe.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

OTPVerification.PreviewProps = {
  name: "Ada",
  otp_code: "482916",
  expires_in_minutes: 10,
} satisfies OTPVerificationProps;

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

const otpCode = {
  color: emailColors.green900,
  fontSize: "48px",
  fontWeight: 700,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  letterSpacing: "8px",
  lineHeight: "56px",
  margin: "0 0 16px",
  textAlign: "center" as const,
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
