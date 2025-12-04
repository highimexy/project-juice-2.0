import React, { useState } from "react";
import { BasicTile } from "../components/BasicTile/BasicTile.tsx";
import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";
import ArticleModal from "../components/ArticleModal/ArticleModal.tsx";

import { GrHistory } from "react-icons/gr";
import { IoBuildOutline } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";
import { GiPoland } from "react-icons/gi";
import { FaGlobe } from "react-icons/fa6";

interface ArticleCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

function Info() {
  const [selectedCard, setSelectedCard] = useState<ArticleCard | null>(null);

  const ArticleCards: ArticleCard[] = [
    {
      id: "1",
      title: "Historia Vape",
      description:
        "Poznaj fascynującą podróż e-papierosów od pierwszych, nieudanych patentów, przez przełomowy projekt Hon Lika, aż po współczesny, globalny fenomen. Artykuł obejmuje kluczowe daty, wynalazców i ewolucję urządzeń.",
      path: "/",
      icon: <GrHistory size={40} className="text-[#585580]" />,
    },
    {
      id: "2",
      title: "Budowa Vape",
      description:
        "Zrozum, jak działa Twój e-papieros! Szczegółowe omówienie kluczowych elementów: baterii (modu), atomizera (grzałki) i zbiornika. Poznaj różnice między systemami MTL a DL oraz dowiedz się, jak utrzymać sprzęt w najlepszej kondycji.",
      path: "/",
      icon: <IoBuildOutline size={40} className="text-[#585580]" />,
    },
    {
      id: "3",
      title: "Skład olejków",
      description:
        "Analiza bazowych składników każdego e-liquidu: glikolu propylenowego (PG), gliceryny roślinnej (VG), aromatów i nikotyny. Dowiedz się, jak proporcje PG/VG wpływają na chmurę i smak oraz jakie funkcje pełnią poszczególne substancje.",
      path: "/",
      icon: <MdOutlineScience size={40} className="text-[#585580]" />,
    },
    {
      id: "4",
      title: "Rynek polski",
      description:
        "Przegląd polskiej sceny vapingu: regulacje prawne (akcyza, dyrektywa TPD), najpopularniejsze marki i trendy konsumenckie. Zobacz, jak krajowe przepisy kształtują dostępność sprzętu i płynów oraz z jakimi wyzwaniami mierzy się polska branża.",
      path: "/",
      icon: <GiPoland size={40} className="text-[#585580]" />,
    },
    {
      id: "5",
      title: "Rynek zagraniczny",
      description:
        "Analiza globalnego rynku vapingu. Dowiedz się, jak regulacje w USA (FDA) i Unii Europejskiej wpływają na branżę. Poznaj najważniejsze światowe trendy, innowacje technologiczne oraz różnice kulturowe w podejściu do e-papierosów.",
      path: "/",
      icon: <FaGlobe size={40} className="text-[#585580]" />,
    },
  ];

  const openModal = (card: ArticleCard) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
       
      <div>
                <Navigation />   
      </div>
      <div className="mb-10 flex flex-col text-center pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <div className="pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">INFORMACJE</h1>       
          <p className="mt-[5px] text-[#585580]">
            Poradniki, artykuły, ciekawostki
          </p>
          <p className="mt-[5px] text-[#640577]">z Polski i swiata</p>
          <p className="mt-[5px] text-[#804141]">
                        dotyczace ogolnopojetego tematu vapowania    
          </p>
        </div>
        <div className="flex flex-col flex-wrap gap-4 md:flex md:flex-row">
          {ArticleCards.map((card) => (
            <BasicTile
              key={card.id}
              className="cursor-pointer hover:shadow-2xl transition duration-300"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="text-center">
                  <div className="flex justify-center mb-2">{card.icon}</div>   
                  <h1 className="mb-4 text-4xl text-[#640577]">{card.title}</h1>
                  <p className="text-2xl mb-4">{card.description}</p>           
                </div>
                   
                <button
                  onClick={() => openModal(card)}
                  className="text-[#804141] font-bold mt-auto transition duration-150 p-2"
                >
                      czytaj więcej...          
                </button>
              </div>
            </BasicTile>
          ))}
        </div>
      </div>
      {selectedCard && (
        <ArticleModal card={selectedCard} onClose={closeModal} />
      )}
    </>
  );
}

export default TransitionOposite(Info);
