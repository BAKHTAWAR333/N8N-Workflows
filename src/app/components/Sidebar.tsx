import { FolderTree, Filter, Zap, RotateCcw, Sparkles } from "lucide-react";

export interface Category {
  name: string;
  slug: string;
  count: number;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  complexityFilter: string;
  onComplexity: (v: string) => void;
  triggerFilter: string;
  onTrigger: (v: string) => void;
  onReset: () => void;
  totalWorkflows: number;
  totalCategories: number;
}

const COMPLEXITIES = ["", "Simple", "Medium", "Complex"] as const;
const TRIGGERS = ["", "Manual", "Scheduled", "Triggered", "Webhook"] as const;
const COMPLEXITY_LABELS: Record<string, string> = {
  "": "All",
  Simple: "Simple",
  Medium: "Medium",
  Complex: "Complex",
};
const TRIGGER_LABELS: Record<string, string> = {
  "": "All",
  Manual: "Manual",
  Scheduled: "Scheduled",
  Triggered: "Triggered",
  Webhook: "Webhook",
};

function GlassPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: "rgba(15, 25, 35, 0.68)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(16,185,129,0.15)",
      }}
    >
      {children}
    </div>
  );
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  complexityFilter,
  onComplexity,
  triggerFilter,
  onTrigger,
  onReset,
  totalWorkflows,
  totalCategories,
}: SidebarProps) {
  return (
    <aside className="lg:w-72 w-full space-y-4 flex-shrink-0">
      {/* Stats mini */}
      <GlassPanel>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-xl py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "#6b7b8f" }}>
              Workflows
            </p>
            <p className="text-2xl font-bold" style={{ color: "#10b981" }}>
              {totalWorkflows}
            </p>
          </div>
          <div className="rounded-xl py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "#6b7b8f" }}>
              Categories
            </p>
            <p className="text-2xl font-bold" style={{ color: "#10b981" }}>
              {totalCategories}
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* Categories */}
      <GlassPanel>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2 text-sm" style={{ color: "#e8edf5" }}>
            <FolderTree className="w-4 h-4" style={{ color: "#10b981" }} />
            Categories
          </h3>
          <span className="text-[10px] font-medium" style={{ color: "rgba(16,185,129,0.7)" }}>
            A–Z
          </span>
        </div>

        <div className="space-y-0.5 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
          {/* All Workflows */}
          <button
            onClick={() => onSelectCategory("")}
            className="w-full px-3 py-2 flex items-center justify-between rounded-xl transition-all text-left"
            style={{
              background: !selectedCategory ? "rgba(16,185,129,0.15)" : "transparent",
              border: `1px solid ${!selectedCategory ? "rgba(16,185,129,0.35)" : "transparent"}`,
            }}
          >
            <span className="font-medium text-sm flex items-center gap-1.5" style={{ color: "#e8edf5" }}>
              <Sparkles className="w-3 h-3" style={{ color: "#10b981" }} />
              All Workflows
            </span>
            <span className="text-[11px] font-medium" style={{ color: "#10b981" }}>
              {categories.reduce((s, c) => s + (c.count || 0), 0)}
            </span>
          </button>

          {categories.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className="w-full px-3 py-2 flex items-center justify-between rounded-xl transition-all text-left"
                style={{
                  background: active ? "rgba(16,185,129,0.15)" : "transparent",
                  border: `1px solid ${active ? "rgba(16,185,129,0.35)" : "transparent"}`,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: active ? "#ffffff" : "#b0bec5" }}
                >
                  {cat.name}
                </span>
                <span className="text-[11px] font-medium" style={{ color: "#10b981" }}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </GlassPanel>

      {/* Filters */}
      <GlassPanel>
        <h4 className="text-sm font-semibold flex items-center gap-2 mb-2.5" style={{ color: "#34d399" }}>
          <Filter className="w-3.5 h-3.5" />
          Complexity
        </h4>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {COMPLEXITIES.map((c) => (
            <button
              key={c}
              onClick={() => onComplexity(c)}
              className="px-3 py-1 text-[11px] rounded-full font-medium transition-all"
              style={{
                background: complexityFilter === c ? "rgba(16,185,129,0.20)" : "rgba(26,39,58,0.60)",
                border: `1px solid ${complexityFilter === c ? "rgba(16,185,129,0.55)" : "rgba(255,255,255,0.06)"}`,
                color: complexityFilter === c ? "#ffffff" : "#8a9bb0",
              }}
            >
              {COMPLEXITY_LABELS[c]}
            </button>
          ))}
        </div>

        <h4 className="text-sm font-semibold flex items-center gap-2 mb-2.5" style={{ color: "#34d399" }}>
          <Zap className="w-3.5 h-3.5" />
          Trigger Type
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {TRIGGERS.map((t) => (
            <button
              key={t}
              onClick={() => onTrigger(t)}
              className="px-3 py-1 text-[11px] rounded-full font-medium transition-all"
              style={{
                background: triggerFilter === t ? "rgba(16,185,129,0.20)" : "rgba(26,39,58,0.60)",
                border: `1px solid ${triggerFilter === t ? "rgba(16,185,129,0.55)" : "rgba(255,255,255,0.06)"}`,
                color: triggerFilter === t ? "#ffffff" : "#8a9bb0",
              }}
            >
              {TRIGGER_LABELS[t]}
            </button>
          ))}
        </div>

        <button
          onClick={onReset}
          className="w-full mt-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={{
            background: "rgba(26,39,58,0.60)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#8a9bb0",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(16,185,129,0.15)";
            e.currentTarget.style.color = "#34d399";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(26,39,58,0.60)";
            e.currentTarget.style.color = "#8a9bb0";
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </GlassPanel>
    </aside>
  );
}
