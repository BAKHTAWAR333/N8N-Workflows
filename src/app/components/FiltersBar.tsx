import { Filter, Zap, RotateCcw, SlidersHorizontal } from "lucide-react";

interface FiltersBarProps {
  complexityFilter: string;
  onComplexity: (v: string) => void;
  triggerFilter: string;
  onTrigger: (v: string) => void;
  onReset: () => void;
  activeFilters: string[];
}

const COMPLEXITIES = [
  { v: "", label: "All" },
  { v: "Simple", label: "Simple" },
  { v: "Medium", label: "Medium" },
  { v: "Complex", label: "Complex" },
];
const TRIGGERS = [
  { v: "", label: "All" },
  { v: "Manual", label: "Manual" },
  { v: "Scheduled", label: "Scheduled" },
  { v: "Triggered", label: "Triggered" },
  { v: "Webhook", label: "Webhook" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 text-xs rounded-full font-semibold transition-all whitespace-nowrap"
      style={{
        background: active ? "linear-gradient(135deg, #10b981, #059669)" : "#f1f5f9",
        border: active ? "1px solid transparent" : "1px solid rgba(15,23,42,0.06)",
        color: active ? "#ffffff" : "#475569",
        boxShadow: active ? "0 4px 12px rgba(16,185,129,0.30)" : "none",
      }}
    >
      {children}
    </button>
  );
}

export function FiltersBar({
  complexityFilter,
  onComplexity,
  triggerFilter,
  onTrigger,
  onReset,
  activeFilters,
}: FiltersBarProps) {
  return (
    <section
      className="rounded-2xl p-4 sm:p-5 mb-5"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(16,185,129,0.12)",
        boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Complexity group */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-xs font-bold flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider"
            style={{ color: "#059669" }}
          >
            <Filter className="w-3.5 h-3.5" />
            Complexity
          </span>
          <div
            className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {COMPLEXITIES.map((c) => (
              <Chip key={c.v} active={complexityFilter === c.v} onClick={() => onComplexity(c.v)}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="hidden lg:block h-6 w-px" style={{ background: "rgba(15,23,42,0.08)" }} />

        {/* Trigger group */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-xs font-bold flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider"
            style={{ color: "#059669" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Trigger
          </span>
          <div
            className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {TRIGGERS.map((t) => (
              <Chip key={t.v} active={triggerFilter === t.v} onClick={() => onTrigger(t.v)}>
                {t.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex-1 hidden lg:block" />

        <div className="flex items-center gap-2 flex-shrink-0">
          {activeFilters.length > 0 && (
            <div
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{
                background: "rgba(16,185,129,0.10)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#059669",
              }}
            >
              <SlidersHorizontal className="w-3 h-3" />
              {activeFilters.length} active
            </div>
          )}
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.08)",
              color: "#475569",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(16,185,129,0.10)";
              e.currentTarget.style.color = "#059669";
              e.currentTarget.style.borderColor = "rgba(16,185,129,0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#475569";
              e.currentTarget.style.borderColor = "rgba(15,23,42,0.08)";
            }}
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
