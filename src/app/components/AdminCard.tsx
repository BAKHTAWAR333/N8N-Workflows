import { motion } from "motion/react";
import { MessageCircle, BadgeCheck, ExternalLink, Users, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const WHATSAPP_URL = "https://whatsapp.com/channel/0029VaXXXXXXXXXXXXXX";
const ADMIN_PHOTO =
  "https://images.unsplash.com/photo-1628619487925-e9b8fc4c6b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";

function Pill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.20)",
      }}
    >
      <span style={{ color: "#10b981" }}>{icon}</span>
      <span className="text-xs font-semibold" style={{ color: "#065f46" }}>
        {value}
      </span>
      <span className="text-[11px]" style={{ color: "#6b7280" }}>
        {label}
      </span>
    </div>
  );
}

export function AdminCard() {
  return (
    <section className="mb-8">
      <motion.div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 60%, #ecfdf5 100%)",
          border: "1px solid rgba(16,185,129,0.18)",
          boxShadow:
            "0 20px 50px -16px rgba(16,185,129,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-32 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #10b981, #34d399, #6ee7b7)",
                  filter: "blur(18px)",
                  opacity: 0.55,
                  transform: "scale(1.15)",
                }}
              />
              <div
                className="relative w-28 h-28 rounded-full overflow-hidden"
                style={{
                  border: "4px solid #ffffff",
                  boxShadow:
                    "0 0 0 3px rgba(16,185,129,0.5), 0 12px 32px rgba(16,185,129,0.30)",
                }}
              >
                <ImageWithFallback
                  src={ADMIN_PHOTO}
                  alt="N8N Master profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  border: "3px solid #ffffff",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.40)",
                }}
              >
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
                <h2
                  className="tracking-tight"
                  style={{
                    fontWeight: 800,
                    fontSize: "1.65rem",
                    color: "#0f172a",
                    letterSpacing: "-0.025em",
                  }}
                >
                  N8N Master
                </h2>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  VERIFIED ADMIN
                </span>
              </div>

              <p
                className="mt-1 font-medium"
                style={{ color: "#10b981", fontSize: "0.95rem" }}
              >
                Automation Architect · 10+ years
              </p>

              <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: "#475569" }}>
                Sharing curated n8n automations daily. Join the WhatsApp channel for
                new templates, walkthroughs, and weekly automation tips.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <Pill icon={<Users className="w-3.5 h-3.5" />} value="12K+" label="followers" />
                <Pill icon={<Sparkles className="w-3.5 h-3.5" />} value="500+" label="templates" />
                <Pill icon={<BadgeCheck className="w-3.5 h-3.5" />} value="4.9★" label="rating" />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "#25D366" }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #1ebe57 50%, #128C7E 100%)",
                  color: "#ffffff",
                  boxShadow:
                    "0 10px 28px rgba(37,211,102,0.40), inset 0 1px 0 rgba(255,255,255,0.30)",
                  letterSpacing: "-0.01em",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 14px 36px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.18, 0.89, 0.32, 1.28] }}
              >
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp Channel
                <ExternalLink className="w-3.5 h-3.5 opacity-90" />
              </motion.a>
              <p
                className="text-center mt-2 text-[11px] font-medium"
                style={{ color: "#10b981" }}
              >
                ● Live now · Free to join
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
