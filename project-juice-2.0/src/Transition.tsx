import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import loading from "./assets/loading.gif";

// Zmienna poza komponentem zapobiega powtarzaniu GIF-a
let isFirstLoad = true;

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    const [isLoading, setIsLoading] = useState(isFirstLoad);

    // Skrócony czas dla lepszego flow
    const gifDuration = 1800;
    const avvrEase = [0.76, 0, 0.24, 1] as const;

    useEffect(() => {
      if (isFirstLoad) {
        const timer = setTimeout(() => {
          setIsLoading(false);
          isFirstLoad = false;
        }, gifDuration);
        return () => clearTimeout(timer);
      }
    }, []);

    const panels = [
      { id: "p1", color: "#0a0a0a" },
      { id: "p2", color: "#111111" },
      { id: "p3", color: "#1a1a1a" },
    ];

    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <OgComponent {...props} />
        </motion.div>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="initial-loader"
              className="fixed inset-0 z-10000 flex justify-center items-center bg-black"
              exit={{
                opacity: 0,
                transition: { duration: 0.5, ease: avvrEase },
              }}
            >
              <img
                className="max-w-[300px] md:max-w-[500px] w-full h-auto px-6"
                src={loading}
                alt="Loading..."
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ENTRY: Szybsze odsłanianie (0.8s zamiast 1.1s) */}
        {!isLoading &&
          panels.map((panel, i) => (
            <motion.div
              key={`entry-${panel.id}`}
              className="fixed inset-0 pointer-events-none"
              style={{
                backgroundColor: panel.color,
                zIndex: 9000 - i,
                transformOrigin: "top",
              }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: 0.3,
                ease: avvrEase,
                delay: i * 0.05, // Mniejszy odstęp między panelami
              }}
            />
          ))}

        {/* EXIT: Szybsze zakrywanie (0.6s zamiast 0.9s) */}
        {panels.map((panel, i) => (
          <motion.div
            key={`exit-${panel.id}`}
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundColor: panel.color,
              zIndex: 9000 + i,
              transformOrigin: "bottom",
            }}
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              ease: avvrEase,
              delay: i * 0.05,
            }}
          />
        ))}
      </>
    );
  };

  return TransitionComponent;
};

export default Transition;
