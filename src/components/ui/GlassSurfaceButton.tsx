import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "light" | "dark";
};

export const GlassSurfaceButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "light", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full px-8 py-3 text-[15px] font-semibold transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D4D31]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

    const styles =
      variant === "dark"
        ? "text-white bg-white/10 border border-white/20 backdrop-blur-[14px] [box-shadow:0_10px_30px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.12)] hover:bg-white/14"
        : "text-[#111811] bg-white/55 border border-white/35 backdrop-blur-[14px] [box-shadow:0_10px_30px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(0,0,0,0.08)] hover:bg-white/65";

    return <button ref={ref} className={[base, styles, className].filter(Boolean).join(" ")} {...props} />;
  }
);
GlassSurfaceButton.displayName = "GlassSurfaceButton";

