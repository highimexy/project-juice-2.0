import { useEffect, useState, useRef } from "react";

interface Segment {
  label: string;
  color: string;
}

interface WheelCustomProps {
  segments: Segment[];
  onFinished: (segment: string) => void;
  size?: number;
}

const WheelCustom = ({
  segments,
  onFinished,
  size = 300,
}: WheelCustomProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const angleCurrent = useRef(0);
  const velocity = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const segmentAngle = (2 * Math.PI) / segments.length;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    drawWheel();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [segments, size]);

  const drawNeedle = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.translate(centerX, centerY - size);

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 15); 
    ctx.lineTo(-15, 0); 
    ctx.lineTo(15, 0); 
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, size * 2, size * 2);

    segments.forEach((segment, index) => {
      const startAngle = angleCurrent.current + index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, size, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Unbounded, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(segment.label.substring(0, 15), size * 0.9, 0);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.font = "bold 16px Unbounded";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", centerX, centerY);

    drawNeedle(ctx);
  };

  const getCurrentSegment = (): string => {
    const normalizedCurrentAngle =
      (2 * Math.PI - (angleCurrent.current % (2 * Math.PI)) + Math.PI / 2) %
      (2 * Math.PI);

    const index = Math.floor(normalizedCurrentAngle / segmentAngle);

    if (index >= 0 && index < segments.length) {
      return segments[index].label;
    }
    return "";
  };

  const animate = () => {
    if (velocity.current > 0) {
      velocity.current *= 0.995;
      angleCurrent.current += velocity.current;
    }

    if (angleCurrent.current > 2 * Math.PI) {
      angleCurrent.current -= 2 * Math.PI;
    }

    if (velocity.current < 0.00001 && isSpinning) {
      velocity.current = 0;
      setIsSpinning(false);
      setFinished(true);

      const winner = getCurrentSegment();
      onFinished(winner);
      return;
    }

    drawWheel();
    animationFrameId.current = requestAnimationFrame(animate);
  };

  const spin = () => {
    if (isSpinning || isFinished) return;

    setFinished(false);

    const winningSegmentIndex = Math.floor(Math.random() * segments.length);


    let targetAngle =
      winningSegmentIndex * segmentAngle - Math.PI / 2 + segmentAngle / 2;

    const minFullSpins = 5;
    let finalAngle = targetAngle + minFullSpins * 2 * Math.PI;

    const totalAngleToSpin = finalAngle - angleCurrent.current;
    velocity.current = totalAngleToSpin * 0.005;

    setIsSpinning(true);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        paddingBottom: "20px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        onClick={spin}
        style={{ cursor: isSpinning || isFinished ? "default" : "pointer" }}
      />
    </div>
  );
};

export default WheelCustom;
