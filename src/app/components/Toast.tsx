import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ToastMessage {
  id: string;
  text: string;
  isError?: boolean;
}

interface ToastProps {
  messages: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function Toast({ messages, onDismiss }: ToastProps) {
  useEffect(() => {
    const timers = messages.map((msg) => setTimeout(() => onDismiss(msg.id), 2800));
    return () => timers.forEach(clearTimeout);
  }, [messages, onDismiss]);

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col gap-2 items-end">
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl max-w-xs sm:max-w-sm"
            style={{
              background: "#ffffff",
              borderLeft: `4px solid ${msg.isError ? "#ef4444" : "#10b981"}`,
              boxShadow: "0 16px 40px -8px rgba(15,23,42,0.18)",
            }}
          >
            {msg.isError ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#ef4444" }} />
            ) : (
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#10b981" }} />
            )}
            <span className="text-sm font-semibold flex-1" style={{ color: "#0f172a" }}>
              {msg.text}
            </span>
            <button
              onClick={() => onDismiss(msg.id)}
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
              style={{ color: "#94a3b8" }}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
