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
    <div className="pl-4 pr-0 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px]">
      <Button
        onClick={handleRandomClick}
        variant="outline"
        className="w-[350px] bg-[#111010] border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-xl h-auto py-2.5 leading-[1.4] whitespace-normal"
      >
        Wylosuj smak<br />
        {selectedId || "[?]"}
      </Button>
    </div>
  );
}

export default RandomBtn;
