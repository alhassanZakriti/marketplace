"use client"

import type React from "react"
import { Star, Clock } from "lucide-react"
import { Link } from "react-router"

interface Restaurant {
  id: string
  name: string
  imageUrl: string
  rating: number
  address: string
  category: string
  isOpen: boolean
  priceRange: string
  distance: string
}

export interface FilterOptions {
  categories: string[]
  priceRanges: string[]
  distance: string | null
}

interface RestaurantListProps {
  restaurants: Restaurant[]
  onHover: (id: string) => void
  filtersChosen: FilterOptions;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants,filtersChosen, onHover }) => {
  return (
    <div className="space-y-4">
      {restaurants
      .filter((restaurant) => {
        const matchesCategory = filtersChosen.categories.length === 0 || filtersChosen.categories.includes(restaurant.category);
        const matchesPriceRange = filtersChosen.priceRanges.length === 0 || filtersChosen.priceRanges.includes(restaurant.priceRange);
        const matchesDistance = !filtersChosen.distance || filtersChosen.distance === restaurant.distance;
        return matchesCategory && matchesPriceRange && matchesDistance;
      })
      .map((restaurant) => (
        <div
        key={restaurant.id}
        className="bg-whitetheme group dark:bg-darkthemeitems rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.05)]"
        onMouseEnter={() => onHover(restaurant.id)}
        onMouseLeave={() => onHover("")}
        >
        <Link to={`/restaurant/${restaurant.id}`} target="_blank" className="flex flex-col sm:flex-row">
          {/* Restaurant Image */}
          <div className="w-full sm:w-1/3 overflow-hidden h-48 sm:h-auto relative">
          <img
            src={restaurant.imageUrl || "/placeholder.svg"}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-whitetheme dark:bg-darkthemeitems text-greentheme text-xs font-medium px-2 py-1 rounded-full">
            {restaurant.category}
            </span>
          </div>
          </div>

          {/* Restaurant Details */}
          <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-blacktheme dark:text-textdarktheme">{restaurant.name}</h3>
            <div className="flex items-center bg-softgreentheme dark:bg-greentheme/20 text-greentheme px-2 py-1 rounded text-sm">
              <Star size={14} className="fill-yellowtheme text-yellowtheme mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            </div>

            <p className="text-gray-600 dark:text-textdarktheme/70 text-sm mb-3">{restaurant.address}</p>

            <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-gray-100 dark:bg-bgdarktheme2 text-gray-700 dark:text-textdarktheme/70 text-xs px-2 py-1 rounded-full">
              {restaurant.priceRange}
            </span>
            <span className="bg-gray-100 dark:bg-bgdarktheme2 text-gray-700 dark:text-textdarktheme/70 text-xs px-2 py-1 rounded-full">
              {restaurant.distance} Km
            </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
            <Clock size={16} className={restaurant.isOpen ? "text-greentheme" : "text-redtheme"} />
            <span className={`ml-1 text-sm ${restaurant.isOpen ? "text-greentheme" : "text-redtheme"}`}>
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
            </div>
            <button className="btn-primary text-sm py-1.5 px-3">Book Now</button>
          </div>
          </div>
        </Link>
        </div>
      ))}
    </div>
  )
}

export default RestaurantList
