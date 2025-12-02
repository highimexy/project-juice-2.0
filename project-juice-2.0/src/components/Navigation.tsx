import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const buttonBaseClass = "h-[40px] text-[1em]";
  const desktopButtonWidth = "w-[160px]";

  return (
    <>
      <div className="flex items-center justify-between box-border w-full py-5 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] 2xl:py-10">
        <div className="flex items-center gap-[22px]">
          <svg
            className="w-full max-w-[400px] h-auto -mb-4 md:max-w-[600px]"
            viewBox="0 0 300 100"
          >
            <path
              id="arc-path"
              d="M 20,80 Q 150,0 280,80"
              fill="none"
              stroke="none"
            />

            <text className="fill-[#e2e1e1] text-[48px] font-extrabold tracking-[1px] cursor-pointer md:cursor-default">
              <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
                JUiiCE.PL
              </textPath>
            </text>
          </svg>
        </div>

        <div className="hidden lg:flex gap-[15px]">
          <Link to={"/Taste"}>
            <button
              className={`${buttonBaseClass} ${desktopButtonWidth} flex items-center justify-center text-white`}
            >
              Smaki
            </button>
          </Link>
          <Link to={"/Kontakt"}>
            <button
              className={`${buttonBaseClass} ${desktopButtonWidth} flex items-center justify-center text-[#585580]`}
            >
              Kontakt
            </button>
          </Link>
          <Link to={"/Polecane"}>
            <button
              className={`${buttonBaseClass} ${desktopButtonWidth} flex items-center justify-center text-[#640577]`}
            >
              Polecane
            </button>
          </Link>
          <Link to={"/Slot"}>
            <button
              className={`${buttonBaseClass} ${desktopButtonWidth} flex items-center justify-center text-[#804141]`}
            >
              ???
            </button>
          </Link>
        </div>

        <button
          className="block lg:hidden bg-transparent text-white cursor-pointer"
          onClick={toggleMenu}
          aria-label="Otwórz menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#1a1a1a] z-100 transition-transform duration-300 ease-in-out flex flex-col box-border py-5 px-4 md:px-8 lg:px-[62px] xl:px-[104px] 2xl:px-[200px] 2xl:py-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-start">
          <button
            onClick={toggleMenu}
            aria-label="Zamknij menu"
            className="bg-transparent border-none text-white/87 p-2 w-auto"
          >
            <h1 className="text-[1.5em] m-0">back</h1>
          </button>
        </div>

        <div className="flex flex-col items-center gap-5 mt-10">
          <Link to={"/Kontakt"} className="w-full flex justify-center">
            <button className="w-[90%] text-white" onClick={toggleMenu}>
              Smaki
            </button>
          </Link>
          <Link to={"/Kontakt"} className="w-full flex justify-center">
            <button className="w-[90%] text-[#585580]" onClick={toggleMenu}>
              Kontakt
            </button>
          </Link>
          <Link to={"/Polecane"} className="w-full flex justify-center">
            <button className="w-[90%] text-[#640577]" onClick={toggleMenu}>
              Polecane
            </button>
          </Link>
          <Link to={"/Slot"} className="w-full flex justify-center">
            <button className="w-[90%] text-[#804141]" onClick={toggleMenu}>
              ???
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
