"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiPhone, FiInfo, FiUser, FiLogIn } from "react-icons/fi";

// Define proper TypeScript interface for session user
interface User {
  name?: string;
  email?: string;
  role?: string;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = session?.user as User | undefined;
  const isAdmin = user?.role === "admin";
  const onAdminPage = pathname?.startsWith("/admin");
  const isLoggedIn = status === "authenticated";

  // Hide navbar on login/register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Navigation items
  const navItems = [
    { href: "/home", label: "Home", icon: FiHome },
    { href: "/contact", label: "Contact Us", icon: FiPhone },
    { href: "/aboutus", label: "About Us", icon: FiInfo },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg text-gray-800 border-b border-gray-200"
            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Left: Logo + Brand */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Krishna Properties Logo"
                    width={45}
                    height={45}
                    className="rounded-full ring-2 ring-white/30 shadow-lg"
                  />
                </motion.div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">
                    Shree Krishna Properties
                  </h1>
                  <p
                    className={`text-xs lg:text-sm ${
                      scrolled ? "text-gray-500" : "text-blue-100"
                    } hidden sm:block`}
                  >
                    Your Dream Home Awaits
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? scrolled
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "bg-white/20 text-white font-semibold"
                        : scrolled
                        ? "hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                        : "hover:bg-white/10 text-white/90 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {status === "loading" ? (
                <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
              ) : !isLoggedIn ? (
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/login"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                      scrolled
                        ? "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-blue-600"
                    }`}
                  >
                    <FiLogIn className="w-4 h-4" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      scrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                      scrolled ? "bg-gray-100" : "bg-white/10 backdrop-blur-sm"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-sm max-w-32 truncate">
                      {user?.name ?? user?.email}
                    </span>
                  </div>

                  {isAdmin && !onAdminPage && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 font-medium shadow-lg"
                    >
                      <MdOutlineAdminPanelSettings className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg"
                  >
                    <AiOutlineLogout className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiX className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiMenu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-white/20"
            >
              <div className={`${scrolled ? "bg-white" : "bg-blue-700"} px-4 py-4`}>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? scrolled
                            ? "bg-blue-100 text-blue-700"
                            : "bg-white/20 text-white"
                          : scrolled
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
