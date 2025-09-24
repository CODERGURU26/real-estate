"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUser, FiMail, FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Contact Us
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <FiMessageCircle className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
              >
                {isLoading ? "Sending..." : <><FiSend /> Send</>}
              </button>
            </form>

            {status === "success" && (
              <p className="text-green-600 text-center mt-4">
                ✅ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center mt-4">
                ❌ Failed to send. Try again.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
