import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, BadgeCheck, ExternalLink, Users, Sparkles, X, Github, Facebook, Instagram, Mail, Phone, MapPin, User } from "lucide-react";
import { useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import adminPhoto from "../../imports/WhatsApp_Image_2026-06-07_at_2.53.20_AM.jpeg";

const PHONE = "03200276941";
const PHONE_INTL = "+923200276941";
const EMAIL = "bakhtawark085@gmail.com";
const WHATSAPP_URL = "https://chat.whatsapp.com/E78geSMJuAZEve5PmNZwIA";
const GITHUB_URL = "https://github.com/BAKHTAWAR333";
const INSTAGRAM_URL = "https://www.instagram.com/muhammad_bakhtawar_khan?igsh=aWE5OXUxczhhcmZ5";
const FACEBOOK_URL = "https://www.facebook.com/share/19A14K5hpc/";
const ADMIN_PHOTO = adminPhoto;

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
}

function Pill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-4 py-3 rounded-2xl flex-1 min-w-0"
      style={{
        background: "rgba(16,185,129,0.06)",
        border: "1px solid rgba(16,185,129,0.18)",
      }}
    >
      <span style={{ color: "#10b981" }}>{icon}</span>
      <span className="font-bold" style={{ color: "#0f172a", fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
        {value}
      </span>
      <span className="text-[11px] font-medium" style={{ color: "#64748b" }}>
        {label}
      </span>
    </div>
  );
}

export function AdminModal({ open, onClose }: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            background: "rgba(15, 23, 42, 0.40)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.18, 0.89, 0.32, 1.28] }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 60%, #ecfdf5 100%)",
              boxShadow: "0 40px 80px -16px rgba(15,23,42,0.30), 0 1px 0 rgba(255,255,255,0.6) inset",
              border: "1px solid rgba(16,185,129,0.20)",
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(15,23,42,0.08)",
                color: "#64748b",
              }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative blobs */}
            <div
              className="absolute -top-32 -right-24 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute -bottom-24 -left-16 w-60 h-60 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            <div className="relative p-7 sm:p-8 flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #34d399, #6ee7b7)",
                    filter: "blur(18px)",
                    opacity: 0.6,
                    transform: "scale(1.2)",
                  }}
                />
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden"
                  style={{
                    border: "4px solid #ffffff",
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.50), 0 16px 32px rgba(16,185,129,0.30)",
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

              <p className="mt-2 font-semibold" style={{ color: "#10b981", fontSize: "0.95rem" }}>
                Founder · MBK Group · Pakistan
              </p>

              {/* A→Z Contact rows */}
              <div className="w-full mt-5 space-y-2 text-left">
                {[
                  { icon: <User className="w-4 h-4" />, label: "Name", value: "Muhammad Bakhtawar Khan", href: null },
                  { icon: <Phone className="w-4 h-4" />, label: "Phone", value: PHONE, href: `tel:${PHONE_INTL}` },
                  { icon: <Mail className="w-4 h-4" />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Pakistan", href: null },
                ].map((row) => {
                  const content = (
                    <div
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(16,185,129,0.18)",
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.06))",
                          color: "#10b981",
                        }}
                      >
                        {row.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className="text-[10px] font-bold tracking-[0.15em] uppercase"
                          style={{ color: "#94a3b8" }}
                        >
                          {row.label}
                        </div>
                        <div
                          className="font-semibold truncate"
                          style={{ color: "#0f172a", fontSize: "0.88rem" }}
                        >
                          {row.value}
                        </div>
                      </div>
                    </div>
                  );
                  return row.href ? (
                    <a key={row.label} href={row.href} className="block hover:opacity-90 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={row.label}>{content}</div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="flex gap-2 w-full mt-5">
                <Pill icon={<Users className="w-4 h-4" />} value="12K+" label="Followers" />
                <Pill icon={<Sparkles className="w-4 h-4" />} value="500+" label="Templates" />
                <Pill icon={<BadgeCheck className="w-4 h-4" />} value="4.9★" label="Rating" />
              </div>

              {/* Social links */}
              <div className="flex items-center justify-center gap-2.5 mt-5 w-full">
                {[
                  { icon: <Github className="w-4 h-4" />, href: GITHUB_URL, label: "GitHub", bg: "linear-gradient(135deg, #0f172a, #334155)" },
                  { icon: <Facebook className="w-4 h-4" />, href: FACEBOOK_URL, label: "Facebook", bg: "linear-gradient(135deg, #1877F2, #0a5dc2)" },
                  { icon: <Instagram className="w-4 h-4" />, href: INSTAGRAM_URL, label: "Instagram", bg: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" },
                  { icon: <MessageCircle className="w-4 h-4" />, href: WHATSAPP_URL, label: "WhatsApp", bg: "linear-gradient(135deg, #25D366, #128C7E)" },
                  { icon: <Mail className="w-4 h-4" />, href: `mailto:${EMAIL}`, label: "Contact", bg: "linear-gradient(135deg, #10b981, #059669)" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:-translate-y-0.5"
                    style={{
                      background: s.bg,
                      boxShadow: "0 6px 16px rgba(15,23,42,0.18)",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="relative w-full mt-6">
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "#25D366" }}
                  animate={{ scale: [1, 1.06, 1], opacity: [0.30, 0, 0.30] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #1ebe57 50%, #128C7E 100%)",
                    color: "#ffffff",
                    boxShadow:
                      "0 10px 28px rgba(37,211,102,0.40), inset 0 1px 0 rgba(255,255,255,0.30)",
                    letterSpacing: "-0.01em",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 14px 36px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.30)",
                  }}
                  whileTap={{ scale: 0.98 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
