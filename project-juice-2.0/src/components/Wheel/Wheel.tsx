import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "radix-ui";
import { RotateCw, Trophy, X } from "lucide-react";

export interface Segment {
  label: string;
  color: string;
  weight?: number;
}

interface WheelCustomProps {
  segments: Segment[];
}

// Funkcja łagodząca: zwalnia płynnie pod koniec
const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

const WheelCustom = ({ segments }: WheelCustomProps) => {
  const spinButtonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const isSpinningRef = useRef(false);
  const angleCurrent = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [canvasSize, setCanvasSize] = useState(300);
  const [result, setResult] = useState<Segment | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const segmentAngle = (2 * Math.PI) / segments.length;

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth - 24;
      const h = el.clientHeight - 112;
      setCanvasSize(Math.min(w, h > 150 ? h : w, 420));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = canvasSize / 2;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.save();
    ctx.shadowColor = "rgba(112,144,171,0.15)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(r, r, r - 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    segments.forEach((segment, index) => {
      const startAngle = angleCurrent.current + index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.arc(r, r, r - 4, startAngle, endAngle);
      ctx.lineTo(r, r);
      ctx.closePath();
      const fill = ctx.createRadialGradient(r, r, 0, r, r, r);
      fill.addColorStop(0, "#0c0c11");
      fill.addColorStop(1, segment.color);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.fillStyle = segment.label === "Pudło!" ? "#93939d" : "#d7dce6";
      ctx.font = `bold ${Math.max(11, canvasSize * 0.038)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = "right";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label, r * 0.88, 5);
      ctx.restore();
    });

    const centerR = r * 0.13;
    ctx.beginPath();
    ctx.arc(r, r, centerR, 0, 2 * Math.PI);
    ctx.fillStyle = "#0a0a0d";
    ctx.fill();
    ctx.strokeStyle = "rgba(169,191,209,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const needleH = r * 0.12;
    const needleW = r * 0.04;
    ctx.save();
    ctx.translate(r, needleH * 0.5);
    ctx.beginPath();
    ctx.moveTo(0, needleH);
    ctx.lineTo(-needleW, 0);
    ctx.lineTo(needleW, 0);
    ctx.closePath();
    ctx.fillStyle = "#a9bfd1";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }, [canvasSize, segments, segmentAngle]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  const spin = () => {
    if (isSpinningRef.current) return;

    setIsSpinning(true);
    isSpinningRef.current = true;
    setShowPopup(false);
    setResult(null);

    if (animationFrameId.current)
      cancelAnimationFrame(animationFrameId.current);

    // 1. Losowanie na podstawie wag
    const totalWeight = segments.reduce(
      (acc, seg) => acc + (seg.weight || 1),
      0,
    );
    let random = Math.random() * totalWeight;
    let winIdx = 0;

    for (let i = 0; i < segments.length; i++) {
      random -= segments[i].weight || 1;
      if (random <= 0) {
        winIdx = i;
        break;
      }
    }

    // 2. Precyzyjne obliczenie kąta (strzałka jest na 270 stopniach: 3PI/2)
    const baseTargetAngle =
      (3 * Math.PI) / 2 - (winIdx * segmentAngle + segmentAngle / 2);

    let diff = (baseTargetAngle - angleCurrent.current) % (2 * Math.PI);
    if (diff < 0) diff += 2 * Math.PI;

    // 5 pełnych obrotów + różnica
    const totalRotation = diff + 5 * 2 * Math.PI;
    const startAngle = angleCurrent.current;

    const duration = 5000; // Czas trwania animacji w ms
    const startTime = performance.now();

    // 3. Animacja po czasie, nie po prędkości
    const animate = (time: number) => {
      const elapsed = time - startTime;

      if (elapsed >= duration) {
        angleCurrent.current = (startAngle + totalRotation) % (2 * Math.PI);
        drawWheel();
        setIsSpinning(false);
        isSpinningRef.current = false;

        // Mamy 100% pewności, że wynik na ekranie = wynik z kodu
        setResult(segments[winIdx]);
        setShowPopup(true);
        return;
      }

      const progress = elapsed / duration;
      const easeProgress = easeOutQuart(progress);

      angleCurrent.current = startAngle + totalRotation * easeProgress;
      drawWheel();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full max-w-[420px] h-full flex flex-col items-center justify-center gap-6 relative"
      >
        <div className="wheel-shell relative rounded-full p-2.5">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            role="img"
            aria-label="Koło fortuny z rabatami, dodatkowymi ml i polami Pudło"
            className="relative block rounded-full"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[#a9bfd1]" aria-hidden="true">
            <svg width={Math.max(16, canvasSize * 0.065)} height={Math.max(16, canvasSize * 0.065)} viewBox="0 0 24 24" fill="none">
              <path d="M12 2 14 8 22 12 16 14 12 22 10 16 2 12 8 10Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </div>
        <button
          ref={spinButtonRef}
          onClick={spin}
          disabled={isSpinning}
          className="juice-chip juice-control min-h-12 w-48 px-6 py-3 text-base disabled:opacity-50 disabled:cursor-wait"
        >
          <RotateCw size={17} strokeWidth={1.5} aria-hidden="true" />
          {isSpinning ? "Kręci się..." : "ZAKRĘĆ"}
        </button>
      </div>

      <Dialog.Root open={showPopup} onOpenChange={setShowPopup}>
        <AnimatePresence>
          {showPopup && result && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 backdrop-blur-md p-4"
                >
                  <Dialog.Content asChild forceMount onCloseAutoFocus={(event) => { event.preventDefault(); spinButtonRef.current?.focus(); }}>
                    <motion.div
                      initial={{ scale: 0.96, opacity: 0, y: 12 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.96, opacity: 0, y: 12 }}
                      transition={{ duration: 0.2 }}
                      className={`juice-surface info-feature ${result.label === "Pudło!" ? "info-feature-purple" : "info-feature-delivery"} wheel-result relative w-full max-w-sm p-6 text-center outline-none sm:p-8`}
                    >
                      <div className="relative z-10 flex flex-col items-center gap-5">
                        <div className="flex w-full items-center justify-between">
                          <span className="juice-chip px-3 py-2 text-xs">Twój wynik</span>
                          <Dialog.Close className="juice-chip juice-control h-9 w-9" aria-label="Zamknij okno">
                            <X size={17} aria-hidden="true" />
                          </Dialog.Close>
                        </div>
                        <span className="juice-chip info-icon mt-2 h-16 w-16 rounded-2xl">
                          {result.label === "Pudło!" ? <RotateCw size={28} strokeWidth={1.5} aria-hidden="true" /> : <Trophy size={28} strokeWidth={1.5} aria-hidden="true" />}
                        </span>
                        <Dialog.Title asChild>
                          <h2 className="font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-white/90">{result.label}</h2>
                        </Dialog.Title>
                        <Dialog.Description className="wheel-result-description text-base text-white/60">
                          {result.label === "Pudło!" ? "Tym razem bez nagrody. Spróbuj szczęścia ponownie!" : "Dobry obrót! Na kole wypadła nagroda."}
                        </Dialog.Description>
                        <Dialog.Close className="juice-chip juice-control mt-2 min-h-12 w-full px-6 py-3 text-sm">Zamknij</Dialog.Close>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </motion.div>
              </Dialog.Overlay>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
};

export default WheelCustom;
