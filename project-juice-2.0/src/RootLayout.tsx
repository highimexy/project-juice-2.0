import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default RootLayout;
