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

function FlavorGrid({ items, activeCardId, onActiveCardChange }: FlavorGridProps) {
  useEffect(() => {
    if (activeCardId) {
      const el = document.querySelector<HTMLElement>(`[data-id="${activeCardId}"]`);
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
              onClick={() => onActiveCardChange(isActive ? null : item.id)}
              className="relative overflow-hidden cursor-pointer bg-[#111010] border-2 border-black hover:border-white transition-colors duration-250 rounded-lg"
            >
              <CardContent className="p-3 flex flex-col items-center h-[280px]">
                <div className="flex items-center justify-between w-full mb-2">
                  <Badge variant="outline" className="text-white border-white/30 font-unbounded text-xs">
                    {item.title || item.id}
                  </Badge>
                </div>
                <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title || item.id}
                    className="max-w-full max-h-[200px] object-contain transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </CardContent>

              {/* Overlay ze szczegółami */}
              <div
                className={`absolute inset-0 bg-[#1a1a1abb] flex flex-col justify-center items-center text-center p-3 transition-opacity duration-300 pointer-events-none ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-white text-sm leading-snug">
                  {item.details || "Nowe smaki incoming!"}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default FlavorGrid;
