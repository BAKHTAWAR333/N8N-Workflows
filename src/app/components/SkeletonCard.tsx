function shimmer() {
  return {
    background:
      "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s ease-in-out infinite",
  } as React.CSSProperties;
}

export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="h-28 w-full" style={shimmer()} />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded-lg" style={shimmer()} />
        <div className="h-3 w-full rounded-lg" style={shimmer()} />
        <div className="h-3 w-5/6 rounded-lg" style={shimmer()} />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-full" style={shimmer()} />
          <div className="h-5 w-14 rounded-full" style={shimmer()} />
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          <div className="h-8 rounded-lg" style={shimmer()} />
          <div className="h-8 rounded-lg" style={shimmer()} />
          <div className="h-8 rounded-lg" style={shimmer()} />
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
