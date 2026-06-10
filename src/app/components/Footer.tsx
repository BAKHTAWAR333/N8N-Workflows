import {
  Zap,
  Heart,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

const PHONE = "03200276941";
const PHONE_INTL = "+923200276941";
const EMAIL = "bakhtawark085@gmail.com";
const WHATSAPP_URL = "https://chat.whatsapp.com/E78geSMJuAZEve5PmNZwIA";

export function Footer() {
  return (
    <footer
      className="mt-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f0fdf4 60%, #ecfdf5 100%)",
        borderTop: "1px solid rgba(16,185,129,0.18)",
      }}
    >
      <div
        className="absolute -top-24 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.16) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(52,211,153,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 10px 24px rgba(16,185,129,0.35)",
              }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none text-left">
              <div
                className="tracking-tight"
                style={{
                  fontWeight: 900,
                  fontSize: "1.25rem",
                  color: "#0f172a",
                  letterSpacing: "-0.025em",
                }}
              >
                n8n<span style={{ color: "#10b981" }}>Hub</span>
              </div>
              <div
                className="mt-1 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: "#10b981" }}
              >
                by MBK Group
              </div>
            </div>
          </div>

          <p
            className="mt-4 text-sm leading-relaxed max-w-md"
            style={{ color: "#475569" }}
          >
            Crafted with care by{" "}
            <span style={{ color: "#0f172a", fontWeight: 700 }}>
              Muhammad Bakhtawar Khan
            </span>{" "}
            — premium n8n automations, templates, and workflows.
          </p>
        </div>

        {/* CTA strip */}
        <div
          className="mt-8 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            boxShadow: "0 16px 40px rgba(16,185,129,0.30)",
          }}
        >
          <div className="text-center sm:text-left">
            <div
              className="font-bold tracking-tight"
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Join the MBK Automation Community
            </div>
            <div
              className="text-[13px] mt-0.5"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              Free templates · Weekly drops · Direct support
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5"
              style={{
                background: "#ffffff",
                color: "#059669",
                boxShadow: "0 8px 18px rgba(0,0,0,0.12)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-transform hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.40)",
              }}
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        <div
          className="mt-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.30), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p
            className="text-xs sm:text-sm flex flex-wrap items-center justify-center sm:justify-start gap-1.5"
            style={{ color: "#64748b" }}
          >
            © 2026 n8nHub · Created by
            <span style={{ color: "#0f172a", fontWeight: 700 }}>MBK Group</span>
            with
            <Heart
              className="w-3.5 h-3.5"
              style={{ color: "#ef4444", fill: "#ef4444" }}
            />
            in Pakistan
          </p>
          <p className="text-xs sm:text-sm font-semibold flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <a
              href={`tel:${PHONE_INTL}`}
              className="inline-flex items-center gap-1.5 hover:underline"
              style={{ color: "#10b981" }}
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE}
            </a>
            <span style={{ color: "#cbd5e1" }}>·</span>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-1.5 hover:underline"
              style={{ color: "#10b981" }}
            >
              <Mail className="w-3.5 h-3.5" />
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
