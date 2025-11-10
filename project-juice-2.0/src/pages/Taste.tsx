import Carousel from "../components/Carousel/Carousel.tsx";
import RandomBtn from "../components/RandomBtn.tsx";
import Hero from "../components/Hero.tsx";
import Dropdown from "../components/Dropdown.tsx";
import { Link } from "react-router-dom";
import logoAnimacja from "../assets/ANIMACJA.gif";
import TransitionOposite from "../TransitionOposite.tsx"

import smak1 from "../assets/smak1.png";
import smak2 from "../assets/smak2.png";
import smak3 from "../assets/smak3.png";
import smak4 from "../assets/smak4.png";
import smak5 from "../assets/smak5.png";
import smak6 from "../assets/smak6.png";
import smak7 from "../assets/smak7.png";
import smak8 from "../assets/smak8.png";
import smak9 from "../assets/smak9.png";
import smak10 from "../assets/smak10.png";

function Taste() {
  const items = [
    { id: "#1", img: smak1 },
    { id: "#2", img: smak2 },
    { id: "#3", img: smak3 },
    { id: "#4", img: smak4 },
    { id: "#5", img: smak5 },
    { id: "#6", img: smak6 },
    { id: "#7", img: smak7 },
    { id: "#8", img: smak8 },
    { id: "#9", img: smak9 },
    { id: "#10", img: smak10 },
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

export default TransitionOposite(Taste);
