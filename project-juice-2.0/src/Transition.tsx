import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import loading from "./assets/loading.gif";

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    // 2. Dodajemy stan do kontrolowania widoczności GIF-a
    const [showGif, setShowGif] = useState(true);

    // 3. TUTAJ USTAWIASZ CZAS TRWANIA GIF-A (w milisekundach)
    // Np. jeśli GIF trwa 3 sekundy, wpisz 3000
    const gifDuration = 2500;

    // 4. Używamy useEffect, aby ukryć GIF-a po upływie czasu
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowGif(false);
      }, gifDuration);

      // Ważne: czyścimy timer, jeśli komponent zostanie odmontowany
      return () => clearTimeout(timer);
    }, []); // Pusta tablica zależności [] oznacza, że efekt uruchomi się tylko raz (przy montowaniu)

    const slideTransition = {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const,
    };

    return (
      <>
        <OgComponent {...props} />

        {/* 5. Warstwa z GIF-em (renderowana warunkowo) */}
        {showGif && (
          <motion.div
            className="gif-overlay"
            style={{
              position: "fixed", // Stała pozycja na całym ekranie
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 10000, // Musi być NAJWYŻEJ, ponad wszystko inne
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000", // TUTAJ: zmień tło wg potrzeb
            }}
            // Opcjonalnie: możesz dodać animację znikania dla GIF-a
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* TUTAJ: Wstaw ścieżkę do swojego GIF-a */}
            <img src={loading} alt="Loading animation" />
          </motion.div>
        )}

        {/* Twoje oryginalne warstwy przejściowe */}

        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9998 }}
          initial={{ x: "100vw" }}
          animate={{ x: "100vw" }} // Ta warstwa (od wyjścia) zostaje bez zmian
          exit={{ x: 0 }}
          transition={slideTransition}
        />

        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9999 }}
          initial={{ x: 0 }}
          // 6. KLUCZOWA ZMIANA:
          // Animacja 'x: "-100vw"' uruchomi się DOPIERO, gdy 'showGif' zmieni się na 'false'
          animate={{ x: showGif ? 0 : "-100vw" }}
          exit={{ x: "-100vw" }}
          transition={slideTransition}
        />
      </>
    );
  };

  return TransitionComponent;
};

export default Transition;
