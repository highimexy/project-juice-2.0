import { Button } from "@/components/ui/button";

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
    const randomItem = items[Math.floor(Math.random() * items.length)];
    onRandomSelect(randomItem.id);
  };

  return (
    <Button
      onClick={handleRandomClick}
      variant="outline"
      className="bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-sm px-6 py-2 whitespace-normal text-center"
    >
      Wylosuj smak {selectedId ? `— ${selectedId}` : ""}
    </Button>
  );
}

export default RandomBtn;
