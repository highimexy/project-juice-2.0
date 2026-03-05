import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Item {
  id: string;
  img: string;
  title?: string;
  details?: string;
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
          return (
            <motion.div
              key={item.id}
              data-id={item.id}
              className="relative flex flex-col w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-13px)]"
              animate={
                isActive
                  ? { y: [0, -10, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
                  : { y: 0 }
              }
            >
              {isActive && (
                <motion.div
                  className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none z-10"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8)) drop-shadow(0 0 16px rgba(255,255,255,0.4))" }}
                >
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3 L12 18 M5 11 L12 21 L19 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
              <Card
                className={`group relative overflow-hidden bg-[#111010] border-2 py-0 gap-0 transition-all duration-300 rounded-lg h-full
                  hover:shadow-[0_0_24px_rgba(255,255,255,0.1)] hover:-translate-y-1
                  ${
                    isActive
                      ? "border-[#7090ab] shadow-[0_0_40px_8px_rgba(112,144,171,0.8),0_0_80px_rgba(112,144,171,0.4)]"
                      : "border-black hover:border-white/50"
                  }`}
              >
                <CardContent className="p-3 flex flex-col items-center gap-2 h-full">
                  <div className="w-full flex justify-start">
                    <Badge
                      variant="outline"
                      className={`font-['Unbounded'] text-lg px-3 py-1 transition-colors duration-300 shrink-0
                        ${isActive ? "text-white border-2 border-white" : "text-white border-2 border-white/40"}`}
                    >
                      {item.title || item.id}
                    </Badge>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title || item.id}
                      className="max-w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="text-white/80 text-xl text-center leading-snug font-['Space_Grotesk'] font-bold px-1 shrink-0">
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
