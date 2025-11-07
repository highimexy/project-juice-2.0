import Carousel from "./components/Carousel.tsx";
import Hero from "./components/Hero.tsx";
import Logo from "./components/Logo/Logo.tsx";
import RandomBtn from "./components/RandomBtn.tsx";

function Home() {
  return (
    <>
      <Logo />
      <Hero />
      <Carousel />
      <RandomBtn />
    </>
  );
}

export default Home;
