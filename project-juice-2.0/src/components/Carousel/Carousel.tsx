import { useRef, useState } from "react"; 
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
}

function Carousel({ items }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector<HTMLElement>(".carousel-card");
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
    setActiveCardId(id); 
  };

  const handleHideDetails = () => {
    setActiveCardId(null); 
  };

  return (
    <div className="carousel-wrapper">
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