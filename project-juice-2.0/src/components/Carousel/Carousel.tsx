import { useRef } from "react";
import "./Carousel.css";

function Carousel({items}) {
  const carouselRef = useRef(null);


  {/* --- SWIPE --- */}
  const scroll = (direction) => {
    if (carouselRef.current) {
     
      const firstCard = carouselRef.current.querySelector(".carousel-card");
      if (firstCard) {
  
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
          <div className="carousel-card" key={item.id}>
            <div className="card-content">
              <h2>{item.id}</h2>
              <img src={item.img} alt={item.id} />
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
