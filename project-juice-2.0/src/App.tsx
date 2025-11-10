import Hero from "./components/Hero.tsx";
import MainButton from "./components/MainButton.tsx";
import logoAnimacjaLewo from "./assets/home-export.gif"
import Transition from "./Transition.tsx";

function Home() {
  return (
    <>
      <div className="content-wrapper ">
        <div className="home">
          <div className="home-left-side">
            <Hero
              title={"Project Juice"}
              description={
                "Witamy na projectjuice.pl domu trojmiejskich, craftowych liquidow do e-papierosów. Tworzymy unikalne, rzemieślnicze liquidy inspirowane pasja, smakiem i jakosci."
              }
            />
            <MainButton />
          </div>
          <div className="home-rigt-side">
             <img src={logoAnimacjaLewo} className="logo-pj-home" alt="project juice" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Transition(Home);
