import { Heart, Github, Download, Info, GitBranch, Box, Timer, Webhook, Play } from "lucide-react";
import { motion } from "motion/react";

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  category?: string;
  complexity?: string;
  triggerType?: string;
  nodeCount?: number;
  githubPath?: string;
  downloadUrl?: string;
}

interface WorkflowCardProps {
  workflow: Workflow;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onDetails: (wf: Workflow) => void;
  index: number;
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const TRIGGER_ICONS: Record<string, React.ReactNode> = {
  Manual: <Play className="w-3 h-3" />,
  Scheduled: <Timer className="w-3 h-3" />,
  Webhook: <Webhook className="w-3 h-3" />,
  Triggered: <ZapIcon className="w-3 h-3" />,
};

const HEADER_GRADIENTS = [
  "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
  "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
  "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
  "linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)",
];

const COMPLEXITY: Record<string, { bg: string; text: string; border: string }> = {
  Simple: { bg: "#d1fae5", text: "#065f46", border: "rgba(16,185,129,0.30)" },
  Medium: { bg: "#fef3c7", text: "#92400e", border: "rgba(217,119,6,0.30)" },
  Complex: { bg: "#fee2e2", text: "#991b1b", border: "rgba(220,38,38,0.30)" },
};

export function WorkflowCard({
  workflow,
  isFavorite,
  onToggleFavorite,
  onDetails,
  index,
}: WorkflowCardProps) {
  const headerBg = HEADER_GRADIENTS[index % HEADER_GRADIENTS.length];
  const comp = workflow.complexity || "Simple";
  const trigger = workflow.triggerType || "Manual";
  const compColors = COMPLEXITY[comp] ?? COMPLEXITY.Simple;

  return (
    <motion.div
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 4px 14px rgba(15,23,42,0.05)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.04, ease: "easeOut" }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 40px -12px rgba(16,185,129,0.20), 0 1px 0 rgba(16,185,129,0.30) inset",
        transition: { duration: 0.25, ease: [0.18, 0.89, 0.32, 1.28] },
      }}
    >
      {/* Header */}
      <div className="relative h-28 flex items-center justify-center" style={{ background: headerBg }}>
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "#ffffff",
            boxShadow: "0 8px 20px rgba(16,185,129,0.20)",
            border: "1px solid rgba(16,185,129,0.20)",
          }}
        >
          <GitBranch className="w-7 h-7" style={{ color: "#10b981" }} />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(workflow.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{
            background: "#ffffff",
            boxShadow: "0 4px 10px rgba(15,23,42,0.10)",
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className="w-4 h-4 transition-all"
            style={{
              color: isFavorite ? "#ef4444" : "#94a3b8",
              fill: isFavorite ? "#ef4444" : "none",
            }}
          />
        </button>

        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          style={{ background: "#ffffff", color: "#059669", border: "1px solid rgba(16,185,129,0.20)" }}
        >
          <Box className="w-3 h-3" />
          {workflow.nodeCount ?? 0} nodes
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="leading-tight"
          style={{
            fontWeight: 700,
            fontSize: "0.98rem",
            color: "#0f172a",
            letterSpacing: "-0.015em",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {workflow.name || "Untitled Workflow"}
        </h3>

        <p
          className="text-[13px] mt-1.5 flex-1"
          style={{
            color: "#64748b",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {workflow.description || "No description available for this workflow."}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{
              background: compColors.bg,
              color: compColors.text,
              border: `1px solid ${compColors.border}`,
            }}
          >
            {comp}
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold"
            style={{
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            {TRIGGER_ICONS[trigger] ?? null}
            {trigger}
          </span>
          {workflow.category && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium truncate max-w-[8rem]"
              style={{
                background: "#f1f5f9",
                color: "#475569",
                border: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              {workflow.category}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className="grid grid-cols-3 gap-1.5 mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}
        >
          {workflow.githubPath ? (
            <a
              href={workflow.githubPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1"
              style={{
                background: "#f1f5f9",
                color: "#0f172a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f172a";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
                e.currentTarget.style.color = "#0f172a";
              }}
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          ) : (
            <span
              className="text-center py-2 rounded-lg text-[11px] font-medium"
              style={{ background: "#f8fafc", color: "#94a3b8" }}
            >
              No repo
            </span>
          )}

          {workflow.downloadUrl ? (
            <a
              href={workflow.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#ffffff",
                boxShadow: "0 4px 10px rgba(16,185,129,0.30)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(16,185,129,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(16,185,129,0.30)";
              }}
            >
              <Download className="w-3 h-3" />
              JSON
            </a>
          ) : (
            <span
              className="text-center py-2 rounded-lg text-[11px] font-medium"
              style={{ background: "#f8fafc", color: "#94a3b8" }}
            >
              Unavail.
            </span>
          )}

          <button
            onClick={() => onDetails(workflow)}
            className="text-center py-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1"
            style={{ background: "#f1f5f9", color: "#475569" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ecfdf5";
              e.currentTarget.style.color = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#475569";
            }}
          >
            <Info className="w-3 h-3" />
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
