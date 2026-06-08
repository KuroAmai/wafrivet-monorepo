type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferredPrompt: DeferredInstallPrompt | null = null;

export function setDeferredInstallPrompt(event: Event): void {
  deferredPrompt = event as DeferredInstallPrompt;
}

export function clearDeferredInstallPrompt(): void {
  deferredPrompt = null;
}

export function hasDeferredInstallPrompt(): boolean {
  return deferredPrompt !== null;
}

export async function triggerInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferredPrompt) {
    return "unavailable";
  }

  await deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  clearDeferredInstallPrompt();
  return outcome;
}
