"use client"

import { useEffect, useState } from "react"
import { Star, Wifi, Home, FileText, ChevronRight, ChevronLeft } from "lucide-react"

import profilePic from "../../assets/profile.png"
import ReservationProcess from "../../components/restaurantFeatures/ReservationProcess"
import PhotoPopup from "../../components/restaurantFeatures/PhotoPopup"
import ReviewForm, { type ReviewData } from "../../components/restaurantFeatures/ReviewForm"
import { useParams } from "react-router"
// import ReviewForm, { type ReviewData } from "./review-form"

export default function RestaurantPage() {

  const { id } = useParams()

  useEffect(() => {
    document.title = `${id} - Tabla | Taste Morocco's Best`
  }, [])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllMenu, setShowAllMenu] = useState(false)
  const [showReservationProcess, setShowReservationProcess] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  const mainImages = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ]

  const userPhotos = [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
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
      comment: "Fantastic! The quality keeps getting better.",
      image: profilePic,
    },
    {
      name: "Scott J. Williams",
      rating: 4.8,
      comment: "Incredible! The food was amazing.",
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
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + mainImages.length) % mainImages.length
    )
  }

  const displayedMenuItems = showAllMenu ? menuItems : menuItems.slice(0, 4)

  // Swipe event handlers for the image gallery
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const swipeDistance = touchStartX - touchEndX
    const swipeThreshold = 50 // adjust threshold as needed

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }
    // Reset the touch positions
    setTouchStartX(null)
    setTouchEndX(null)
  }

  type OfferType={
    id: string
    title: string
    description: string
    code: string
  }

  type SelectedData = {
    reserveDate: string
    time: string
    guests: number
    offer?: OfferType |null
  }

  const [bookingData, setBookingData] = useState<SelectedData>()

  const [shouldShowBook, setShouldShowBook] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShouldShowBook(true)
      } else {
        setShouldShowBook(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const offers = [
    {
      id: "1",
      title: "50% Off Appetizers",
      description: "Get 50% off all appetizers with your main course",
      code: "APPETIZER50",
    },
    {
      id: "2",
      title: "Free Dessert",
      description: "Enjoy a complimentary dessert with any main course",
      code: "FREEDESSERT",
    },
    {
      id: "3",
      title: "2 for 1 Drinks",
      description: "Buy one drink, get one free during your meal",
      code: "DRINKS241",
    },
    {
      id: "4",
      title: "20% Off Total Bill",
      description: "Enjoy 20% off your entire bill for dinner reservations",
      code: "DINNER20",
    },
  ]

  const [showPhotoPopup, setShowPhotoPopup] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState("")


  const [ showWhiteReview, setShowWriteReview ]=useState(false)

  const handleSubmitReview = (reviewData: ReviewData) => {
    console.log("Review submitted:", reviewData)
    // Here you would typically send the data to your API
    alert("Thank you for your review!")
  }


  return (
    <div className="min-h-screen dark:text-white bg-softgreytheme dark:bg-bgdarktheme transition-colors duration-200">
      {showReservationProcess && (
        <ReservationProcess
          getDateTime={setBookingData}
          offers={offers}
          noOffer={false}
          dateTime={bookingData}
          onClick={() => setShowReservationProcess(false)}
        />
      )}

      {
        showWhiteReview && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-blacktheme/20 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setShowWriteReview(false)}
              aria-hidden="true"
            />
            <div className="mx-auto z-[400]  max-w-2xl p-4 bg-whitetheme dark:bg-darkthemeitems rounded-lg shadow-lg transition-all duration-300 animate-in fade-in zoom-in-95">
              <h1 className="mb-6 text-2xl font-bold text-blacktheme dark:text-textdarktheme">Write a Review</h1>
              <ReviewForm onSubmit={handleSubmitReview} />
            </div>
          </div>
        )
      }

      {
        showPhotoPopup && (
          <PhotoPopup isOpen={showPhotoPopup} photoUrl={selectedPhoto} onClose={()=>{setShowPhotoPopup(false);setSelectedPhoto('')}} altText="Gallery photo" />
        )

      }

        {shouldShowBook&&<div className="relative flex justify-center mb-6">
          <button
            className=" fixed z-[200] bottom-[40px] shadow-xl w-[20em] btn-special"
            onClick={() => setShowReservationProcess(true)}
          >
            Book Your Table
          </button>
        </div>}

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Image Gallery */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          {/* Image container with touch/swipe support */}
          <div
            className="relative h-[400px] w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
          {/* Scrollable dots container */}
          <div className="absolute bottom-4 left-0 right-0 overflow-x-auto scrollbar-hide">
            <div className="flex justify-center gap-2 mx-auto px-4" style={{ width: 'fit-content' }}>
              {mainImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 h-2 w-2 rounded-full ${
                    index === currentImageIndex ? "bg-whitetheme" : "bg-whitetheme/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="btn-special w-[20em]"
            onClick={() => setShowReservationProcess(true)}
          >
            Book
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="mb-12 ">
          <div className="flex justify-between lt-sm:flex-col lt-sm:items-center lt-sm:gap-5 items-start mb-4">
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
            </div>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex justify-between items-center text-sm bg-softgreentheme dark:bg-bgdarktheme p-3 rounded transition-colors"
                >
                    <div className="flex flex-col">
                      <span className="dark:text-textdarktheme text-greentheme font-bold">{offer.title}</span>
                      <span className="text-sm dark:text-textdarktheme/70 text-subblack">{offer.description}</span>
                      <span className="text-xs dark:text-textdarktheme/50 text-subblack/70">Code: {offer.code}</span>
                    </div>
                  <button
                    className="btn-special animate-none"
                    onClick={() => {
                      setShowReservationProcess(true)
                      setBookingData((prev) => ({
                        reserveDate: prev?.reserveDate || "",
                        time: prev?.time || "",
                        guests: prev?.guests || 0,
                        offer: offer,
                      }))
                    }}
                  >
                    Select Offer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blacktheme dark:text-textdarktheme transition-colors">Our menu</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-softgreentheme dark:bg-greentheme/20 text-greentheme dark:text-white px-2 py-1 rounded transition-colors">
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
                  src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/03/Simple-Location-Picker.png?fit=561%2C421&ssl=1"
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
                    className="text-greentheme dark:text-white hover:underline block"
                  >
                    www.5-fishermen.com
                  </a>
                  <a href="mailto:contact@5-fishermen.com" className="dark:text-white text-greentheme hover:underline block">
                    contact@5-fishermen.com
                  </a>
                  <a href="tel:+212547547678" className="text-greentheme dark:text-white hover:underline block">
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
                    <span className={`${day.day === "Sunday" ? "font-medium" : ""} dark:text-textdarktheme transition-colors`}>
                      {day.day}
                    </span>
                    <span className={`${day.day === "Sunday" ? "text-redtheme" : "dark:text-textdarktheme/70"} transition-colors`}>
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
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center text-center flex-col transition-colors">
              <Home className="h-6 w-6 text-greentheme mb-2" />
              <span className="text-sm font-medium dark:text-textdarktheme transition-colors">Home Delivery</span>
            </div>
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center text-center flex-col  transition-colors">
              <Wifi className="h-6 w-6 text-greentheme mb-2" />
              <span className="text-sm font-medium dark:text-textdarktheme transition-colors">High Wi-Fi Quality</span>
            </div>
            <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 flex items-center justify-center text-center flex-col transition-colors">
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
                  onClick={() => {
                    setSelectedPhoto(photo)
                    setShowPhotoPopup(true)
                  }}
                />
                {(userPhotos.length >8 && index === userPhotos.length - 1) && (
                  <div className="absolute inset-0 bg-blacktheme/60 flex items-center justify-center">
                    <span className="text-whitetheme font-bold">
                      +{userPhotos.length - 4} more {userPhotos.length-4 === 1 ?'photo':'photos'}
                    </span>
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

          <button className="btn-primary " onClick={() => setShowWriteReview(true)}>
            Submit a Review
          </button>
          {/* <div className="bg-whitetheme dark:bg-darkthemeitems shadow-sm rounded-lg p-4 transition-colors">
            <h3 className="font-medium mb-3 dark:text-textdarktheme transition-colors">Write your review</h3>
          </div> */}
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
