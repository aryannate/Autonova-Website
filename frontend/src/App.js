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

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            top: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
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
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-600 transform rotate-12"
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
                  className="text-white text-xl font-bold ml-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  AUTONOVA
                </motion.span>
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
                    className={`text-white hover:text-blue-400 transition-colors duration-300 relative ${
                      location.pathname === item.path ? 'text-blue-400' : ''
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                        layoutId="underline"
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
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2 border border-blue-400/50 text-white rounded-full hover:bg-blue-500/20 transition-all duration-300 relative overflow-hidden"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                🚀 Book Free Call
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
                        className="block text-white hover:text-blue-400 transition-colors duration-300"
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
                    className="w-full mt-4 px-6 py-2 border border-blue-400/50 text-white rounded-full hover:bg-blue-500/20 transition-all duration-300"
                  >
                    🚀 Book Free Call
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
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-black"
          animate={{ 
            background: [
              "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(17, 24, 39, 1) 50%, rgba(0, 0, 0, 1) 100%)"
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
          className="relative z-10 text-center max-w-5xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.h1 
            className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Automate to
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Dominate
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Transform your business with AI-powered automation. Save time, reduce costs, and scale faster than ever before.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-xl"
          >
            🚀 Book a Free Call
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
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
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Businesses Choose AUTONOVA
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join hundreds of companies that have automated their way to success
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
              className="text-center group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div
                className="text-5xl mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
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
    { name: "eCommerce", icon: "🛒", description: "Order processing, inventory management, customer service" },
    { name: "Marketing", icon: "📊", description: "Lead generation, email campaigns, social media management" },
    { name: "Healthcare", icon: "🏥", description: "Patient scheduling, data entry, compliance tracking" },
    { name: "Finance", icon: "💼", description: "Invoice processing, expense tracking, reporting automation" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900/50 to-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-300">
            Tailored automation solutions for every sector
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
              className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{industry.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{industry.name}</h3>
              <p className="text-sm text-gray-400">{industry.description}</p>
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
      name: "Sarah Johnson",
      company: "TechFlow Solutions",
      text: "AUTONOVA saved us 50 hours per week on manual data entry. Our team can now focus on strategic initiatives.",
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      company: "Growth Marketing Co",
      text: "Their AI chatbot handles 80% of our customer inquiries. Customer satisfaction is at an all-time high.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      company: "MedCare Plus",
      text: "Patient scheduling automation reduced errors by 95%. The ROI was evident within the first month.",
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300">
            Real results from real businesses
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
              className="p-8 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">{testimonial.avatar}</div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <div className="text-center">
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.company}</div>
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
    <section className="py-20 px-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Automate Your Success?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the automation revolution. Book your free consultation today and discover how AI can transform your business.
          </p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-xl"
          >
            🚀 Start Your Automation Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="pt-24">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-300">
              From internship frustrations to automation revolution
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-2xl border border-white/10 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">How We Started</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                It all began during our internships when we watched talented people waste hours on mind-numbing, 
                repetitive tasks that a computer could handle in seconds. We saw firsthand how manual processes 
                were draining productivity and crushing creativity.
              </p>
              <p className="text-gray-300 leading-relaxed">
                That's when we realized: businesses needed a partner who could bridge the gap between cutting-edge 
                AI technology and practical, results-driven solutions. AUTONOVA was born from this vision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-blue-900/30 to-transparent p-8 rounded-2xl border border-blue-500/20"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  Make automation accessible and impactful for every business, regardless of size or technical expertise. 
                  We believe every company deserves to operate at peak efficiency.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-br from-purple-900/30 to-transparent p-8 rounded-2xl border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To become the #1 AI automation partner worldwide, helping businesses unlock their full potential 
                  through intelligent automation solutions.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-8">Why Choose AUTONOVA?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: "🎯", title: "Proven Results", desc: "Track record of 40+ hour weekly savings" },
                  { icon: "🚀", title: "Fast Implementation", desc: "Get automated in days, not months" },
                  { icon: "🤝", title: "Personal Support", desc: "Dedicated team for your success" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    className="p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
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
      title: "Workflow Automation",
      description: "Streamline your business processes with intelligent workflow automation that eliminates manual bottlenecks and ensures consistent results.",
      features: ["Process mapping & optimization", "Cross-platform integrations", "Real-time monitoring", "Custom triggers & actions"]
    },
    {
      icon: "🤖",
      title: "AI Chatbots",
      description: "Deploy intelligent chatbots that handle customer inquiries, book appointments, and provide 24/7 support with human-like conversations.",
      features: ["Natural language processing", "Multi-channel deployment", "Learning algorithms", "Human handoff integration"]
    },
    {
      icon: "📧",
      title: "CRM & Email Integration",
      description: "Connect your customer data across all platforms with seamless CRM integration and automated email marketing campaigns.",
      features: ["Data synchronization", "Automated lead scoring", "Email sequence automation", "Performance analytics"]
    },
    {
      icon: "⚙️",
      title: "Custom AI Tools",
      description: "Get bespoke AI solutions tailored to your specific business needs, from document processing to predictive analytics.",
      features: ["Requirement analysis", "Custom development", "Testing & optimization", "Ongoing support"]
    }
  ];

  return (
    <div className="pt-24">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI automation solutions designed to transform your business operations and accelerate growth
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
                className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <span className="text-green-400 mr-3">✓</span>
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
            className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose AUTONOVA?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "⚡", title: "Fast Results", desc: "See improvements within weeks, not months" },
                { icon: "💡", title: "Expert Team", desc: "AI specialists with real-world experience" },
                { icon: "🔒", title: "Secure & Reliable", desc: "Enterprise-grade security and 99.9% uptime" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Automation', 'AI Tools', 'Productivity'];
  
  const posts = [
    {
      title: "5 Tasks You Can Automate This Week",
      category: "Automation",
      excerpt: "Discover the most common business tasks that can be automated immediately for instant productivity gains.",
      date: "Jan 15, 2025",
      readTime: "5 min read",
      image: "📊"
    },
    {
      title: "How AI Chatbots Are Revolutionizing Customer Service",
      category: "AI Tools",
      excerpt: "Learn how modern AI chatbots are transforming customer experiences and reducing support costs.",
      date: "Jan 12, 2025",
      readTime: "7 min read",
      image: "🤖"
    },
    {
      title: "The Ultimate Guide to Workflow Automation",
      category: "Productivity",
      excerpt: "A comprehensive guide to implementing workflow automation that actually works for your business.",
      date: "Jan 10, 2025",
      readTime: "10 min read",
      image: "⚙️"
    },
    {
      title: "ROI of Business Automation: Real Case Studies",
      category: "Automation",
      excerpt: "See real numbers and results from businesses that implemented automation solutions.",
      date: "Jan 8, 2025",
      readTime: "6 min read",
      image: "💰"
    },
    {
      title: "AI vs Traditional Automation: What's Right for You?",
      category: "AI Tools",
      excerpt: "Understanding the differences between AI-powered and traditional automation approaches.",
      date: "Jan 5, 2025",
      readTime: "8 min read",
      image: "🎯"
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="pt-24">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Automation Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert insights, case studies, and practical guides to help you master business automation
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
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-white/20 text-gray-300 hover:border-blue-500/50 hover:text-white'
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
                className="bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/20 overflow-hidden hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{post.image}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-gray-400 text-sm">
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
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Automation Trends
            </h3>
            <p className="text-gray-300 mb-6">
              Get weekly insights, case studies, and automation tips delivered to your inbox
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-full hover:from-blue-400 hover:to-purple-500 transition-all duration-300">
                Subscribe
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
    // Handle form submission here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let's Automate Your Success
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your business? Get in touch and let's discuss how automation can revolutionize your operations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-2xl border border-white/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us about your automation needs..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Calendly */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <div className="bg-gradient-to-br from-white/10 to-transparent p-8 rounded-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-blue-400 text-xl mr-4">📧</span>
                    <div>
                      <p className="text-gray-300">Email</p>
                      <p className="text-white">hello@autonova.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 text-xl mr-4">📞</span>
                    <div>
                      <p className="text-gray-300">Phone</p>
                      <p className="text-white">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 text-xl mr-4">⏰</span>
                    <div>
                      <p className="text-gray-300">Business Hours</p>
                      <p className="text-white">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book a Call CTA */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  🚀 Book a Free Strategy Call
                </h3>
                <p className="text-gray-300 mb-6">
                  Schedule a 30-minute consultation to discuss your automation needs and get a custom solution proposal.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
                >
                  Schedule Free Call
                </motion.button>
                <p className="text-gray-400 text-sm mt-4 text-center">
                  * No sales pressure, just valuable insights
                </p>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">Why Companies Trust Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>500+ successful automations delivered</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Average 40+ hours saved per week</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>98% client satisfaction rate</span>
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
    <footer className="border-t border-white/10 py-12 px-6 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex space-x-1">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-600 transform rotate-12"
                  />
                ))}
              </div>
              <span className="text-white text-xl font-bold ml-3">AUTONOVA</span>
            </div>
            <p className="text-gray-300 text-sm">
              Automate to Dominate. Your trusted partner in AI-powered business automation.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Workflow Automation</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">AI Chatbots</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">CRM Integration</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Custom Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Twitter
              </motion.a>
            </div>
            <p className="text-gray-300 text-sm">hello@autonova.ai</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 AUTONOVA. All rights reserved.
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900/30 via-gray-900 to-black">
        <FloatingParticles />
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