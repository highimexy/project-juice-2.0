import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface Segment {
  label: string;
  color: string;
}

interface WheelCustomProps {
  segments: Segment[];
}

const WheelCustom = ({ segments }: WheelCustomProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const isSpinningRef = useRef(false); // guard bez stale closure
  const angleCurrent = useRef(0);
  const velocity = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const [canvasSize, setCanvasSize] = useState(300);

  const segmentAngle = (2 * Math.PI) / segments.length;

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight - 80; // odejmij przycisk + gap
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

  const animate = useCallback(() => {
    velocity.current *= 0.995;
    angleCurrent.current += velocity.current;

    if (angleCurrent.current > 2 * Math.PI) {
      angleCurrent.current -= 2 * Math.PI;
    }

    if (velocity.current < 0.00001) {
      velocity.current = 0;
      isSpinningRef.current = false;
      setIsSpinning(false);
      drawWheel();
      return;
    }

    drawWheel();
    animationFrameId.current = requestAnimationFrame(animate);
  }, [drawWheel]);

  const spin = () => {
    if (isSpinningRef.current) return;

    isSpinningRef.current = true;
    setIsSpinning(true);

    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

    const winIdx = Math.floor(Math.random() * segments.length);
    const targetAngle = winIdx * segmentAngle - Math.PI / 2 + segmentAngle / 2;
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
    const delta = targetAngle + fullSpins - (angleCurrent.current % (2 * Math.PI));
    velocity.current = delta * 0.005;

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[420px] h-full flex flex-col items-center justify-center gap-6">
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
  );
};

export default WheelCustom;
