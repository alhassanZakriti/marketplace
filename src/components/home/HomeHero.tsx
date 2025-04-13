"use client"
import { motion } from "framer-motion"
import SearchBar from "../search/SearchBar"
import SearchBarMobile from "../search/SearchBarMobile"
import heroImage from "../../assets/hero4.jpg"
import locationIcon from "../../assets/location.svg"

function HomeHero() {
  return (
    <section className="relative  min-h-screen md:h-[90vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute p-0 inset-0  z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={heroImage} className="w-full  h-full object-cover object-center" alt="Restaurant background" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto text-center">
          {/* Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 px-4] py-1.5 px-2 lt-md:mt-20 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <img src={locationIcon} className="w-4 h-4" alt="Location icon" />
              <span className="text-white font-medium text-sm">at Tabla.ma</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 max-w-4xl mx-auto">
              Discover Your Next Table
            </h1>

            {/* Optional Subheading - Uncomment if needed */}
            {/* <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Find the perfect restaurant for any occasion. Book your table in just a few clicks.
            </p> */}
          </motion.div>

          {/* Search Components */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto"
          >
            {/* Desktop Search */}
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden">
              <SearchBarMobile />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-bgdarktheme rounded-t-[2rem] z-10"></div>
    </section>
  )
}

export default HomeHero
