import Hero from "./components/Hero.tsx";
import MainButton from "./components/MainButton.tsx";
import logoAnimacja from "./assets/ANIMACJA.gif"
import Transition from "./Transition.tsx";

function Home() {
  return (
    <>
      <div className="content-wrapper ">
        <div className="home">
          <div className="home-left-side">
            <Hero
              title={"JUIICE"}
              description={
                "Witamy na domu trojmiejskich, craftowych liquidow do e-papierosów. Tworzymy unikalne, rzemieślnicze liquidy inspirowane pasja, smakiem i jakosci."
              }
            />
            <MainButton />
          </div>
          <div className="home-rigt-side">
             <img src={logoAnimacja} className="logo-pj-home" alt="project juice" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Transition(Home);
