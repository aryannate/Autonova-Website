import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

// Star Field Background
const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() > 0.8 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small',
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="stars fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`star ${star.size} absolute`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Shooting Stars */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={`shooting-${index}`}
          className="shooting-star"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            x: ['-100px', '200px'],
            y: ['100px', '-200px'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 5 + Math.random() * 10,
            ease: "linear"
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
    { name: 'CONTACT', path: '/contact' }
  ];

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
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* Replace this with your actual logo */}
                  <motion.div
                    className="w-10 h-8 mr-3 flex items-center justify-center"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))'
                    }}
                  >
                    {/* AUTONOVA Logo - Replace this div with <img src="/images/autonova-logo.png" alt="AUTONOVA" /> */}
                    <div className="text-white font-orbitron text-2xl font-black tracking-wider transform skew-x-12">
                      A
                    </div>
                  </motion.div>
                  <motion.span 
                    className="text-white text-xl font-bold font-orbitron tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    AUTONOVA
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
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

            {/* CTA Button */}
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
            >
              <motion.span
                className="relative z-10"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                🚀 BOOK FREE CALL
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-black/90 backdrop-blur-sm border-t border-white/10"
              >
                <nav className="px-6 py-4 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className="block text-white hover:text-gray-300 transition-colors duration-300 font-rajdhani font-semibold tracking-widest"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full mt-4 px-6 py-2 btn-futuristic rounded-full font-rajdhani font-semibold tracking-wider"
                  >
                    🚀 BOOK FREE CALL
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
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
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden bg-black">
        <div className="subtle-grid absolute inset-0 opacity-5"></div>
        
        <motion.div 
          className="relative z-10 text-center max-w-6xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight font-orbitron"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            AUTOMATE TO
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
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
            Transform your business with AI-powered automation
            <br />
            Save time • Reduce costs • Scale infinitely
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-white text-black rounded-full text-lg font-semibold font-rajdhani tracking-wide hover:bg-gray-100 transition-all duration-300"
          >
            🚀 Start Transformation
          </motion.button>

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

      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Industries Section */}
      <IndustriesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Final CTA Section */}
      <FinalCTASection />
    </>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "LIGHTNING DEPLOYMENT",
      description: "Advanced automation protocols deployed in 72 hours. Enterprise-grade systems online faster than ever before."
    },
    {
      icon: "💾",
      title: "SAVE 40+ HOURS/WEEK", 
      description: "Neural process elimination technology. Focus on strategic operations while AI handles repetitive tasks."
    },
    {
      icon: "🚀",
      title: "INFINITE SCALABILITY",
      description: "Quantum-ready architecture that scales beyond human limitations. No additional personnel required."
    }
  ];

  return (
    <section className="py-20 px-6 relative bg-black">
      <div className="grid-overlay absolute inset-0 opacity-20"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron tracking-wider">
            SYSTEM ADVANTAGES
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-rajdhani tracking-wide">
            NEURAL AUTOMATION PROTOCOLS FOR MAXIMUM EFFICIENCY
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="text-center group cursor-pointer p-8 rounded-2xl glow-border holographic"
            >
              <motion.div
                className="text-5xl mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))'
                }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gray-300 transition-colors duration-300 font-rajdhani tracking-widest">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-rajdhani">
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
const IndustriesSection = () => {
  const industries = [
    { name: "E-COMMERCE", icon: "🛒", description: "ORDER • INVENTORY • CUSTOMER SERVICE AUTOMATION" },
    { name: "MARKETING", icon: "📊", description: "LEAD GEN • CAMPAIGNS • SOCIAL MEDIA MANAGEMENT" },
    { name: "HEALTHCARE", icon: "🏥", description: "SCHEDULING • DATA ENTRY • COMPLIANCE TRACKING" },
    { name: "FINANCE", icon: "💼", description: "INVOICING • EXPENSES • AUTOMATED REPORTING" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-900/20 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron tracking-wider">
            OPERATIONAL SECTORS
          </h2>
          <p className="text-xl text-gray-400 font-rajdhani tracking-wide">
            TAILORED AUTOMATION FOR EVERY INDUSTRY VERTICAL
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-xl glow-border scan-line"
            >
              <div className="text-4xl mb-4 filter drop-shadow-lg">{industry.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3 font-rajdhani tracking-widest">{industry.name}</h3>
              <p className="text-xs text-gray-400 font-rajdhani tracking-wider leading-relaxed">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
    <section className="py-20 px-6 bg-black">
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
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 btn-futuristic rounded-full text-lg font-semibold font-rajdhani tracking-widest scan-line"
          >
            🚀 BEGIN TRANSFORMATION PROTOCOL
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="pt-24 space-background min-h-screen">
      <div className="grid-overlay absolute inset-0 opacity-10"></div>
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-orbitron tracking-wider">
              SYSTEM GENESIS
            </h1>
            <p className="text-xl text-gray-400 font-rajdhani tracking-wide">
              FROM OPERATIONAL INEFFICIENCY TO AUTOMATION SINGULARITY
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="glow-border holographic p-8 rounded-2xl mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-orbitron tracking-wider">ORIGIN PROTOCOL</h2>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Services Page
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
    <div className="pt-24 space-background min-h-screen">
      <div className="grid-overlay absolute inset-0 opacity-10"></div>
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
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
              COMPREHENSIVE AI AUTOMATION SOLUTIONS ENGINEERED TO TRANSFORM BUSINESS OPERATIONS
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

          {/* Why Choose Us Section */}
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
        </div>
      </section>
    </div>
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
    }
  ];

  const filteredPosts = selectedCategory === 'ALL' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="pt-24 space-background min-h-screen">
      <div className="grid-overlay absolute inset-0 opacity-10"></div>
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
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

          {/* Category Filter */}
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

          {/* Blog Posts Grid */}
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

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
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
          </motion.div>
        </div>
      </section>
    </div>
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
    <div className="pt-24 space-background min-h-screen">
      <div className="grid-overlay absolute inset-0 opacity-10"></div>
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
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
              READY TO TRANSFORM YOUR ENTERPRISE? ESTABLISH COMMUNICATION PROTOCOLS
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glow-border holographic p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wider">TRANSMISSION FORM</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">NAME PROTOCOL *</label>
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
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">EMAIL CHANNEL *</label>
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
                  <label className="block text-gray-400 mb-2 font-rajdhani tracking-wider text-sm">MESSAGE PROTOCOL *</label>
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
                  TRANSMIT MESSAGE
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div className="glow-border holographic p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron tracking-wider">COMMUNICATION CHANNELS</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">📧</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">DIGITAL TRANSMISSION</p>
                      <p className="text-white font-rajdhani tracking-wide">hello@autonova.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">📞</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">VOICE PROTOCOL</p>
                      <p className="text-white font-rajdhani tracking-wide">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-white text-xl mr-4">⏰</span>
                    <div>
                      <p className="text-gray-400 font-rajdhani tracking-wider text-sm">OPERATIONAL HOURS</p>
                      <p className="text-white font-rajdhani tracking-wide">MON-FRI, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book a Call CTA */}
              <div className="glow-border holographic p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron tracking-wider">
                  🚀 STRATEGY SESSION PROTOCOL
                </h3>
                <p className="text-gray-400 mb-6 font-rajdhani tracking-wide leading-relaxed">
                  Schedule 30-minute neural consultation to analyze automation requirements and receive custom solution matrix.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 btn-futuristic rounded-lg font-semibold font-rajdhani tracking-widest scan-line"
                >
                  SCHEDULE NEURAL CONSULTATION
                </motion.button>
                <p className="text-gray-500 text-xs mt-4 text-center font-rajdhani tracking-wider">
                  * NO SALES PRESSURE • PURE INTELLIGENCE EXCHANGE
                </p>
              </div>

              {/* Social Proof */}
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
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
                {/* AUTONOVA Logo - Replace this div with <img src="/images/autonova-logo.png" alt="AUTONOVA" /> */}
                <div className="text-white font-orbitron text-xl font-black tracking-wider transform skew-x-12">
                  A
                </div>
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
              <li><a href="#" className="hover:text-white transition-colors">CAREERS</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 font-orbitron tracking-wider">NETWORK</h3>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
              >
                LINKEDIN
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors font-rajdhani tracking-wide"
              >
                TWITTER
              </motion.a>
            </div>
            <p className="text-gray-400 text-sm font-rajdhani tracking-wide">hello@autonova.ai</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm font-rajdhani tracking-wider">
            © 2025 AUTONOVA SYSTEMS. ALL PROTOCOLS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black space-background">
        <StarField />
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;