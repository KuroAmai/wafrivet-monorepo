import { Column, Link, Row, Section, Text } from "@react-email/components";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type PendingAction = {
  type: string;
  description: string;
  url: string;
};

export type DailyDigestProps = {
  date: string;
  new_signups: number;
  orders_placed: number;
  orders_completed: number;
  gmv_ngn: number;
  bnpl_agreements: number;
  diagnosis_sessions: number;
  animals_registered: number;
  ussd_sessions: number;
  active_alerts: number;
  pending_actions: PendingAction[];
  admin_dashboard_url?: string;
};

const DEFAULT_ADMIN_DASHBOARD_URL = "https://app.wafrivet.com/admin";

function formatNgn(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatCount(value: number): string {
  return value.toLocaleString("en-NG");
}

export default function DailyDigest({
  date,
  new_signups,
  orders_placed,
  orders_completed,
  gmv_ngn,
  bnpl_agreements,
  diagnosis_sessions,
  animals_registered,
  ussd_sessions,
  active_alerts,
  pending_actions,
  admin_dashboard_url = DEFAULT_ADMIN_DASHBOARD_URL,
}: DailyDigestProps) {
  return (
    <Base preview={`Wafrivet daily summary — ${date}`}>
      <Text style={eyebrow}>Wafrivet · Daily Summary</Text>
      <Text style={title}>Wafrivet Daily Summary</Text>
      <Text style={dateText}>{date}</Text>
      <Divider />
      <Text style={sectionHeader}>Yesterday&apos;s numbers</Text>
      <StatRow
        rows={[
          { label: "New signups", value: formatCount(new_signups) },
          { label: "Orders placed", value: formatCount(orders_placed) },
          { label: "Orders completed", value: formatCount(orders_completed) },
          { label: "GMV", value: formatNgn(gmv_ngn) },
          { label: "BNPL agreements", value: formatCount(bnpl_agreements) },
          {
            label: "Diagnosis sessions",
            value: formatCount(diagnosis_sessions),
          },
          {
            label: "Animals registered",
            value: formatCount(animals_registered),
          },
          { label: "USSD sessions", value: formatCount(ussd_sessions) },
          { label: "Active alerts", value: formatCount(active_alerts) },
        ]}
      />
      {pending_actions.length > 0 ? (
        <>
          <Divider />
          <Text style={sectionHeader}>Requires your attention</Text>
          <Section style={actionsSection}>
            {pending_actions.map((action, index) => (
              <Row
                key={`${action.type}-${index}`}
                style={{
                  ...actionRow,
                  borderBottom:
                    index < pending_actions.length - 1
                      ? `1px solid ${emailColors.sage100}`
                      : undefined,
                }}
              >
                <Column style={actionCell}>
                  <Text style={actionText}>
                    <span style={actionType}>{action.type}</span>
                    {" — "}
                    {action.description}
                  </Text>
                </Column>
                <Column style={viewCell} align="right">
                  <Link href={action.url} style={viewLink}>
                    VIEW
                  </Link>
                </Column>
              </Row>
            ))}
          </Section>
        </>
      ) : null}
      <Section style={buttonSection}>
        <Button href={admin_dashboard_url} label="Go to admin dashboard" />
      </Section>
      <Text style={digestNote}>
        This digest is sent automatically every day at 7:00 AM WAT.
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

DailyDigest.PreviewProps = {
  date: "Wednesday, 21 May 2026",
  new_signups: 47,
  orders_placed: 312,
  orders_completed: 289,
  gmv_ngn: 4_850_000,
  bnpl_agreements: 18,
  diagnosis_sessions: 156,
  animals_registered: 83,
  ussd_sessions: 1_204,
  active_alerts: 12,
  pending_actions: [
    {
      type: "Chemist verification",
      description: "3 applications awaiting review",
      url: "https://app.wafrivet.com/admin/users?filter=pending",
    },
    {
      type: "BNPL overdue",
      description: "7 agreements past due date",
      url: "https://app.wafrivet.com/admin/finance/bnpl?status=overdue",
    },
    {
      type: "Low stock",
      description: "14 products below reorder threshold",
      url: "https://app.wafrivet.com/admin/marketplace/products?filter=low-stock",
    },
  ],
  admin_dashboard_url: "https://app.wafrivet.com/admin",
} satisfies DailyDigestProps;

const eyebrow = {
  color: emailColors.textMuted,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "18px",
  margin: "0 0 8px",
};

const title = {
  color: emailColors.textPrimary,
  fontSize: "22px",
  fontWeight: 700,
  lineHeight: "28px",
  margin: "0 0 4px",
};

const dateText = {
  color: emailColors.textMuted,
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0 0 8px",
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

const actionsSection = {
  margin: "0 0 8px",
  width: "100%",
};

const actionRow = {
  width: "100%",
};

const actionCell = {
  padding: "12px 0",
  verticalAlign: "middle" as const,
  width: "85%",
};

const viewCell = {
  padding: "12px 0",
  verticalAlign: "middle" as const,
  width: "15%",
};

const actionText = {
  color: emailColors.textPrimary,
  fontSize: "14px",
  lineHeight: "20px",
  margin: 0,
};

const actionType = {
  fontWeight: 700,
};

const viewLink = {
  color: emailColors.green700,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textDecoration: "underline",
};

const buttonSection = {
  margin: "24px 0 16px",
};

const digestNote = {
  color: emailColors.textSubtle,
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 24px",
  textAlign: "center" as const,
};
