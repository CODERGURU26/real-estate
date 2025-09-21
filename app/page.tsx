"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { 
  FiHome, 
  FiMapPin, 
  FiStar, 
  FiUsers, 
  FiTrendingUp, 
  FiShield,
  FiPlay,
  FiChevronRight,
  FiCheckCircle
} from "react-icons/fi";

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuredProperties = [
    {
      title: "Oceanfront Villa",
      img: "/green-valley.jpg",
      desc: "Luxurious oceanfront villa with panoramic views and private beach access.",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      badge: "Premium"
    },
    {
      title: "Urban Penthouse",
      img: "/address.jpg", 
      desc: "Modern penthouse in the heart of downtown with city skyline views.",
      beds: 3,
      baths: 3,
      sqft: "2,800",
      badge: "Hot"
    },
    {
      title: "Family Estate",
      img: "/luxury-heights.jpg",
      desc: "Spacious family estate with beautiful gardens and entertainment areas.",
      beds: 6,
      baths: 5,
      sqft: "5,500",
      badge: "New"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Buyer",
      content: "Found my dream home in just 2 weeks! The process was seamless and the team was incredibly helpful.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Mike Chen", 
      role: "Property Investor",
      content: "The best platform for real estate investment. Great analytics and market insights.",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      content: "As a first-time buyer, I felt supported throughout the entire journey. Highly recommend!",
      rating: 5,
      image: "/api/placeholder/60/60"
    }
  ];

  const stats = [
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiTrendingUp, value: "98%", label: "Success Rate" },
    { icon: FiShield, value: "24/7", label: "Support Available" }
  ];

  const features = [
    {
      icon: FiMapPin,
      title: "Prime Locations",
      description: "Access to properties in the most desirable neighborhoods and locations."
    },
    {
      icon: FiStar,
      title: "Premium Quality",
      description: "Every property is carefully vetted and meets our high-quality standards."
    },
    {
      icon: FiTrendingUp,
      title: "Market Insights",
      description: "Get detailed market analysis and pricing trends for informed decisions."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <main className="bg-gray-50 text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center text-center"
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: y
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-70"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-60"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6"
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >


          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Find Your Perfect
            <motion.span
              className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Dream Home
            </motion.span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Discover thousands of luxury properties with cutting-edge technology 
            and personalized service that makes home buying effortless.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link
              href="/register"
              className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-400/25 flex items-center justify-center"
            >
              Get Started Today
              <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide everything you need to find, evaluate, and secure your perfect property
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked premium properties from our exclusive collection
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {featuredProperties.map((property, index) => (
              <motion.div
                key={index}
                className="group bg-white shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden transition-all duration-500"
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={property.img}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.badge === 'Premium' ? 'bg-yellow-400 text-black' :
                      property.badge === 'Hot' ? 'bg-red-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {property.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {property.desc}
                  </p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.sqft} sqft</span>
                  </div>
                  
                  <Link
                    href="/register"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    View Details
                    <FiChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers and start your property journey today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Your Search
            </Link>
            <Link
              href="/register"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Contact an Agent
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200">
            <div className="flex items-center">
              <FiCheckCircle className="w-5 h-5 mr-2 text-green-400" />
              No hidden fees
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Expert guidance
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Quick approvals
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}