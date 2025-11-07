import logoWhite from "../../assets/Logo-White.png";
import "./logo.css";

function Logo() {
  return (
    <>
      <a href="https://github.com/highimexy" target="_blank">
        <img src={logoWhite} className="logo-pj" alt="project juice" />
      </a>
    </>
  );
}

export default Logo;
