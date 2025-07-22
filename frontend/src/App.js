import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);

  return count;
};

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
        />
      ))}
    </div>
  );
};

// Header Component
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-6 bg-white transform rotate-12"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + index * 0.1, 
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                    />
                  ))}
                </div>
                <motion.span 
                  className="text-white text-xl font-light ml-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  morningside
                </motion.span>
              </div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                Get In Touch →
              </motion.span>
            </motion.button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900 to-black"
        animate={{ 
          background: [
            "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)",
            "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)",
            "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight"
            variants={textVariants}
          >
            We are not an AI
            <br />
            <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.span 
                className="line-through decoration-red-500 decoration-4"
                initial={{ textDecoration: "none" }}
                animate={{ textDecoration: "line-through" }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                Development
              </motion.span>
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{ transform: "translateY(-50%)" }}
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Company
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          >
            We are all of the above.
          </motion.span>
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          We put AI at the center of everything we do. Your trusted partner in becoming an AI-first company.
        </motion.p>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      title: "Identify",
      description: "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life.",
      icon: "🎯"
    },
    {
      title: "Educate", 
      description: "We train and support your team with the right tools and know-how to embed AI across your entire organization.",
      icon: "🎓"
    },
    {
      title: "Develop",
      description: "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business.",
      icon: "⚡"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-light text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              We don't sell AI.
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              We sell Results.
            </motion.span>
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                className="text-4xl mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service.icon}
              </motion.div>
              <motion.h3 
                className="text-2xl font-semibold text-white mb-6 group-hover:text-green-400 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {service.description}
              </motion.p>
              
              {/* Hover effect line */}
              <motion.div
                className="h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mt-6"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const stats = [
    { number: 17, suffix: "M+", label: "Upskilled Professionals" },
    { number: 435, suffix: "+", label: "Identified Opportunities" },
    { number: 55, suffix: "+", label: "Bespoke Solutions" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3
      }
    }
  };

  const statVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.2, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {hasAnimated ? (
                    <>
                      <AnimatedCounter end={stat.number} duration={1.5} />
                      {stat.suffix}
                    </>
                  ) : (
                    `${stat.number}${stat.suffix}`
                  )}
                </motion.h3>

                {/* Animated glow effect */}
                <motion.div
                  className="absolute -inset-2 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.p 
                className="text-gray-400 text-lg group-hover:text-gray-200 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.7 + index * 0.2, 
                  duration: 0.6 
                }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>

              {/* Animated progress bar */}
              <motion.div
                className="h-1 bg-gradient-to-r from-green-400 to-blue-500 mt-4 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ 
                  delay: 0.9 + index * 0.2, 
                  duration: 1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">info@morningside.ai</p>
            
            <div className="flex space-x-4 mt-4">
              <motion.a
                href="https://www.linkedin.com/company/morningside-ai/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@LiamOttley"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                YouTube
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Links</h3>
            <div className="flex flex-col space-y-2">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Explore Careers
              </motion.a>
              <motion.a
                href="/terms-and-conditions"
                whileHover={{ scale: 1.02 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </motion.a>
              <motion.a
                href="/privacy-policy"
                whileHover={{ scale: 1.02 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Morningside AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/30 via-gray-900 to-black">
      <Header />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default App;