"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"

const FiltersSection = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showAllCategories, setShowAllCategories] = useState(false)

  const categories = [
    "Italian",
    "Japanese",
    "Mexican",
    "Chinese",
    "American",
    "Indian",
    "Thai",
    "Mediterranean",
    "French",
    "Vegetarian",
  ]

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 6)

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  return (
    <div className="bg-whitetheme dark:bg-darkthemeitems rounded-xl shadow-sm p-4 transition-colors">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blacktheme dark:text-textdarktheme mb-2 sm:mb-0">Filters</h3>

        {activeFilters.length > 0 && (
          <button onClick={clearFilters} className="text-sm text-greentheme hover:underline flex items-center">
            <X size={16} className="mr-1" />
            Clear all filters
          </button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="bg-softgreentheme dark:bg-greentheme/20 text-greentheme px-3 py-1 rounded-full text-sm flex items-center"
            >
              {filter}
              <button onClick={() => toggleFilter(filter)} className="ml-2">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Filter Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Categories */}
        <div>
          <h4 className="font-medium text-blacktheme dark:text-textdarktheme mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {displayedCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilters.includes(category)
                    ? "bg-greentheme text-white"
                    : "bg-gray-100 dark:bg-bgdarktheme2 text-gray-700 dark:text-textdarktheme/70 hover:bg-gray-200 dark:hover:bg-bgdarktheme"
                }`}
              >
                {category}
              </button>
            ))}

            {categories.length > 6 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-sm text-greentheme hover:underline"
              >
                {showAllCategories ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-blacktheme dark:text-textdarktheme mb-2">Price Range</h4>
          <div className="flex gap-2">
            {["$", "$$", "$$$", "$$$$"].map((price) => (
              <button
                key={price}
                onClick={() => toggleFilter(price)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeFilters.includes(price)
                    ? "bg-greentheme text-white"
                    : "bg-gray-100 dark:bg-bgdarktheme2 text-gray-700 dark:text-textdarktheme/70 hover:bg-gray-200 dark:hover:bg-bgdarktheme"
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>

        {/* Distance */}
        <div>
          <h4 className="font-medium text-blacktheme dark:text-textdarktheme mb-2">Distance</h4>
          <div className="relative">
            <select className="w-full p-2 bg-gray-100 dark:bg-bgdarktheme2 rounded-lg border-0 text-gray-700 dark:text-textdarktheme/70 appearance-none pr-8">
              <option>Less than 1 mile</option>
              <option>1-3 miles</option>
              <option>3-5 miles</option>
              <option>5+ miles</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-textdarktheme/50"
            />
          </div>
        </div>
      </div>

      {/* More Filters (Mobile Accordion) */}
      <div className="mt-4 md:hidden">
        <button className="flex items-center justify-between w-full p-2 bg-gray-100 dark:bg-bgdarktheme2 rounded-lg text-gray-700 dark:text-textdarktheme/70">
          <span>More filters</span>
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  )
}

export default FiltersSection
