import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import Logo from "./components/Logo.tsx";
import { setAppReady } from "./lib/appReady.ts";

// Zmienna poza komponentem zapobiega powtarzaniu GIF-a
let isFirstLoad = true;

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    const [isLoading, setIsLoading] = useState(isFirstLoad);

    // Loader zachowuje się jak tło strony (RootLayout + AsciiWave):
    // - baza #0a0a0d + identyczna siatka kropek (26px, maska w dół),
    // - ASCII z tej samej rampy/fontu/koloru co fala,
    // - logo jest ŹRÓDŁEM fal: pierścienie rotują przeciwbieżnie
    //   (interferencja jak wiązka sin²), oddychają skalą (falloff)
    //   i wysyłają rozszerzający się front fali (jak fala od logo w tle).
    // Bez slide'ów — tylko rotacja + blur-fade na wyjściu.
    const loadDuration = 1.8;
    const avvrEase = [0.76, 0, 0.24, 1] as const;

    // Wędrująca fala jasności jak w AsciiWave (renderFrame):
    // znak na każdej pozycji = sin(pozycja − czas), więc grzbiety
    // (@#) i doliny (spacje) krążą wokół pierścienia. Zapis bezpośrednio
    // do DOM co 100ms (~10 fps), bez setState → rotacja Framera płynna.
    const RAMP = " .:-=+xX#@";
    const RING_LEN = 240;
    const RING_PHASES = [0, 1.1, 2.2, 3.3, 4.4, 5.5];
    const ringRefs = useRef<Array<SVGTextPathElement | null>>([]);

    const initialRingChars = (() => {
      let s = "";
      for (let i = 0; i < RING_LEN; i++) {
        const a = Math.pow(0.5 + 0.5 * Math.sin(i * 0.22), 1.5);
        s += RAMP[Math.min(RAMP.length - 1, Math.floor(a * RAMP.length))];
      }
      return s;
    })();

    useEffect(() => {
      if (!isLoading) return;
      let tick = 0;
      const id = window.setInterval(() => {
        tick += 1;
        const t = tick * 0.35;
        ringRefs.current.forEach((el, ring) => {
          if (!el) return;
          const phase = RING_PHASES[ring] ?? 0;
          let s = "";
          for (let i = 0; i < RING_LEN; i++) {
            const a = Math.pow(0.5 + 0.5 * Math.sin(i * 0.22 - t + phase), 1.5);
            s += RAMP[Math.min(RAMP.length - 1, Math.floor(a * RAMP.length))];
          }
          el.textContent = s;
        });
      }, 100);
      return () => window.clearInterval(id);
    }, [isLoading]);

    useEffect(() => {
      if (isFirstLoad) {
        const timer = setTimeout(() => {
          setAppReady();
          setIsLoading(false);
          isFirstLoad = false;
        }, loadDuration * 1000);
        return () => clearTimeout(timer);
      }
    }, []);

    const panels = [
      { id: "p1", color: "#0a0a0a" },
      { id: "p2", color: "#111111" },
      { id: "p3", color: "#1a1a1a" },
    ];

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <OgComponent {...props} />
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="initial-loader"
              className="fixed inset-0 z-10000 flex justify-center items-center overflow-hidden bg-[#0a0a0d]"
              exit={{
                opacity: 0,
                filter: "blur(8px)",
                transition: { duration: 0.5, ease: avvrEase },
              }}
            >
              {/* Ta sama siatka kropek co w RootLayout — wygaszana ku dołowi */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(112,144,171,0.28) 1px, transparent 1.5px)",
                  backgroundSize: "26px 26px",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, transparent 90%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, transparent 90%)",
                }}
              />

              {/* Główne logo jako źródło fal + pierścienie ASCII */}
              <div className="relative flex items-center justify-center">
                {/* Układ naprzemienny: statyczny / rosnący / statyczny / rosnący / statyczny.
                    Rosnące fronty przechodzą POMIĘDZY trzema rotującymi pierścieniami. */}
                {/* Front fali 0 — rodzi się w samym środku (przy logo)
                    i wędruje na zewnątrz */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[220px] w-[220px] md:h-[300px] md:w-[300px]"
                  aria-hidden
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.35], opacity: [0, 0.45, 0] }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-wave-0"
                      d="M 200,200 m -110,0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0"
                    />
                  </defs>
                  <text fontSize="12" letterSpacing="0.5" fill="#7090ab">
                    <textPath href="#ascii-ring-wave-0" ref={(el) => { ringRefs.current[0] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                {/* Pierścień zewnętrzny — rotacja w prawo + oddech skali.
                    Styl 1:1 z AsciiWave: ta sama font-stacka, rampa znaków,
                    kolor #7090ab. Masywny: bold, gęste znaki, wyższa opacity. */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[380px] w-[380px] md:h-[520px] md:w-[520px]"
                  aria-hidden
                  animate={{ rotate: 360, scale: [1, 1.035, 1], opacity: [0.85, 0.55, 0.85] }}
                  transition={{
                    rotate: { duration: 24, ease: "linear", repeat: Infinity },
                    scale: { duration: 6, ease: "easeInOut", repeat: Infinity },
                    opacity: { duration: 3.2, ease: "easeInOut", repeat: Infinity },
                  }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-outer"
                      d="M 200,200 m -168,0 a 168,168 0 1,1 336,0 a 168,168 0 1,1 -336,0"
                    />
                  </defs>
                  <text fontSize="17" fontWeight="700" letterSpacing="0.5" fill="#7090ab">
                    <textPath href="#ascii-ring-outer" ref={(el) => { ringRefs.current[1] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                {/* Front fali 1 — startuje w luce między zewnętrznym (r168) a środkowym (r148) */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[355px] w-[355px] md:h-[485px] md:w-[485px]"
                  aria-hidden
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: [0.95, 1.06], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity, delay: 1.2 }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-wave"
                      d="M 200,200 m -158,0 a 158,158 0 1,1 316,0 a 158,158 0 1,1 -316,0"
                    />
                  </defs>
                  <text fontSize="12" letterSpacing="0.5" fill="#7090ab">
                    <textPath href="#ascii-ring-wave" ref={(el) => { ringRefs.current[2] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                {/* Pierścień środkowy — dokłada masy, rotacja w prawo wolniej */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[330px] w-[330px] md:h-[450px] md:w-[450px]"
                  aria-hidden
                  animate={{ rotate: 360, opacity: [0.6, 0.35, 0.6] }}
                  transition={{
                    rotate: { duration: 32, ease: "linear", repeat: Infinity },
                    opacity: { duration: 4, ease: "easeInOut", repeat: Infinity },
                  }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-mid"
                      d="M 200,200 m -148,0 a 148,148 0 1,1 296,0 a 148,148 0 1,1 -296,0"
                    />
                  </defs>
                  <text fontSize="16" fontWeight="700" letterSpacing="0.5" fill="#8aa9c2">
                    <textPath href="#ascii-ring-mid" ref={(el) => { ringRefs.current[3] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                {/* Front fali 2 (przesunięty w fazie) — startuje w luce między środkowym (r148) a wewnętrznym (r128) */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[305px] w-[305px] md:h-[415px] md:w-[415px]"
                  aria-hidden
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: [0.94, 1.07], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity, delay: 0.6 }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-wave-2"
                      d="M 200,200 m -138,0 a 138,138 0 1,1 276,0 a 138,138 0 1,1 -276,0"
                    />
                  </defs>
                  <text fontSize="12" letterSpacing="0.5" fill="#7090ab">
                    <textPath href="#ascii-ring-wave-2" ref={(el) => { ringRefs.current[4] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                {/* Pierścień wewnętrzny — rotacja w lewo (interferencja),
                    przygaszony jak dither Bayera */}
                <motion.svg
                  viewBox="0 0 400 400"
                  className="absolute h-[280px] w-[280px] md:h-[380px] md:w-[380px]"
                  aria-hidden
                  animate={{ rotate: -360, scale: [1, 0.97, 1], opacity: [0.55, 0.3, 0.55] }}
                  transition={{
                    rotate: { duration: 16, ease: "linear", repeat: Infinity },
                    scale: { duration: 5, ease: "easeInOut", repeat: Infinity },
                    opacity: { duration: 2.6, ease: "easeInOut", repeat: Infinity },
                  }}
                  style={{
                    fontFamily:
                      "ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace",
                  }}
                >
                  <defs>
                    <path
                      id="ascii-ring-inner"
                      d="M 200,200 m -128,0 a 128,128 0 1,1 256,0 a 128,128 0 1,1 -256,0"
                    />
                  </defs>
                  <text fontSize="15" fontWeight="700" letterSpacing="0.5" fill="#7090ab">
                    <textPath href="#ascii-ring-inner" ref={(el) => { ringRefs.current[5] = el; }}>{initialRingChars}</textPath>
                  </text>
                </motion.svg>

                <motion.div
                  initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 0.9, ease: avvrEase }}
                >
                  <div className="md:scale-[1.45] origin-center">
                    <Logo id="loader" variant="arc" width={260} fontSize={44} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ENTRY: Szybsze odsłanianie (0.8s zamiast 1.1s) */}
        {!isLoading &&
          panels.map((panel, i) => (
            <motion.div
              key={`entry-${panel.id}`}
              className="fixed inset-0 pointer-events-none"
              style={{
                backgroundColor: panel.color,
                zIndex: 9000 - i,
                transformOrigin: "top",
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.3,
                ease: avvrEase,
                delay: i * 0.05, // Mniejszy odstęp między panelami
              }}
            />
          ))}

        {/* EXIT: Szybsze zakrywanie (0.6s zamiast 0.9s) */}
        {panels.map((panel, i) => (
          <motion.div
            key={`exit-${panel.id}`}
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundColor: panel.color,
              zIndex: 9000 + i,
              transformOrigin: "bottom",
            }}
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              ease: avvrEase,
              delay: i * 0.05,
            }}
          />
        ))}
      </>
    );
  };

  return TransitionComponent;
};

export default Transition;
