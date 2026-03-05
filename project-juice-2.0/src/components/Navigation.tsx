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
  { to: "/taste", label: "Smaki" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/slot", label: "???" },
];

function Navigation({ items = [], selectedId, onRandomSelect }: NavbarProps) {
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

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex fixed top-8 left-8 z-50 flex-col items-start gap-3">
        {/* Główny Nav pill */}
        <div
          className="flex flex-col items-start gap-1 p-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl w-full"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {/* Logo */}
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
                style={{ cursor: "pointer" }}
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

          <div id="nav-extra-pill" />

          {/* Nav items */}
          {navLinks.map((item) => {
            const active = isActive(item.to);
            const hovered = hoveredTab === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onMouseEnter={() => setHoveredTab(item.to)}
                className="relative flex items-center gap-3 py-2.5 px-3 w-full group"
              >
                <div className="relative w-3 h-3 flex justify-center items-center shrink-0">
                  {active && (
                    <motion.div
                      layoutId="activeDotDesktop"
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#7090ab]"
                      style={{
                        boxShadow:
                          "0 0 8px #7090ab, 0 0 16px rgba(112,144,171,0.5)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
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
                <span
                  className={`font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Dolny pill - Wylosuj smak (pod głównym) */}
        <div className="flex p-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl items-center justify-center pointer-events-auto w-full">
          <button
            onClick={handleRandomClick}
            className="relative flex items-center justify-center gap-3 py-1 px-3 group bg-transparent border-none cursor-pointer w-full"
          >
            <span className="font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap text-white/40 group-hover:text-[#7090ab]">
              Wylosuj smak
            </span>
          </button>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden fixed z-50 top-4 left-4 right-4 flex flex-col items-center gap-3">
        {/* Górny Bar (Logo nad nawigacją) */}
        <div className="flex flex-col items-center w-full gap-2">
          <Link to="/">
            <svg className="w-[120px] h-auto" viewBox="0 0 300 100">
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
                fontSize="38"
                fontWeight="800"
                letterSpacing="1"
                style={{ cursor: "pointer" }}
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

          <nav className="flex items-center gap-0.5 p-1.5 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              const hovered = hoveredTab === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onMouseEnter={() => setHoveredTab(item.to)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative flex items-center gap-1.5 py-2 px-2.5 group"
                >
                  <div className="relative w-3 h-3 flex justify-center items-center shrink-0">
                    {active && (
                      <motion.div
                        layoutId="activeDotMobile"
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#7090ab]"
                        style={{
                          boxShadow:
                            "0 0 8px #7090ab, 0 0 16px rgba(112,144,171,0.5)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
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
                  <span
                    className={`font-['Unbounded'] text-[9px] uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile RandomBtn */}
        {isActive("/taste") && (
          <div className="flex justify-center w-full">
            <button
              onClick={handleRandomClick}
              className="bg-[#111010] rounded-xl border-2 border-black hover:border-white hover:bg-[#111010] text-white font-['Unbounded'] font-black text-xs px-6 py-2.5 whitespace-normal text-center shadow-lg transition-all"
            >
              Wylosuj smak
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navigation;
