import { useEffect, useRef } from "react";
import { Layers, Filter, Zap } from "lucide-react";

interface StatsBarProps {
  totalWorkflows: number;
  popularComplexity: string;
  popularTrigger: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef(0);
  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    prevRef.current = value;
    if (start === end) return;
    const duration = 700;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min(1, (ts - startTime) / duration);
      if (spanRef.current) spanRef.current.textContent = String(Math.floor(p * (end - start) + start));
      if (p < 1) requestAnimationFrame(step);
      else if (spanRef.current) spanRef.current.textContent = String(end);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span ref={spanRef}>{value}</span>;
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl transition-all"
      style={{
        background: accent
          ? "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)"
          : "#ffffff",
        border: `1px solid ${accent ? "rgba(16,185,129,0.25)" : "rgba(15,23,42,0.06)"}`,
        boxShadow: "0 2px 8px rgba(15,23,42,0.03)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "#ffffff",
          boxShadow: "0 6px 14px rgba(16,185,129,0.30)",
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#64748b" }}>
          {label}
        </p>
        <p
          className="font-bold truncate"
          style={{ fontSize: "1.35rem", color: "#0f172a", letterSpacing: "-0.02em" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function StatsBar({ totalWorkflows, popularComplexity, popularTrigger }: StatsBarProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <Stat
        icon={<Layers className="w-5 h-5" />}
        label="Total Workflows"
        value={<AnimatedNumber value={totalWorkflows} />}
        accent
      />
      <Stat
        icon={<Filter className="w-5 h-5" />}
        label="Popular Complexity"
        value={popularComplexity || "—"}
      />
      <Stat
        icon={<Zap className="w-5 h-5" />}
        label="Popular Trigger"
        value={popularTrigger || "—"}
      />
    </section>
  );
}
