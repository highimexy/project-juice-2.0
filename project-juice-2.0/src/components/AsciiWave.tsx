import { useEffect, useRef, useState } from "react";

/**
 * Tło ASCII — fala znaków rozchodząca się od źródła umieszczonego
 * za logo (górna krawędź ekranu, środek). Port algorytmu z openclaw.ai:
 *
 * - siatka komórek z prekomputowanym dystansem od źródła,
 *   envelope (wiązka sin² kąta + falloff + fade-in od środka)
 *   i progiem dithered z macierzy Bayera 4×4
 * - fala biegnąca: (0.5 + 0.5·sin(d·0.3 − t·0.35))³·⁵
 * - mapowanie na rampę znaków ` .:-=+xX#8@`
 * - aktualizacja ~10 fps, pauza przy ukrytej karcie / reduced motion
 */

const RAMP = " .:-=+xX#8@";
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface Cell {
  d: number; // dystans od źródła
  e: number; // envelope (kształt fali)
  t: number; // próg dithered
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

function buildGrid(cols: number, rows: number, sourceRow: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      const x = c - cols / 2;
      const y = (sourceRow - r) * 1.9;
      const d = Math.sqrt(x * x + y * y);
      const beam = Math.pow(Math.sin(Math.atan2(y, x)), 2);
      const falloff = clamp(1.15 - d / 110, 0, 1);
      const centerFade = clamp((d - 24) / 18, 0, 1);
      row.push({
        d,
        e: beam * falloff * centerFade * 1.4,
        t: (BAYER[r % 4][c % 4] + 0.5) / 16,
      });
    }
    grid.push(row);
  }
  return grid;
}

function renderFrame(grid: Cell[][], time: number): string {
  let out = "";
  for (const row of grid) {
    for (const cell of row) {
      let a =
        Math.pow(0.5 + 0.5 * Math.sin(cell.d * 0.3 - time * 0.35), 3.5) *
        cell.e;
      if (a < 0.05) a = 0;
      a = clamp(a, 0, 1);
      const scaled = a * 10;
      const idx = Math.min(
        10,
        Math.floor(scaled) + (scaled % 1 > cell.t ? 1 : 0),
      );
      out += RAMP[idx];
    }
    out += "\n";
  }
  return out;
}

function AsciiWave() {
  const preRef = useRef<HTMLPreElement>(null);
  const gridRef = useRef<Cell[][]>([]);
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

    const measure = () => {
      const vw = window.innerWidth;
      const fs = clamp(vw * 0.0115, 8, 13);
      setFontSize(fs);
      const charW = fs * 0.62 + (fs >= 11 ? 1 : 0.5);
      const charH = fs * 1.22;
      const cols = Math.ceil(vw / charW);
      const rows = Math.ceil(window.innerHeight / charH);
      // Źródło fali tuż nad górną krawędzią — fala "wychodzi" spoza logo
      const sourceRow = rows * 0.045;
      gridRef.current = buildGrid(cols, rows, sourceRow);
      if (preRef.current) {
        preRef.current.textContent = renderFrame(gridRef.current, 0);
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
          preRef.current.textContent = renderFrame(gridRef.current, t / 1000);
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

export default AsciiWave;
