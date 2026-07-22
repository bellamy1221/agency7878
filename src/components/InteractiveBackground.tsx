"use client";

/**
 * Clean dark ambient wash for the homepage.
 * No stripes, grain, or residual blinds.
 */
export function InteractiveBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#0e0d0c]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 72% 18%, rgba(210,178,140,0.09), transparent 58%), radial-gradient(ellipse 70% 50% at 18% 88%, rgba(80,55,40,0.14), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(8,7,6,0.42)_100%)]" />
    </div>
  );
}
