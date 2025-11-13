import logoAnimacja from "../assets/ANIMACJA.gif";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navigation-container">
        <div className="nav-left">
          <h1 className="nav-h1">JUIICE</h1>
          <a
            href="#"
            className="taste-image-link"
            onClick={(e) => e.preventDefault()}
          >
            <img src={logoAnimacja} className="logo-pj" alt="project juice" />
          </a>
        </div>

        <div className="menu-container desktop-menu">
          <button>Kontakt</button>
          <button>Polecane</button>
          <button>???</button>
        </div>

        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Otwórz menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div className={`mobile-menu-overlay ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <button onClick={toggleMenu} aria-label="Zamknij menu">
            <h1>back</h1>
          </button>
        </div>
        <div className="mobile-menu-links">
          <button onClick={toggleMenu}>Kontakt</button>
          <button onClick={toggleMenu}>Polecane</button>
          <button onClick={toggleMenu}>???</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
