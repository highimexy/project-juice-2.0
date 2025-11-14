// Usuwamy import 'useState' - nie jest już potrzebny
interface Item {
  id: string;
  img: string;
}

interface RandomBtnProps {
  items: Item[];
  selectedId: string | null; // <-- NOWY PROP: Co jest wybrane
  onRandomSelect: (id: string) => void; // <-- NOWY PROP: Funkcja do wywołania
}

function RandomBtn({ items, selectedId, onRandomSelect }: RandomBtnProps) {
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null); // <-- USUWAMY LOKALNY STAN

  const handleRandomClick = () => {
    const totalItems = items.length;
    const randomIndex = Math.floor(Math.random() * totalItems);
    const randomItem = items[randomIndex];
    // Zamiast ustawiać lokalny stan, informujemy rodzica
    onRandomSelect(randomItem.id);
  };

  return (
    <>
      <div className="content-wrapper-left">
        <div className="randombtn-container">
          <button onClick={handleRandomClick}>
            Wylosuj smak! <br></br>
            {/* Czytamy 'selectedId' z propsów, a nie z lokalnego stanu */}
            {selectedId || "???"}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;