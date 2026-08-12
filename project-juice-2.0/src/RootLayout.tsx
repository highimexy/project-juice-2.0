import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/Navigation.tsx";
import AsciiClouds from "./components/AsciiClouds.tsx";

const RootLayout = () => {
  const location = useLocation();

  return (
    <>
      {/* Tło: chmurki ASCII dryfujące po ekranie */}
      <AsciiClouds />

      {/* Siatka kropek jak w hero na openclaw.ai — wygaszana ku dołowi */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(112,144,171,0.28) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, transparent 90%)",
        }}
      />

      {/*
        Nawigacja renderowana raz — poza AnimatePresence,
        dzięki czemu aktywna kropka (layoutId) animuje się między linkami,
        a hover działa stabilnie podczas nawigacji.
      */}
      <Navigation />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 w-full min-h-screen"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default RootLayout;
