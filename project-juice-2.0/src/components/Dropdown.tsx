import React from "react";

interface DropdownProps {
  selectedTaste: string;
  onTasteChange: (newTaste: string) => void;
}

function Dropdown({ selectedTaste, onTasteChange }: DropdownProps) {
  const handleTasteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTasteChange(event.target.value);
  };

  return (
    <>
      {/* Odpowiednik .content-wrapper-left: responsywne paddingi tylko z lewej strony */}
      <div className="pl-4 pr-0 md:pl-8 lg:pl-[62px] xl:pl-[104px] 2xl:pl-[200px]">
        <div>
          <div>
            <select
              value={selectedTaste}
              onChange={handleTasteChange}
              // Style przeniesione z .dropdown select:
              // - Wygląd (bg, border, radius, font)
              // - Wymiary (w-full, max-w, mb)
              // - Interakcja (cursor, hover, transition)
              className="
                bg-[#1a1a1a] 
                border-2 border-[#1a1a1a] 
                rounded-lg 
                p-2.5 
                mb-[15px] 
                cursor-pointer 
                font-black font-['Unbounded'] 
                text-[20px] 
                w-full max-w-[350px] lg:w-[350px]
                transition-colors duration-250
                hover:border-white
                focus:outline-none focus:border-white
              "
            >
              <option value="owocowe">Standardowe</option>
              <option value="owocowe-zimne">Premium</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdown;