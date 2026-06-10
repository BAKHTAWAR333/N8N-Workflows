import { Search, Zap } from "lucide-react";
import { useRef, useEffect } from "react";
import adminPhoto from "../../imports/WhatsApp_Image_2026-06-07_at_2.53.20_AM.jpeg";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NavbarProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  onOpenAdmin: () => void;
}

export function Navbar({ searchQuery, onSearch, onOpenAdmin }: NavbarProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(val), 300);
  };

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        borderBottom: "1px solid rgba(16,185,129,0.12)",
        boxShadow: "0 1px 0 rgba(16,185,129,0.04), 0 8px 24px rgba(15,23,42,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 6px 16px rgba(16,185,129,0.35)",
            }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="tracking-tight"
              style={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              n8n<span style={{ color: "#10b981" }}>Hub</span>
            </span>
            <span className="text-[10px] font-medium mt-0.5" style={{ color: "#94a3b8" }}>
              Workflow Explorer
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg px-2">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "#10b981" }}
            />
            <input
              type="text"
              defaultValue={searchQuery}
              onChange={handleSearch}
              placeholder="Search workflows…"
              className="w-full rounded-full py-2.5 pl-10 pr-4 text-sm transition-all outline-none"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(16,185,129,0.18)",
                color: "#0f172a",
                boxShadow: "inset 0 1px 2px rgba(15,23,42,0.04)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#10b981";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(16,185,129,0.18)";
                e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(15,23,42,0.04)";
              }}
            />
          </div>
        </div>

        {/* Admin button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenAdmin}
            aria-label="Admin Info"
            className="inline-flex items-center gap-2 pl-1 pr-1 sm:pr-4 py-1 rounded-full font-semibold text-xs sm:text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#ffffff",
              boxShadow: "0 6px 16px rgba(16,185,129,0.30)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(16,185,129,0.40)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(16,185,129,0.30)";
            }}
          >
            <span
              className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid #ffffff" }}
            >
              <ImageWithFallback
                src={adminPhoto}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </span>
            <span className="hidden sm:inline pr-1">Admin Info</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
