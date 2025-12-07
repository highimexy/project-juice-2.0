import React from "react";

const HistoryArticle: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        1. Początki i nieudane patenty
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Pierwsza znacząca koncepcja urządzenia do bezdymnej inhalacji została
        opatentowana przez Herberta A. Gilberta w 1963 roku. Gilbert opisał
        "bezdymny, nie-tytoniowy papieros", który miał podgrzewać płyn smakowy,
        generując parę zamiast dymu.
      </p>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Niestety, pomysł Gilberta pojawił się w czasach, gdy papierosy tytoniowe
        przeżywały szczyt popularności, a społeczeństwo nie było gotowe na taką
        innowację. Urządzenie nigdy nie trafiło do masowej produkcji, a patent
        wygasł.
      </p>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        2. Przełom i Narodziny Współczesnego E-papierosa (2003)
      </h2>
      <p className="mb-2 text-[16px] md:text-[20px]">
        Prawdziwy przełom nastąpił w 2003 roku w Chinach. Hon Lik, chiński
        farmaceuta, chemik i palacz, stworzył urządzenie, które miało pomóc mu
        rzucić palenie. Jego projekt opierał się na podgrzewaniu roztworu
        nikotyny za pomocą ultradźwiękowego generatora pary, a nie grzałki.
      </p>

      {/* LISTA NIEUPORZĄDKOWANA Z KROPKAMI I WCIĘCIEM (Tailwind CSS) */}
      <ul className="list-disc pl-6 text-[16px] md:text-[20px]">
        <li>
          W 2004 roku jego firma, Ryun, wprowadziła produkt na rynek azjatycki. W
          ten sposób narodził się współczesny e-papieros.
        </li>
        <li>
          Urządzenia te szybko ewoluowały, zamieniając generator ultradźwiękowy
          na podgrzewany element (grzałkę), co stało się standardem w technologii
          wapowania.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        Globalna Ekspansja i Ewolucja (Po 2006 r.)
      </h2>
      {/* Tu możesz dodać więcej treści */}
    </div>
  );
};

export default HistoryArticle;