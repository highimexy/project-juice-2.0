import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navigation-container">
        <div className="nav-left">
          <Link to={"/Taste"}>
            <svg className="arc-heading" viewBox="0 0 300 100">
              <path
                id="arc-path"
                d="M 20,80 Q 150,0 280,80"
                fill="none"
                stroke="none"
              />

              <text className="arc-text">
                <textPath
                  href="#arc-path"
                  startOffset="50%"
                  text-anchor="middle"
                >
                  juiice.pl
                </textPath>
              </text>
            </svg>
          </Link>
        </div>

        <div className="menu-container desktop-menu">
          <Link to={"/Kontakt"}>
            <button className="home-h1-1">Kontakt</button>
          </Link>
          <Link to={"/Polecane"}>
            <button className="home-h1-2">Polecane</button>
          </Link>
          <Link to={"/???"}>
            <button className="home-h1-3">???</button>
          </Link>
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
          <Link to={"/Kontakt"}>
            <button className="home-h1-1" onClick={toggleMenu}>
              Kontakt
            </button>
          </Link>
          <Link to={"/Polecane"}>
            <button className="home-h1-2" onClick={toggleMenu}>
              Polecane
            </button>
          </Link>
          <Link to={"/???"}>
            <button className="home-h1-3" onClick={toggleMenu}>
              ???
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
