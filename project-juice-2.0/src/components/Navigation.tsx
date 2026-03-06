import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gradientSvg from "../assets/gradient.svg?url";

interface Item {
  id: string;
  img: string;
}

interface NavbarProps {
  items?: Item[];
  selectedId?: string | null;
  onRandomSelect?: (id: string) => void;
}

const navLinks = [
  { to: "/smaki", label: "Smaki" },
  { to: "/info", label: "info" },
  { to: "/secret", label: "???" },
];

function Navigation({ items = [], onRandomSelect }: NavbarProps) {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const isActive = (to: string) =>
    location.pathname.toLowerCase() === to.toLowerCase();

  const handleRandomClick = () => {
    if (items.length > 0 && onRandomSelect) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      onRandomSelect(randomItem.id);
    }
  };

  // Wspólny komponent kropki dla spójności
  const NavDot = ({
    active,
    hovered,
    layoutId,
  }: {
    active?: boolean;
    hovered?: boolean;
    layoutId: string;
  }) => (
    <div className="relative w-3 h-3 flex justify-center items-center shrink-0">
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#7090ab]"
          style={{
            boxShadow: "0 0 8px #7090ab, 0 0 16px rgba(112,144,171,0.5)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <AnimatePresence>
        {hovered && !active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-1 h-1 rounded-full bg-[#7090ab]"
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex fixed top-8 left-8 z-50 flex-col items-start gap-3 w-56">
        <div
          className="flex flex-col items-start gap-1 p-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl w-full"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {/* Logo Desktop */}
          <Link
            to="/"
            className="flex justify-center w-full pb-4 border-b border-white/10 mb-2"
          >
            <svg className="w-[170px] h-auto -mb-3" viewBox="0 0 300 100">
              <defs>
                <pattern
                  id="navGradPatternDesktop"
                  patternUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="300"
                  height="100"
                >
                  <image
                    href={gradientSvg}
                    x="0"
                    y="0"
                    width="300"
                    height="100"
                    preserveAspectRatio="none"
                  />
                </pattern>
                <filter
                  id="navTextShadowDesktop"
                  x="-10%"
                  y="-20%"
                  width="120%"
                  height="150%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="10"
                    floodColor="#7090ab"
                    floodOpacity="0.75"
                  />
                </filter>
                <path id="arc-path-desktop" d="M 20,80 Q 150,0 280,80" />
              </defs>
              <text
                fontSize="38"
                fontWeight="800"
                letterSpacing="1"
                filter="url(#navTextShadowDesktop)"
              >
                <textPath
                  href="#arc-path-desktop"
                  startOffset="50%"
                  textAnchor="middle"
                  fill="url(#navGradPatternDesktop)"
                >
                  JUiiCE.PL
                </textPath>
              </text>
            </svg>
          </Link>

          {/* Nav items Desktop */}
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onMouseEnter={() => setHoveredTab(item.to)}
              className="relative flex items-center gap-3 py-2.5 px-3 w-full group"
            >
              <NavDot
                active={isActive(item.to)}
                hovered={hoveredTab === item.to}
                layoutId="activeDotDesktop"
              />
              <span
                className={`font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${isActive(item.to) ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Dolny pill Desktop (Random) */}
        <div
          className="flex rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl items-center w-full overflow-hidden"
          onMouseLeave={() => setHoveredTab(null)}
        >
          <button
            onClick={handleRandomClick}
            onMouseEnter={() => setHoveredTab("random-desktop")}
            className="relative flex items-center gap-3 py-4 px-7 w-full group bg-transparent cursor-pointer"
          >
            <NavDot
              hovered={hoveredTab === "random-desktop"}
              layoutId="activeDotDesktop"
            />
            <span
              className={`font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${hoveredTab === "random-desktop" ? "text-white/70" : "text-white/40"}`}
            >
              Wylosuj smak
            </span>
          </button>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden fixed z-50 top-4 left-0 right-0 flex flex-col items-center gap-2 px-4">
        <div className="flex flex-col items-center w-full gap-1">
          {/* Logo Mobile - Powiększone */}
          <Link to="/">
            <svg
              className="w-[220px] h-auto drop-shadow-xl"
              viewBox="0 0 300 100"
            >
              <defs>
                <pattern
                  id="navGradPatternMobile"
                  patternUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="300"
                  height="100"
                >
                  <image
                    href={gradientSvg}
                    x="0"
                    y="0"
                    width="300"
                    height="100"
                    preserveAspectRatio="none"
                  />
                </pattern>
                <filter
                  id="navTextShadowMobile"
                  x="-10%"
                  y="-20%"
                  width="120%"
                  height="150%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="10"
                    floodColor="#7090ab"
                    floodOpacity="0.75"
                  />
                </filter>
                <path id="arc-path-mobile" d="M 20,80 Q 150,0 280,80" />
              </defs>
              <text
                fontSize="42"
                fontWeight="800"
                letterSpacing="1"
                filter="url(#navTextShadowMobile)"
              >
                <textPath
                  href="#arc-path-mobile"
                  startOffset="50%"
                  textAnchor="middle"
                  fill="url(#navGradPatternMobile)"
                >
                  JUiiCE.PL
                </textPath>
              </text>
            </svg>
          </Link>

          {/* Menu Mobile */}
          <nav className="flex items-center gap-0.5 p-1.5 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl mt-[-8px]">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setHoveredTab(item.to)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative flex items-center gap-1.5 py-2 px-3 group"
              >
                <NavDot
                  active={isActive(item.to)}
                  hovered={hoveredTab === item.to}
                  layoutId="activeDotMobile"
                />
                <span
                  className={`font-['Unbounded'] text-[10px] uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${isActive(item.to) ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile RandomBtn - Tylko na /smaki */}
        {isActive("/smaki") && (
          <div
            className="flex justify-center w-full mt-1"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <button
              onClick={handleRandomClick}
              onMouseEnter={() => setHoveredTab("random-mobile")}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl group transition-all"
            >
              <NavDot
                hovered={hoveredTab === "random-mobile"}
                layoutId="activeDotMobile"
              />
              <span
                className={`font-['Unbounded'] text-[10px] uppercase tracking-widest transition-colors duration-300 ${hoveredTab === "random-mobile" ? "text-white/70" : "text-white/40"}`}
              >
                Wylosuj smak
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navigation;
