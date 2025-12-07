import React from "react";

const GlobalMarketArticle: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        1. Ramy Regulacyjne Unii Europejskiej (UE)
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Regulacje w krajach UE są w dużej mierze ujednolicone dzięki implementacji
        Dyrektywy Tytoniowej (TPD - Tobacco Products Directive), co zapewnia
        spójne standardy bezpieczeństwa, choć kraje członkowskie mogą wprowadzać
        dodatkowe, bardziej restrykcyjne przepisy.
      </p>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        Kluczowe wymogi TPD:
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Limit nikotyny i pojemności: Maksymalnie 20 mg/ml nikotyny i
          zbiorniki do 2 ml.
        </li>
        <li>
          Obowiązek zgłaszania produktów: Wszelkie produkty muszą być zgłoszone
          do odpowiednich organów krajowych na 6 miesięcy przed wprowadzeniem na
          rynek.
        </li>
        <li>
          Zakaz reklamy: Ograniczenia i zakazy reklamy transgranicznej oraz
          promocji w mediach.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        2. Rynek Amerykański i Rola FDA
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Stany Zjednoczone stanowią największy rynek dla wapowania. Jest on
        regulowany przez Agencję Żywności i Leków (FDA), która narzuciła rygorystyczne
        wymagania autoryzacyjne.
      </p>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        Procedura PMTA (Pre-Market Tobacco Application):
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Cel: Udowodnienie FDA, że sprzedaż danego produktu jest "właściwa
          dla ochrony zdrowia publicznego".
        </li>
        <li>
          Wpływ: Proces PMTA jest niezwykle kosztowny i czasochłonny, co
          spowodowało eliminację wielu małych i średnich producentów z rynku,
          faworyzując duże korporacje tytoniowe.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        3. Globalne Trendy i Innowacje
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Na świecie obserwuje się stałą ewolucję technologii i preferencji
        konsumentów.
      </p>
      <ul className="list-disc pl-6 text-[16px] md:text-[20px]">
        <li>
          Popularność Nic Salt (Solniczki): Wiele rynków, zwłaszcza USA,
          odnotowuje wzrost popularności e-liquidów na solach nikotynowych, które
          umożliwiają wyższe stężenie nikotyny przy łagodniejszym uderzeniu w gardło.
        </li>
        <li>
          Wzrost Disposables (Jednorazówki): Pomimo kontrowersji, jednorazowe
          e-papierosy zyskały ogromną popularność na całym świecie dzięki
          łatwości użycia i intensywności smaku.
        </li>
      </ul>
    </div>
  );
};

export default GlobalMarketArticle;