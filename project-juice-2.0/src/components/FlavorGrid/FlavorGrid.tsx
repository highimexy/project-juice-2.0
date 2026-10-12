import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Item {
  id: string;
  img: string;
  title?: string;
  details?: string;
  soldOut?: boolean;
  accent?: string;
}

const FLAVOR_ACCENTS: Record<string, string> = {
  "Kwaśne cukierkowe zielone jabłko": "#76D629",
  "Kremowy banan z truskawką": "#F4C430",
  "Limonka i cytrusy z mroźnym": "#A4D10D",
  "Złote kiwi, truskawka i granat z mroźnym orzeźwieniem": "#E0115F",
  "Arbuz i cytryna z nutą maliny i mroźnym orzeźwieniem": "#FF6B81",
  "Czerwone owoce i lukrecja z delikatnym orzeźwieniem": "#4A0404",
  "Ananas i liczi z mroźnym orzeźwieniem": "#FFD700",
  "Napój typu cola z mroźnym orzeźwieniem": "#3C1F0B",
  "Mieszanka czerwonych owoców (jagody, truskawki, maliny)": "#8B0000",
  "Różowy grejpfrut z truskawką i nutą orzeźwienia": "#FF91A4",
  "Soczyste mango": "#FF8C00",
  "Słodki melon z bardzo mocnym orzeźwieniem": "#FFA500",
  "Smoczy owoc z truskawką": "#FF1493",
  "Smoczy owoc, guawa, kiwi i truskawka": "#FB607F",
  "Granat i truskawka z mroźnym orzeźwieniem": "#DC143C",
  "Egzotyczne mango z orzeźwieniem": "#FFB300",
  "Malina z kruchym ciasteczkiem": "#CD5C5C",
  "Kaktus, czerwone owoce i cytryna z orzeźwieniem": "#2E8B57",
  "Kiwi i banan z orzeźwieniem": "#ADFF2F",
  "Mieszanka czerwonych owoców (głównie truskawki i jeżyny) z mroźnym orzeźwieniem":
    "#990000",
  "Czerwone owoce i mango z mroźnym orzeźwieniem": "#FF4500",
  "Brzoskwinia, malina i kiwi": "#FF9966",
  "Kwaśne cukierkowe zielone jabłko z mroźnym orzeźwieniem": "#66FF00",
  "Wiśnia i truskawka z orzeźwieniem": "#D2042D",
  "Cukierkowa niebieska malina z mroźnym orzeźwieniem": "#00BFFF",
  "Słodko-kwaśna tarta cytrynowo-limonkowa": "#D4E157",
};

function getFlavorAccent(item: Item): string {
  if (item.accent) return item.accent;
  if (item.details && FLAVOR_ACCENTS[item.details]) {
    return FLAVOR_ACCENTS[item.details];
  }
  return "#FFFFFF";
}

interface FlavorGridProps {
  items: Item[];
  activeCardId: string | null;
  onActiveCardChange: (id: string | null) => void;
}

function FlavorGrid({
  items,
  activeCardId,
  onActiveCardChange,
}: FlavorGridProps) {
  useEffect(() => {
    if (activeCardId) {
      const el = document.querySelector<HTMLElement>(
        `[data-id="${activeCardId}"]`,
      );
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeCardId]);

  useEffect(() => {
    onActiveCardChange(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [items, onActiveCardChange]);

  return (
    <div className="w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] pb-16">
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => {
          const isActive = item.id === activeCardId;
          const accent = getFlavorAccent(item);
          return (
            <motion.div
              key={item.id}
              data-id={item.id}
              className="relative flex flex-col w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)] cursor-default"
              animate={
                isActive
                  ? {
                      y: [0, -10, 0],
                      transition: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                  : { y: 0 }
              }
            >
              {isActive && (
                <motion.div
                  className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    filter:
                      "drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 16px rgba(255,255,255,0.4))",
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3 L12 18 M5 11 L12 21 L19 11"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
              <Card
                className={`juice-surface juice-card juice-flavor-card group relative overflow-hidden py-0 gap-0 h-full cursor-default ${isActive ? "juice-selected" : ""}`}
              >
                <CardContent className="p-4 flex flex-col items-center gap-4 h-full cursor-default">
                  <div className="w-full flex justify-start">
                    <Badge
                      variant="outline"
                      className="juice-chip px-3 py-1.5 text-sm"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                      {item.title || item.id}
                    </Badge>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full overflow-hidden cursor-default">
                    <img
                      src={item.img}
                      alt={item.title || item.id}
                      draggable={false}
                      className="max-w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-110 cursor-default"
                    />
                  </div>

                  <p className="juice-flavor-description text-white/70 text-base text-center leading-snug font-['Space_Grotesk'] font-bold px-1 shrink-0 flex flex-col">
                    {item.soldOut && (
                      <span className="juice-chip juice-sold-out self-center mb-2 px-2.5 py-1 text-[10px] tracking-wider">SOLD OUT</span>
                    )}
                    {item.details || "Nowe smaki incoming!"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default FlavorGrid;
