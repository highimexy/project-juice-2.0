import { useEffect, useRef, useState } from "react";

/**
 * Tło ASCII — puszyste chmurki dryfujące po ekranie (zamiennik fali).
 *
 * - każda chmurka to wiązka "bąbelków" gaussowskich (PUFFS) z miękko
 *   ditherowanymi krawędziami (macierz Bayera 4×4, rampa ` .:-=+xX#8`)
 * - chmurki płyną poziomo (z zawijaniem) z różnymi prędkościami
 *   (paralaksa) i delikatnie kołyszą się w pionie
 * - aktualizacja ~10 fps, pauza przy ukrytej karcie / reduced motion
 */

const RAMP = " .:-=+xX#8"; // bez "@" — jaśniejszy, "puszysty" rdzeń chmurki
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface Puff {
  dx: number;
  dy: number;
  r: number;
}

interface CloudDef {
  y: number; // 0..1 — pionowa pozycja środka chmurki
  x0: number; // 0..1 — startowa pozycja pozioma
  speed: number; // ułamek szerokości ekranu na sekundę
  scale: number; // rozmiar chmurki
  bobAmp: number; // amplituda pionowego kołysania (w komórkach)
  bobSpeed: number; // szybkość kołysania (rad/s)
}

/** "Bąbelki" układające się w puszysty kształt chmurki */
const PUFFS: Puff[] = [
  { dx: 0, dy: 0, r: 2.2 },
  { dx: -2.6, dy: 0.6, r: 1.5 },
  { dx: 2.7, dy: 0.5, r: 1.6 },
  { dx: -1.3, dy: -0.8, r: 1.4 },
  { dx: 1.2, dy: -0.9, r: 1.5 },
  { dx: 4.6, dy: 1.1, r: 1.0 },
  { dx: -4.6, dy: 1.2, r: 1.0 },
  { dx: 0.2, dy: 0.9, r: 1.9 },
];

/** Chmurki na różnych wysokościach, z różnymi prędkościami (paralaksa) */
const CLOUDS: CloudDef[] = [
  { y: 0.13, x0: 0.0, speed: 0.016, scale: 1.5, bobAmp: 0.7, bobSpeed: 0.14 },
  { y: 0.28, x0: 0.5, speed: 0.01, scale: 2.1, bobAmp: 1.0, bobSpeed: 0.1 },
  { y: 0.42, x0: 0.78, speed: 0.022, scale: 1.2, bobAmp: 0.5, bobSpeed: 0.19 },
  { y: 0.2, x0: 0.3, speed: 0.013, scale: 1.7, bobAmp: 0.8, bobSpeed: 0.12 },
  { y: 0.5, x0: 0.1, speed: 0.019, scale: 1.4, bobAmp: 0.6, bobSpeed: 0.16 },
  { y: 0.35, x0: 0.88, speed: 0.026, scale: 1.1, bobAmp: 0.5, bobSpeed: 0.21 },
  { y: 0.58, x0: 0.4, speed: 0.008, scale: 2.4, bobAmp: 1.2, bobSpeed: 0.08 },
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

function renderFrame(cols: number, rows: number, time: number): string {
  // pozycje chmur w tym kadrze — liczone raz na klatkę
  const clouds = CLOUDS.map((cl) => {
    const width = 13 * cl.scale;
    const span = cols + width * 2;
    return {
      cx: (((cl.x0 + time * cl.speed) % 1) * span) - width,
      cy: cl.y * rows + Math.sin(time * cl.bobSpeed) * cl.bobAmp,
      scale: cl.scale,
      maxDy: 4.5 * cl.scale,
    };
  });

  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let v = 0;
      for (const cl of clouds) {
        const dy = r - cl.cy;
        if (dy > cl.maxDy || dy < -cl.maxDy) continue;
        for (const p of PUFFS) {
          const pr = p.r * cl.scale;
          const pdx = c - (cl.cx + p.dx * cl.scale);
          if (Math.abs(pdx) > pr * 2.4) continue;
          const pdy = dy - p.dy * cl.scale;
          if (Math.abs(pdy) > pr * 2.4) continue;
          v += Math.exp(-(pdx * pdx + pdy * pdy) / (pr * pr));
        }
      }

      let a = clamp(v / 1.7, 0, 1);
      if (a < 0.05) a = 0;
      const scaled = a * 9; // rampa ma 10 znaków (0..9)
      const idx = Math.min(
        9,
        Math.floor(scaled) +
          (scaled % 1 > (BAYER[r % 4][c % 4] + 0.5) / 16 ? 1 : 0),
      );
      out += RAMP[idx];
    }
    out += "\n";
  }
  return out;
}

function AsciiClouds() {
  const preRef = useRef<HTMLPreElement>(null);
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let last = 0;
    let disposed = false;
    let visible = true;
    let resizeTimer = 0;
    let cols = 0;
    let rows = 0;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const fs = clamp(vw * 0.0115, 8, 13);
      setFontSize(fs);
      const charW = fs * 0.62 + (fs >= 11 ? 1 : 0.5);
      const charH = fs * 1.22;
      cols = Math.ceil(vw / charW);
      rows = Math.ceil(vh / charH);
      if (preRef.current) {
        preRef.current.textContent = renderFrame(cols, rows, 0);
      }
    };

    const tick = (t: number) => {
      if (disposed || !visible || document.hidden) {
        raf = 0;
        return;
      }
      if (t - last >= 100) {
        last = t;
        if (preRef.current) {
          preRef.current.textContent = renderFrame(cols, rows, t / 1000);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (disposed || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    measure();
    if (!reduced) {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 250);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-start"
    >
      <pre
        ref={preRef}
        style={{
          fontFamily:
            "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
          fontSize: `${fontSize}px`,
          lineHeight: 1.22,
          letterSpacing: fontSize >= 11 ? "1px" : "0.5px",
          color: "#7090ab",
          opacity: 0.5,
          margin: 0,
          padding: "0 4px",
          userSelect: "none",
          whiteSpace: "pre",
          maskImage:
            "radial-gradient(ellipse 120% 105% at 50% -8%, #000 15%, rgba(0,0,0,0.85) 45%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 105% at 50% -8%, #000 15%, rgba(0,0,0,0.85) 45%, transparent 78%)",
        }}
      />
    </div>
  );
}

export default AsciiClouds;
