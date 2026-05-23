/** Maps phone or email input to the backend login/signup email identifier. */
export function toAuthEmail(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes("@")) return trimmed;
  return `${trimmed.replace(/\D/g, "")}@wafrivet.local`;
}
