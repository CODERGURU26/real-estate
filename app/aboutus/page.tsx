"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutPage() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/contact"); // Redirect to Contact Us page
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-b from-gray-50 to-white gap-12">
      
      {/* Left Section - Text */}
      <motion.div
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="border-t-4 border-green-500 w-20 mb-2"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
          Shree <br />
          Krishna <br />
          Properties
        </h1>
        <div className="border-b-4 border-green-500 w-16 mt-2 mb-6"></div>

        <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
          Shree Krishna Properties has been transforming the way people invest in and
          experience real estate — making a traditionally complex process simple,
          transparent, and customer-friendly. Our mission is to bring trust and
          accessibility to every property transaction, ensuring that owning your dream
          property is no longer just an aspiration but a seamless reality.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
          We are not just selling properties, we are building lasting relationships.
          Entering a new era of real estate, we create spaces that inspire growth,
          comfort, and prosperity. Backed by integrity, innovation, and service
          excellence, we bring a customer-first approach and modern digital solutions
          to make property buying and investing easier than ever.
        </p>

        {/* Contact Us Button */}
        <button
          onClick={handleRegister}
          className="mt-4 bg-gradient-to-r from-green-500 to-teal-400 hover:from-teal-400 hover:to-green-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Contact Us
        </button>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="md:w-1/2 mt-8 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
          <motion.img
            src="/aboutus.jpg"
            alt="About Us"
            className="w-full h-full object-cover"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
