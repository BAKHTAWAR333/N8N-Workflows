import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, AlertTriangle, RefreshCw, Search, Sparkles } from "lucide-react";

import { SplashScreen } from "./components/SplashScreen";
import { Navbar } from "./components/Navbar";
import { AdminModal } from "./components/AdminModal";
import { FiltersBar } from "./components/FiltersBar";
import { WorkflowCard, type Workflow } from "./components/WorkflowCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { Pagination } from "./components/Pagination";
import { Toast, type ToastMessage } from "./components/Toast";
import { Footer } from "./components/Footer";

const API_TEMPLATES = "https://n8nster.vercel.app/api/n8n?endpoint=templates";
const LIMIT = 25;

function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const push = useCallback((text: string, isError = false) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((m) => [...m, { id, text, isError }]);
  }, []);
  const dismiss = useCallback((id: string) => {
    setMessages((m) => m.filter((msg) => msg.id !== id));
  }, []);
  return { messages, push, dismiss };
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [complexityFilter, setComplexityFilter] = useState("");
  const [triggerFilter, setTriggerFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("n8nhub_favorites") || "[]");
    } catch {
      return [];
    }
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const toast = useToast();

  const fetchWorkflows = useCallback(async () => {
    setLoading(true);
    setError(false);
    let url = `${API_TEMPLATES}&limit=${LIMIT}&page=${currentPage}`;
    if (complexityFilter) url += `&complexity=${encodeURIComponent(complexityFilter)}`;
    if (triggerFilter) url += `&triggerType=${encodeURIComponent(triggerFilter)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      let templates: Workflow[] = data.templates || [];
      const pagination = data.pagination ?? { currentPage: 1, totalPages: 1 };
      let tPages = pagination.totalPages ?? 1;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        templates = templates.filter((t) => (t.name ?? "").toLowerCase().includes(q));
        tPages = Math.max(1, Math.ceil(templates.length / LIMIT));
        const start = (currentPage - 1) * LIMIT;
        templates = templates.slice(start, start + LIMIT);
      }

      setWorkflows(templates);
      setTotalPages(tPages);
      setTotalCount(templates.length);
    } catch {
      setError(true);
      toast.push("Failed to load workflows — check your connection", true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, complexityFilter, triggerFilter, searchQuery]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentPage !== 1) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
        localStorage.setItem("n8nhub_favorites", JSON.stringify(next));
        toast.push(prev.includes(id) ? "Removed from favorites" : "Added to favorites");
        return next;
      });
    },
    [toast]
  );

  const handleDetails = useCallback(
    (wf: Workflow) => {
      const desc = wf.description ?? "No description.";
      const preview = desc.length > 60 ? desc.slice(0, 60) + "…" : desc;
      toast.push(`${wf.name} — ${preview}`);
    },
    [toast]
  );

  const resetFilters = useCallback(() => {
    setComplexityFilter("");
    setTriggerFilter("");
    setSearchQuery("");
    setCurrentPage(1);
    toast.push("Filters cleared");
  }, [toast]);

  const activeFilters: string[] = [];
  if (complexityFilter) activeFilters.push(`Complexity: ${complexityFilter}`);
  if (triggerFilter) activeFilters.push(`Trigger: ${triggerFilter}`);
  if (searchQuery) activeFilters.push(`"${searchQuery}"`);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f8fafc 0%, #f0fdf4 50%, #ffffff 100%)",
        color: "#0f172a",
        fontFamily: "Inter, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #059669; }
        input::placeholder { color: #94a3b8; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <SplashScreen onComplete={() => setSplashDone(true)} />

      <AnimatePresence>
        {splashDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar
              searchQuery={searchQuery}
              onSearch={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              onOpenAdmin={() => setAdminOpen(true)}
            />

            {/* Decorative blobs */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "-10%",
                  width: 600,
                  height: 600,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  right: "-10%",
                  width: 500,
                  height: 500,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12" style={{ zIndex: 1 }}>
              {/* === HERO === */}
              <section className="text-center mb-8 pt-4">
                <motion.div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
                  style={{
                    background: "rgba(16,185,129,0.10)",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Sparkles className="w-3 h-3" style={{ color: "#10b981" }} />
                  <span className="text-[11px] font-semibold" style={{ color: "#059669" }}>
                    500+ premium n8n templates
                  </span>
                </motion.div>

                <motion.h1
                  className="tracking-tight whitespace-nowrap"
                  style={{
                    fontWeight: 800,
                    fontSize: "clamp(1.35rem, 6.2vw, 3.25rem)",
                    color: "#0f172a",
                    letterSpacing: "-0.035em",
                    lineHeight: 1.1,
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Explore{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #10b981, #059669)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    n8n Workflows
                  </span>
                </motion.h1>
              </section>

              {/* === FILTERS === */}
              <FiltersBar
                complexityFilter={complexityFilter}
                onComplexity={(v) => {
                  setComplexityFilter(v);
                  setCurrentPage(1);
                }}
                triggerFilter={triggerFilter}
                onTrigger={(v) => {
                  setTriggerFilter(v);
                  setCurrentPage(1);
                }}
                onReset={resetFilters}
                activeFilters={activeFilters}
              />

              {/* === GRID === */}
              <div ref={gridRef}>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : error ? (
                  <div
                    className="rounded-2xl p-10 text-center"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(239,68,68,0.20)",
                      boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
                    }}
                  >
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: "#ef4444" }} />
                    <p className="mb-4 font-medium" style={{ color: "#64748b" }}>
                      Something went wrong loading workflows.
                    </p>
                    <button
                      onClick={fetchWorkflows}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff",
                        boxShadow: "0 6px 16px rgba(16,185,129,0.35)",
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry
                    </button>
                  </div>
                ) : workflows.length === 0 ? (
                  <div
                    className="rounded-2xl p-10 text-center"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(15,23,42,0.06)",
                      boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
                    }}
                  >
                    <Search className="w-10 h-10 mx-auto mb-3" style={{ color: "#10b981" }} />
                    <p style={{ color: "#64748b" }}>No workflows found. Try adjusting your filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {workflows.map((wf, i) => (
                      <WorkflowCard
                        key={wf.id}
                        workflow={wf}
                        isFavorite={favorites.includes(wf.id)}
                        onToggleFavorite={toggleFavorite}
                        onDetails={handleDetails}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              />
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {splashDone && showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-7 left-7 w-12 h-12 rounded-full flex items-center justify-center z-50"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 8px 24px rgba(16,185,129,0.45)",
              color: "#fff",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <Toast messages={toast.messages} onDismiss={toast.dismiss} />

      <AdminModal open={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}
