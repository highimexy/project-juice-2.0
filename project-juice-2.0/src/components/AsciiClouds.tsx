import { useEffect, useRef, useState } from "react";

/**
 * Tło ASCII — klasyczne chmurki dryfujące po ekranie.
 *
 * Kształt jak z ikonki pogody: 3 garby (środkowy najwyższy, boczne niższe)
 * + małe "skrajne" bąbelki, osadzone na szerokiej, płaskiej podstawie.
 * Każda chmurka to suma-union gaussowskich elips (max zamiast sumy,
 * dzięki czemu doliny między garbami są wyraźne), krawędzie ditheringowane
 * macierzą Bayera 4×4, rampa ` .:-=+xX#8`.
 *
 * - chmurki płyną poziomo (z zawijaniem) z różnymi prędkościami (paralaksa)
 *   i delikatnie kołyszą się w pionie
 * - dwa kształty: "classic" i "wide" dla urozmaicenia
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
  rx: number; // poziomy promień elipsy
  ry: number; // pionowy promień elipsy
}

interface CloudDef {
  puffs: Puff[]; // kształt chmurki
  y: number; // 0..1 — pionowa pozycja środka chmurki
  x0: number; // 0..1 — startowa pozycja pozioma
  speed: number; // ułamek szerokości ekranu na sekundę
  scale: number; // rozmiar chmurki
  bobAmp: number; // amplituda pionowego kołysania (w komórkach)
  bobSpeed: number; // szybkość kołysania (rad/s)
}

/** Klasyczna chmurka: 3 garby + skraje, płaska podstawa */
const PUFFS_CLASSIC: Puff[] = [
  { dx: 0, dy: 1.7, rx: 6.0, ry: 1.1 }, // szeroka płaska podstawa
  { dx: 0, dy: -0.6, rx: 2.4, ry: 2.4 }, // wysoki garb środkowy
  { dx: -3.0, dy: -0.7, rx: 1.9, ry: 1.9 }, // garb lewy
  { dx: 3.0, dy: -0.7, rx: 1.9, ry: 1.9 }, // garb prawy
  { dx: -5.7, dy: 0.5, rx: 1.1, ry: 1.1 }, // skraj lewy
  { dx: 5.7, dy: 0.5, rx: 1.1, ry: 1.1 }, // skraj prawy
];

/** Szeroka, niższa chmurka — urozmaicenie */
const PUFFS_WIDE: Puff[] = [
  { dx: 0, dy: 1.9, rx: 8.0, ry: 1.0 }, // długa płaska podstawa
  { dx: 0, dy: -0.5, rx: 2.8, ry: 2.0 }, // garb środkowy
  { dx: -4.0, dy: -0.3, rx: 2.2, ry: 1.7 }, // garb lewy
  { dx: 4.0, dy: -0.3, rx: 2.2, ry: 1.7 }, // garb prawy
  { dx: -7.0, dy: 0.9, rx: 1.2, ry: 1.0 }, // skraj lewy
  { dx: 7.0, dy: 0.9, rx: 1.2, ry: 1.0 }, // skraj prawy
];

/** Chmurki na różnych wysokościach, z różnymi prędkościami (paralaksa) */
const CLOUDS: CloudDef[] = [
  { puffs: PUFFS_CLASSIC, y: 0.13, x0: 0.0, speed: 0.016, scale: 1.5, bobAmp: 0.7, bobSpeed: 0.14 },
  { puffs: PUFFS_WIDE, y: 0.28, x0: 0.5, speed: 0.01, scale: 1.4, bobAmp: 1.0, bobSpeed: 0.1 },
  { puffs: PUFFS_CLASSIC, y: 0.42, x0: 0.78, speed: 0.022, scale: 1.2, bobAmp: 0.5, bobSpeed: 0.19 },
  { puffs: PUFFS_WIDE, y: 0.2, x0: 0.3, speed: 0.013, scale: 1.2, bobAmp: 0.8, bobSpeed: 0.12 },
  { puffs: PUFFS_CLASSIC, y: 0.5, x0: 0.1, speed: 0.019, scale: 1.4, bobAmp: 0.6, bobSpeed: 0.16 },
  { puffs: PUFFS_CLASSIC, y: 0.35, x0: 0.88, speed: 0.026, scale: 1.1, bobAmp: 0.5, bobSpeed: 0.21 },
  { puffs: PUFFS_WIDE, y: 0.58, x0: 0.4, speed: 0.008, scale: 1.8, bobAmp: 1.2, bobSpeed: 0.08 },
];

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

function renderFrame(cols: number, rows: number, time: number): string {
  // pozycje chmur w tym kadrze — liczone raz na klatkę
  const clouds = CLOUDS.map((cl) => {
    const width = 18 * cl.scale;
    const span = cols + width * 2;
    return {
      puffs: cl.puffs,
      cx: (((cl.x0 + time * cl.speed) % 1) * span) - width,
      cy: cl.y * rows + Math.sin(time * cl.bobSpeed) * cl.bobAmp,
      scale: cl.scale,
      maxDy: 6 * cl.scale,
    };
  });

  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let v = 0;
      for (const cl of clouds) {
        const dy = r - cl.cy;
        if (dy > cl.maxDy || dy < -cl.maxDy) continue;
        // union bąbelków — max zamiast sumy, żeby doliny między garbami były widoczne
        for (const p of cl.puffs) {
          const prx = p.rx * cl.scale;
          const pry = p.ry * cl.scale;
          const pdx = (c - (cl.cx + p.dx * cl.scale)) / prx;
          const pdy = (dy - p.dy * cl.scale) / pry;
          if (Math.abs(pdx) > 2.4 || Math.abs(pdy) > 2.4) continue;
          const g = Math.exp(-(pdx * pdx + pdy * pdy));
          if (g > v) v = g;
        }
      }

      let a = clamp(v / 0.35, 0, 1);
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
