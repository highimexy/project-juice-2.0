import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";
import Dropdown from "../components/Dropdown.tsx";
import { Link } from "react-router-dom";
import logoAnimacja from "../assets/ANIMACJA.gif";

import smak1 from "../assets/smak1.png";
import smak2 from "../assets/smak2.png";

function Taste() {
  const items = [
    { id: "#1", img: smak1 },
    { id: "#2", img: smak1 },
    { id: "#3", img: smak1 },
    { id: "#4", img: smak1 },
    { id: "#5", img: smak1 },
    { id: "#6", img: smak1 },
    { id: "#7", img: smak1 },
    { id: "#8", img: smak1 },
    { id: "#9", img: smak1 },
    { id: "#10", img: smak1 },
  ];
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
        <RandomBtn items={items}  />
        <Carousel items={items} />
      </div>
    </>
  );
}

export default Taste;
