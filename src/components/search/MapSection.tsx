"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface MapSectionProps {
  restaurants: Restaurant[]
  selectedRestaurantId: string | null
}

const MapSection: React.FC<MapSectionProps> = ({ restaurants, selectedRestaurantId }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  // Handle sticky behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mapRef.current) {
        const mapTop = mapRef.current.getBoundingClientRect().top
        setIsSticky(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={mapRef}
      className={`bg-whitetheme dark:bg-darkthemeitems rounded-xl shadow-sm overflow-hidden transition-all duration-200 ${
        isSticky ? "md:sticky md:top-28" : ""
      }`}
    >
      <div className="p-4 border-b border-gray-100 dark:border-textdarktheme/10">
        <h3 className="font-semibold text-blacktheme dark:text-textdarktheme">Map View</h3>
      </div>

      {/* Map Container */}
      <div className="h-[500px] bg-gray-100 dark:bg-bgdarktheme2 relative">
        {/* This would be replaced with an actual map component */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500 dark:text-textdarktheme/50">
          <MapPin size={48} className="mb-2 text-greentheme opacity-50" />
          {/* <p className="text-center max-w-xs px-4">
            Map would be displayed here using a library like Google Maps, Mapbox, or Leaflet
          </p> */}
        </div>

        {/* Sample map markers */}
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
              selectedRestaurantId === restaurant.id ? "z-10" : "z-0"
            }`}
            style={{
              left: `${(restaurant.coordinates.lng + 7.62) * 1000}%`,
              top: `${(33.6 - restaurant.coordinates.lat) * 1000}%`,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selectedRestaurantId === restaurant.id
                  ? "bg-greentheme scale-125"
                  : "bg-gray-400 dark:bg-textdarktheme/50"
              }`}
            >
              <MapPin
                size={16}
                className={selectedRestaurantId === restaurant.id ? "text-white" : "text-white"}
                fill={selectedRestaurantId === restaurant.id ? "white" : "white"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapSection
