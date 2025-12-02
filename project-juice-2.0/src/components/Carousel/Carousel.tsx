import { useRef, useEffect } from "react"; 
import "./Carousel.css";
import CarouselCard from "./CarouselCard";

interface Item {
  id: string;
  img: string;
  title?: string;
  details?: string;
}

interface CarouselProps {
  items: Item[];
  activeCardId: string | null;
  onActiveCardChange: (id: string | null) => void;
}

function Carousel({ items, activeCardId, onActiveCardChange }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCardId && carouselRef.current) {
      const cardElement = carouselRef.current.querySelector<HTMLElement>(
        `[data-id="${activeCardId}"]`
      );

      if (cardElement) {
        cardElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeCardId]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
      onActiveCardChange(null);
    }
  }, [items, onActiveCardChange]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const firstCard =
        carouselRef.current.querySelector<HTMLElement>(".carousel-card");
      if (firstCard) {
        const scrollAmount = firstCard.offsetWidth + 15;
        carouselRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleShowDetails = (id: string) => {
    onActiveCardChange(id);
  };

  const handleHideDetails = () => {
    onActiveCardChange(null);
  };

  return (
    <div className="w-full box-border pl-4 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px]">
      <div className="carousel-nav-mobile">
        <button onClick={() => scroll("left")}>&lt;</button>
        <button onClick={() => scroll("right")}>&gt;</button>
      </div>

      <div className="carousel-container" ref={carouselRef}>
        {items.map((item) => (
          <CarouselCard
            key={item.id}
            item={item}
            isFlipped={item.id === activeCardId}
            onShowDetails={() => handleShowDetails(item.id)}
            onHideDetails={handleHideDetails}
          />
        ))}
      </div>

      <button
        className="carousel-btn desktop prev"
        onClick={() => scroll("left")}
      >
        &lt;
      </button>

      <button
        className="carousel-btn desktop next"
        onClick={() => scroll("right")}
      >
        &gt;
      </button>
    </div>
  );
}

export default Carousel;