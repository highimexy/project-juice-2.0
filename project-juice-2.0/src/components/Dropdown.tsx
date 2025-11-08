import { useState } from "react";

function Dropdown() {
  const [taste, setTaste] = useState("");

  function handleTasteChange(event: any) {
    setTaste(event.target.value);
  }

  return (
    <>
      <div className="content-wrapper">
        <div className="dropdown-container">
          <div className="dropdown" onChange={handleTasteChange}>
            <select value={taste}>
              <option value="Opcja 1">Owocowe</option>
              <option value="Opcja 2">Owocowe zimne</option>
              <option value="Opcja 3">Deserowe</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdown;
