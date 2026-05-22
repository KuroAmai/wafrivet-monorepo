import { Button as EmailButton } from "@react-email/components";
import { emailColors } from "../theme/colors";

export type EmailButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "danger";
};

const variants = {
  primary: emailColors.green900,
  danger: emailColors.destructive,
} as const;

export function Button({ href, label, variant = "primary" }: EmailButtonProps) {
  return (
    <EmailButton
      href={href}
      style={{
        ...buttonStyle,
        backgroundColor: variants[variant],
        color: emailColors.onPrimary,
      }}
    >
      {label}
    </EmailButton>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "6px",
  fontWeight: 700,
  fontSize: "15px",
  textAlign: "center" as const,
  display: "block",
  boxSizing: "border-box" as const,
};
