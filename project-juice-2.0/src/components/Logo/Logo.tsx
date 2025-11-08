import logoWhite from "../../assets/Logo-White.png";
import "./logo.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <div className="content-wrapper">
        <Link to="/">
          <img src={logoWhite} className="logo-pj" alt="project juice" />
        </Link>
      </div>
    </>
  );
}

export default Logo;
