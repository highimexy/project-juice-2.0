import { useEffect } from "react";
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => {
          const isActive = item.id === activeCardId;
          return (
            <Card
              key={item.id}
              data-id={item.id}
              className={`group relative overflow-hidden bg-[#111010] border-2 py-0 gap-0 transition-all duration-300 rounded-lg
                hover:shadow-[0_0_24px_rgba(255,255,255,0.1)] hover:-translate-y-1
                ${
                  isActive
                    ? "border-[#585580] shadow-[0_0_20px_rgba(88,85,128,0.5)]"
                    : "border-black hover:border-white/50"
                }`}
            >
              <CardContent className="p-3 flex flex-col items-center gap-2">
                {/* Badge w lewym górnym rogu */}
                <div className="w-full flex justify-start">
                  <Badge
                    variant="outline"
                    className={`font-['Unbounded'] text-lg px-3 py-1 transition-colors duration-300 shrink-0
                      ${isActive ? "text-[#585580] border-[#585580]" : "text-white border-white/40"}`}
                  >
                    {item.title || item.id}
                  </Badge>
                </div>

                {/* Zdjęcie */}
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title || item.id}
                    className="max-w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Opis */}
                <p className="text-white/80 text-xl text-center leading-snug font-['Space_Grotesk'] font-bold px-1 shrink-0">
                  {item.details || "Nowe smaki incoming!"}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default FlavorGrid;
