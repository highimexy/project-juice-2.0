import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo.tsx";
import { useAppReady } from "../lib/appReady.ts";

const navLinks = [
  { to: "/smaki", label: "Smaki" },
  { to: "/info", label: "info" },
  { to: "/secret", label: "???" },
];

function Navigation() {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const ready = useAppReady();

  // Po zmianie trasy czyścimy hover, żeby kropka nie wisiała na starym linku
  useEffect(() => {
    setHoveredTab(null);
  }, [location.pathname]);

  // Nawigacja pojawia się dopiero po zakończeniu loading animacji
  if (!ready) return null;

  const isActive = (to: string) =>
    location.pathname.toLowerCase().replace(/\/+$/, "") ===
    to.toLowerCase().replace(/\/+$/, "");

  const handleRandomClick = () => {
    // Nawigacja żyje poza stroną Smaki — komunikacja przez event
    window.dispatchEvent(new CustomEvent("juiice:random"));
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

  const linkClass = (active: boolean) =>
    `font-['Unbounded'] text-sm uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${
      active ? "text-white" : "text-white/40 group-hover:text-white/70"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `font-['Unbounded'] text-[10px] uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${
      active ? "text-white" : "text-white/40 group-hover:text-white/70"
    }`;

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="hidden lg:flex fixed top-8 left-8 z-50 flex-col items-start gap-3 w-56"
      >
        <div
          className="flex flex-col items-start gap-1 p-4 rounded-2xl border border-white/10 bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl w-full"
          onMouseLeave={() => setHoveredTab(null)}
        >
          <Link
            to="/"
            className="flex justify-center w-full pb-4 border-b border-white/10 mb-2"
          >
            <Logo id="desktop" variant="arc" width={170} fontSize={38} />
          </Link>

          {navLinks.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHoveredTab(item.to)}
                className="relative flex items-center gap-3 py-2.5 px-3 w-full group"
              >
                <NavDot
                  active={active}
                  hovered={hoveredTab === item.to}
                  layoutId="activeDotDesktop"
                />
                <span className={linkClass(active)}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {isActive("/smaki") && (
          <div className="flex rounded-2xl border border-white/10 bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl items-center w-full overflow-hidden">
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
      </motion.div>

      {/* ================= MOBILE ================= */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="lg:hidden fixed z-50 top-4 left-0 right-0 flex flex-col items-center gap-2 px-4"
      >
        <div className="flex flex-col items-center w-full gap-1">
          <Link to="/">
            <Logo id="mobile" variant="arc" width={220} fontSize={42} />
          </Link>

          <nav className="flex items-center gap-0.5 p-1.5 rounded-2xl border border-white/10 bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl mt-2">
            {navLinks.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHoveredTab(item.to)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative flex items-center gap-1.5 py-2 px-3 group"
                >
                  <NavDot
                    active={active}
                    hovered={hoveredTab === item.to}
                    layoutId="activeDotMobile"
                  />
                  <span className={mobileLinkClass(active)}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {isActive("/smaki") && (
          <div
            className="flex justify-center w-full mt-1"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <button
              onClick={handleRandomClick}
              className="flex items-center px-6 py-2.5 rounded-2xl border border-white/10 bg-[#000]/35 bg-linear-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl shadow-2xl group transition-all"
            >
              <span className="font-['Unbounded'] text-[10px] uppercase tracking-widest transition-colors duration-300 text-white/40 group-hover:text-white/70">
                Wylosuj smak
              </span>
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default Navigation;
