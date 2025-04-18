"use client"

import { useState, useEffect } from "react"
import { Download, Moon, Sun } from "lucide-react"
import Logo from "./Logo"
import SearchBar from "../search/SearchBar"
import { Link, useLocation } from "react-router"
import AuthPopup from "../../__auth/AuthPopup"

const Header = () => {
  const [shouldShowSearchBar, setShouldShowSearchBar] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or default to system preference
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode")
      if (savedMode !== null) {
        return savedMode === "true"
      }
      // Check system preference as fallback
      return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    return false
  })

  // Apply dark mode class on initial load and when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode.toString())
    }
  }, [darkMode])

  const {pathname} = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 || (pathname.includes("search") && window.scrollY > 180)) { 
        setShouldShowSearchBar(true)
      } else {
        setShouldShowSearchBar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode)
  }

  const [isOpen, setIsOpen] = useState(false)
  const [authResult, setAuthResult] = useState<any>(null)

  const handleSuccess = (data: any) => {
    console.log("Authentication successful:", data)
    setAuthResult(data)
  }


  return (
    <header className="z-[50] sticky top-0 p-2 items-center flex justify-between gap-1 px-6 lt-sm:px-2 shadow-lg shadow-[#00000007] bg-whitetheme dark:bg-bgdarktheme dark:shadow-[#ffffff07] transition-colors duration-200">
      {
        (
          <AuthPopup isOpen={isOpen} onClose={() => setIsOpen(false)} onSuccess={handleSuccess} />
        )
      }
      <Logo className="horizontal" />
      <div className="lt-lg:hidden">{shouldShowSearchBar && <SearchBar />}</div>
      <div className="flex flex-col justify-center items-end gap-2">
        <div className="flex items-center gap-2 text-greentheme text-sm font-semibold">
          <a href="https://restaurant.tabla.ma/" target='_blank' className="hover:underline dark:text-whitetheme">For Business</a>
          <p className="text-[#00000099] dark:text-[#ffffff99]">|</p>
          <Link to={'/contact'} className="hover:underline dark:text-whitetheme">Contact Us</Link>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn flex gap-2 dark:bg-darkthemeitems dark:text-textdarktheme">
            <span className="lt-sm:hidden block">Get our app</span> <Download size={20} />
          </button>
          <button className="btn-primary" onClick={()=>{setIsOpen(true)}}>Login</button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-softgreytheme dark:bg-darkthemeitems text-blacktheme dark:text-textdarktheme hover:bg-softgreentheme dark:hover:bg-greentheme/20 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} className="text-yellowtheme" /> : <Moon size={20} className="text-greentheme" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
