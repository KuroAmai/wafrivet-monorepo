import { Column, Link, Row, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { alertVariants, emailColors } from "../../theme/colors";

export type DiagnosisSeverity = "mild" | "moderate" | "critical";

export type DiagnosisCompleteProps = {
  user_name: string;
  waf_id: string | null;
  primary_diagnosis: string;
  confidence_pct: number;
  severity: DiagnosisSeverity;
  drug_name: string;
  dosage: string;
  duration: string;
  differentials: Array<{ name: string; probability: number }>;
  order_url: string;
  session_url: string;
};

const severityAlertType = {
  mild: "success",
  moderate: "warning",
  critical: "danger",
} as const;

function SeverityBadge({ severity }: { severity: DiagnosisSeverity }) {
  const alertType = severityAlertType[severity];
  const variant = alertVariants[alertType];

  return (
    <Section
      style={{
        display: "inline-block",
        backgroundColor: variant.backgroundColor,
        borderRadius: "4px",
        padding: "4px 10px",
        margin: 0,
        ...(alertType === "warning" && "border" in variant
          ? { border: variant.border }
          : {}),
      }}
    >
      <Text
        style={{
          color: variant.color,
          fontSize: "13px",
          fontWeight: 700,
          lineHeight: "18px",
          margin: 0,
          textTransform: "capitalize" as const,
        }}
      >
        {severity}
      </Text>
    </Section>
  );
}

export default function DiagnosisComplete({
  user_name,
  waf_id,
  primary_diagnosis,
  confidence_pct,
  severity,
  drug_name,
  dosage,
  duration,
  differentials,
  order_url,
  session_url,
}: DiagnosisCompleteProps) {
  return (
    <Base
      preview={`Diagnosis ready — ${primary_diagnosis} · ${severity}`}
    >
      <Text style={greeting}>Hi {user_name},</Text>
      <Text style={bodyText}>Your AI diagnosis is ready.</Text>
      {waf_id ? (
        <Text style={animalText}>Animal: {waf_id}</Text>
      ) : null}
      <Divider />
      <Text style={sectionHeader}>DIAGNOSIS RESULT</Text>
      <StatRow
        rows={[
          { label: "Primary diagnosis", value: primary_diagnosis },
          { label: "Confidence", value: `${confidence_pct}%` },
        ]}
      />
      <Row style={severityRow}>
        <Column style={severityLabelColumn}>
          <Text style={severityLabel}>Severity</Text>
        </Column>
        <Column style={severityValueColumn} align="right">
          <SeverityBadge severity={severity} />
        </Column>
      </Row>
      <Divider />
      <Text style={sectionHeader}>RECOMMENDED TREATMENT</Text>
      <StatRow
        rows={[
          { label: "Drug", value: drug_name },
          { label: "Dosage", value: dosage },
          { label: "Duration", value: duration },
        ]}
      />
      {differentials.length > 0 ? (
        <>
          <Divider />
          <Text style={sectionHeader}>OTHER POSSIBILITIES</Text>
          <StatRow
            rows={differentials.map((d) => ({
              label: d.name,
              value: `${d.probability}%`,
            }))}
          />
        </>
      ) : null}
      <Section style={buttonSection}>
        <Button href={order_url} label={`Order ${drug_name} now`} />
      </Section>
      <Text style={linkSection}>
        <Link href={session_url} style={sessionLink}>
          View full diagnosis session
        </Link>
      </Text>
      <Text style={disclaimer}>
        This diagnosis is AI-generated. For critical cases, always consult a
        licensed veterinarian before starting treatment.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

DiagnosisComplete.PreviewProps = {
  user_name: "Chidi Okafor",
  waf_id: "WAF-1042",
  primary_diagnosis: "Bovine respiratory disease (BRD)",
  confidence_pct: 87,
  severity: "moderate",
  drug_name: "Oxytetracycline LA Injection",
  dosage: "20 mg/kg IM, single dose",
  duration: "5–7 days observation",
  differentials: [
    { name: "Pasteurellosis", probability: 8 },
    { name: "Viral pneumonia", probability: 5 },
  ],
  order_url:
    "https://shop.wafrivet.com/product/oxytetracycline-la?utm_source=email&utm_campaign=diagnosis",
  session_url: "https://herd.wafrivet.com/ai/sessions/diag-8f3a2b",
} satisfies DiagnosisCompleteProps;

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
  margin: "0 0 8px",
};

const animalText = {
  color: emailColors.textPrimary,
  fontSize: "15px",
  fontWeight: 700,
  lineHeight: "22px",
  margin: "0 0 16px",
};

const sectionHeader = {
  color: emailColors.textPrimary,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  lineHeight: "16px",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
};

const severityRow = {
  backgroundColor: emailColors.green50,
  margin: "0 0 16px",
  width: "100%",
};

const severityLabelColumn = {
  padding: "12px 16px",
  verticalAlign: "middle" as const,
  width: "50%",
};

const severityValueColumn = {
  padding: "12px 16px",
  verticalAlign: "middle" as const,
  width: "50%",
};

const severityLabel = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
};

const buttonSection = {
  margin: "16px 0",
};

const linkSection = {
  margin: "0 0 16px",
  textAlign: "center" as const,
};

const sessionLink = {
  color: emailColors.green700,
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "underline",
};

const disclaimer = {
  color: emailColors.textSubtle,
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0 0 8px",
};
