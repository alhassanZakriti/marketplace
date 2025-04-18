"use client"

import type React from "react"

import { useState } from "react"
import { Star, Clock, Tag, Heart } from "lucide-react"
import { Link } from "react-router"

interface RestaurantCardProps {
  id: string
  name: string
  address: string
  rating: number
  category: string
  isOpen: boolean
  imageUrl: string
  favorite?: boolean
  onToggleFavorite?: (id: string, isFavorite: boolean) => void
}

export default function RestaurantCard({
  id,
  name,
  address,
  rating,
  category,
  isOpen,
  imageUrl,
  favorite = false,
  onToggleFavorite,
}: RestaurantCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorite)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the Link navigation
    e.stopPropagation() // Prevent event bubbling

    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)

    // Call the parent component's handler if provided
    if (onToggleFavorite) {
      onToggleFavorite(id, newFavoriteState)
    }
  }

  return (
    <Link to={`/restaurant/${id}`} target="_blank">
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-bgdarktheme2 shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gray-200 dark:bg-darkthemeitems ${
              isImageLoaded ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          />
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className={`h-full w-full object-cover transition-all duration-500 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-110`}
            onLoad={() => setIsImageLoaded(true)}
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute left-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-md transition-all duration-200 hover:bg-white dark:bg-darkthemeitems/90 dark:hover:bg-darkthemeitems"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-redtheme text-redtheme" : "text-gray-500 hover:text-redtheme dark:text-gray-300"
              }`}
            />
          </button>

          {/* Status Badge */}
          <div className="absolute right-3 top-3">
            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                isOpen ? "bg-greentheme/90 text-white" : "bg-red-500/90 text-white"
              }`}
            >
              <Clock className="h-3 w-3" />
              <span>{isOpen ? "Open" : "Closed"}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Restaurant Name */}
          <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-greentheme dark:group-hover:text-textdarktheme">
            {name}
          </h3>

          {/* Address */}
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{address}</p>

          {/* Rating and Category */}
          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellowtheme text-yellowtheme" />
              <span className="font-medium text-yellowtheme">{rating.toFixed(1)}</span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-1 text-sm text-greentheme dark:text-white">
              <Tag className="h-3.5 w-3.5" />
              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
