import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from "@react-email/components";
import { emailColors } from "../theme/colors";
import { Header } from "./Header";

export type BaseProps = {
  preview: string;
  children: ReactNode;
};

const fontFamily =
  "'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function Base({ preview, children }: BaseProps) {
  return (
    <Html lang="en">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
          body, table, td {
            font-family: ${fontFamily};
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Header />
          <Section style={contentSection}>{children}</Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: emailColors.green50,
  margin: 0,
  padding: "24px 0",
  fontFamily,
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
};

const contentSection = {
  backgroundColor: emailColors.surface,
  padding: "40px",
};
