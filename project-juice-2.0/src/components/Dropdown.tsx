import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownProps {
  selectedTaste: string;
  onTasteChange: (newTaste: string) => void;
}

function Dropdown({ selectedTaste, onTasteChange }: DropdownProps) {
  return (
    <div className="pl-4 pr-0 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px] mb-[15px]">
      <Select value={selectedTaste} onValueChange={onTasteChange}>
        <SelectTrigger className="w-[350px] bg-[#111010] border-2 border-black hover:border-white text-white font-black font-['Unbounded'] text-xl h-auto py-2.5 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#111010] border-2 border-black text-white font-['Unbounded']">
          <SelectItem value="owocowe" className="text-xl font-black cursor-pointer focus:bg-white/10 focus:text-white">
            Standardowe
          </SelectItem>
          <SelectItem value="owocowe-zimne" className="text-xl font-black cursor-pointer focus:bg-white/10 focus:text-white">
            Premium
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Dropdown;
