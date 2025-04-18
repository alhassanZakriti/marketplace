"use client"

import { useState, useEffect } from "react"
import SearchBar from "../../components/search/SearchBar"
import SearchBarMobile from "../../components/search/SearchBarMobile"
import FiltersSection, { type FilterOptions } from "../../components/search/FiltersSection"
import RestaurantList from "../../components/search/RestaurantList"
import MapSection from "../../components/search/MapSection"
import Pagination from "../../components/search/Pagination"
import { Calendar, CalendarCog, Clock, Filter, MapPin, Timer, Users } from "lucide-react"
import ReservationProcess from "../../components/restaurantFeatures/ReservationProcess"
import { useParams, useSearchParams } from "react-router-dom";

// Sample restaurant data
const RESTAURANTS = [
  {
    id: "1",
    name: "The Italian Bistro",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    rating: 4.7,
    address: "123 Main St, Downtown",
    category: "Italian",
    isOpen: true,
    priceRange: "$$",
    distance: "0.8",
    coordinates: { lat: 33.589886, lng: -7.603869 },
  },
  {
    id: "2",
    name: "Sushi Paradise",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    rating: 4.5,
    address: "456 Oak Ave, Westside",
    category: "Japanese",
    isOpen: true,
    priceRange: "$$$",
    distance: "1.2",
    coordinates: { lat: 33.592886, lng: -7.613869 },
  },
  {
    id: "3",
    name: "Taco Fiesta",
    imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    rating: 4.2,
    address: "789 Pine Blvd, Southside",
    category: "Mexican",
    isOpen: false,
    priceRange: "$",
    distance: "0.5",
    coordinates: { lat: 33.579886, lng: -7.593869 },
  },
  {
    id: "4",
    name: "Golden Dragon",
    imageUrl: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2",
    rating: 4.0,
    address: "101 Elm St, Eastside",
    category: "Chinese",
    isOpen: true,
    priceRange: "$$",
    distance: "1.5",
    coordinates: { lat: 33.599886, lng: -7.623869 },
  },
  {
    id: "5",
    name: "Burger Joint",
    imageUrl: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
    rating: 4.3,
    address: "202 Maple Dr, Northside",
    category: "American",
    isOpen: true,
    priceRange: "$$",
    distance: "0.7",
    coordinates: { lat: 33.584886, lng: -7.608869 },
  },
  {
    id: "6",
    name: "Spice of India",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    rating: 4.6,
    address: "303 Cedar Ln, Midtown",
    category: "Indian",
    isOpen: true,
    priceRange: "$$",
    distance: "1.0",
    coordinates: { lat: 33.587886, lng: -7.598869 },
  },
]

const SearchPage = () => {

  useEffect(() => {
    document.title = "Search - Tabla | Taste Morocco's Best"
  }, [])
  const [restaurants, setRestaurants] = useState(RESTAURANTS)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null)
  const [totalPages] = useState(5) // In a real app, this would be calculated based on total results
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // In a real app, you would fetch new data for the selected page
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRestaurantHover = (id: string) => {
    setSelectedRestaurant(id)
  }

  const [shownFilters, setShownFilters] =useState(false)
  const [showReservationProcess, setShowReservationProcess] = useState(false)

  type SelectedData = {

    reserveDate: string ;
    time: string ;
    guests: number ;
  };

  const [data,setData] =useState<SelectedData>({
    "reserveDate": "----/--/--" ,
    "time": "--:--" ,
    "guests": 0 
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const city = searchParams.get("city") || ""

  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRanges: [],
    distance: null,
  })

  const handleFiltersChange = (newFilters: FilterOptions) => {
    console.log("Filters changed:", newFilters)
    setFilters(newFilters)

    // Here you would typically fetch filtered data or update the UI
    // For example:
    // fetchRestaurants(newFilters)
  }

  return (
    <div className="bg-softgreytheme dark:bg-bgdarktheme dark:text-white transition-colors duration-200">

        {showReservationProcess && (
            <ReservationProcess
            getDateTime={setData}
            noOffer={true}
            onClick={() => setShowReservationProcess(false)}
            />
        )}
        <div className="container mx-auto px-4 py-6">
            <div className="min-h-screen max-w-[1200px]  mx-auto ">
                <div className="bg-[#f9f9f9]  lg:w-[40vw] mx-auto dark:bg-darkthemeitems rounded-lg  mb-3 shadow-sm">
                    <div
                        onClick={() => setShowReservationProcess(true)}
                        className="flex justify-around  items-center cursor-pointer p-1 h-[4em] hover:border-softgreentheme border-2 border-[#00000000] hover:bg-[#f0f0f0] dark:hover:bg-bgdarktheme2 rounded-md transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-[600] dark:text-white mr-2 text-black"><Calendar size={27} className="rounded-[100%] w-8 h-8 btn-secondary p-2 m-0 text-yellowtheme"/></span>
                            <span className="font-medium text-black dark:text-white">{data.reserveDate || "----/--/--"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-[600] dark:text-white mr-2 text-black"><Clock size={27} className="rounded-[100%] w-8 h-8 btn-secondary p-2 m-0 text-yellowtheme"/></span>
                            <span className="font-medium text-black dark:text-white">{data.time || "--:--"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-[600] dark:text-white mr-2 text-black"><Users size={27} className="rounded-[100%] w-8 h-8 btn-secondary p-2 m-0 text-yellowtheme"/></span>
                            <span className="font-medium text-black dark:text-white">{data.guests || "--"}</span>
                        </div>
                    </div>
                </div>
                {/* Search Bar */}
                <div className="mb-6">
                <div className="hidden sm:block">
                    <SearchBar />
                </div>
                <div className="sm:hidden">
                    <SearchBarMobile />
                </div>
                </div>

                {/* Current Location */}
                <div className={` ${city? 'justify-between':'justify-end'} flex `}>
                    <div className={`flex items-center mb-6 text-sm text-gray-600 dark:text-textdarktheme/70 ${city? '':'hidden'}`}>
                        <MapPin size={16} className="mr-1 text-greentheme" />
                        <span>Showing results near: {city}</span>
                    </div>
                    <button className={`flex gap-2 text-[.9rem] items-center ${shownFilters? 'btn-primary p-3 mb-2':'btn-secondary p-3 mb-2'}`} onClick={()=>{setShownFilters(!shownFilters)}}> Filters <Filter size={14}/></button>
                </div>

                {/* Filters */}
                {
                    shownFilters &&
                    <FiltersSection onFiltersChange={handleFiltersChange} />
                }

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-6 mt-8">
                {/* Restaurant List */}
                <div className="w-full md:w-7/12 lg:w-8/12">
                    <div className="mb-4">
                    <h2 className="text-xl font-bold text-blacktheme dark:text-textdarktheme">
                        {restaurants.length} restaurants found
                    </h2>
                    </div>

                    <RestaurantList restaurants={restaurants} onHover={handleRestaurantHover} filtersChosen={filters}/>

                    {/* Pagination */}
                    <div className="mt-8">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>

                {/* Map */}
                <div className="w-full md:w-5/12 lg:w-4/12">
                    <MapSection restaurants={restaurants} selectedRestaurantId={selectedRestaurant} />
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchPage
