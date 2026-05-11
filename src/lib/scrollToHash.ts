const smooth = (): ScrollBehavior =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

export function scrollToHash(hash: string) {
  if (!hash || hash === "#") return;
  const id = hash.replace(/^#/, "");
  const run = () => {
    document.getElementById(id)?.scrollIntoView({ behavior: smooth(), block: "start" });
  };
  run();
  requestAnimationFrame(() => requestAnimationFrame(run));
}
