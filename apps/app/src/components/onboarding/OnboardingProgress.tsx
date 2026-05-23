"use client";

type OnboardingProgressProps = {
  step: number;
  total: number;
  labels?: string[];
};

export function OnboardingProgress({ step, total, labels }: OnboardingProgressProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const index = i + 1;
          const active = index <= step;
          return (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                active ? "bg-[#2D4D31]" : "bg-gray-200"
              }`}
            />
          );
        })}
      </div>
      {labels?.[step - 1] ? (
        <p className="text-[12px] text-gray-500 mt-2">{labels[step - 1]}</p>
      ) : null}
    </div>
  );
}
