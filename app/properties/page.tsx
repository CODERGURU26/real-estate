"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Building {
  _id?: string; // MongoDB ID
  id?: string; // Static/local ID
  name: string;
  image?: string;
  description: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Building[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Static buildings
  const buildings: Building[] = [
    {
      id: "1",
      name: "Unique Shanti Developers",
      image: "/unique-estate.jpg",
      description: "Comfort, elegance, and community living.",
    },
    {
      id: "2",
      name: "Skyline Towers",
      image: "/skyline.jpg",
      description: "Luxurious apartments with skyline views.",
    },
    {
      id: "3",
      name: "JP Infra",
      image: "/jpinfra.webp",
      description: "Modern living with unmatched lifestyle amenities.",
    },
  ];

  const allBuildings = [...projects, ...buildings];

  // Function to truncate description
  const truncate = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <section className="max-w-6xl mx-auto p-6 text-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">
        Welcome to Shree Krishna Properties
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Your trusted partner in finding the best properties for your needs.
        Explore our listings and find your dream home today.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
              className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {building.image && (
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-black">
                {building.name}
              </h2>
              <p className="text-gray-600 flex-1">
                {truncate(building.description, 10)}
              </p>
              <Link
                href={`/buildings/${buildingId}`}
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition self-start"
              >
                More Info →
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
