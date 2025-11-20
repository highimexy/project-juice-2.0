import Navigation from "../components/Navigation.tsx";
import TransitionOposite from "../TransitionOposite.tsx";

function Polecane() {
  return (
    <>
      <div className="">
        <Navigation />
      </div>
      <div className="polecane content-wrapper">
        <h1 className="polecane-title">Praca w toku...</h1>
        <p className="taste-hero-1">Na tej stronie beda artykuly</p>
        <p className="taste-hero-2">z Polski i swiata</p>
        <p className="taste-hero-3">dotyczace ogolnopojetego tematu vapowania</p>
      </div>
    </>
  );
}

export default TransitionOposite(Polecane);
