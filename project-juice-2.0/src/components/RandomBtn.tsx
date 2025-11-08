import { useState } from "react";

function RandomBtn({ items }) {
  const [selectedItem, setSelectedItem] = useState("");
  const handleRandomClick = () => {
    const totalItems = items.length;
    const randomIndex = Math.floor(Math.random() * totalItems);
    const randomItem = items[randomIndex];
    setSelectedItem(randomItem);
  };

  return (
    <>
      <div className="content-wrapper ">
        <div className="randombtn-container">
          <button onClick={handleRandomClick}>
            Wylosowany sok: {selectedItem.id || "Kliknij, by losować!"}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;
