import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
      const w = el.clientWidth;
      const h = el.clientHeight - 80;
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
    ctx.shadowColor = "rgba(255,255,255,0.15)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(r, r, r - 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    segments.forEach((segment, index) => {
      const startAngle = angleCurrent.current + index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.arc(r, r, r - 4, startAngle, endAngle);
      ctx.lineTo(r, r);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.max(10, canvasSize * 0.033)}px Unbounded, sans-serif`;
      ctx.textAlign = "right";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label, r * 0.88, 5);
      ctx.restore();
    });

    const centerR = r * 0.13;
    ctx.beginPath();
    ctx.arc(r, r, centerR, 0, 2 * Math.PI);
    ctx.fillStyle = "#111010";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
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
    ctx.fillStyle = "#fff";
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
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="rounded-full drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        />
        <Button
          onClick={spin}
          disabled={isSpinning}
          variant="outline"
          className="w-48 bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-lg disabled:opacity-50"
        >
          {isSpinning ? "Kręci się..." : "ZAKRĘĆ"}
        </Button>
      </div>

      <AnimatePresence>
        {showPopup && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl max-w-sm w-full text-center"
            >
              <span className="font-['Unbounded'] text-[10px] uppercase tracking-widest text-white/40">
                Twój wynik to
              </span>
              <h2
                className="font-['Unbounded'] text-4xl text-white my-2"
                style={{
                  color: result.color !== "#1a1a1a" ? result.color : "white",
                }}
              >
                {result.label}
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 w-full py-3 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 font-['Unbounded'] text-xs uppercase tracking-widest text-white"
              >
                Zamknij
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WheelCustom;
