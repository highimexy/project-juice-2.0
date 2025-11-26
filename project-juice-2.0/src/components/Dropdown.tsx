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
      <div className="content-wrapper-left">
        <div className="dropdown-container">
          <div className="dropdown">
            <select value={selectedTaste} onChange={handleTasteChange}>
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