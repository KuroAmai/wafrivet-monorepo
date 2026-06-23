/** Normalize Web NFC serial numbers to colon-separated lowercase hex. */
export function normalizeChipUid(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.includes(":")) {
    return trimmed
      .split(":")
      .map((part) => part.padStart(2, "0"))
      .join(":")
      .toLowerCase();
  }
  const hex = trimmed.replace(/[^0-9a-fA-F]/g, "");
  if (hex.length % 2 !== 0) {
    return trimmed.toLowerCase();
  }
  return hex
    .match(/.{1,2}/g)!
    .join(":")
    .toLowerCase();
}

export function isWebNfcSupported(): boolean {
  return typeof window !== "undefined" && "NDEFReader" in window;
}

export async function scanNfcTag(): Promise<string> {
  if (!isWebNfcSupported()) {
    throw new Error("Web NFC is not supported on this browser. Use Chrome on Android.");
  }

  const reader = new NDEFReader();
  await reader.scan();

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error("NFC scan timed out. Hold the tag near your phone and try again."));
    }, 30_000);

    reader.onreading = (event: NDEFReadingEvent) => {
      window.clearTimeout(timeout);
      resolve(normalizeChipUid(event.serialNumber));
    };

    reader.onreadingerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("Could not read the NFC tag. Try again."));
    };
  });
}
