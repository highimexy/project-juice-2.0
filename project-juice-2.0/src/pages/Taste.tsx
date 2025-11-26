import { useState, useMemo, useEffect } from "react"; // <-- WAŻNE: Dodajemy useMemo i useEffect
import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Dropdown from "../components/Dropdown.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import Navigation from "../components/Navigation.tsx";

import p1 from "../assets/premium/1.webp"
import p2 from "../assets/premium/2.webp"
import p3 from "../assets/premium/3.webp"
import p4 from "../assets/premium/4.webp"
import p5 from "../assets/premium/5.webp"
import p6 from "../assets/premium/6.webp"
import p7 from "../assets/premium/7.webp"
import p8 from "../assets/premium/8.webp"
import p9 from "../assets/premium/9.webp"
import p10 from "../assets/premium/10.webp"
import p11 from "../assets/premium/11.webp"
import p12 from "../assets/premium/12.webp"
import p13 from "../assets/premium/13.webp"
import p14 from "../assets/premium/14.webp"
import p15 from "../assets/premium/15.webp"
import p16 from "../assets/premium/16.webp"
import p17 from "../assets/premium/17.webp"
import p18 from "../assets/premium/18.webp"



import smak1 from "../assets/smak1.webp";
import smak2 from "../assets/smak2.webp";
import smak3 from "../assets/smak3.webp";
import smak4 from "../assets/smak4.webp";
import smak5 from "../assets/smak5.webp";
import smak6 from "../assets/smak6.webp";
import smak7 from "../assets/smak7.webp";
import smak8 from "../assets/smak8.webp";
import smak9 from "../assets/smak9.webp";
import smak10 from "../assets/smak10.webp";
import nowa from "../assets/smak1.png.png"

const TASTE_CATEGORIES = {
  OWOCOWE: "owocowe",
  OWOCOWE_ZIMNE: "owocowe-zimne",
};

const allTastesData = {
  [TASTE_CATEGORIES.OWOCOWE]: [
    { id: "S-1", img: nowa, title: "S | 1", details: "Truskawka (Strawberry)" },
    { id: "S-2", img: smak2, title: "S | 2", details: "Niebieska Malina" },
    { id: "S-3", img: smak3, title: "S | 3", details: "Arbuz (Watermelon)" },
    { id: "S-4", img: smak4, title: "S | 4", details: "Mięta / Mentol (Mint / Menthol)" },
    { id: "S-5", img: smak5, title: "S | 5", details: "Niebieska Malina (Blue Raspberry)" },
    { id: "S-6", img: smak6, title: "S | 6", details: "Winogrono (Grape)" },
    { id: "S-7", img: smak7, title: "S | 7", details: "Mango" },
    { id: "S-8", img: smak8, title: "S | 8", details: "Zielone Jabłko (Green Apple)" },
    { id: "S-9", img: smak9, title: "S | 9", details: "Jagoda (Blueberry)" },
    { id: "S-10", img: smak10, title: "S | 10", details: "Brzoskwinia (Peach)" },
    { id: "S-11", img: smak1, title: "S | 11", details: "Czarna Porzeczka (Blackcurrant)" },
    { id: "S-12", img: smak2, title: "S | 12", details: "Cola" },
    { id: "S-13", img: smak3, title: "S | 13", details: "Cytryna / Limonka (Lemon / Lime)" },
    { id: "S-14", img: smak4, title: "S | 14", details: "Banan" },
    { id: "S-15", img: smak5, title: "S | 15", details: "Wiśnia (Cherry)" },
    { id: "S-16", img: smak6, title: "S | 16", details: "Wanilia (Vanilla)" },
    { id: "S-17", img: smak7, title: "S | 17", details: "Energetyk (Energy Drink)" },
    { id: "S-18", img: smak8, title: "S | 18", details: "Tytoń (Tobacco)" },
    { id: "S-19", img: smak9, title: "S | 19", details: "Guma Balonowa (Bubblegum)" },
    { id: "S-20", img: smak10, title: "S | 20", details: "Melon (Honeydew/Cantaloupe)" },
    { id: "S-21", img: smak10, title: "???", details: "Każdy dowolny smak | Na zamówienie" },
  ],
  [TASTE_CATEGORIES.OWOCOWE_ZIMNE]: [
    { id: "P-1", img: p1, title: "P | 1", details: "Kwaśne cukierkowe zielone jabłko" },
    { id: "P-2", img: p2, title: "P | 2", details: "Kremowy banan z truskawką" },
    { id: "P-3", img: p3, title: "P | 3", details: "Limonka i cytrusy z mroźnym" },
    { id: "P-4", img: p4, title: "P | 4", details: "Złote kiwi, truskawka i granat z mroźnym orzeźwieniem" },
    { id: "P-5", img: p5, title: "P | 5", details: "Arbuz i cytryna z nutą maliny i mroźnym orzeźwieniem" },
    { id: "P-6", img: p6, title: "P | 6", details: "Czerwone owoce i lukrecja z delikatnym orzeźwieniem" },
    { id: "P-7", img: p7, title: "P | 7", details: "Ananas i liczi z mroźnym orzeźwieniem" },
    { id: "P-8", img: p8, title: "P | 8", details: "Napój typu cola z mroźnym orzeźwieniem" },
    { id: "P-9", img: p9, title: "P | 9", details: "Mieszanka czerwonych owoców (jagody, truskawki, maliny)" },
    { id: "P-10", img: p10, title: "P | 10", details: "Różowy grejpfrut z truskawką i nutą orzeźwienia" },
    { id: "P-11", img: p11, title: "P | 11", details: "Soczyste mango" },
    { id: "P-12", img: p12, title: "P | 12", details: "Słodki melon z bardzo mocnym orzeźwieniem" },
    { id: "P-13", img: p13, title: "P | 13", details: "Smoczy owoc z truskawką" },
    { id: "P-14", img: p14, title: "P | 14", details: "Smoczy owoc, guawa, kiwi i truskawka" },
    { id: "P-15", img: p15, title: "P | 15", details: "Granat i truskawka z mroźnym orzeźwieniem" },
    { id: "P-16", img: p16, title: "P | 16", details: "Egzotyczne mango z orzeźwieniem" },
    { id: "P-17", img: p17, title: "P | 17", details: "Malina z kruchym ciasteczkiem" },
    { id: "P-18", img: p18, title: "P | 18", details: "Kaktus, czerwone owoce i cytryna z orzeźwieniem" },
    { id: "P-19", img: smak9, title: "P | 19", details: "Mieszanka czerwonych owoców (głównie truskawki i jeżyny) z mroźnym orzeźwieniem" },
    { id: "P-20", img: smak10, title: "P | 20", details: "Brzoskwinia, malina i kiwi" },
    { id: "P-21", img: smak10, title: "P | 21", details: "Kwaśne cukierkowe zielone jabłko z mroźnym orzeźwieniem" },
    { id: "P-22", img: smak10, title: "P | 22", details: "Wiśnia i truskawka z orzeźwieniem" },
    { id: "P-23", img: smak10, title: "P | 23", details: "Cukierkowa niebieska malina z mroźnym orzeźwieniem" },
    { id: "P-24", img: smak10, title: "???", details: "Każdy dowolny smak | Na zamówienie" },
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
      <div className="taste-content">
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
              <p className="taste-hero-1 pnf-h1">Ilosc = 30ml </p>
              <p className="taste-hero-2 pnf-h1">Moc = 12mg|18mg</p>
              <p className="taste-hero-3 pnf-h1 taste-hero-last">
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
