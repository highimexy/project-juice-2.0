import React from "react";

const BuildArticle: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        1. Główne elementy e-papierosa
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Każdy nowoczesny e-papieros składa się z trzech kluczowych komponentów,
        które współpracują ze sobą, aby umożliwić proces wapowania.
        Są to: system zasilania, atomizer (system grzewczy) i zbiornik na płyn.
      </p>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        A. System Zasilania (Bateria/Mod)
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Mod (Modyfikacja): Obudowa zawierająca baterię. Może być zintegrowana
          lub wymienna, regulowana lub nieregulowana.
        </li>
        <li>
          Płytka elektroniczna: Odpowiada za kontrolę mocy, temperatury,
          bezpieczeństwo i wyświetlanie informacji (w modelach regulowanych).
        </li>
      </ul>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        B. Atomizer (System Grzewczy)
      </h3>
      <p className="mb-2 text-[16px] md:text-[20px]">
        Atomizer to serce urządzenia, odpowiedzialne za zamianę płynu (e-liquidu)
        w parę poprzez podgrzewanie.
      </p>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Grzałka (Coil): Element grzewczy wykonany z drutu oporowego (np. Kanthal, 
          Stal nierdzewna) owiniętego wokół materiału chłonnego (bawełna).
        </li>
        <li>
          Knot (Wick): Bawełna, która nasiąka e-liquidem i transportuje go do
          elementu grzewczego.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        2. Style wapowania: MTL vs. DL
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Sposób inhalacji znacząco wpływa na wybór sprzętu. Rozróżnia się dwa główne style:
      </p>
      <ul className="list-disc pl-6 text-[16px] md:text-[20px]">
        <li>
          MTL (Mouth-to-Lung): Przypomina zaciąganie się papierosem tradycyjnym – 
          para najpierw trafia do ust, a potem do płuc. Wymaga wyższej oporności grzałki 
          i niższej mocy (np. 10-20W).
        </li>
        <li>
          DL (Direct-to-Lung): Polega na bezpośrednim wciąganiu dużej ilości pary do płuc.
          Wymaga niskiej oporności grzałki i wysokiej mocy (np. 50-100W+).
        </li>
      </ul>
    
    </div>
  );
};

export default BuildArticle;