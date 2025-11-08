import { useRef } from "react";
import "./Carousel.css"; // POPRAWKA: Importujemy własny, dedykowany plik CSS

function Carousel() {
  const carouselRef = useRef(null);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // 2. Funkcje do przewijania
  const scroll = (direction) => {
    if (carouselRef.current) {
      // Znajdź pierwszą kartę, aby poznać jej szerokość
      const firstCard = carouselRef.current.querySelector(".carousel-card");
      if (firstCard) {
        // Przewijamy o szerokość karty + odstęp (15px)
        const scrollAmount = firstCard.offsetWidth + 15;

        carouselRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="carousel-wrapper">
      {/* --- PRZYCISKI MOBILNE --- */}
      <div className="carousel-nav-mobile">
        <button onClick={() => scroll("left")}>&lt;</button>
        <button onClick={() => scroll("right")}>&gt;</button>
      </div>

      {/* --- KONTENER KARUZELI --- */}
      <div className="carousel-container" ref={carouselRef}>
        {items.map((item) => (
          <div className="carousel-card" key={item}>
            <div className="card-content">
              <h2>SMAK LOREM {item}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- PRZYCISKI DESKTOPOWE --- */}
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
