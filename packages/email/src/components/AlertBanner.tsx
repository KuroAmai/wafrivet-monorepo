import { Section, Text } from "@react-email/components";
import { alertVariants } from "../theme/colors";

export type AlertBannerProps = {
  type: "warning" | "danger" | "success";
  message: string;
};

export function AlertBanner({ type, message }: AlertBannerProps) {
  const variant = alertVariants[type];

  return (
    <Section
      style={{
        backgroundColor: variant.backgroundColor,
        borderRadius: "6px 6px 0 0",
        padding: "12px 16px",
        margin: 0,
        ...(type === "warning" && "border" in variant
          ? { border: variant.border }
          : {}),
      }}
    >
      <Text
        style={{
          color: variant.color,
          fontSize: "14px",
          lineHeight: "20px",
          margin: 0,
          textAlign: "center" as const,
        }}
      >
        {message}
      </Text>
    </Section>
  );
}
