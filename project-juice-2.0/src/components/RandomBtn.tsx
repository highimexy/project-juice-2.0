interface Item {
  id: string;
  img: string;
}

interface RandomBtnProps {
  items: Item[];
  selectedId: string | null; 
  onRandomSelect: (id: string) => void; 
}

function RandomBtn({ items, selectedId, onRandomSelect }: RandomBtnProps) {

  const handleRandomClick = () => {
    const totalItems = items.length;
    const randomIndex = Math.floor(Math.random() * totalItems);
    const randomItem = items[randomIndex];
    onRandomSelect(randomItem.id);
  };

  return (
    <>
      <div className="content-wrapper-left">
        <div className="randombtn-container">
          <button onClick={handleRandomClick}>
            Wylosuj smak! <br></br>
            {selectedId || "???"}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;