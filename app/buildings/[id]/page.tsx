"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ContactModal from "@/app/components/ContactModal";

interface Building {
  _id: string;
  title: string;
  description: string;
  image?: string;
  // Add other fields from your Project model as needed
}

// ✅ Fallback data in case API fails
const staticBuildings: Building[] = [
  {
    _id: "1",
    title: "Unique Shanti Developers",
    image: "/images/unique-estate.jpg",
    description: "Comfort, elegance, and community living with modern amenities and beautiful architecture. This project offers a perfect blend of luxury and affordability for families looking for their dream home.",
  },
  {
    _id: "2",
    title: "Skyline Towers",
    image: "/images/skyline.jpg",
    description: "Luxurious apartments with skyline views and world-class amenities. Experience urban living at its finest with premium facilities and stunning city views.",
  },
  {
    _id: "3", 
    title: "JP Infra",
    image: "/images/jpinfra.webp",
    description: "Modern living with unmatched lifestyle amenities including swimming pool, gym, children's play area, and 24/7 security. Perfect for contemporary families.",
  },
];

export default function BuildingDetail() {
  const [contactModal, setContactModal] = useState(false);
  const [building, setBuilding] = useState<Building | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const params = useParams();
  const id = params?.id;

  // ✅ Function to fetch building from API
  const fetchBuilding = async (buildingId: string) => {
    try {
      console.log("Fetching building with ID:", buildingId);
      
      const response = await fetch(`/api/projects/${buildingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Building with ID "${buildingId}" not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched building data:", data);
      
      // Map API response to match our interface
      const mappedBuilding: Building = {
        _id: data._id,
        title: data.title,
        description: data.description,
        image: data.image || data.imageUrl, // Handle different possible field names
      };

      return mappedBuilding;
    } catch (error) {
      console.error("API fetch error:", error);
      throw error;
    }
  };

  // ✅ Function to get building from static data
  const getStaticBuilding = (buildingId: string) => {
    return staticBuildings.find((b) => b._id === buildingId);
  };

  useEffect(() => {
    const loadBuilding = async () => {
      if (!id) {
        setError("No building ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // ✅ First try to fetch from API
        try {
          const apiBuilding = await fetchBuilding(String(id));
          setBuilding(apiBuilding);
          return;
        } catch (apiError) {
          console.log("API fetch failed, trying static data:", apiError);
          
          // ✅ Fallback to static data
          const staticBuilding = getStaticBuilding(String(id));
          if (staticBuilding) {
            setBuilding(staticBuilding);
            console.log("Using static building data");
            return;
          }
          
          // ✅ If both fail, show error
          throw apiError;
        }
      } catch (err) {
        console.error("Error loading building:", err);
        setError(err instanceof Error ? err.message : "Failed to load building data");
        setBuilding(null);
      } finally {
        setLoading(false);
      }
    };

    loadBuilding();
  }, [id]);

  // Auto-show contact modal after 3 seconds
  useEffect(() => {
    if (building && !error) {
      const timer = setTimeout(() => setContactModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [building, error]);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading building details...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (error || !building) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-red-500 text-6xl mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Building Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <button 
                onClick={() => window.history.back()}
                className="block w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="block w-full px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 flex items-center text-purple-600 hover:text-purple-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>

        {/* Debug info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <strong>Debug:</strong> Building ID: {building._id}, URL ID: {String(id)}
          </div>
        )}

        {/* Main content card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image section */}
          {building.image && (
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200">
              <Image
                src={building.image}
                alt={building.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  console.log("Image failed to load:", building.image);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show fallback
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center justify-center h-full bg-gray-100">
                        <div class="text-center text-gray-500">
                          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p>Image not available</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          )}

          {/* Content section */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              {building.title}
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {building.description}
              </p>
            </div>

            {/* Additional info section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Premium Location</li>
                  <li>• Modern Architecture</li>
                  <li>• 24/7 Security</li>
                  <li>• Parking Available</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Swimming Pool</li>
                  <li>• Gymnasium</li>
                  <li>• Children's Play Area</li>
                  <li>• Landscaped Gardens</li>
                </ul>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setContactModal(true)}
                  className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                >
                  Get More Information
                </button>
                <button
                  onClick={() => {
                    // You can make this dynamic based on building or use a contact number
                    const phoneNumber = '+91-9920865609'; // Contact number
                    
                    // Check if on mobile device
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    
                    if (isMobile) {
                      // On mobile, directly open phone dialer
                      window.location.href = `tel:${phoneNumber}`;
                    } else {
                      // On desktop, show number and copy to clipboard
                      navigator.clipboard.writeText(phoneNumber).then(() => {
                        alert(`Phone number copied to clipboard: ${phoneNumber}\n\nCall us for more information!`);
                      }).catch(() => {
                        // Fallback if clipboard API fails
                        alert(`Call us at: ${phoneNumber}`);
                      });
                    }
                  }}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.906c-.546.308-.93.925-.93 1.616 0 .353.148.686.408.932l2.618 2.618c.246.26.579.408.932.408.691 0 1.308-.384 1.616-.93l1.519-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
      />
    </div>
  );
}