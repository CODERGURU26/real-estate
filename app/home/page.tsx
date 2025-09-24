"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FiArrowRight, 
  FiMapPin, 
  FiHome, 
  FiStar,
  FiEye,
  FiTrendingUp,
  FiAward
} from "react-icons/fi";

interface Building {
  _id?: string; // MongoDB ID
  id?: string; // Static/local ID
  name: string;
  image?: string;
  description: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        // Handle the API response structure
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        } else if (Array.isArray(data)) {
          // Fallback if API returns array directly
          setProjects(data);
        } else {
          console.error("API returned unexpected format:", data);
          setProjects([]); // Set empty array as fallback
          setError("Failed to load projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]); // Set empty array as fallback
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Static buildings with enhanced data
  const buildings: Building[] = [
    {
      id: "1",
      name: "Unique Shanti Developers",
      image: "/unique-estate.jpg",
      description: "Experience comfort, elegance, and premium community living in our thoughtfully designed residential complex.",
    },
    {
      id: "2", 
      name: "Skyline Towers",
      image: "/skyline.jpg",
      description: "Luxurious high-rise apartments offering breathtaking skyline views and world-class amenities for modern urban living.",
    },
    {
      id: "3",
      name: "JP Infra",
      image: "/jpinfra.webp", 
      description: "Contemporary residential spaces designed for modern lifestyles with unmatched amenities and premium finishes.",
    },
  ];

  // Safe spreading - ensure projects is always an array
  const allBuildings = [...(Array.isArray(projects) ? projects : []), ...buildings];

  // Enhanced truncate function
  const truncate = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  // Stats for the hero section
  const stats = [
    { icon: FiHome, value: "200+", label: "Properties" },
    { icon: FiStar, value: "4.9", label: "Rating" },
    { icon: FiAward, value: "15+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 text-white"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-8 h-8 bg-yellow-400 rounded-full opacity-60"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-6 h-6 bg-white rounded-full opacity-50"
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to{" "}
              <motion.span
                className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Shree Krishna Properties
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Your trusted partner in finding exceptional properties. 
              Discover premium homes and investment opportunities that match your dreams and lifestyle.
            </motion.p>

            

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link
                href="/properties"
                className="mb-5 group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Explore Properties
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="border-2 mb-5 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </motion.section>

      {/* Properties Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium properties designed to exceed your expectations
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {allBuildings.map((building, idx) => {
              const buildingId = building._id || building.id || String(idx);

              return (
                <motion.div
                  key={buildingId}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  variants={{
                    hidden: { opacity: 0, y: 60, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden">
                    {building.image ? (
                      <motion.img
                        src={building.image}
                        alt={building.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <FiHome className="w-20 h-20 text-white opacity-50" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm rounded-full p-3"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FiEye className="w-6 h-6 text-gray-700" />
                      </motion.div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {building.name}
                      </h3>
                      <div className="flex items-center text-yellow-500">
                        <FiStar className="w-4 h-4 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {truncate(building.description, 15)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        <span>Prime Location</span>
                      </div>
                      
                      <Link
                        href={`/buildings/${buildingId}`}
                        className="group/btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                      >
                        View Details
                        <FiArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Load More or View All */}
        {!loading && allBuildings.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/properties"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiTrendingUp className="mr-2" />
              View All Properties
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && allBuildings.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiHome className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
            <p className="text-gray-500">We&apos;re working on adding new properties. Check back soon!</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}