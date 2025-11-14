import { useState } from "react"; // <-- WAŻNE: Zaimportuj useState
import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";
import Dropdown from "../components/Dropdown.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import Navigation from "../components/Navigation.tsx";

// ... (importy obrazków smak1-smak10) ...
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

function Taste() {
  const items = [
    // Zostawiam tu skróconą wersję dla czytelności,
    // pamiętaj o dodaniu 'title' i 'details' tak jak ostatnio
    { id: "#1", img: smak1, title: "Smak 1", details: "Opis 1..." },
    { id: "#2", img: smak2, title: "Smak 2", details: "Opis 2..." },
    { id: "#3", img: smak3, title: "Smak 3", details: "Opis 3..." },
    { id: "#4", img: smak4, title: "Smak 4", details: "Opis 4..." },
    { id: "#5", img: smak5, title: "Smak 5", details: "Opis 5..." },
    { id: "#6", img: smak6, title: "Smak 6", details: "Opis 6..." },
    { id: "#7", img: smak7, title: "Smak 7", details: "Opis 7..." },
    { id: "#8", img: smak8, title: "Smak 8", details: "Opis 8..." },
    { id: "#9", img: smak9, title: "Smak 9", details: "Opis 9..." },
    { id: "#10", img: smak10, title: "Smak 10", details: "Opis 10..." },
  ];

  // --- NOWA LOGIKA ---
  // Ten stan (activeCardId) jest teraz "podniesiony" do rodzica
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  // --------------------

  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div>
        <div className="taste-hero">
          <div>
            <Dropdown />
            {/* --- ZMIANA TUTAJ ---
               Przycisk otrzymuje listę, aktywne ID (do wyświetlenia)
               oraz funkcję "ustaw aktywne ID"
            ------------------------- */}
            <RandomBtn
              items={items}
              selectedId={activeCardId}
              onRandomSelect={setActiveCardId}
            />
          </div>
          <div className="hero-container">
            <Hero
              title={"<-Grupy smakow"}
              description="Beben maszyny losujacej jest pusty, nastepuje zwolnienie blokady..."
            />
          </div>
        </div>
        {/* --- ZMIANA TUTAJ ---
           Karuzela otrzymuje aktywne ID (żeby wiedzieć co odwrócić)
           oraz funkcję "ustaw aktywne ID" (żeby klikanie na karty działało)
        ------------------------- */}
        <Carousel
          items={items}
          activeCardId={activeCardId}
          onActiveCardChange={setActiveCardId}
        />
      </div>
    </>
  );
}

export default TransitionOposite(Taste);
