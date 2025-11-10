// src/RootLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Outlet />
      </div>
    </AnimatePresence>
  );
};

export default RootLayout;
