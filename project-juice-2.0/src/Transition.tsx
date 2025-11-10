// src/Transition.tsx
import { motion } from "framer-motion";
import React from "react";

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    
    // Definicja animacji slajdu
    const slideTransition = {
      duration: 0.5, // Szybsze przejście
      ease: [0.42, 0, 0.58, 1] as const, // "easeInOut"
    };

    return (
      <>
        {/* Twoja strona (np. Home) */}
        <OgComponent {...props} />

        {/* Div #1: Zasłaniacz (animuje się przy WYJŚCIU) */}
        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9998 }}
          // Zacznij poza ekranem po prawej
          initial={{ x: "100vw" }}
          // Pozostań poza ekranem
          animate={{ x: "100vw" }}
          // Przy WYJŚCIU: wjedź na ekran z prawej, zasłaniając go
          exit={{ x: 0 }}
          transition={slideTransition}
        />

        {/* Div #2: Odsłaniacz (animuje się przy WEJŚCIU) */}
        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9999 }} // Wyższy zIndex
          // Zacznij na ekranie (zasłaniając nową treść)
          initial={{ x: 0 }}
          // Przy WEJŚCIU: wyjedź z ekranu w lewo, odsłaniając
          animate={{ x: "-100vw" }}
          // Przy WYJŚCIU: również ma być poza ekranem
          exit={{ x: "-100vw" }}
          transition={slideTransition}
        />
      </>
    );
  };

  return TransitionComponent;
};

export default Transition;