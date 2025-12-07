import React from "react";

const LiquidCompositionArticle: React.FC = () => {
  return (
    <div className="flex flex-col text-left">
      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left">
        1. Cztery filary każdego e-liquidu
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        E-liquidy, powszechnie nazywane olejkami, składają się zazwyczaj z czterech podstawowych
        elementów. Dwa z nich stanowią bazę, a pozostałe dwa są dodatkami wpływającymi na
        doświadczenie z wapowania.
      </p>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        A. Glikol Propylenowy (PG - Propylene Glycol)
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Funkcja: Jest bezbarwnym, bezzapachowym płynem. Głównie odpowiada za "uderzenie w gardło"
          (ang. throat hit) oraz jest doskonałym nośnikiem dla aromatów.
        </li>
        <li>
          Wpływ na parę: Wytwarza mniej widocznej pary niż VG.
        </li>
        <li>
          Właściwości: Jest rzadki, co ułatwia nasączanie grzałki.
        </li>
      </ul>

      <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#804141] text-left mt-3">
        B. Gliceryna Roślinna (VG - Vegetable Glycerin)
      </h3>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          Funkcja: Jest gęsta i lekko słodka. Odpowiada za produkcję dużych chmur pary.
          Jest łagodniejsza dla gardła niż PG.
        </li>
        <li>
          Wpływ na parę: Wytwarza gęstą, obfitą chmurę.
        </li>
        <li>
          Właściwości: Jest lepka, co może prowadzić do wolniejszego nasączania grzałek.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        2. Proporcje PG/VG i Ich Znaczenie
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Stosunek PG do VG (np. 50/50, 70/30, 30/70) jest kluczowy i determinuje to, jak e-liquid
        zachowa się w danym typie urządzenia:
      </p>
      <ul className="list-disc pl-6 mb-4 text-[16px] md:text-[20px]">
        <li>
          50VG / 50PG (Równowaga): Standard dla systemów MTL i podów. Zapewnia dobry smak,
          średnią chmurę i zadowalające uderzenie w gardło.
        </li>
        <li>
          70VG / 30PG (Max Chmury): Preferowany dla urządzeń DL (Direct-to-Lung) o dużej
          mocy. Maksymalizuje produkcję pary kosztem łagodniejszego smaku i braku silnego
          uderzenia w gardło.
        </li>
      </ul>

      <h2 className="mb-2 text-2xl md:text-3xl font-bold text-[#640577] text-left mt-4">
        3. Dodatki: Aromaty i Nikotyna
      </h2>
      <p className="mb-4 text-[16px] md:text-[20px]">
        Aromaty używane w e-liquidach są zazwyczaj aromatami spożywczymi, ale muszą być
        przeznaczone do inhalacji. Nikotyna jest opcjonalnym, uzależniającym dodatkiem.
      </p>

    </div>
  );
};

export default LiquidCompositionArticle;