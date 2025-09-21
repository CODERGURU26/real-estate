'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiHome, 
  FiUser, 
  FiInfo,
  FiMessageCircle,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiArrowUp
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { href: "/", label: "Home", icon: FiHome },
    { href: "/login", label: "Login", icon: FiUser },
    { href: "/register", label: "Register", icon: FiUser },
    { href: "/contact", label: "Contact Us", icon: FiMessageCircle },
    { href: "/aboutus", label: "About Us", icon: FiInfo },
  ];

  const socialLinks = [
    { href: "#", icon: FiFacebook, label: "Facebook" },
    { href: "#", icon: FiInstagram, label: "Instagram" },
    { href: "#", icon: FiTwitter, label: "Twitter" },
    { href: "#", icon: FiLinkedin, label: "LinkedIn" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.3)_0%,transparent_50%)]"></div>
      </div>

      {/* Decorative Top Wave */}
      <div className="relative">
        <svg className="w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" className="text-gray-100"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Company Info */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <FiHome className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Shree Krishna Properties</h2>
                <p className="text-blue-200 text-sm">Your Dream Home Awaits</p>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Shree Krishna Properties is a trusted name in real estate, dedicated to helping people find their dream homes and make smart investments with confidence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <FiArrowUp className="w-5 h-5 mr-2 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                    <span className="hover:underline">{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <FiMessageCircle className="w-5 h-5 mr-2 text-green-400" />
              Get in Touch
            </h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mt-1">
                  <FiMail className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email Address</p>
                  <a 
                    href="mailto:shreekrishnaproperties46@gmail.com" 
                    className="text-white hover:text-blue-400 transition-colors duration-200 break-all"
                  >
                    shreekrishnaproperties46@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-1">
                  <FiPhone className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone Number</p>
                  <a 
                    href="tel:+919920865609" 
                    className="text-white hover:text-green-400 transition-colors duration-200 font-medium"
                  >
                    +91 9920865609
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-3 group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                  <FiMapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Office Location</p>
                  <p className="text-white">Mumbai, Maharashtra</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Shree Krishna Properties. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <motion.div
            className="text-gray-400 text-sm mt-4 md:mt-0 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.span
              className="text-red-500 mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <span>in India</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-2xl transition-all duration-300 ${
          showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5 mx-auto" />
      </motion.button>
    </footer>
  );
}