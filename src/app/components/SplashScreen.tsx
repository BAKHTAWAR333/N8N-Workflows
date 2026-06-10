import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import adminPhoto from "../../imports/WhatsApp_Image_2026-06-07_at_2.53.20_AM.jpeg";

interface SplashScreenProps {
  onComplete: () => void;
}

const TOTAL_DURATION = 10000;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / TOTAL_DURATION);
      setProgress(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800);
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.a})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #ecfdf5 0%, #ffffff 45%, #f0fdf4 100%)",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.08) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 35%, transparent 75%)",
            }}
          />

          {/* Particles */}
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Content */}
          <div className="relative h-full w-full flex items-center justify-center px-5 sm:px-6">
            <div className="w-full max-w-xl flex flex-col items-center">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.18, 0.89, 0.32, 1.28] }}
                className="relative"
              >
                <motion.div
                  className="absolute"
                  style={{
                    width: 170,
                    height: 170,
                    left: "50%",
                    top: "50%",
                    marginLeft: -85,
                    marginTop: -85,
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(16,185,129,0.45)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{
                      background: "#10b981",
                      boxShadow: "0 0 14px #10b981",
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute"
                  style={{
                    width: 210,
                    height: 210,
                    left: "50%",
                    top: "50%",
                    marginLeft: -105,
                    marginTop: -105,
                    borderRadius: "50%",
                    border: "1px solid rgba(16,185,129,0.18)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="absolute inset-0 rounded-[28px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981, #34d399, #6ee7b7)",
                    filter: "blur(28px)",
                    opacity: 0.55,
                  }}
                  animate={{ opacity: [0.4, 0.75, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div
                  className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "3px solid #ffffff",
                    boxShadow:
                      "0 0 0 3px rgba(16,185,129,0.55), 0 20px 50px rgba(16,185,129,0.35)",
                  }}
                >
                  <ImageWithFallback
                    src={adminPhoto}
                    alt="Muhammad Bakhtawar Khan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "3px solid #ffffff",
                    boxShadow: "0 6px 14px rgba(16,185,129,0.45)",
                  }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              {/* Name */}
              <div className="overflow-hidden mt-9 sm:mt-10 px-2 w-full">
                <motion.h1
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6,
                    ease: [0.18, 0.89, 0.32, 1.28],
                  }}
                  className="text-center tracking-tight break-words"
                  style={{
                    fontWeight: 900,
                    fontSize: "clamp(1.1rem, 5.2vw, 2.4rem)",
                    color: "#0f172a",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  MUHAMMAD BAKHTAWAR KHAN
                </motion.h1>
              </div>

              <motion.div
                className="mt-3 flex items-center gap-2 text-xs sm:text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <span
                  className="px-2.5 py-1 rounded-full font-bold tracking-[0.2em] uppercase"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "#fff",
                    fontSize: "0.65rem",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.35)",
                  }}
                >
                  Digital Empire
                </span>
                <span style={{ color: "#94a3b8" }}>·</span>
                <span
                  className="font-semibold tracking-[0.25em] uppercase"
                  style={{ color: "#10b981", fontSize: "0.72rem" }}
                >
                  Pakistan
                </span>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="mt-6 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)",
                }}
                initial={{ width: 0 }}
                animate={{ width: 260 }}
                transition={{ duration: 0.9, delay: 1.4 }}
              />

              {/* Progress bar */}
              <motion.div
                className="mt-8 w-full max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <div
                  className="w-full overflow-hidden rounded-full relative"
                  style={{
                    height: 6,
                    background: "rgba(16,185,129,0.10)",
                    border: "1px solid rgba(16,185,129,0.18)",
                  }}
                >
                  <div
                    className="h-full rounded-full relative"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
                      transition: "width 0.1s linear",
                      boxShadow: "0 0 10px rgba(16,185,129,0.55)",
                    }}
                  >
                    <motion.div
                      className="absolute top-0 bottom-0 w-12"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                      }}
                      animate={{ x: ["-100%", "1200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span
                    className="text-[11px] font-semibold tracking-[0.25em] uppercase"
                    style={{ color: "#10b981" }}
                  >
                    Loading · {Math.floor(progress)}%
                  </span>
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="mt-6 text-center text-xs tracking-[0.3em] uppercase"
                style={{ color: "#94a3b8", fontWeight: 600 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
               Engineered for the future of automation, inshallah.
              </motion.p>
            </div>
          </div>

          {/* Corner brackets */}
          {[
            "top-5 left-5",
            "top-5 right-5 rotate-90",
            "bottom-5 right-5 rotate-180",
            "bottom-5 left-5 -rotate-90",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 ${pos}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + i * 0.1 }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{ background: "rgba(16,185,129,0.55)" }}
              />
              <div
                className="absolute top-0 left-0 h-full w-px"
                style={{ background: "rgba(16,185,129,0.55)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
