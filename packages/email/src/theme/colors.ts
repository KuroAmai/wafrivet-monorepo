/** Wafrivet brand palette — from src/index.css design tokens (light + destructive). */
export const emailColors = {
  green900: "#2D4D31",
  green700: "#5F7A52",
  green50: "#EBEEEB",
  sage200: "#C8D4BC",
  sage100: "#E2E8DE",
  textPrimary: "#2D4D31",
  textMuted: "#5F7A52",
  textSubtle: "#6B7F63",
  surface: "#FFFFFF",
  destructive: "#EF4444",
  destructiveDark: "#991B1B",
  destructiveMuted: "#FEE2E2",
  onPrimary: "#EBEEEB",
} as const;

export const logoUrl = "https://shop.wafrivet.com/logo.svg";

function readEnv(key: string): string | undefined {
  const g = globalThis as {
    process?: { env?: Record<string, string | undefined> };
  };
  return g.process?.env?.[key];
}

const shopBase = (readEnv("EMAIL_ASSET_BASE_URL") ?? "https://shop.wafrivet.com").replace(
  /\/$/,
  "",
);

/** Absolute icon URL for production HTML (set EMAIL_ASSET_BASE_URL when rendering to send). */
export function iconUrl(name: string): string {
  return `${shopBase}/icons/${name}.svg`;
}

/**
 * Icon src for templates. React Email preview serves /static/icons from templates/static/.
 * For outbound render, set EMAIL_ASSET_BASE_URL=https://shop.wafrivet.com (icons mirrored on shop).
 */
export function iconSrc(name: string): string {
  if (readEnv("EMAIL_ASSET_BASE_URL")) {
    return iconUrl(name);
  }
  return `/static/icons/${name}.svg`;
}

export const alertVariants = {
  success: {
    backgroundColor: emailColors.sage200,
    color: emailColors.green900,
  },
  warning: {
    backgroundColor: emailColors.green50,
    color: emailColors.green900,
    border: `1px solid ${emailColors.sage200}`,
  },
  danger: {
    backgroundColor: emailColors.destructiveMuted,
    color: emailColors.destructiveDark,
  },
} as const;
