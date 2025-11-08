import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";
import Dropdown from "../components/Dropdown.tsx";
import { Link } from "react-router-dom";
import logoAnimacja from "../assets/ANIMACJA.gif";

function Taste() {
  return (
    <>
      <div className="taste-image-container">
        <div className="taste-image">
          <Link to={"/"}>
            <img src={logoAnimacja} className="logo-pj" alt="project juice" />
          </Link>
        </div>
      </div>
      <div>
        <Hero title={"Smaki"} description="Ponizej znajdziesz liste edycji" />
        <Dropdown />
        <RandomBtn />
        <Carousel />
      </div>
    </>
  );
}

export default Taste;
