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

    // Wspólna klasa dla czarnych nakładek
    const overlayClass = "fixed top-0 left-0 w-full h-screen bg-black";

    return (
      <>
        <OgComponent {...props} />
        
        {/* GIF Overlay */}
        {showGif && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-10000 flex justify-center items-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              className="max-w-[800px] xl:max-w-[1440px]" 
              src={loading} 
              alt="Loading animation" 
            />
          </motion.div>
        )}

        {/* Slide Out Overlay (Exit) */}
        <motion.div
          className={`${overlayClass} z-9998`}
          initial={{ x: "100vw" }}
          animate={{ x: "100vw" }}
          exit={{ x: 0 }}
          transition={slideTransition}
        />

        {/* Slide In Overlay (Entry) */}
        <motion.div
          className={`${overlayClass} z-9999`}
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