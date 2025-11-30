import { motion } from "framer-motion";
import React from "react";

const TransitionOposite = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    const slideTransition = {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1] as const,
    };

    // Wspólna klasa dla obu nakładek
    const overlayClass = "fixed top-0 left-0 w-full h-screen bg-black";

    return (
      <>
        <OgComponent {...props} />

        {/* Warstwa wchodząca (Exit animation) */}
        <motion.div
          className={`${overlayClass} z-9998`}
          initial={{ x: "-100vw" }}
          animate={{ x: "-100vw" }}
          exit={{ x: 0 }}
          transition={slideTransition}
        />

        {/* Warstwa wychodząca (Entry animation) */}
        <motion.div
          className={`${overlayClass} z-9999`}
          initial={{ x: 0 }}
          animate={{ x: "100vw" }}
          exit={{ x: "100vw" }}
          transition={slideTransition}
        />
      </>
    );
  };

  return TransitionComponent;
};

export default TransitionOposite;