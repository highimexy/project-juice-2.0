// src/RootLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const RootLayout = () => {
  const location = useLocation();

  return (
    // 'mode="wait"' jest kluczowe
    <AnimatePresence mode="wait">
      {/* Ten div z kluczem jest niezbędny, aby AnimatePresence
          poprawnie wykryło zmianę strony i uruchomiło 'exit' */}
      <div key={location.pathname}>
        <Outlet />
      </div>
    </AnimatePresence>
  );
};

export default RootLayout;