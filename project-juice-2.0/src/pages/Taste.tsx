import Logo from "../components/Logo/Logo.tsx";
import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";
import Dropdown from "../components/Dropdown.tsx";

function Taste() {
  return (
    <>
      <Logo />
      <Hero title={"Smaki"} description="Ponizej znajdziesz liste edycji"/>
      <Dropdown />
      <RandomBtn />
      <Carousel />
    </>
  );
}

export default Taste;
