import React from "react";

const PolishMarketArticle: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        1. Regulacje Prawne w Polsce
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Polski rynek e-papierosów jest silnie regulowany przez prawo krajowe,
        które implementuje unijne przepisy, przede wszystkim Dyrektywę Tytoniową
        (TPD – Tobacco Products Directive). Główne obszary regulacji to:
      </p>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        A. Dyrektywa TPD i jej wpływ
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Ograniczenie pojemności: Maksymalna pojemność zbiorników na płyn
          z nikotyną to 2 ml (dla atomizerów) i 10 ml (dla butelek
          e-liquidów).
        </li>
        <li>
          Limit stężenia nikotyny: Maksymalne stężenie to 20 mg/ml.
        </li>
        <li>
          Wymogi dotyczące bezpieczeństwa i etykietowania: Obowiązek
          zamieszczania ostrzeżeń zdrowotnych i informowania o składzie.
        </li>
        <li>
          Zakaz reklamy: Całkowity zakaz reklamy i promocji e-papierosów oraz
          ich płynów w mediach i punktach sprzedaży.
        </li>
      </ul>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        B. Akcyza
      </h3>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Wprowadzenie akcyzy na płyny do e-papierosów i wyroby nowatorskie
        miało znaczący wpływ na ceny i strukturę rynku. Akcyza dotyczy zarówno
        płynów z nikotyną, jak i bez niej.
      </p>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        2. Trendy i Konsumenci
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Polski rynek charakteryzuje się dynamicznym rozwojem i specyficznymi
        preferencjami konsumentów, często odróżniającymi go od rynków
        zachodnioeuropejskich.
      </p>
      <ul className="list-disc pl-6 text-[16px] md:text-[20px]">
        <li>
          Popularność systemów MTL i Podów: Mimo obecności zaawansowanych
          urządzeń DL, popularne są systemy MTL (usta-płuco) oraz systemy typu
          pod (zamknięte i otwarte), cenione za dyskrecję i łatwość obsługi.
        </li>
        <li>
          Kultura DIY (Do It Yourself): Ze względu na regulacje dotyczące
          wielkości butelek, w Polsce silnie rozwinięta jest kultura mieszania
          płynów we własnym zakresie (DIY), przy użyciu bazy, aromatów i
          nikotynowych shotów.
        </li>
        <li>
          Krajowe marki: Na rynku dominują zarówno globalne korporacje, jak i
          silne, polskie marki liquidów i sprzętu.
        </li>
      </ul>

    </div>
  );
};

export default PolishMarketArticle;