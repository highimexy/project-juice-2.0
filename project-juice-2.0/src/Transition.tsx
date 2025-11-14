import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import loading from "./assets/loading.gif";

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    const [showGif, setShowGif] = useState(true);
    const gifDuration = 2500;

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowGif(false);
      }, gifDuration);

      return () => clearTimeout(timer);
    }, []);

    const slideTransition = {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const,
    };

    return (
      <>
        <OgComponent {...props} />
        {showGif && (
          <motion.div
            className="gif-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 10000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img className="loading-gif" src={loading} alt="Loading animation" />
          </motion.div>
        )}

        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9998 }}
          initial={{ x: "100vw" }}
          animate={{ x: "100vw" }}
          exit={{ x: 0 }}
          transition={slideTransition}
        />

        <motion.div
          className="transition-overlay"
          style={{ zIndex: 9999 }}
          initial={{ x: 0 }}
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
