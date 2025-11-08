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
          {/* 6. Podpinamy naszą funkcję pod onClick */}
          <button onClick={handleRandomClick}>
            {/* 7. Wyświetlamy wylosowany element. 
                 Jeśli jest pusty (na początku), pokażemy tekst. */}
            Wylosowany sok: {selectedItem.id || "Kliknij, by losować!"}
          </button>
        </div>
      </div>
    </>
  );
}

export default RandomBtn;
