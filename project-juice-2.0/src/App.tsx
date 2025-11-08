import Hero from "./components/Hero.tsx";
import Logo from "./components/Logo/Logo.tsx";
import MainButton from "./components/MainButton.tsx";

function Home() {
  return (
    <>
      <div className="content-wrapper ">
        <div className="home">
          <div className="home-left-side">
            <Hero
              title={"Project Juice"}
              description={
                "Witamy na projectjuice.pl domu trójmiejskich, craftowych soczków do e-papierosów. Tworzymy unikalne, rzemieślnicze liquidy inspirowane pasją, smakiem i jakością."
              }
            />
            <MainButton />
          </div>
          <div className="home-rigt-side">
            <Logo />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
