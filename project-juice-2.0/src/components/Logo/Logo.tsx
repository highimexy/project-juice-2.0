
import logoAnimacja from "../../assets/ANIMACJA.gif";
import "./logo.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <div className="logo">
        <Link to="/">
          <img src={logoAnimacja} className="logo-pj" alt="project juice" />
        </Link>
      </div>
    </>
  );
}

export default Logo;
