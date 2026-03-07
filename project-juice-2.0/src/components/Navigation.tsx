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

/** Logo 3D na łuku — warstwy głębi SVG + białe lico */
function LogoArc3D({
  id,
  width,
  fontSize,
}: {
  id: string;
  width: number;
  fontSize: number;
}) {
  const patternId = `logo3d-grad-${id}`;
  const filterId = `logo3d-shadow-${id}`;
  const arcId = `arc-path-${id}`;
  const depth = 8;

  return (
    <svg
      style={{
        width: `${width}px`,
        height: "auto",
        marginBottom: "-12px",
        overflow: "visible",
      }}
      viewBox="0 0 300 100"
      overflow="visible"
    >
      <defs>
        <pattern
          id={patternId}
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
        <filter id={filterId} x="-15%" y="-30%" width="130%" height="200%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="8"
            floodColor="#7090ab"
            floodOpacity="0.7"
          />
        </filter>
        {/* Ścieżki łuku dla każdej warstwy — przesunięte o translate */}
        <path id={arcId} d="M 20,80 Q 150,0 280,80" />
      </defs>

      {/* Warstwy głębi 3D — każda w osobnym <g transform="translate"> */}
      {Array.from({ length: depth }, (_, i) => {
        const offset = depth - i; // depth→1
        return (
          <g key={i} transform={`translate(${offset * 0.5}, ${offset})`}>
            <text
              fontSize={fontSize}
              fontWeight="800"
              letterSpacing="1"
              opacity={0.45 + (i / depth) * 0.55}
            >
              <textPath
                href={`#${arcId}`}
                startOffset="50%"
                textAnchor="middle"
                fill={`url(#${patternId})`}
              >
                JUiiCE.PL
              </textPath>
            </text>
          </g>
        );
      })}

      {/* Białe lico na wierzchu */}
      <text
        fontSize={fontSize}
        fontWeight="800"
        letterSpacing="1"
        filter={`url(#${filterId})`}
      >
        <textPath
          href={`#${arcId}`}
          startOffset="50%"
          textAnchor="middle"
          fill="white"
        >
          JUiiCE.PL
        </textPath>
      </text>
    </svg>
  );
}

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
          <Link
            to="/"
            className="flex justify-center w-full pb-4 border-b border-white/10 mb-2"
          >
            <LogoArc3D id="desktop" width={170} fontSize={38} />
          </Link>

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

        {isActive("/smaki") && (
          <div className="flex rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl items-center w-full overflow-hidden">
            <button
              onClick={handleRandomClick}
              className="flex items-center justify-center py-4 px-7 w-full group bg-transparent cursor-pointer"
            >
              <span className="font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap text-white/40 group-hover:text-white/70">
                Wylosuj smak
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden fixed z-50 top-4 left-0 right-0 flex flex-col items-center gap-2 px-4">
        <div className="flex flex-col items-center w-full gap-1">
          <Link to="/">
            <LogoArc3D id="mobile" width={220} fontSize={42} />
          </Link>

          <nav className="flex items-center gap-0.5 p-1.5 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl mt-2">
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

        {isActive("/smaki") && (
          <div
            className="flex justify-center w-full mt-1"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <button
              onClick={handleRandomClick}
              className="flex items-center px-6 py-2.5 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl group transition-all"
            >
              <span className="font-['Unbounded'] text-[10px] uppercase tracking-widest transition-colors duration-300 text-white/40 group-hover:text-white/70">
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
