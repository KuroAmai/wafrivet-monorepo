import { Column, Row, Section, Text } from "@react-email/components";
import { emailColors } from "../theme/colors";

export type StatRowProps = {
  rows: Array<{ label: string; value: string }>;
};

export function StatRow({ rows }: StatRowProps) {
  return (
    <Section style={table}>
      {rows.map((row, index) => (
        <Row
          key={`${row.label}-${index}`}
          style={{
            backgroundColor:
              index % 2 === 0 ? emailColors.surface : emailColors.green50,
          }}
        >
          <Column style={cell}>
            <Text style={labelStyle}>{row.label}</Text>
          </Column>
          <Column style={cell} align="right">
            <Text style={valueStyle}>{row.value}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const cell = {
  padding: "12px 16px",
  verticalAlign: "middle" as const,
};

const labelStyle = {
  color: emailColors.textMuted,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
};

const valueStyle = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "20px",
  margin: 0,
  textAlign: "right" as const,
};
