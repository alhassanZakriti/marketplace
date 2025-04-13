"use client"

import { useState } from "react"
import { Star, Wifi, Home, FileText, ChevronRight, ChevronLeft } from "lucide-react"

import profilePic from "../../assets/profile.png"
import ReservationProcess from "../../components/restaurantFeatures/ReservationProcess"

export default function RestaurantPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllMenu, setShowAllMenu] = useState(false)

  const mainImages = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  const userPhotos = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]

  const menuItems = [
    { name: "Demi-magret de canard du Sud Ouest", price: "$5" },
    { name: "Pêche du jour", price: "$55" },
    { name: "Pêche du jour", price: "$55" },
    { name: "Pêche du jour", price: "$55" },
    { name: "Filet de boeuf", price: "$65" },
    { name: "Risotto aux champignons", price: "$45" },
    { name: "Salade Niçoise", price: "$35" },
    { name: "Plateau de fromages", price: "$25" },
  ]

  const reviews = [
    {
      name: "Denise M. Walker",
      rating: 4.5,
      comment: "Fantastic! The quality keeps getting better and better.",
      image: profilePic,
    },
    {
      name: "Donald C. Panda",
      rating: 4.2,
      comment: "Fantastic! The quality keeps getting better by Tabla too.",
      image: profilePic,
    },
    {
      name: "Scott J. Williams",
      rating: 4.8,
      comment: "Incredible! The food was amazing by Tabla too.",
      image: profilePic,
    },
  ]

  const hoursOfOperation = [
    { day: "Monday", hours: "9:00 AM - 23:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 23:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 23:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 23:00 PM" },
    { day: "Friday", hours: "9:00 AM - 23:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 23:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mainImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + mainImages.length) % mainImages.length)
  }

  const displayedMenuItems = showAllMenu ? menuItems : menuItems.slice(0, 4)

  const [showReservationProcess, setShowReservationProcess] = useState(false)

  type SelectedData = {
    reserveDate: string
    time: string
    guests: number
  }

  const [bookingData, setBookingData] = useState<SelectedData>()

  return (
    <div className="min-h-screen dark:text-white bg-softgreytheme dark:bg-bgdarktheme transition-colors duration-200">
      {showReservationProcess && (
        <ReservationProcess getDateTime={setBookingData} onClick={() => setShowReservationProcess(false)} />
      )}

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Image Gallery */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="relative h-[400px] w-full">
            <img
              src={mainImages[currentImageIndex] || "/placeholder.svg"}
              alt="Restaurant interior"
              className="object-cover w-full h-full"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-whitetheme/80 dark:bg-darkthemeitems/80 rounded-full p-2 shadow-md hover:bg-whitetheme dark:hover:bg-darkthemeitems transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-blacktheme dark:text-textdarktheme" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-whitetheme/80 dark:bg-darkthemeitems/80 rounded-full p-2 shadow-md hover:bg-whitetheme dark:hover:bg-darkthemeitems transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-blacktheme dark:text-textdarktheme" />
            </button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {mainImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full ${index === currentImageIndex ? "bg-whitetheme" : "bg-whitetheme/50"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button className="btn-primary" onClick={() => setShowReservationProcess(true)}>
            Book
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blacktheme dark:text-textdarktheme mb-2 transition-colors">
                The Fiver Fishermen
              </h1>
              <div className="flex items-center gap-4 text-sm text-subblack dark:text-textdarktheme/80 mb-2 transition-colors">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-greentheme rounded-full"></span>
                  Fish Restaurant
                </span>
                <span className="flex items-center gap-1 text-redtheme">
                  <span className="inline-block w-2 h-2 bg-redtheme rounded-full"></span>
                  Closed for Holidays
                </span>
              </div>
              <p className="text-subblack dark:text-textdarktheme/70 text-sm max-w-2xl transition-colors">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                alteration in some form, by injected humour, or randomised words which don't look even slightly
                believable.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-whitetheme dark:bg-darkthemeitems shadow-md rounded-lg p-3 text-center transition-colors">
                <div className="text-3xl font-bold text-yellowtheme">4.3</div>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= 4
                          ? "text-yellowtheme fill-yellowtheme"
                          : "text-softgreytheme dark:text-textdarktheme/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-greentheme font-medium text-sm">Very Good</div>
                <div className="text-subblack dark:text-textdarktheme/70 text-xs transition-colors">
                  Based on 120 reviews
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded p-2 transition-colors">
                  <div className="text-yellowtheme font-bold">4.2</div>
                  <div className="text-xs text-subblack dark:text-textdarktheme/70 transition-colors">Food</div>
                </div>
                <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded p-2 transition-colors">
                  <div className="text-yellowtheme font-bold">5.0</div>
                  <div className="text-xs text-subblack dark:text-textdarktheme/70 transition-colors">Service</div>
                </div>
                <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded p-2 transition-colors">
                  <div className="text-yellowtheme font-bold">4.8</div>
                  <div className="text-xs text-subblack dark:text-textdarktheme/70 transition-colors">Ambiance</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 mb-8 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg dark:text-textdarktheme transition-colors">Tabla Offers</h3>
              <span className="bg-softgreentheme dark:bg-greentheme/20 text-greentheme dark:text-greentheme text-xs px-2 py-1 rounded transition-colors">
                50% off the "à la carte" menu
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button className="btn-primary">Make a reservation with this offer</button>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme transition-colors">Our menu</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-softgreentheme dark:bg-greentheme/20 text-greentheme px-2 py-1 rounded transition-colors">
                Average Price 47$
              </span>
            </div>
          </div>

          <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-6 transition-colors">
            <div className="space-y-4">
              {displayedMenuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-2 border-b border-softgreytheme dark:border-textdarktheme/10 transition-colors"
                >
                  <span className="font-medium dark:text-textdarktheme transition-colors">{item.name}</span>
                  <span className="text-subblack dark:text-textdarktheme/70 transition-colors">{item.price}</span>
                </div>
              ))}
            </div>

            {!showAllMenu && menuItems.length > 4 && (
              <div className="mt-6 text-center">
                <button className="btn-primary" onClick={() => setShowAllMenu(true)}>
                  View full menu
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Location & Hours */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme mb-4 transition-colors">
            Location & Hours Of Work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg overflow-hidden transition-colors">
              <div className="h-[250px] bg-softgreytheme dark:bg-bgdarktheme2 relative transition-colors">
                <img
                  src="/placeholder.svg?height=250&width=400"
                  alt="Map location"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1 dark:text-textdarktheme transition-colors">Rue Georges Sand</h3>
                <p className="text-subblack dark:text-textdarktheme/70 mb-2 transition-colors">
                  N°20 Val Fleuri, Casablanca, MA
                </p>
                <div className="space-y-1 text-sm">
                  <a
                    href="https://5-fishermen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-greentheme hover:underline block"
                  >
                    www.5-fishermen.com
                  </a>
                  <a href="mailto:contact@5-fishermen.com" className="text-greentheme hover:underline block">
                    contact@5-fishermen.com
                  </a>
                  <a href="tel:+212547547678" className="text-greentheme hover:underline block">
                    +212 (547) 547-678
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 transition-colors">
              <h3 className="font-bold mb-3 dark:text-textdarktheme transition-colors">Today 9:00 AM - 23:00 PM</h3>
              <div className="space-y-2">
                {hoursOfOperation.map((day, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span
                      className={`${day.day === "Sunday" ? "font-medium" : ""} dark:text-textdarktheme transition-colors`}
                    >
                      {day.day}
                    </span>
                    <span
                      className={`${
                        day.day === "Sunday" ? "text-redtheme" : "dark:text-textdarktheme/70"
                      } transition-colors`}
                    >
                      {day.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Extra Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme mb-4 transition-colors">
            Extra Services
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center flex-col transition-colors">
              <Home className="h-6 w-6 text-greentheme mb-2" />
              <span className="text-sm font-medium dark:text-textdarktheme transition-colors">Home Delivery</span>
            </div>
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center flex-col transition-colors">
              <Wifi className="h-6 w-6 text-greentheme mb-2" />
              <span className="text-sm font-medium dark:text-textdarktheme transition-colors">High Wi-Fi Quality</span>
            </div>
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center flex-col transition-colors">
              <FileText className="h-6 w-6 text-greentheme mb-2" />
              <span className="text-sm font-medium dark:text-textdarktheme transition-colors">Fixed Pre-order</span>
            </div>
          </div>
        </section>

        {/* User Photos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme mb-4 transition-colors">
            User Photos
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {userPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`User photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === userPhotos.length - 1 && (
                  <div className="absolute inset-0 bg-blacktheme/60 flex items-center justify-center">
                    <span className="text-whitetheme font-bold">+12</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme transition-colors">Reviews</h2>
            <button className="border border-softgreytheme dark:border-textdarktheme/20 rounded px-3 py-1 text-sm flex items-center gap-1 dark:text-textdarktheme transition-colors">
              Sort by <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium dark:text-textdarktheme transition-colors">{review.name}</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.rating
                                ? "text-yellowtheme fill-yellowtheme"
                                : "text-softgreytheme dark:text-textdarktheme/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-subblack dark:text-textdarktheme/70 text-sm mt-1 transition-colors">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 transition-colors">
            <h3 className="font-medium mb-3 dark:text-textdarktheme transition-colors">Write your review</h3>
            <textarea
              className="w-full border border-softgreytheme dark:border-textdarktheme/20 dark:bg-bgdarktheme2 rounded-md p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-greentheme focus:border-transparent dark:text-textdarktheme transition-colors"
              placeholder="Share your experience..."
            ></textarea>
            <div className="mt-3 flex justify-end">
              <button className="btn-primary">Submit</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function ChevronDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
