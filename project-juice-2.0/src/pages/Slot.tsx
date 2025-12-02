import { useState } from "react";
import Navigation from "../components/Navigation.tsx";
import WheelCustom from "../components/Wheel/Wheel.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Slot() {
  const [wynik, setWynik] = useState<string | null>(null);

  const segments = [
    { label: "- 10%", color: "#585580" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "+10ml", color: "#804141" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "- 15%", color: "#640577" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "+10ml", color: "#585580" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "- 5%", color: "#804141" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "+10ml", color: "#640577" },
    { label: "Nic", color: "#1a1a1a" },
  ];

  const handleSpinFinished = (segment: string) => {
    setWynik(segment);
  };

  return (
    <>
      <div>
        <Navigation />
      </div>
      <div className="flex flex-col text-center pt-[100px] w-full box-border px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px]">
        <h1 className="font-bold text-4xl md:text-5xl">Koło Fortuny!</h1>
        <p className="mt-[5px] text-[#585580]">
          Zakręć kołem i spróbuj wygrać zniżkę!
        </p>
        <p className="mt-[5px] text-[#640577]">
          Masz szansę na otrzymanie procentowych zniżek.
        </p>
        <div
          className={`text-center text-[1.2em] font-bold ${
            wynik && wynik.includes("Nic") ? "text-[#cc0000]" : "text-[#009900]"
          }`}
        >
          {wynik &&
            (wynik.includes("Nic")
              ? "Niestety, spróbuj następnym razem!"
              : `GRATULACJE! Wygrałeś: ${wynik}!`)}
        </div>
      </div>

      <div className="flex justify-center my-10">
        <WheelCustom
          segments={segments}
          onFinished={handleSpinFinished}
          size={200}
        />
      </div>
    </>
  );
}

export default TransitionOposite(Slot);
