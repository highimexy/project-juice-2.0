import { useState, useMemo, useEffect } from "react";
import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Dropdown from "../components/Dropdown.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import Navigation from "../components/Navigation.tsx";

// Imports
import s1 from "../assets/standard/s1.webp";
import s2 from "../assets/standard/s2.webp";
import s3 from "../assets/standard/s3.webp";
import s4 from "../assets/standard/s4.webp";
import s5 from "../assets/standard/s5.webp";
import s6 from "../assets/standard/s6.webp";
import s7 from "../assets/standard/s7.webp";
import s8 from "../assets/standard/s8.webp";
import s9 from "../assets/standard/s9.webp";
import s10 from "../assets/standard/s10.webp";
import s11 from "../assets/standard/s11.webp";
import s12 from "../assets/standard/s12.webp";
import s13 from "../assets/standard/s13.webp";
import s14 from "../assets/standard/s14.webp";
import s15 from "../assets/standard/s15.webp";
import s16 from "../assets/standard/s16.webp";
import s17 from "../assets/standard/s17.webp";
import s18 from "../assets/standard/s18.webp";
import s19 from "../assets/standard/s19.webp";

import p1 from "../assets/premium/1.webp";
import p2 from "../assets/premium/2.webp";
import p3 from "../assets/premium/3.webp";
import p4 from "../assets/premium/4.webp";
import p5 from "../assets/premium/5.webp";
import p6 from "../assets/premium/6.webp";
import p7 from "../assets/premium/7.webp";
import p8 from "../assets/premium/8.webp";
import p9 from "../assets/premium/9.webp";
import p10 from "../assets/premium/10.webp";
import p11 from "../assets/premium/11.webp";
import p12 from "../assets/premium/12.webp";
import p13 from "../assets/premium/13.webp";
import p14 from "../assets/premium/14.webp";
import p15 from "../assets/premium/15.webp";
import p16 from "../assets/premium/16.webp";
import p17 from "../assets/premium/17.webp";
import p18 from "../assets/premium/18.webp";
import p19 from "../assets/premium/19.webp";
import p20 from "../assets/premium/20.webp";
import p21 from "../assets/premium/21.webp";
import p22 from "../assets/premium/22.webp";
import p23 from "../assets/premium/23.webp";

import Question from "../assets/Q.webp";

const TASTE_CATEGORIES = {
  OWOCOWE: "owocowe",
  OWOCOWE_ZIMNE: "owocowe-zimne",
};

const allTastesData = {
  [TASTE_CATEGORIES.OWOCOWE]: [
    { id: "S-1", img: s1, title: "S | 1", details: "Truskawka (Strawberry)" },
    { id: "S-2", img: s2, title: "S | 2", details: "Niebieska Malina" },
    { id: "S-3", img: s3, title: "S | 3", details: "Arbuz (Watermelon)" },
    {
      id: "S-4",
      img: s4,
      title: "S | 4",
      details: "Mięta / Mentol (Mint / Menthol)",
    },
    { id: "S-5", img: s5, title: "S | 5", details: "Winogrono (Grape)" },
    { id: "S-6", img: s6, title: "S | 6", details: "Mango" },
    {
      id: "S-7",
      img: s7,
      title: "S | 7",
      details: "Zielone Jabłko (Green Apple)",
    },
    { id: "S-8", img: s8, title: "S | 8", details: "Jagoda (Blueberry)" },
    { id: "S-9", img: s9, title: "S | 9", details: "Brzoskwinia (Peach)" },
    {
      id: "S-10",
      img: s10,
      title: "S | 10",
      details: "Czarna Porzeczka (Blackcurrant)",
    },
    { id: "S-11", img: s11, title: "S | 11", details: "Cola" },
    {
      id: "S-12",
      img: s12,
      title: "S | 12",
      details: "Cytryna / Limonka (Lemon / Lime)",
    },
    { id: "S-13", img: s13, title: "S | 13", details: "Banan" },
    { id: "S-14", img: s14, title: "S | 14", details: "Wiśnia (Cherry)" },
    { id: "S-15", img: s15, title: "S | 15", details: "Wanilia (Vanilla)" },
    {
      id: "S-16",
      img: s16,
      title: "S | 16",
      details: "Energetyk (Energy Drink)",
    },
    { id: "S-17", img: s17, title: "S | 17", details: "Tytoń (Tobacco)" },
    {
      id: "S-18",
      img: s18,
      title: "S | 18",
      details: "Guma Balonowa (Bubblegum)",
    },
    {
      id: "S-19",
      img: s19,
      title: "S | 19",
      details: "Melon (Honeydew/Cantaloupe)",
    },
    {
      id: "S-20",
      img: Question,
      title: "???",
      details: "Każdy dowolny smak | Na zamówienie",
    },
  ],
  [TASTE_CATEGORIES.OWOCOWE_ZIMNE]: [
    {
      id: "P-1",
      img: p1,
      title: "P | 1",
      details: "Kwaśne cukierkowe zielone jabłko",
    },
    {
      id: "P-2",
      img: p2,
      title: "P | 2",
      details: "Kremowy banan z truskawką",
    },
    {
      id: "P-3",
      img: p3,
      title: "P | 3",
      details: "Limonka i cytrusy z mroźnym",
    },
    {
      id: "P-4",
      img: p4,
      title: "P | 4",
      details: "Złote kiwi, truskawka i granat z mroźnym orzeźwieniem",
    },
    {
      id: "P-5",
      img: p5,
      title: "P | 5",
      details: "Arbuz i cytryna z nutą maliny i mroźnym orzeźwieniem",
    },
    {
      id: "P-6",
      img: p6,
      title: "P | 6",
      details: "Czerwone owoce i lukrecja z delikatnym orzeźwieniem",
    },
    {
      id: "P-7",
      img: p7,
      title: "P | 7",
      details: "Ananas i liczi z mroźnym orzeźwieniem",
    },
    {
      id: "P-8",
      img: p8,
      title: "P | 8",
      details: "Napój typu cola z mroźnym orzeźwieniem",
    },
    {
      id: "P-9",
      img: p9,
      title: "P | 9",
      details: "Mieszanka czerwonych owoców (jagody, truskawki, maliny)",
    },
    {
      id: "P-10",
      img: p10,
      title: "P | 10",
      details: "Różowy grejpfrut z truskawką i nutą orzeźwienia",
    },
    { id: "P-11", img: p11, title: "P | 11", details: "Soczyste mango" },
    {
      id: "P-12",
      img: p12,
      title: "P | 12",
      details: "Słodki melon z bardzo mocnym orzeźwieniem",
    },
    {
      id: "P-13",
      img: p13,
      title: "P | 13",
      details: "Smoczy owoc z truskawką",
    },
    {
      id: "P-14",
      img: p14,
      title: "P | 14",
      details: "Smoczy owoc, guawa, kiwi i truskawka",
    },
    {
      id: "P-15",
      img: p15,
      title: "P | 15",
      details: "Granat i truskawka z mroźnym orzeźwieniem",
    },
    {
      id: "P-16",
      img: p16,
      title: "P | 16",
      details: "Egzotyczne mango z orzeźwieniem",
    },
    {
      id: "P-17",
      img: p17,
      title: "P | 17",
      details: "Malina z kruchym ciasteczkiem",
    },
    {
      id: "P-18",
      img: p18,
      title: "P | 18",
      details: "Kaktus, czerwone owoce i cytryna z orzeźwieniem",
    },
    {
      id: "P-19",
      img: p19,
      title: "P | 19",
      details:
        "Mieszanka czerwonych owoców (głównie truskawki i jeżyny) z mroźnym orzeźwieniem",
    },
    {
      id: "P-20",
      img: p20,
      title: "P | 20",
      details: "Brzoskwinia, malina i kiwi",
    },
    {
      id: "P-21",
      img: p21,
      title: "P | 21",
      details: "Kwaśne cukierkowe zielone jabłko z mroźnym orzeźwieniem",
    },
    {
      id: "P-22",
      img: p22,
      title: "P | 22",
      details: "Wiśnia i truskawkaa z orzeźwieniem",
    },
    {
      id: "P-23",
      img: p23,
      title: "P | 23",
      details: "Cukierkowa niebieska malina z mroźnym orzeźwieniem",
    },
    {
      id: "P-24",
      img: Question,
      title: "???",
      details: "Każdy dowolny smak | Na zamówienie",
    },
  ],
};

function Taste() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState(
    TASTE_CATEGORIES.OWOCOWE_ZIMNE
  );

  const currentItems = useMemo(() => {
    return allTastesData[selectedCategory];
  }, [selectedCategory]);

  useEffect(() => {
    setActiveCardId(null);
  }, [selectedCategory]);

  return (
    <>
      <div>
        <Navigation />
      </div>

      <div className="flex flex-col pt-5 lg:h-[80vh] lg:justify-center">
        <div className="pb-[15px] lg:pt-0 lg:flex lg:items-center">
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
          <div className="w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px]">
            <div className="hero-container">
              <h1 className="font-bold text-5xl mt-[15px] mb-[15px] lg:mt-0">
                Zasady
              </h1>
              <p className="m-0 text-[#585580] text-3xl">Ilosc = 30ml </p>
              <p className="m-0 text-[#640577] text-3xl">Moc = 12mg|18mg</p>
              <p className="m-0 text-[#804141] pb-[15px] text-3xl">
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
