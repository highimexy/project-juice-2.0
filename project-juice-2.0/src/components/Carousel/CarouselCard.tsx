import React from "react";

interface Item {
  id: string;
  img: string;
  title?: string;
  details?: string;
}

interface CarouselCardProps {
  item: Item;
  isFlipped: boolean; // Otrzymane z góry
  onShowDetails: () => void; // Otrzymane z góry
  onHideDetails: () => void; // Otrzymane z góry
}

function CarouselCard({
  item,
  isFlipped,
  onShowDetails,
  onHideDetails,
}: CarouselCardProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHideDetails();
  };

  const cardClassName = `carousel-card ${isFlipped ? "pokaz-tresc" : ""}`;

  return (
    <div className={cardClassName} key={item.id} onClick={onShowDetails}>
      <div className="card-content">
        <h2>{item.title || item.id}</h2>
        <img src={item.img} alt={item.id} />
      </div>

      <div className="ukryta-tresc">
        <h4>Oto szczegóły!</h4>
        <p>{item.details || "Nowe smaki incoming!"}</p>
      </div>
    </div>
  );
}

export default CarouselCard;
