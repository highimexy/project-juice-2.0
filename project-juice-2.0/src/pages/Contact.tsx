import Logo from "../components/Logo/Logo.tsx";
import Carousel from "../components/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";

function Contact() {
  return (
    <>
      <Logo />
      <Hero title={"Smaki"} description="Ponizej znajdziesz liste edycji"/>
      
      <RandomBtn />
      <Carousel />
    </>
  );
}

export default Contact;
