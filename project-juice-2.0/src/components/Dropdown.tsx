import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropdownProps {
  selectedTaste: string;
  onTasteChange: (newTaste: string) => void;
}

function Dropdown({ selectedTaste, onTasteChange }: DropdownProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleTasteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTasteChange(event.target.value);
  };

  return (
    <>
      <div className="pl-4 pr-0 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px]">
        <div className="relative w-full max-w-[350px] lg:w-[350px]">
          <select
            value={selectedTaste}
            onChange={handleTasteChange}

            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}

            className="
              appearance-none 
              pr-12
              bg-[#111010] 
              border-2 border-[#000000] 
              rounded-lg 
              p-2.5 
              mb-[15px] 
              cursor-pointer 
              font-black font-['Unbounded'] 
              text-[20px] 
              w-full 
              transition-colors duration-250
              hover:border-white
              focus:outline-none focus:border-white
            "
          >
            <option value="owocowe">Standardowe </option>
            <option value="owocowe-zimne">Premium</option>
          </select>

          <FiChevronDown
            className={`
              absolute top-1/3 right-3 -translate-y-1/3 text-white text-4xl pointer-events-none 
              transition-transform duration-300 ease-in-out
              ${isFocused ? "rotate-180" : "rotate-0"} 
            `}
          />
        </div>
      </div>
    </>
  );
}

export default Dropdown;
