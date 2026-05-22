import { Hr, Link, Section, Text } from "@react-email/components";
import { emailColors } from "../theme/colors";

export type FooterProps = {
  unsubscribeUrl: string;
};

const textStyle = {
  color: emailColors.textSubtle,
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const linkStyle = {
  color: emailColors.textSubtle,
  fontSize: "12px",
  textDecoration: "underline",
};

export function Footer({ unsubscribeUrl }: FooterProps) {
  return (
    <Section style={footerSection}>
      <Hr style={divider} />
      <Text style={textStyle}>Wafrivet · Lagos, Nigeria</Text>
      <Text style={textStyle}>
        <Link href="mailto:hello@wafrivet.com" style={linkStyle}>
          hello@wafrivet.com
        </Link>
      </Text>
      <Text style={textStyle}>
        <Link href={unsubscribeUrl} style={linkStyle}>
          Unsubscribe
        </Link>
      </Text>
      <Text style={{ ...textStyle, margin: 0 }}>
        © 2026 Wafrivet. All rights reserved.
      </Text>
    </Section>
  );
}

const footerSection = {
  padding: "24px 40px 32px",
  textAlign: "center" as const,
};

const divider = {
  borderColor: emailColors.sage100,
  borderWidth: "1px",
  margin: "0 0 16px",
};
