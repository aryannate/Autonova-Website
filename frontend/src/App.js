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
  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex space-x-1">
              <div className="w-2 h-6 bg-white transform rotate-12"></div>
              <div className="w-2 h-6 bg-white transform rotate-12"></div>
              <div className="w-2 h-6 bg-white transform rotate-12"></div>
            </div>
            <span className="text-white text-xl font-light ml-3">morningside</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all duration-300"
        >
          Get In Touch →
        </motion.button>
      </div>
    </motion.header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900 to-black"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight">
            We are not an AI
            <br />
            <span className="relative inline-block">
              <span className="line-through decoration-red-500 decoration-4 opacity-60">Development</span>
            </span>
            <br />
            Company
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          We are all of the above.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          We put AI at the center of everything we do. Your trusted partner in becoming an AI-first company.
        </motion.p>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const services = [
    {
      title: "Identify",
      description: "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life."
    },
    {
      title: "Educate", 
      description: "We train and support your team with the right tools and know-how to embed AI across your entire organization."
    },
    {
      title: "Develop",
      description: "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business."
    }
  ];

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
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            We don't sell AI.
            <br />
            We sell Results.
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: "17M+", label: "Upskilled Professionals" },
    { number: "435+", label: "Identified Opportunities" },
    { number: "55+", label: "Bespoke Solutions" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {stat.number}
              </h3>
              <p className="text-gray-400 text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
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