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
      <div className="pl-4 pr-0 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px]">
        <div>
          <button 
            onClick={handleRandomClick}
            className="w-[350px] h-80px leading-[1.4]"
          >
            Wylosuj smak<br></br>
            {selectedId || "[?]"}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;