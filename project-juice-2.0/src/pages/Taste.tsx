import { useState, useMemo, useEffect } from "react"; // <-- WAŻNE: Dodajemy useMemo i useEffect
import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Dropdown from "../components/Dropdown.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import Navigation from "../components/Navigation.tsx";

import smak1 from "../assets/smak1.png";
import smak2 from "../assets/smak2.png";
import smak3 from "../assets/smak3.png";
import smak4 from "../assets/smak4.png";
import smak5 from "../assets/smak5.png";
import smak6 from "../assets/smak6.png";
import smak7 from "../assets/smak7.png";
import smak8 from "../assets/smak8.png";
import smak9 from "../assets/smak9.png";
import smak10 from "../assets/smak10.png";

import smakZimny1 from "../assets/smak1.png";
import smakDeser1 from "../assets/smak2.png";

const TASTE_CATEGORIES = {
  OWOCOWE: "owocowe",
  OWOCOWE_ZIMNE: "owocowe-zimne",
  DESEROWE: "deserowe",
};

const allTastesData = {
  [TASTE_CATEGORIES.OWOCOWE]: [
    {
      id: "OW-1",
      img: smak1,
      title: "OW-1",
      details: "Opis 1...",
    },
    { id: "OW-2", img: smak2, title: "OW-2", details: "Opis 2..." },
    { id: "OW-3", img: smak3, title: "OW-3", details: "Opis 3..." },
    { id: "OW-4", img: smak4, title: "OW-4", details: "Opis 4..." },
    { id: "OW-5", img: smak5, title: "OW-5", details: "Opis 5..." },
    { id: "OW-6", img: smak6, title: "OW-6", details: "Opis 6..." },
    { id: "OW-7", img: smak7, title: "OW-7", details: "Opis 7..." },
    { id: "OW-8", img: smak8, title: "OW-8", details: "Opis 8..." },
    { id: "OW-9", img: smak9, title: "OW-9", details: "Opis 9..." },
    { id: "OW-10", img: smak10, title: "OW-10", details: "Opis 10..." },
  ],
  [TASTE_CATEGORIES.OWOCOWE_ZIMNE]: [
    {
      id: "OZ-1",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
    {
      id: "OZ-2",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
    {
      id: "OZ-3",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
    {
      id: "OZ-4",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
    {
      id: "OZ-5",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
    {
      id: "OZ-6",
      img: smakZimny1,
      title: "OZ-6",
      details: "Opis zimny 1...",
    },
  ],
  [TASTE_CATEGORIES.DESEROWE]: [
    {
      id: "D-1",
      img: smakDeser1,
      title: "D-1",
      details: "Opis deseru 1...",
    },
    {
      id: "D-2",
      img: smakDeser1,
      title: "D-2",
      details: "Opis deseru 2...",
    },
    {
      id: "D-3",
      img: smakDeser1,
      title: "D-3",
      details: "Opis deseru 3...",
    },
    {
      id: "D-4",
      img: smakDeser1,
      title: "D-4",
      details: "Opis deseru 4...",
    },
    {
      id: "D-5",
      img: smakDeser1,
      title: "D-5",
      details: "Opis deseru 5...",
    },
  ],
};

function Taste() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState(
    TASTE_CATEGORIES.OWOCOWE
  );

  const currentItems = useMemo(() => {
    return allTastesData[selectedCategory];
  }, [selectedCategory]);

  useEffect(() => {
    setActiveCardId(null);
  }, [selectedCategory]);

  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div>
        <div className="taste-hero">
          <div>
            <Dropdown
              selectedTaste={selectedCategory}
              onTasteChange={setSelectedCategory}
            />
            <RandomBtn
              items={currentItems}
              selectedId={activeCardId}
              onRandomSelect={setActiveCardId}
            />
          </div>
          <div className="content-wrapper">
            <div className="hero-container">
              <h1>Zasady</h1>
              <p>
                Ilosc = 30ml <br />
                Moc = 12mg|18mg, <br />
                Nazwa = Rodzaj - Number
              </p>
            </div>
          </div>
        </div>
        <Carousel
          items={currentItems}
          activeCardId={activeCardId}
          onActiveCardChange={setActiveCardId}
        />
      </div>
    </>
  );
}

export default TransitionOposite(Taste);
