import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ currentPage, totalPages, onPrev, onNext }: PaginationProps) {
  const btnBase: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(15,23,42,0.08)",
    color: "#0f172a",
    boxShadow: "0 2px 6px rgba(15,23,42,0.04)",
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        style={btnBase}
        onMouseEnter={(e) => {
          if (currentPage > 1) {
            e.currentTarget.style.background = "#ecfdf5";
            e.currentTarget.style.color = "#059669";
            e.currentTarget.style.borderColor = "rgba(16,185,129,0.30)";
          }
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, btnBase);
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>

      <span
        className="text-sm px-5 py-2.5 rounded-xl font-semibold"
        style={{
          background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
          border: "1px solid rgba(16,185,129,0.25)",
          color: "#059669",
        }}
      >
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        style={btnBase}
        onMouseEnter={(e) => {
          if (currentPage < totalPages) {
            e.currentTarget.style.background = "#ecfdf5";
            e.currentTarget.style.color = "#059669";
            e.currentTarget.style.borderColor = "rgba(16,185,129,0.30)";
          }
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, btnBase);
        }}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
