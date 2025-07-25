import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  // Calculate precise header position
  useEffect(() => {
    const calculateHeaderPosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Header calculations based on your Tailwind classes
      const maxContainerWidth = Math.min(1280, viewportWidth - 48); // max-w-7xl with px-6
      const containerLeftOffset = (viewportWidth - maxContainerWidth) / 2;
      const horizontalPadding = 24; // px-6
      
      // Logo dimensions - only logo image, no text
      const logoWidth = 40; // w-10
      
      // Calculate logo center position (just the logo, not including text)
      const logoStartX = containerLeftOffset + horizontalPadding;
      const logoCenterX = logoStartX + (logoWidth / 2);
      
      // Vertical positioning
      const headerHeight = 80;
      const logoVerticalCenter = 40;
      
      // Target position relative to viewport center
      const targetX = logoCenterX - (viewportWidth / 2);
      const targetY = logoVerticalCenter - (viewportHeight / 2);
      
      setTargetPosition({ x: targetX, y: targetY });
    };

    calculateHeaderPosition();
    window.addEventListener('resize', calculateHeaderPosition);
    
    return () => window.removeEventListener('resize', calculateHeaderPosition);
  }, []);

  const handleLoadingComplete = () => {
    setIsSliding(true);
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Stars during loading */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo Image Only Animation */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Logo Image Only - No Flip Animation */}
        <motion.div
          className="mb-8"
          animate={
            isSliding
              ? {
                  y: targetPosition.y,
                  x: targetPosition.x,
                  scale: 0.4, // Scale down to header logo size
                  marginBottom: 0,
                }
              : {
                  y: [0, -10, 0], // Keep gentle floating
                  x: 0,
                  scale: 1,
                  marginBottom: 32,
                }
          }
          transition={
            isSliding
              ? { duration: 1.8, ease: [0.22, 1, 0.36, 1] }
              : {
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }
          }
        >
          {/* Logo Image Only */}
          <img 
            src="/images/autonova-logo.png" 
            alt="AUTONOVA Logo"
            className="h-20 w-auto"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))'
            }}
          />
        </motion.div>

        {/* Company Name - Loading Phase Only (Static) */}
        {!isSliding && (
          <motion.h1
            className="text-4xl font-bold text-white font-orbitron tracking-wider mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          >
            AUTONOVA
          </motion.h1>
        )}

        {/* Loading Text - Only during loading */}
        {!isSliding && (
          <motion.p
            className="text-gray-400 font-rajdhani tracking-widest text-sm mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            INITIALIZING AUTOMATION PROTOCOLS...
          </motion.p>
        )}

        {/* Loading Bar - Only during loading */}
        {!isSliding && (
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              onAnimationComplete={handleLoadingComplete}
            />
          </div>
        )}

        {/* Loading Complete Text - Only during loading */}
        {!isSliding && (
          <motion.div
            className="mt-4 text-white font-rajdhani tracking-wider text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              LOADING COMPLETE
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
