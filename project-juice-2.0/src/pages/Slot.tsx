import { useState } from "react";
import Navigation from "../components/Navigation.tsx";
import WheelCustom from "../components/Wheel/Wheel.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Slot() {
  const [wynik, setWynik] = useState<string | null>(null);

  const segments = [
    { label: "10% Zniżki", color: "#585580" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "Uścisk prezesa", color: "#804141" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "20% Zniżki", color: "#640577" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "Uścisk prezesa", color: "#585580" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "5% Zniżki", color: "#804141" },
    { label: "Nic", color: "#1a1a1a" },
    { label: "Uścisk prezesa", color: "#640577" },
    { label: "Nic", color: "#1a1a1a" },
  ];

  const handleSpinFinished = (segment: string) => {
    setWynik(segment);
  };

  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div className="polecane content-wrapper">
        <h1 className="polecane-title">Koło Fortuny!</h1>
        <p className="taste-hero-1">Zakręć kołem i spróbuj wygrać zniżkę!</p>
        <p className="taste-hero-2">
          Masz szansę na otrzymanie procentowych zniżek.
        </p>

        {/* WYNIK WIDOCZNY NAD KOŁEM */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            minHeight: "40px",
            fontSize: "1.5em",
            fontWeight: "bold",
            color: wynik && wynik.includes("Nic") ? "#cc0000" : "#009900",
          }}
        >
          {wynik &&
            (wynik.includes("Nic")
              ? "Niestety, spróbuj następnym razem!"
              : `GRATULACJE! Wygrałeś: ${wynik}!`)}
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
      >
        <WheelCustom
          segments={segments}
          onFinished={handleSpinFinished}
          size={290}
        />
      </div>
    </>
  );
}

export default TransitionOposite(Slot);
