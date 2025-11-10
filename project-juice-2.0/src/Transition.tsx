import { motion } from "framer-motion";
import React from "react";

const Transition = <P extends object>(OgComponent: React.ComponentType<P>) => {
  const TransitionComponent = (props: P) => {
    
    const slideTransition = {
      duration: 0.5, 
      ease: [0.42, 0, 0.58, 1] as const, 
    };

    return (
      <>
        <OgComponent {...props} />
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
          animate={{ x: "-100vw" }}
          exit={{ x: "-100vw" }}
          transition={slideTransition}
        />
      </>
    );
  };

  return TransitionComponent;
};

export default Transition;