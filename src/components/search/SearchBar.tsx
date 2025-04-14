"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Link, useSearchParams } from "react-router"

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const cityParam = searchParams.get("city")
    const termParam = searchParams.get("term")
    const city = cityParam || "Rabat"
    const term = termParam || ""

  const [searchTerm, setSearchTerm] = useState(term)
  const [cityTerm, setCityTerm] = useState(city)
  const [isFocused, setIsFocused] = useState(false)
  const [isCityFocused, setIsCityFocused] = useState(false)

  // Local data source (replace with your actual data)
  const yourDataSource = ["Greek", "Syrian", "Moroccan", "French", "Italian"]
  const cityDataSource = ["Casablanca", "Rabat", "Tanger", "Al Hoceima", "Fes"]

  const [suggestions, setSuggestions] = useState(yourDataSource)
  const [citySuggestions, setCitySuggestions] = useState(cityDataSource)

  const searchInputRef = useRef(null)
  const cityInputRef = useRef(null)

  const filterSuggestions = (term: string, data: string[]) => {
    return data.filter((item) => item.toLowerCase().includes(term.toLowerCase()))
  }

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
    setSuggestions(filterSuggestions(newSearchTerm, yourDataSource))
  }

  const handleCityTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCityTerm = event.target.value
    setCityTerm(newCityTerm)
    setCitySuggestions(filterSuggestions(newCityTerm, cityDataSource))
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setTimeout(() => setIsFocused(false), 150)
  const handleCityFocus = () => setIsCityFocused(true)
  const handleCityBlur = () => setTimeout(() => setIsCityFocused(false), 150)

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setIsFocused(false)
  }

  const handleCitySuggestionClick = (suggestion: string) => {
    setCityTerm(suggestion)
    setIsCityFocused(false)
  }

  return (
    <div className="sm:flex hidden bg-whitetheme dark:bg-darkthemeitems border border-gray-100 dark:border-textdarktheme/10 p-4 rounded-2xl transition-all duration-200 hover:shadow-xl dark:hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] max-w-4xl mx-auto relative items-center gap-4">
      {/* City Input */}
      <div className="relative flex-1 min-w-[180px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-greentheme">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 0C10.6569 0 12 1.34315 12 3L12.0001 4.17067C12.3128 4.06014 12.6494 4 13 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0H9ZM9 2H3C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H10V3C10 2.44772 9.55229 2 9 2ZM17 6H13C12.4477 6 12 6.44772 12 7V18H17C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6ZM7 12C7.55228 12 8 12.4477 8 13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12H7ZM16 12C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H14C13.4477 14 13 13.5523 13 13C13 12.4477 13.4477 12 14 12H16ZM7 8C7.55228 8 8 8.44771 8 9C8 9.55229 7.55228 10 7 10H5C4.44772 10 4 9.55229 4 9C4 8.44771 4.44772 8 5 8H7ZM16 8C16.5523 8 17 8.44771 17 9C17 9.55229 16.5523 10 16 10H14C13.4477 10 13 9.55229 13 9C13 8.44771 13.4477 8 14 8H16ZM7 4C7.55228 4 8 4.44772 8 5C8 5.55228 7.55228 6 7 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H7Z"
              className="fill-[#0A0908] fill-opacity-20 dark:fill-textdarktheme dark:fill-opacity-20"
            />
          </svg>
        </div>
        <input
          type="text"
          ref={cityInputRef}
          value={cityTerm}
          onChange={handleCityTermChange}
          placeholder="City"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-textdarktheme/10 focus:border-greentheme focus:ring-2 focus:ring-greentheme/20 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 dark:placeholder:text-textdarktheme/50 bg-whitetheme dark:bg-bgdarktheme2 text-blacktheme dark:text-textdarktheme"
          onFocus={handleCityFocus}
          onBlur={handleCityBlur}
        />
        {citySuggestions.length > 0 && isCityFocused && (
          <ul
            className="absolute left-0 right-0 mt-2 bg-whitetheme dark:bg-darkthemeitems shadow-2xl dark:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden z-30 max-h-[250px] overflow-y-auto"
            role="listbox"
          >
            <div className="p-3 border-b border-gray-100 dark:border-textdarktheme/10">
              <p className="font-semibold text-gray-800 dark:text-textdarktheme text-sm">Cities</p>
            </div>
            {citySuggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-bgdarktheme2 flex items-center cursor-pointer transition-colors duration-150 border-b border-gray-50 dark:border-textdarktheme/5 last:border-0"
                onMouseDown={() => handleCitySuggestionClick(suggestion)}
                role="option"
                aria-selected={cityTerm === suggestion}
              >
                <span className="text-greentheme mr-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 0C10.6569 0 12 1.34315 12 3L12.0001 4.17067C12.3128 4.06014 12.6494 4 13 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H3C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0H9ZM9 2H3C2.44772 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H10V3C10 2.44772 9.55229 2 9 2ZM17 6H13C12.4477 6 12 6.44772 12 7V18H17C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6ZM7 12C7.55228 12 8 12.4477 8 13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12H7ZM16 12C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H14C13.4477 14 13 13.5523 13 13C13 12.4477 13.4477 12 14 12H16ZM7 8C7.55228 8 8 8.44771 8 9C8 9.55229 7.55228 10 7 10H5C4.44772 10 4 9.55229 4 9C4 8.44771 4.44772 8 5 8H7ZM16 8C16.5523 8 17 8.44771 17 9C17 9.55229 16.5523 10 16 10H14C13.4477 10 13 9.55229 13 9C13 8.44771 13.4477 8 14 8H16ZM7 4C7.55228 4 8 4.44772 8 5C8 5.55228 7.55228 6 7 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H7Z"
                      className="fill-[#0A0908] fill-opacity-20 dark:fill-textdarktheme dark:fill-opacity-20"
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-700 dark:text-textdarktheme">{suggestion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <div className="h-10 w-px bg-gray-200 dark:bg-textdarktheme/10 mx-1"></div>

      {/* Search Input */}
      <div className="relative flex-1 min-w-[180px]">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-greentheme">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.91669 0.166687C15.3015 0.166687 19.6667 4.53191 19.6667 9.91669C19.6667 12.2185 18.869 14.3341 17.535 16.002L21.5161 19.984C21.9391 20.4071 21.9391 21.093 21.5161 21.5161C21.1255 21.9066 20.511 21.9366 20.086 21.6062L19.984 21.5161L16.002 17.535C14.3341 18.869 12.2185 19.6667 9.91669 19.6667C4.53191 19.6667 0.166687 15.3015 0.166687 9.91669C0.166687 4.53191 4.53191 0.166687 9.91669 0.166687ZM9.91669 2.33335C5.72853 2.33335 2.33335 5.72853 2.33335 9.91669C2.33335 14.1048 5.72853 17.5 9.91669 17.5C14.1048 17.5 17.5 14.1048 17.5 9.91669C17.5 5.72853 14.1048 2.33335 9.91669 2.33335Z"
              className="fill-[#0A0908] fill-opacity-20 dark:fill-textdarktheme dark:fill-opacity-20"
            />
          </svg>
        </div>
        <input
          type="text"
          ref={searchInputRef}
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-textdarktheme/10 focus:border-greentheme focus:ring-2 focus:ring-greentheme/20 outline-none transition-all duration-200 font-medium placeholder:text-gray-400 dark:placeholder:text-textdarktheme/50 bg-whitetheme dark:bg-bgdarktheme2 text-blacktheme dark:text-textdarktheme"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {suggestions.length > 0 && isFocused && (
          <ul
            className="absolute left-0 right-0 mt-2 bg-whitetheme dark:bg-darkthemeitems shadow-2xl dark:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden z-30 max-h-[250px] overflow-y-auto"
            role="listbox"
          >
            <div className="p-3 border-b border-gray-100 dark:border-textdarktheme/10">
              <p className="font-semibold text-gray-800 dark:text-textdarktheme text-sm">Suggestions</p>
            </div>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-bgdarktheme2 flex items-center cursor-pointer transition-colors duration-150 border-b border-gray-50 dark:border-textdarktheme/5 last:border-0"
                onMouseDown={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={searchTerm === suggestion}
              >
                <span className="text-greentheme mr-3">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.91669 0.166687C15.3015 0.166687 19.6667 4.53191 19.6667 9.91669C19.6667 12.2185 18.869 14.3341 17.535 16.002L21.5161 19.984C21.9391 20.4071 21.9391 21.093 21.5161 21.5161C21.1255 21.9066 20.511 21.9366 20.086 21.6062L19.984 21.5161L16.002 17.535C14.3341 18.869 12.2185 19.6667 9.91669 19.6667C4.53191 19.6667 0.166687 15.3015 0.166687 9.91669C0.166687 4.53191 4.53191 0.166687 9.91669 0.166687ZM9.91669 2.33335C5.72853 2.33335 2.33335 5.72853 2.33335 9.91669C2.33335 14.1048 5.72853 17.5 9.91669 17.5C14.1048 17.5 17.5 14.1048 17.5 9.91669C17.5 5.72853 14.1048 2.33335 9.91669 2.33335Z"
                      className="fill-[#0A0908] fill-opacity-20 dark:fill-textdarktheme dark:fill-opacity-20"
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-700 dark:text-textdarktheme">{suggestion}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Book Button */}
      <Link to={`/search?city=${cityTerm}&term=${searchTerm}`} className="btn-primary">
        Book Now
      </Link>
    </div>
  )
}

export default SearchBar
