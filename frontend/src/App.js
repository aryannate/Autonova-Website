import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';
import ScrollToTop from './ScrollToTop';
import LoadingScreen from './LoadingScreen';
import LogoSlideAnimation from './LogoSlideAnimation';



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

// Star Field Background - Optimized
const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      let starId = 0;

      // Create galaxy clusters - 3 main cluster regions
      const clusters = [
        { centerX: 25, centerY: 35, radius: 15, density: 35 },
        { centerX: 65, centerY: 60, radius: 12, density: 25 },
        { centerX: 80, centerY: 25, radius: 8, density: 20 }
      ];

      // Generate clustered stars
      clusters.forEach(cluster => {
        for (let i = 0; i < cluster.density; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * cluster.radius;
          const x = cluster.centerX + Math.cos(angle) * distance;
          const y = cluster.centerY + Math.sin(angle) * distance;

          starArray.push({
            id: starId++,
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
            size: Math.random() > 0.6 ? 'large' : 'small',
            brightness: Math.random() > 0.7 ? 'bright' : 'normal',
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
          });
        }
      });

      // Add scattered background stars (galaxy dust)
      for (let i = 0; i < 90; i++) {
        starArray.push({
          id: starId++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() > 0.8 ? 'large' : 'small',
          brightness: Math.random() > 0.85 ? 'bright' : 'dim',
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 8
        });
      }

      // Add a few very bright "guide stars"
      for (let i = 0; i < 5; i++) {
        starArray.push({
          id: starId++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 'bright',
          brightness: 'bright',
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 3
        });
      }

      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="stars fixed inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`star ${star.size} ${star.brightness} absolute`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Header Component
const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'BLOG', path: '/blog' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'CONTACT', path: '/contact' }
    
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Static Logo - No Animations */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div
                    className="w-10 h-8 mr-3 flex items-center justify-center"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
                    }}
                  >
                    <img 
                      src="/images/autonova-logo.png" 
                      alt="AUTONOVA Logo"
                      className="h-8 w-auto min-w-16"
                      style={{
                        filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
                      }}
                    />
                  </div>
                  <span className="text-white text-xl font-bold font-orbitron tracking-wider">
                    AUTONOVA
                  </span>
                </div>
              </Link>
            </div>
  
            {/* Navigation with animations (keep these) */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    className={`text-white hover:text-gray-300 transition-colors duration-300 relative font-rajdhani font-semibold tracking-widest text-sm ${
                      location.pathname === item.path ? 'text-gray-300' : ''
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                        layoutId="underline"
                        style={{
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
  
            {/* CTA Button with animation (keep this) */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 btn-futuristic rounded-full font-rajdhani font-semibold tracking-wider text-sm"
              onClick={() => window.open('https://calendly.com/autonovawork/ai-consultation-call-free', '_blank')}
            >
              <motion.span
                className="relative z-10"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                🚀 BOOK FREE CALL
              </motion.span>
            </motion.button>
  
            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <motion.div
                  className="w-full h-0.5 bg-white mb-1"
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-white mb-1"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <motion.div
                  className="w-full h-0.5 bg-white"
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
                />
              </div>
            </motion.button>
          </div>
  
          {/* Mobile Menu (keep existing animation) */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/90 backdrop-blur-sm border-t border-white/10"
              >
                {/* Mobile menu content */}
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
    </AnimatePresence>
  );
  
};
// Home Page Components
const HomePage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div className="subtle-grid absolute inset-0 opacity-5"></div>
        
        <motion.div 
          className="relative z-10 text-center max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight font-orbitron"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              textShadow: `
                0 0 10px rgba(255, 255, 255, 0.3),
                0 0 20px rgba(255, 255, 255, 0.3),
                0 0 30px rgba(255, 255, 255, 0.3)
              `,
              animation: 'glow-pulse 2s ease-in-out infinite alternate'
            }}
          >
            AUTOMATE TO{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                textShadow: `
                  0 0 15px rgba(255, 255, 255, 0.3),
                  0 0 25px rgba(255, 255, 255, 0.3),
                  0 0 35px rgba(255, 255, 255, 0.3)
                `,
                animation: 'glow-pulse 3s ease-in-out infinite alternate'
              }}
            >
              DOMINATE
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto font-rajdhani font-light tracking-wide"
          >
            Transform your business with AI-powered systems
            <br />
            Save time • Reduce costs • Scale infinitely
          </motion.p>

          {/* Minimal scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-8 bg-gradient-to-b from-white to-transparent rounded-full opacity-50"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <BenefitsSection />
      <RoadmapSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Lightning Fast Setup",
      description: "Get your automation running in days, not months. Our proven process delivers results quickly."
    },
    {
      icon: "💰",
      title: "Save 40+ Hours Per Week", 
      description: "Eliminate repetitive tasks and focus on what matters most - growing your business."
    },
    {
      icon: "🚀",
      title: "Scale Without Limits",
      description: "Our AI systems grow with you, handling increased workload without hiring more staff."
    }
  ];

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron tracking-wide">
            Why BUSINESSES Choose AUTONOVA
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-rajdhani">
            The AI landscape is changing fast - we'll stay on top of it for you
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer p-6 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all duration-300"
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300 font-rajdhani tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 font-rajdhani text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Industries Section
const RoadmapSection = () => {
  const roadmapSteps = [
    { 
      number: "1", 
      title: "Discovery", 
      description: "Together, we dive into your world. A brainstorming session where your challenges meet our creative thinking"
    },
    { 
      number: "2", 
      title: "Analysis", 
      description: "We craft a tailored action plan that aligns with your budget and requirements - no guesswork, just solutions"
    },
    { 
      number: "3", 
      title: "Execution", 
      description: "It's go time. Our team gets to work, setting plans into motion, turning ideas into real-world impact"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white/3"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron tracking-wider">
            ROADMAP
          </h2>
          <p className="text-xl text-gray-400 font-rajdhani tracking-wide">
            OUR PROVEN 3-STEP AUTOMATION IMPLEMENTATION PROCESS
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-2xl glow-border holographic scan-line"
            >
              {/* Step Number */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 mb-6 mx-auto"
              >
                <span className="text-3xl font-bold text-white font-orbitron">
                  {step.number}
                </span>
              </motion.div>

              {/* Step Title */}
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wider text-center"
              >
                {step.title}
              </motion.h3>

              {/* Step Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                viewport={{ once: true }}
                className="text-gray-300 font-rajdhani tracking-wide leading-relaxed text-center"
              >
                {step.description}
              </motion.p>

              {/* Connection Arrow - CSS Based (Fixed) */}
              {index < roadmapSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
                  viewport={{ once: true }}
                  className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20"
                >
                  <div className="flex items-center">
                    {/* Arrow Line */}
                    <div className="w-10 h-px bg-gradient-to-r from-white to-white/50"></div>
                    
                    {/* Arrow Head */}
                    <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-px"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 btn-futuristic rounded-full text-lg font-semibold font-rajdhani tracking-widest scan-line"
            onClick={() => window.open('https://calendly.com/autonovawork/ai-consultation-call-free', '_blank')}
          >
            🚀 START YOUR AUTOMATION JOURNEY
          </motion.button>
          <p className="text-gray-500 text-sm mt-4 font-rajdhani tracking-wider">
            FREE CONSULTATION • NO COMMITMENT • IMMEDIATE INSIGHTS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// export default RoadmapSection;



// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "SARAH JOHNSON",
      company: "TECHFLOW SOLUTIONS",
      text: "AUTONOVA eliminated 95% of our manual processes. Our efficiency metrics increased by 340% in the first quarter.",
      avatar: "👩‍💼"
    },
    {
      name: "MIKE CHEN",
      company: "GROWTH MARKETING CO",
      text: "Their neural chatbot system handles 89% of customer interactions. Client satisfaction reached unprecedented levels.",
      avatar: "👨‍💻"
    },
    {
      name: "EMILY RODRIGUEZ",
      company: "MEDCARE PLUS",
      text: "Scheduling automation reduced errors by 99.7%. ROI was quantified within 18 days of deployment.",
      avatar: "👩‍⚕️"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron tracking-wider">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-xl text-gray-400 font-rajdhani tracking-wide">
            VERIFIED PERFORMANCE METRICS FROM REAL ENTERPRISES
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl glow-border holographic"
            >
              <div className="text-4xl mb-4 text-center filter drop-shadow-lg">{testimonial.avatar}</div>
              <p className="text-gray-300 mb-6 italic font-rajdhani leading-relaxed">"{testimonial.text}"</p>
              <div className="text-center">
                <div className="text-white font-semibold font-rajdhani tracking-widest text-sm">{testimonial.name}</div>
                <div className="text-gray-500 text-xs font-rajdhani tracking-wider">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900/30 to-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-orbitron tracking-wider neon-text">
            INITIALIZE YOUR EVOLUTION
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-rajdhani tracking-wide leading-relaxed">
            JOIN THE AUTOMATION SINGULARITY • BOOK NEURAL CONSULTATION
            <br />
            DISCOVER HOW AI TRANSFORMS YOUR OPERATIONAL MATRIX
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 btn-futuristic rounded-full text-lg font-semibold font-rajdhani tracking-widest scan-line"
            >
              🚀 BEGIN TRANSFORMATION PROTOCOL
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 space-background py-20 px-6 relative">
        <div className="grid-overlay absolute inset-0 opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider">
              SYSTEM GENESIS
            </h1>
            <p className="text-xl font-bold text-gray-400 font-rajdhani tracking-wide">
              We are Autonova, an engineering team that designs and builds AI solutions and experiences
            </p>
            <p className="text-xl text-gray-400 font-rajdhani tracking-wide">
              Based in Mumbai, India. Tinkering since 2025.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="glow-border holographic p-8 rounded-2xl mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wider">ORIGIN</h2>
              <p className="text-gray-300 leading-relaxed mb-6 font-rajdhani">
                During internship cycles, we observed human resources allocated to repetitive computational tasks 
                that advanced algorithms could execute in nanoseconds. We witnessed productive capacity drain 
                through manual processes and cognitive creativity suppression.
              </p>
              <p className="text-gray-300 leading-relaxed font-rajdhani">
                This observation initialized our vision: enterprises required a bridge between cutting-edge 
                artificial intelligence and practical, quantifiable solutions. AUTONOVA materialized from this algorithmic blueprint.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glow-border p-8 rounded-2xl holographic"
              >
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wider">PRIMARY DIRECTIVE</h3>
                <p className="text-gray-300 leading-relaxed font-rajdhani">
                  Deploy accessible automation protocols for every enterprise, regardless of scale or technical infrastructure. 
                  Every organization deserves optimal efficiency parameters.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glow-border p-8 rounded-2xl holographic"
              >
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wider">FUTURE PROTOCOL</h3>
                <p className="text-gray-300 leading-relaxed font-rajdhani">
                  Establish global supremacy as the #1 AI automation partner, enabling enterprises to unlock 
                  maximum potential through intelligent automation matrices.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-8 font-orbitron tracking-wider">OPERATIONAL ADVANTAGES</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: "🎯", title: "PROVEN ALGORITHMS", desc: "40+ HOUR WEEKLY OPTIMIZATION VERIFIED" },
                  { icon: "🚀", title: "RAPID DEPLOYMENT", desc: "72-HOUR IMPLEMENTATION PROTOCOLS" },
                  { icon: "🤝", title: "DEDICATED SYSTEMS", desc: "PERSONAL AUTOMATION SPECIALISTS" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    className="p-6 rounded-xl glow-border scan-line"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2 font-rajdhani tracking-wider">{item.title}</h4>
                    <p className="text-gray-400 text-sm font-rajdhani tracking-wide">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FOUNDERS SECTION WITH CUSTOM ICON IMAGES */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="mt-16"
            >
              <h3 className="text-3xl font-bold text-white mb-12 text-center font-orbitron tracking-wider">
                MEET THE FOUNDERS
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "M SREEJITH",
                    role: "CO-FOUNDER",
                    image: "/images/founder1.jpg.png",
                    description: "TECHNICAL PRICING SPECIALIST • HANDLES ALL MEETINGS & OUTREACH PROTOCOLS",
                    linkedin: "https://www.linkedin.com/in/sreejith-linkedin-username",
                    instagram: "https://www.instagram.com/sreejith-instagram-username"
                  },
                  {
                    name: "ARYAN NATE",
                    role: "CO-FOUNDER", 
                    image: "/images/founder2.jpg.png",
                    description: "AUTOMATION EXPERT • NEURAL SYSTEMS & AI IMPLEMENTATION ARCHITECT",
                    linkedin: "https://www.linkedin.com/in/aryan-nate/",
                    instagram: "https://www.instagram.com/aryannate/"
                  },
                  {
                    name: "ZAYD BAIG",
                    role: "CO-FOUNDER",
                    image: "/images/founder3.jpg.png", 
                    description: "OPERATIONS & STRATEGIC IMPLEMENTATION LEAD • BUSINESS OPTIMIZATION",
                    linkedin: "https://www.linkedin.com/in/zayd-linkedin-username",
                    instagram: "https://www.instagram.com/zayd-instagram-username"
                  }
                ].map((founder, index) => (
                  <motion.div
                    key={founder.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                    whileHover={{ y: -5 }}
                    className="text-center glow-border rounded-2xl p-6 holographic scan-line"
                  >
                    <div className="mb-6">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-white/20"
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))'
                        }}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 font-orbitron tracking-wider">
                      {founder.name}
                    </h4>
                    <p className="text-gray-400 mb-3 font-rajdhani tracking-widest text-sm">
                      {founder.role}
                    </p>
                    <p className="text-gray-300 text-sm font-rajdhani tracking-wide leading-relaxed mb-6">
                      {founder.description}
                    </p>
                    
                    {/* Clickable Social Media Icon Images */}
                    <div className="flex justify-center gap-4 mt-4">
                      {founder.linkedin && (
                        <motion.button
                          whileHover={{ 
                            scale: 1.15,
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(founder.linkedin, '_blank')}
                          className="w-12 h-12 p-2 btn-futuristic rounded-full flex items-center justify-center scan-line"
                        >
                          <img 
                            src="/images/icons/linkedin-icon.png" 
                            alt="LinkedIn" 
                            className="w-7 h-7 object-contain"
                            // style={{
                            //   filter: 'brightness(0) invert(1)'
                            // }}
                          />
                        </motion.button>
                      )}
                      {founder.instagram && (
                        <motion.button
                          whileHover={{ 
                            scale: 1.15,
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => window.open(founder.instagram, '_blank')}
                          className="w-12 h-12 p-2 btn-futuristic rounded-full flex items-center justify-center scan-line"
                        >
                          <img 
                            src="/images/icons/instagram.png" 
                            alt="Instagram" 
                            className="w-7 h-7 object-contain"
                            // style={{
                            //   filter: 'grayscale(100%) brightness(0) invert(1)'
                            // }}
                          />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};


const ServicesPage = () => {
  const services = [
    {
      icon: "🔄",
      title: "WORKFLOW AUTOMATION",
      description: "Advanced neural process optimization eliminating manual bottlenecks with quantum-parallel execution protocols.",
      features: ["PROCESS MAPPING & OPTIMIZATION", "CROSS-PLATFORM NEURAL LINKS", "REAL-TIME MONITORING", "CUSTOM TRIGGER MATRICES"]
    },
    {
      icon: "🤖",
      title: "AI NEURAL CHATBOTS",
      description: "Deploy intelligent conversation algorithms with human-equivalent reasoning and 24/7 operational capacity.",
      features: ["NATURAL LANGUAGE PROCESSING", "MULTI-CHANNEL DEPLOYMENT", "ADAPTIVE LEARNING ALGORITHMS", "SEAMLESS HUMAN HANDOFF"]
    },
    {
      icon: "📧",
      title: "CRM & EMAIL SYSTEMS",
      description: "Synchronize customer data across all platforms with automated neural marketing campaign execution.",
      features: ["QUANTUM DATA SYNC", "AUTOMATED LEAD SCORING", "EMAIL SEQUENCE AUTOMATION", "PERFORMANCE ANALYTICS"]
    },
    {
      icon: "⚙️",
      title: "CUSTOM AI PROTOCOLS",
      description: "Bespoke artificial intelligence solutions engineered for specific operational requirements and predictive analytics.",
      features: ["REQUIREMENT ANALYSIS", "CUSTOM DEVELOPMENT", "TESTING & OPTIMIZATION", "ONGOING SUPPORT MATRIX"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 space-background py-20 px-6 relative">
        <div className="grid-overlay absolute inset-0 opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider">
              SERVICE PROTOCOLS
            </h1>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-rajdhani tracking-wide leading-relaxed">
              WE BRING AI ENGINEERING & CONTENT EXPERTISE
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl glow-border holographic scan-line"
              >
                <div className="text-5xl mb-6 filter drop-shadow-lg">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wider">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed font-rajdhani">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400 font-rajdhani tracking-wide text-sm">
                      <span className="text-white mr-3">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 p-8 rounded-2xl glow-border holographic"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron tracking-wider">SELECTION CRITERIA</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "⚡", title: "RAPID EXECUTION", desc: "RESULTS WITHIN WEEKS, NOT MONTHS" },
                { icon: "💡", title: "EXPERT SYSTEMS", desc: "AI SPECIALISTS WITH QUANTUM EXPERIENCE" },
                { icon: "🔒", title: "SECURE PROTOCOLS", desc: "ENTERPRISE SECURITY & 99.9% UPTIME" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4 filter drop-shadow-lg">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2 font-rajdhani tracking-wider">{item.title}</h4>
                  <p className="text-gray-400 font-rajdhani tracking-wide text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industry Focus Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-orbitron tracking-wider">
              INDUSTRY SPECIALIZATION
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: "🏥", 
                  title: "HEALTHCARE", 
                  desc: "SCHEDULING • PATIENT DATA • COMPLIANCE AUTOMATION",
                  highlight: "MIAMI HOSPITALS SPECIALIST"
                },
                { 
                  icon: "🛒", 
                  title: "E-COMMERCE", 
                  desc: "ORDER PROCESSING • INVENTORY MANAGEMENT • CUSTOMER SERVICE"
                },
                { 
                  icon: "📊", 
                  title: "MARKETING", 
                  desc: "LEAD GENERATION • CAMPAIGN AUTOMATION • SOCIAL MEDIA"
                },
                { 
                  icon: "💼", 
                  title: "FINANCE", 
                  desc: "INVOICING • EXPENSE TRACKING • AUTOMATED REPORTING"
                }
              ].map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-xl glow-border scan-line"
                >
                  <div className="text-4xl mb-4 filter drop-shadow-lg">{industry.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3 font-rajdhani tracking-widest">{industry.title}</h3>
                  <p className="text-xs text-gray-400 font-rajdhani tracking-wider leading-relaxed mb-2">{industry.desc}</p>
                  {industry.highlight && (
                    <p className="text-xs text-white font-rajdhani tracking-wider font-bold">{industry.highlight}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Stack Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-20 p-8 rounded-2xl glow-border holographic"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron tracking-wider">
              TECHNOLOGY ARSENAL
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: "AI MODELS", items: ["GEMINI", "GPT-4O MINI", "YOLO", "CUSTOM NEURAL NETS"] },
                { category: "CLOUD SERVICES", items: ["AWS ECS/SES", "CLOUDFLARE", "SERVERLESS", "AUTO-SCALING"] },
                { category: "DEVELOPMENT", items: ["REACT/NEXTJS", "PYTHON", "JAVASCRIPT", "API INTEGRATION"] },
                { category: "AUTOMATION", items: ["WORKFLOW ENGINES", "CRM SYNC", "EMAIL SEQUENCES", "DATA PIPELINES"] }
              ].map((tech, index) => (
                <motion.div
                  key={tech.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                  className="p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                >
                  <h4 className="text-white font-semibold mb-3 font-rajdhani tracking-wider text-sm">{tech.category}</h4>
                  <ul className="space-y-1">
                    {tech.items.map((item, idx) => (
                      <li key={idx} className="text-gray-400 text-xs font-rajdhani tracking-wide">
                        <span className="text-white mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-20 text-center p-12 rounded-2xl glow-border holographic"
          >
            <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wider">
              READY TO OPTIMIZE YOUR OPERATIONS?
            </h2>
            <p className="text-gray-300 mb-8 font-rajdhani tracking-wide leading-relaxed max-w-2xl mx-auto">
              Schedule a free consultation to discover how AUTONOVA can transform your business processes 
              with cutting-edge AI automation solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 btn-futuristic rounded-full text-lg font-semibold font-rajdhani tracking-widest scan-line"
              onClick={() => window.open('https://calendly.com/autonovawork/ai-consultation-call-free', '_blank')}
            >
              🚀 SCHEDULE FREE CONSULTATION
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};


// Blog Page
const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const categories = ['ALL', 'AUTOMATION', 'AI SYSTEMS', 'PRODUCTIVITY'];
  
  const posts = [
    {
      title: "5 PROCESSES YOU CAN AUTOMATE THIS WEEK",
      category: "AUTOMATION",
      excerpt: "Discover the most common enterprise tasks that can be automated immediately for instant productivity optimization.",
      date: "JAN 15, 2025",
      readTime: "5 MIN SCAN",
      image: "📊"
    },
    {
      title: "NEURAL CHATBOTS: CUSTOMER SERVICE EVOLUTION",
      category: "AI SYSTEMS",
      excerpt: "How advanced AI conversation systems are revolutionizing customer experiences and reducing operational costs.",
      date: "JAN 12, 2025",
      readTime: "7 MIN SCAN",
      image: "🤖"
    },
    {
      title: "WORKFLOW AUTOMATION: COMPLETE PROTOCOL GUIDE",
      category: "PRODUCTIVITY",
      excerpt: "Comprehensive implementation guide for workflow automation that delivers quantifiable business results.",
      date: "JAN 10, 2025",
      readTime: "10 MIN SCAN",
      image: "⚙️"
    },
    {
      title: "AUTOMATION ROI: VERIFIED CASE STUDIES",
      category: "AUTOMATION",
      excerpt: "Real performance metrics and financial returns from enterprises that implemented automation solutions.",
      date: "JAN 8, 2025",
      readTime: "6 MIN SCAN",
      image: "💰"
    },
    {
      title: "AI VS TRADITIONAL: PROTOCOL COMPARISON",
      category: "AI SYSTEMS",
      excerpt: "Technical analysis of AI-powered versus traditional automation approaches for optimal selection criteria.",
      date: "JAN 5, 2025",
      readTime: "8 MIN SCAN",
      image: "🎯"
    },
    {
      title: "HEALTHCARE AUTOMATION: MIAMI SUCCESS STORIES",
      category: "AUTOMATION",
      excerpt: "How Miami hospitals reduced scheduling errors by 99.7% and improved patient satisfaction through AI automation.",
      date: "JAN 3, 2025",
      readTime: "9 MIN SCAN",
      image: "🏥"
    }
  ];

  const filteredPosts = selectedCategory === 'ALL' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 space-background py-20 px-6 relative">
        <div className="grid-overlay absolute inset-0 opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider">
              AUTOMATION INTEL
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-rajdhani tracking-wide leading-relaxed">
              EXPERT ANALYSIS • CASE STUDIES • PRACTICAL PROTOCOLS FOR AUTOMATION MASTERY
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border transition-all duration-300 font-rajdhani tracking-widest text-sm ${
                  selectedCategory === category
                    ? 'bg-white/20 border-white text-white glow-border'
                    : 'border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glow-border rounded-2xl overflow-hidden holographic cursor-pointer scan-line"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center filter drop-shadow-lg">{post.image}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-rajdhani tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs font-rajdhani tracking-wider">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-gray-300 transition-colors font-rajdhani tracking-wide leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed font-rajdhani">
                    {post.excerpt}
                  </p>
                  <div className="text-gray-500 text-xs font-rajdhani tracking-wider">
                    {post.date}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Featured Article Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 p-8 rounded-2xl glow-border holographic"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-rajdhani tracking-wider mb-4 inline-block">
                  FEATURED CASE STUDY
                </span>
                <h2 className="text-3xl font-bold text-white mb-4 font-orbitron tracking-wider">
                  MIAMI HEALTHCARE REVOLUTION
                </h2>
                <p className="text-gray-300 mb-6 font-rajdhani leading-relaxed">
                  Discover how AUTONOVA transformed patient scheduling across multiple Miami hospitals, 
                  reducing errors by 99.7% and increasing patient satisfaction scores by 45%.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 btn-futuristic rounded-full font-semibold font-rajdhani tracking-widest scan-line"
                >
                  READ FULL CASE STUDY
                </motion.button>
              </div>
              <div className="text-center">
                <div className="text-8xl mb-4 filter drop-shadow-lg">🏥</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-white font-orbitron">99.7%</div>
                    <div className="text-xs text-gray-400 font-rajdhani tracking-wider">ERROR REDUCTION</div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="text-2xl font-bold text-white font-orbitron">45%</div>
                    <div className="text-xs text-gray-400 font-rajdhani tracking-wider">SATISFACTION INCREASE</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16 p-8 rounded-2xl glow-border holographic text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wider">
              AUTOMATION INTELLIGENCE FEED
            </h3>
            <p className="text-gray-400 mb-6 font-rajdhani tracking-wide">
              RECEIVE WEEKLY INSIGHTS • CASE STUDIES • AUTOMATION PROTOCOLS
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="ENTER EMAIL PROTOCOL"
                className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-l-full text-white placeholder-gray-500 focus:outline-none focus:border-white/50 font-rajdhani tracking-wide"
              />
              <button className="px-6 py-2 btn-futuristic rounded-r-full font-rajdhani tracking-wider text-sm">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4 font-rajdhani tracking-wider">
              * NO SPAM • EXPERT INSIGHTS ONLY • UNSUBSCRIBE ANYTIME
            </p>
          </motion.div>

          {/* Topics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-orbitron tracking-wider">
              EXPLORE TOPICS
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🤖", title: "AI CHATBOTS", count: "12 ARTICLES", desc: "Customer service automation" },
                { icon: "⚙️", title: "WORKFLOWS", count: "8 ARTICLES", desc: "Process optimization guides" },
                { icon: "📊", title: "ANALYTICS", count: "6 ARTICLES", desc: "Performance measurement" },
                { icon: "🔒", title: "SECURITY", count: "4 ARTICLES", desc: "Enterprise data protection" }
              ].map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-xl glow-border scan-line text-center cursor-pointer"
                >
                  <div className="text-4xl mb-4 filter drop-shadow-lg">{topic.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-rajdhani tracking-wider">{topic.title}</h3>
                  <p className="text-gray-400 text-xs mb-2 font-rajdhani tracking-wider">{topic.count}</p>
                  <p className="text-gray-500 text-xs font-rajdhani tracking-wide">{topic.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};


// Careers Page
const CareersPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 space-background py-20 px-6 relative">
        <div className="grid-overlay absolute inset-0 opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider neon-text">
              JOIN THE MISSION
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-rajdhani tracking-wide leading-relaxed">
              BECOME PART OF THE AUTOMATION REVOLUTION • SHAPE THE FUTURE
            </p>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glow-border holographic p-12 rounded-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-orbitron tracking-wider">
                🚀 RECRUITMENT PROTOCOL
              </h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 font-rajdhani tracking-wide leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Join us on a journey by being a part of the 
                <span className="text-white font-semibold"> AUTONOVA TEAM </span>
                and let's work together
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-gray-400 mb-10 font-rajdhani tracking-wide"
              >
                <p className="text-lg leading-relaxed">
                  We're building the future of AI automation and looking for talented individuals 
                  who share our vision of transforming businesses through intelligent technology.
                </p>
              </motion.div>

              {/* LinkedIn Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 btn-futuristic rounded-lg font-semibold font-rajdhani tracking-widest scan-line flex items-center gap-3"
                  onClick={() => window.open('https://www.linkedin.com/company/106699420/', '_blank')}
                >
                  <span className="text-xl">💼</span>
                  VIEW OPEN POSITIONS
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 btn-futuristic rounded-lg font-semibold font-rajdhani tracking-widest scan-line flex items-center gap-3"
                  onClick={() => window.open('https://www.linkedin.com/company/106699420//about', '_blank')}
                >
                  <span className="text-xl">🌐</span>
                  CONNECT ON LINKEDIN
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-gray-500 text-sm mt-6 font-rajdhani tracking-wider"
              >
                * EQUAL OPPORTUNITY EMPLOYER • REMOTE-FIRST CULTURE • COMPETITIVE BENEFITS
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Company Culture Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="glow-border holographic p-6 rounded-2xl text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold text-white mb-3 font-orbitron tracking-wider">
                INNOVATION FIRST
              </h3>
              <p className="text-gray-400 text-sm font-rajdhani tracking-wide">
                Work on cutting-edge AI technologies that shape the future of business automation
              </p>
            </div>

            <div className="glow-border holographic p-6 rounded-2xl text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-white mb-3 font-orbitron tracking-wider">
                RAPID GROWTH
              </h3>
              <p className="text-gray-400 text-sm font-rajdhani tracking-wide">
                Join a fast-growing company with unlimited opportunities for career advancement
              </p>
            </div>

            <div className="glow-border holographic p-6 rounded-2xl text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-lg font-semibold text-white mb-3 font-orbitron tracking-wider">
                GLOBAL IMPACT
              </h3>
              <p className="text-gray-400 text-sm font-rajdhani tracking-wide">
                Make a difference by helping businesses worldwide optimize their operations
              </p>
            </div>
          </motion.div>

          {/* Open Positions Section
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-orbitron tracking-wider">
              CURRENT OPENINGS
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "AI AUTOMATION ENGINEER",
                  department: "ENGINEERING",
                  location: "REMOTE • MUMBAI",
                  type: "FULL-TIME",
                  description: "Build and deploy AI automation solutions for enterprise clients. Work with cutting-edge neural networks and automation frameworks."
                },
                {
                  title: "BUSINESS DEVELOPMENT SPECIALIST",
                  department: "SALES",
                  location: "REMOTE • GLOBAL",
                  type: "FULL-TIME",
                  description: "Drive growth by identifying new business opportunities and building relationships with potential automation clients."
                },
                {
                  title: "UI/UX DESIGNER",
                  department: "DESIGN",
                  location: "REMOTE • INDIA",
                  type: "CONTRACT",
                  description: "Design intuitive interfaces for AI automation dashboards and customer-facing applications."
                }
              ].map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                  className="p-6 rounded-xl glow-border holographic hover:border-white/30 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 font-orbitron tracking-wider">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full font-rajdhani tracking-wider">{job.department}</span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full font-rajdhani tracking-wider">{job.location}</span>
                        <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full font-rajdhani tracking-wider">{job.type}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 md:mt-0 px-6 py-2 btn-futuristic rounded-full font-rajdhani tracking-wider text-sm"
                      onClick={() => window.open('https://www.linkedin.com/company/106699420/', '_blank')}
                    >
                      APPLY NOW
                    </motion.button>
                  </div>
                  <p className="text-gray-400 font-rajdhani tracking-wide text-sm leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Benefits Section
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-20 p-8 rounded-2xl glow-border holographic"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron tracking-wider">
              TEAM MEMBER BENEFITS
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "💰", title: "COMPETITIVE COMPENSATION", desc: "Above-market salary + equity participation" },
                { icon: "🏠", title: "REMOTE-FIRST CULTURE", desc: "Work from anywhere with flexible hours" },
                { icon: "📚", title: "LEARNING & DEVELOPMENT", desc: "Unlimited access to courses and conferences" },
                { icon: "🏥", title: "COMPREHENSIVE HEALTH", desc: "Medical, dental, and wellness coverage" },
                { icon: "🎯", title: "PERFORMANCE BONUSES", desc: "Quarterly bonuses based on company growth" },
                { icon: "🌟", title: "STOCK OPTIONS", desc: "Equity ownership in AUTONOVA's success" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                  className="p-4 rounded-lg border border-white/10 text-center"
                >
                  <div className="text-3xl mb-3 filter drop-shadow-lg">{benefit.icon}</div>
                  <h4 className="text-white font-semibold mb-2 font-rajdhani tracking-wider text-sm">{benefit.title}</h4>
                  <p className="text-gray-400 text-xs font-rajdhani tracking-wide leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* Application Process */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8 font-orbitron tracking-wider">
              APPLICATION PROCESS 
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "APPLY", desc: "Submit your application via LinkedIn or email" },
                { step: "02", title: "SCREEN", desc: "Initial screening call with our team" },
                { step: "03", title: "INTERVIEW", desc: "Technical and cultural fit assessment" },
                { step: "04", title: "ONBOARD", desc: "Welcome to the AUTONOVA family" }
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 2.6 + index * 0.1 }}
                  className="p-6 rounded-xl glow-border scan-line"
                >
                  <div className="text-2xl font-bold text-white mb-3 font-orbitron">{phase.step}</div>
                  <h4 className="text-lg font-semibold text-white mb-2 font-rajdhani tracking-wider">{phase.title}</h4>
                  <p className="text-gray-400 text-sm font-rajdhani tracking-wide">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-20 text-center p-12 rounded-2xl glow-border holographic"
          >
            <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wider">
              JOIN THE AI SCENE WITH US!
            </h2>
            <p className="text-gray-300 mb-8 font-rajdhani tracking-wide leading-relaxed max-w-2xl mx-auto">
              If you are someone who knows their way around AI, TECH & CONTENT ,Lets Talk.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 btn-futuristic rounded-full text-lg font-semibold font-rajdhani tracking-widest scan-line"
              onClick={() => window.open('mailto:autonovawork@gmail.com?subject=Career Opportunity Interest', '_blank')}
            >
              📧 DROP YOUR RESUME
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 space-background py-20 px-6 relative">
        <div className="grid-overlay absolute inset-0 opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider neon-text">
              INITIATE CONTACT
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-rajdhani tracking-wide leading-relaxed">
              READY TO TRANSFORM YOUR BIZ? ESTABLISH COMMUNICATION TODAY
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glow-border holographic p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wider">CONTACT FORM</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">NAME  *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors font-rajdhani tracking-wide"
                    placeholder="Enter identification"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors font-rajdhani tracking-wide"
                    placeholder="communication.channel@company.domain"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">ORGANIZATION</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors font-rajdhani tracking-wide"
                    placeholder="Enterprise designation"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">MESSAGE*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors resize-none font-rajdhani tracking-wide"
                    placeholder="Describe automation requirements..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 btn-futuristic rounded-lg font-semibold font-rajdhani tracking-widest scan-line"
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="glow-border holographic p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wider">COMMUNICATION CHANNELS</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">📧</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">DIGITAL TRANSMISSION</p>
                      <p className="text-white font-rajdhani tracking-wide">work@autonova.live</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">📞</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">VOICE PROTOCOL</p>
                      <p className="text-white font-rajdhani tracking-wide">+91 82910 23456</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">📍</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">HEADQUARTERS</p>
                      <p className="text-white font-rajdhani tracking-wide">Mumbai, India</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">⏰</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">OPERATIONAL HOURS</p>
                      <p className="text-white font-rajdhani tracking-wide">MON-FRI, 9AM-6PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glow-border holographic p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron tracking-wider">
                  🚀 STRATEGY SESSION
                </h3>
                <p className="text-gray-400 mb-6 font-rajdhani tracking-wide leading-relaxed">
                  Schedule 30-minute consultation to analyze automation requirements and receive custom solution tailored to it.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 btn-futuristic rounded-lg font-semibold font-rajdhani tracking-widest scan-line"
                  onClick={() => window.open('https://calendly.com/autonovawork/ai-consultation-call-free', '_blank')}
                >
                  SCHEDULE FREE CONSULTATION
                </motion.button>
                <p className="text-gray-500 text-xs mt-4 text-center font-rajdhani tracking-wider">
                  * NO SALES PRESSURE • PURE INTELLIGENCE EXCHANGE
                </p>
              </div>

              <div className="glow-border p-6 rounded-2xl holographic">
                <h4 className="text-lg font-semibold text-white mb-4 font-orbitron tracking-wider">ENTERPRISE VERIFICATION</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-400 font-rajdhani tracking-wide text-sm">
                    <span className="text-white mr-3">▸</span>
                    <span>500+ SUCCESSFUL AUTOMATION DEPLOYMENTS</span>
                  </div>
                  <div className="flex items-center text-gray-400 font-rajdhani tracking-wide text-sm">
                    <span className="text-white mr-3">▸</span>
                    <span>AVERAGE 40+ HOURS WEEKLY OPTIMIZATION</span>
                  </div>
                  <div className="flex items-center text-gray-400 font-rajdhani tracking-wide text-sm">
                    <span className="text-white mr-3">▸</span>
                    <span>98% CLIENT SATISFACTION RATE</span>
                  </div>
                  <div className="flex items-center text-gray-400 font-rajdhani tracking-wide text-sm">
                    <span className="text-white mr-3">▸</span>
                    <span>24/7 TECHNICAL SUPPORT MATRIX</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center font-orbitron tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "What is the typical implementation timeline?",
                  answer: "Most automation projects are deployed within 72 hours to 2 weeks, depending on complexity and integration requirements."
                },
                {
                  question: "Do you offer ongoing support and maintenance?",
                  answer: "Yes, we provide 24/7 technical support and continuous system optimization as part of our service packages."
                },
                {
                  question: "Can AUTONOVA integrate with existing systems?",
                  answer: "Our automation solutions are designed to seamlessly integrate with your current CRM, email, and business management platforms."
                },
                {
                  question: "What industries do you specialize in?",
                  answer: "We have proven expertise in healthcare, e-commerce, marketing, and finance, with special focus on Miami healthcare institutions."
                }
              ].map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="p-6 rounded-xl glow-border holographic"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 font-rajdhani tracking-wider">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 font-rajdhani tracking-wide text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Response Time Promise */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 text-center p-12 rounded-2xl glow-border holographic"
          >
            <div className="text-6xl mb-6 filter drop-shadow-lg">⚡</div>
            <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wider">
              RAPID RESPONSE GUARANTEE
            </h2>
            <p className="text-gray-300 mb-8 font-rajdhani tracking-wide leading-relaxed max-w-2xl mx-auto">
              We respond to all inquiries within <span className="text-white font-bold">2 hours during business hours</span> and 
              provide detailed automation assessments within 24 hours of initial contact.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white font-orbitron">2 HOURS</div>
                <div className="text-xs text-gray-400 font-rajdhani tracking-wider">INITIAL RESPONSE</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white font-orbitron">24 HOURS</div>
                <div className="text-xs text-gray-400 font-rajdhani tracking-wider">DETAILED ASSESSMENT</div>
              </div>
              <div className="p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white font-orbitron">72 HOURS</div>
                <div className="text-xs text-gray-400 font-rajdhani tracking-wider">IMPLEMENTATION START</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};


// Footer Component
const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div 
                className="w-8 h-6 mr-3 flex items-center justify-center"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                }}
              >
                <img 
                  src="/images/autonova-logo.png" 
                  alt="AUTONOVA Logo"
                  className="h-8 w-auto min-w-16"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                  }}
                />
              </div>
              <span className="text-white text-xl font-bold font-orbitron tracking-wider">AUTONOVA</span>
            </div>
            <p className="text-gray-400 text-sm font-rajdhani tracking-wide">
              AUTOMATE TO DOMINATE. YOUR NEURAL AUTOMATION PARTNER FOR INFINITE SCALABILITY.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 font-orbitron tracking-wider">SERVICES</h3>
            <ul className="space-y-2 text-gray-400 text-sm font-rajdhani tracking-wide">
              <li><Link to="/services" className="hover:text-white transition-colors">WORKFLOW AUTOMATION</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">AI NEURAL CHATBOTS</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">CRM INTEGRATION</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">CUSTOM PROTOCOLS</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 font-orbitron tracking-wider">COMPANY</h3>
            <ul className="space-y-2 text-gray-400 text-sm font-rajdhani tracking-wide">
              <li><Link to="/about" className="hover:text-white transition-colors">ABOUT SYSTEMS</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">INTELLIGENCE</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">CONTACT</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">CAREERS</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 font-orbitron tracking-wider">NETWORK</h3>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
                onClick={() => window.open('https://www.linkedin.com/company/106699420', '_blank')}
              >
                LINKEDIN
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
                onClick={() => window.open('https://www.instagram.com/autonova_ai/', '_blank')}
              >
                INSTAGRAM
              </motion.a>
            </div>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
              >
                X
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
                onClick={() => window.open('https://mail.google.com/mail/u/0/#inbox?compose=CllgCJTLHGKgXnttDRTcFrpzWgTvDfjQkmqKjlRgkNBvRSTGQjlbqsQTkXMPTFRtKSWJQzKLNnB', '_blank')}
              >
                EMAIL
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm font-rajdhani tracking-wider">
            © 2025 AUTONOVA AI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

// export default Footer;

// Main App Component with Emergent Badge Removal
const App = () => {
  const [showMainSite, setShowMainSite] = useState(false);

  // Handle loading completion - directly show main site
  const handleLoadingComplete = () => {
    setShowMainSite(true);
  };

  // 🎯 EMERGENT BADGE REMOVAL
  useEffect(() => {
    const removeEmergentBadge = () => {
      const badge = document.getElementById('emergent-badge');
      if (badge) {
        badge.remove();
      }
    };

    removeEmergentBadge();

    const observer = new MutationObserver(() => {
      removeEmergentBadge();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    const intervalId = setInterval(removeEmergentBadge, 500);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {/* Single Loading Screen with Built-in Animation */}
      <AnimatePresence mode="wait">
        {!showMainSite && (
          <LoadingScreen 
            key="loading"
            onComplete={handleLoadingComplete} 
          />
        )}
      </AnimatePresence>

      {/* Main Website */}
      {showMainSite && (
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-black relative">
            <StarField />
            
            <div className="relative z-10">
              <Header />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/careers" element={<CareersPage />} /> 
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
              
              <Footer />
            </div>
          </div>
        </Router>
      )}
    </>
  );
};



export default App;
