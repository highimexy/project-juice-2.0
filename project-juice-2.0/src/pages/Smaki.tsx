import { useEffect, useState } from "react";
import FlavorGrid from "../components/FlavorGrid/FlavorGrid.tsx";
import Logo from "../components/Logo.tsx";
import PageHeader from "../components/PageHeader.tsx";

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
import p26 from "../assets/premium/26.webp";

import Transition from "../Transition.tsx";

const premiumItems = [
  {
    id: "P-1",
    img: p1,
    title: "P | 1",
    details: "Kwaśne cukierkowe zielone jabłko",
    soldOut: false,
  },
  { id: "P-2", img: p2, title: "P | 2", details: "Kremowy banan z truskawką" },
  {
    id: "P-3",
    img: p3,
    title: "P | 3",
    details: "Limonka i cytrusy z mroźnym",
    soldOut: false,
  },
  {
    id: "P-4",
    img: p4,
    title: "P | 4",
    details: "Złote kiwi, truskawka i granat z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-5",
    img: p5,
    title: "P | 5",
    details: "Arbuz i cytryna z nutą maliny i mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-6",
    img: p6,
    title: "P | 6",
    details: "Czerwone owoce i lukrecja z delikatnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-7",
    img: p7,
    title: "P | 7",
    details: "Ananas i liczi z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-8",
    img: p8,
    title: "P | 8",
    details: "Napój typu cola z mroźnym orzeźwieniem",
    soldOut: true,
  },
  {
    id: "P-9",
    img: p9,
    title: "P | 9",
    details: "Mieszanka czerwonych owoców (jagody, truskawki, maliny)",
    soldOut: false,
  },
  {
    id: "P-10",
    img: p10,
    title: "P | 10",
    details: "Różowy grejpfrut z truskawką i nutą orzeźwienia",
    soldOut: false,
  },
  {
    id: "P-11",
    img: p11,
    title: "P | 11",
    details: "Soczyste mango",
    soldOut: false,
  },
  {
    id: "P-12",
    img: p12,
    title: "P | 12",
    details: "Słodki melon z bardzo mocnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-13",
    img: p13,
    title: "P | 13",
    details: "Smoczy owoc z truskawką",
    soldOut: true,
  },
  {
    id: "P-14",
    img: p14,
    title: "P | 14",
    details: "Smoczy owoc, guawa, kiwi i truskawka",
    soldOut: false,
  },
  {
    id: "P-15",
    img: p15,
    title: "P | 15",
    details: "Granat i truskawka z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-16",
    img: p16,
    title: "P | 16",
    details: "Egzotyczne mango z orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-17",
    img: p17,
    title: "P | 17",
    details: "Malina z kruchym ciasteczkiem",
    soldOut: false,
  },
  {
    id: "P-18",
    img: p18,
    title: "P | 18",
    details: "Kaktus, czerwone owoce i cytryna z orzeźwieniem",
    soldOut: true,
  },
  {
    id: "P-19",
    img: banan,
    title: "P | 19",
    details: "Kiwi i banan z orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-20",
    img: p19,
    title: "P | 20",
    details:
      "Mieszanka czerwonych owoców (głównie truskawki i jeżyny) z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-21",
    img: czerwo,
    title: "P | 21",
    details: "Czerwone owoce i mango z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-22",
    img: p20,
    title: "P | 22",
    details: "Brzoskwinia, malina i kiwi",
    soldOut: false,
  },
  {
    id: "P-23",
    img: p21,
    title: "P | 23",
    details: "Kwaśne cukierkowe zielone jabłko z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-24",
    img: p22,
    title: "P | 24",
    details: "Wiśnia i truskawka z orzeźwieniem",
    soldOut: true,
  },
  {
    id: "P-25",
    img: p23,
    title: "P | 25",
    details: "Cukierkowa niebieska malina z mroźnym orzeźwieniem",
    soldOut: false,
  },
  {
    id: "P-26",
    img: p26,
    title: "P | 26",
    details: "Słodko-kwaśna tarta cytrynowo-limonkowa",
    soldOut: false,
  },
  {
    id: "P-27",
    img: Question,
    title: "???",
    details: "Każdy dowolny smak | Na zamówienie",
    soldOut: false,
  },
];

function Smaki() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Nawigacja („Wylosuj smak") żyje poza stroną — komunikacja przez event
  useEffect(() => {
    const onRandom = () => {
      const randomItem =
        premiumItems[Math.floor(Math.random() * premiumItems.length)];
      setActiveCardId(randomItem.id);
    };
    window.addEventListener("juiice:random", onRandom);
    return () => window.removeEventListener("juiice:random", onRandom);
  }, []);

  return (
    <>
      <div className="flex flex-col pt-48 lg:pt-24 pb-4 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <PageHeader
          heading={
            <Logo
              id="hero"
              variant="flat"
              text="JUIICE.PL"
              fontSize={96}
              className="w-full max-w-4xl h-auto animate-logo-float"
            />
          }
          description={
            <>
              <span className="text-white/90">
                Gęsta para. Dzikie smaki. Czysta przyjemność.
              </span>
              <br className="hidden md:block" />
              <span className="text-white/55 text-base md:text-lg">
                Nie możesz się zdecydować? Wylosujemy za Ciebie! 🎲
              </span>
            </>
          }
          chips={[
            "27 smaków premium",
            "15 / 30 ml",
            "12 / 18 mg",
            "Trójmiasto · InPost",
          ]}
        />
      </div>

      <FlavorGrid
        items={premiumItems}
        activeCardId={activeCardId}
        onActiveCardChange={setActiveCardId}
      />
    </>
  );
}

export default Transition(Smaki);
