const DICEBEAR_STYLE = "personas";
const DICEBEAR_VERSION = "9.x";

export const AVATAR_SEEDS = [
  "Emeka",
  "Ada",
  "Chidi",
  "Fatima",
  "Kofi",
  "Amina",
  "Tunde",
  "Zainab",
  "Kwame",
  "Ngozi",
  "Yusuf",
  "Amara",
] as const;

export function dicebearAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/${DICEBEAR_VERSION}/${DICEBEAR_STYLE}/svg?seed=${encodeURIComponent(seed)}`;
}
