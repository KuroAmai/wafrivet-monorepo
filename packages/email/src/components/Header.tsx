import { Hr, Img, Section } from "@react-email/components";
import { emailColors, logoUrl } from "../theme/colors";

export function Header() {
  return (
    <Section style={headerSection}>
      <Img src={logoUrl} alt="Wafrivet" height={36} style={logo} />
      <Hr style={greenBar} />
    </Section>
  );
}

const headerSection = {
  backgroundColor: emailColors.surface,
  padding: "24px 40px 0",
  textAlign: "left" as const,
};

const logo = {
  display: "block",
  height: "36px",
  width: "auto",
  margin: "0 0 16px",
};

const greenBar = {
  border: "none",
  borderTop: `4px solid ${emailColors.green700}`,
  margin: 0,
  width: "100%",
};
