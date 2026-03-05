import { useState } from "react";
import FlavorGrid from "../components/FlavorGrid/FlavorGrid.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import Navigation from "../components/Navigation.tsx";

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
import banan from "../assets/premium/Banan.webp";
import czerwo from "../assets/premium/czerwo.webp";
import Question from "../assets/Q.webp";

const premiumItems = [
  {
    id: "P-1",
    img: p1,
    title: "P | 1",
    details: "Kwaśne cukierkowe zielone jabłko",
  },
  { id: "P-2", img: p2, title: "P | 2", details: "Kremowy banan z truskawką" },
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
  { id: "P-13", img: p13, title: "P | 13", details: "Smoczy owoc z truskawką" },
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
    img: banan,
    title: "P | 19",
    details: "Kiwi i banan z orzeźwieniem",
  },
  {
    id: "P-20",
    img: p19,
    title: "P | 20",
    details:
      "Mieszanka czerwonych owoców (głównie truskawki i jeżyny) z mroźnym orzeźwieniem",
  },
  {
    id: "P-21",
    img: czerwo,
    title: "P | 21",
    details: "Czerwone owoce i mango z mroźnym orzeźwieniem",
  },
  {
    id: "P-22",
    img: p20,
    title: "P | 22",
    details: "Brzoskwinia, malina i kiwi",
  },
  {
    id: "P-23",
    img: p21,
    title: "P | 23",
    details: "Kwaśne cukierkowe zielone jabłko z mroźnym orzeźwieniem",
  },
  {
    id: "P-24",
    img: p22,
    title: "P | 24",
    details: "Wiśnia i truskawka z orzeźwieniem",
  },
  {
    id: "P-25",
    img: p23,
    title: "P | 25",
    details: "Cukierkowa niebieska malina z mroźnym orzeźwieniem",
  },
  {
    id: "P-26",
    img: Question,
    title: "???",
    details: "Każdy dowolny smak | Na zamówienie",
  },
];

function Taste() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <>
      <Navigation />

      <div className="flex flex-col pt-10 pb-4 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="text-center mb-8">
          <h1 className="font-bold text-5xl md:text-6xl mb-4">
            PR0J3CT - JUiiC
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-['Space_Grotesk'] font-bold mb-4">
            Kolekcja liquidów zainspirowana głębią kosmosu — każdy smak to
            oddzielna orbita,
            <br className="hidden md:block" />
            intensywna, zimna i nieskończona jak wszechświat.
          </p>
          <p className="text-[#585580] text-xl m-0">30ml</p>
          <p className="text-[#640577] text-xl m-0">12mg | 18mg</p>
        </div>

        <div className="flex justify-center mb-10">
          <RandomBtn
            items={premiumItems}
            selectedId={activeCardId}
            onRandomSelect={setActiveCardId}
          />
        </div>
      </div>

      <FlavorGrid
        items={premiumItems}
        activeCardId={activeCardId}
        onActiveCardChange={setActiveCardId}
      />
    </>
  );
}

export default TransitionOposite(Taste);
