import { Link, Section, Text } from "@react-email/components";
import { AlertBanner } from "../../components/AlertBanner";
import { Base } from "../../components/Base";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Footer } from "../../components/Footer";
import { emailColors } from "../../theme/colors";

export type OutOfStockProps = {
  chemist_name: string;
  product_name: string;
  reorder_url: string;
  dashboard_url: string;
};

export default function OutOfStock({
  chemist_name,
  product_name,
  reorder_url,
  dashboard_url,
}: OutOfStockProps) {
  return (
    <Base
      preview={`${product_name} is out of stock — farmers can't order it right now.`}
    >
      <Text style={greeting}>Hi {chemist_name},</Text>
      <AlertBanner type="danger" message="Out of stock" />
      <Text style={headline}>{product_name} is out of stock.</Text>
      <Divider />
      <Text style={bodyText}>
        This product has been hidden from the marketplace. Farmers cannot order
        it until you restock.
      </Text>
      <Text style={bodyText}>
        Reorder now to replenish your inventory. Once stock is updated, the
        product will reappear in the marketplace.
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

OutOfStock.PreviewProps = {
  chemist_name: "Dr. Emeka",
  product_name: "Albendazole 10% Oral Suspension",
  reorder_url:
    "https://shop.wafrivet.com/distributor/stock/albendazole-10/reorder",
  dashboard_url: "https://shop.wafrivet.com/distributor/stock",
} satisfies OutOfStockProps;

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
