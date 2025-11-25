
interface Item {
  id: string;
  img: string;
  title?: string;
  details?: string;
}

interface CarouselCardProps {
  item: Item;
  isFlipped: boolean;
  onShowDetails: () => void;
  onHideDetails: () => void;
}

function CarouselCard({ item, isFlipped, onShowDetails, onHideDetails }: CarouselCardProps) {
  const cardClassName = `carousel-card ${isFlipped ? "pokaz-tresc" : ""}`;

  const handleClick = () => {
    if (isFlipped) {
      onHideDetails();
    } else {
      onShowDetails();
    }
  };
  
  return (
    <div
      className={cardClassName}
      key={item.id}
      onClick={handleClick}
      data-id={item.id}
    >
      <div className="card-content">
        <h2>{item.title || item.id}</h2>
        <img src={item.img} alt={item.title || item.id} />
      </div>

      <div className="ukryta-tresc">
        <h4>{item.title}</h4>
        <p>{item.details || "Nowe smaki incoming!"}</p>
      </div>
    </div>
  );
}

export default CarouselCard;
