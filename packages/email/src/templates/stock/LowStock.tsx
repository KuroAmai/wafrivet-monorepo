import { Link, Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { StatRow } from "../../components/StatRow";
import { emailColors } from "../../theme/colors";

export type LowStockProps = {
  chemist_name: string;
  product_name: string;
  current_stock: number;
  days_remaining: number;
  reorder_qty: number;
  reorder_url: string;
  dashboard_url: string;
};

export default function LowStock({
  chemist_name,
  product_name,
  current_stock,
  days_remaining,
  reorder_qty,
  reorder_url,
  dashboard_url,
}: LowStockProps) {
  return (
    <Base
      preview={`${product_name} is running low — ${days_remaining} days of stock left.`}
    >
      <Text style={greeting}>Hi {chemist_name},</Text>
      <AlertBanner type="warning" message="Low stock warning" />
      <Text style={headline}>{product_name} is running low.</Text>
      <Divider />
      <StatRow
        rows={[
          { label: "Current stock", value: String(current_stock) },
          {
            label: "Days remaining",
            value: `~${days_remaining} days`,
          },
          { label: "Suggested reorder", value: String(reorder_qty) },
        ]}
      />
      <Text style={bodyText}>
        Based on your recent sales rate, this product may sell out soon. When
        stock reaches zero, it will be hidden from the marketplace until you
        restock.
      </Text>
      <Text style={bodyText}>
        Reorder now to keep this product visible and avoid missing orders.
      </Text>
      <Section style={buttonSection}>
        <Button href={reorder_url} label="Reorder now" />
      </Section>
      <Text style={linkSection}>
        <Link href={dashboard_url} style={manualLink}>
          Update stock manually
        </Link>
      </Text>
      <Footer unsubscribeUrl="https://www.wafrivet.com/unsubscribe" />
    </Base>
  );
}

LowStock.PreviewProps = {
  chemist_name: "Dr. Emeka",
  product_name: "Albendazole 10% Oral Suspension",
  current_stock: 8,
  days_remaining: 5,
  reorder_qty: 24,
  reorder_url: "https://shop.wafrivet.com/distributor/stock/albendazole-10/reorder",
  dashboard_url: "https://shop.wafrivet.com/distributor/stock",
} satisfies LowStockProps;

const greeting = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const headline = {
  color: emailColors.textPrimary,
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "24px",
  margin: "16px 0",
};

const bodyText = {
  color: emailColors.textMuted,
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const buttonSection = {
  margin: "0 0 16px",
};

const linkSection = {
  margin: "0 0 24px",
  textAlign: "center" as const,
};

const manualLink = {
  color: emailColors.green700,
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "underline",
};
