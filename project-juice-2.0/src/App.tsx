import Hero from "./components/Hero.tsx";
import Logo from "./components/Logo/Logo.tsx";
import MainButton from "./components/MainButton.tsx";
import RandomBtn from "./components/RandomBtn.tsx";

function Home() {
  return (
    <>
      <Logo />
      <Hero />
      <RandomBtn />
      <MainButton />
    </>
  );
}

export default Home;
