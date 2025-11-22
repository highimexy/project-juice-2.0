import Navigation from "../components/Navigation.tsx";
import Wheel from "../components/Wheel/Wheel.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Slot() {
  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div className="polecane content-wrapper">
        <h1 className="polecane-title">Praca w toku...</h1>
        <p className="taste-hero-1">Na tej stronie bedzie</p>
        <p className="taste-hero-2">
          kolo fortuny ktorym mozna zakrecic raz na okreslony czas
        </p>
        <p className="taste-hero-3">
          i jest szansa na otrzymanie procentowych zniżek
        </p>
      </div>
      <Wheel />
    </>
  );
}

export default TransitionOposite(Slot);
