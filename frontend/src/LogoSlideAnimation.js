// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// const LogoSlideAnimation = ({ onComplete }) => {
//   const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const calculateExactHeaderPosition = () => {
//       // Calculate exact header logo position for perfect alignment
//       const viewportWidth = window.innerWidth;
//       const viewportHeight = window.innerHeight;
      
//       // Header configuration (based on your CSS classes)
//       const headerHeight = 80; // Approximate header height with padding
//       const maxWidth = Math.min(1280, viewportWidth - 48); // max-w-7xl with px-6
//       const containerLeft = (viewportWidth - maxWidth) / 2; // Center the container
//       const logoLeftPadding = 24; // px-6 left padding
//       const logoWidth = 40; // w-10 = 40px
//       const logoMarginRight = 12; // mr-3 = 12px
//       const textWidth = 120; // Approximate AUTONOVA text width
      
//       // Calculate exact center position of the logo + text combination
//       const totalLogoWidth = logoWidth + logoMarginRight + textWidth;
//       const logoStartX = containerLeft + logoLeftPadding;
//       const logoCenterX = logoStartX + (totalLogoWidth / 2);
      
//       // Calculate target position relative to viewport center
//       const centerX = viewportWidth / 2;
//       const centerY = viewportHeight / 2;
      
//       const targetX = logoCenterX - centerX;
//       const targetY = (headerHeight / 2) - centerY;
      
//       setTargetPosition({ x: targetX, y: targetY });
//       setIsReady(true);
//     };

//     // Small delay to ensure everything is loaded
//     setTimeout(calculateExactHeaderPosition, 100);
    
//     // Recalculate on window resize
//     window.addEventListener('resize', calculateExactHeaderPosition);
//     return () => window.removeEventListener('resize', calculateExactHeaderPosition);
//   }, []);

//   if (!isReady) {
//     return (
//       <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
//         <div className="text-white font-rajdhani">INITIALIZING...</div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="fixed inset-0 z-40 bg-black flex items-center justify-center"
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Sliding Logo with Exact Header Match */}
//       <motion.div
//         className="flex items-center"
//         initial={{ 
//           x: 0, 
//           y: 0, 
//           scale: 1.8 // Start larger, scale down to header size
//         }}
//         animate={{ 
//           x: targetPosition.x,
//           y: targetPosition.y,
//           scale: 1 // Match header logo scale exactly
//         }}
//         transition={{ 
//           duration: 1.5,
//           ease: [0.22, 1, 0.36, 1], // Smooth custom easing
//           type: "tween"
//         }}
//         onAnimationComplete={() => {
//           setTimeout(onComplete, 100); // Small delay for perfect transition
//         }}
//       >
//         <motion.div
//           className="w-10 h-8 mr-3 flex items-center justify-center"
//           style={{
//             filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
//           }}
//         >
//           <img 
//             src="/images/autonova-logo.png" 
//             alt="AUTONOVA Logo"
//             className="h-8 w-auto min-w-16"
//             style={{
//               filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
//             }}
//           />
//         </motion.div>
//         <motion.span 
//           className="text-white text-xl font-bold font-orbitron tracking-wider"
//         >
//           AUTONOVA
//         </motion.span>
//       </motion.div>
//     </motion.div>
//   );
// };

// // export default LogoSlideAnimation;
