"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Building {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  image?: string;
}

export default function BuildingDetail() {
  const { id } = useParams();
  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(true);

  // Static fallback data
  const staticBuildings: Building[] = [
    {
      id: "1",
      name: "Unique Shanti Developers",
      image: "/unique-estate.jpg",
      description: "comfort, elegance, and community living",
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
      description: "modern living with unmatched lifestyle amenities",
    },
  ];

  useEffect(() => {
    if (!id) return;

    // Try fetching from MongoDB
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not found");
      })
      .then((data) => {
        setBuilding(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static data if not found in DB
        const staticBuilding = staticBuildings.find((b) => b.id === id);
        setBuilding(staticBuilding || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!building) return <p className="p-6">Building not found.</p>;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {building.image && (
        <img
          src={building.image}
          alt={building.name}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4 text-black">{building.name}</h1>
      <p className="text-gray-600 text-lg">{building.description}</p>
    </section>
  );
}
