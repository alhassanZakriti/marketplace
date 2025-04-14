"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import OurCalendar from "../Calendar/OurCalendar"

type SelectedData = {
  reserveDate: string
  time: string
  guests: number
  offer?: string | null
}

type ReservationProcessProps = {
  onClick: () => void
  getDateTime: (data: SelectedData) => void
  maxGuests?: number
  minGuests?: number
}

// Sample offers data
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

const ReservationProcess: React.FC<ReservationProcessProps> = (props) => {
  const [activeTab, setActiveTab] = useState<"date" | "time" | "guest" | "offers" | "confirm" | null>("date")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [selectedData, setSelectedData] = useState<SelectedData>({
    reserveDate: "",
    time: "",
    guests: 0,
    offer: null,
  })

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    const formattedDate = format(day, "yyyy-MM-dd")
    setSelectedData((prevData) => ({ ...prevData, reserveDate: formattedDate.toString() }))
    setActiveTab("time")
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
    setSelectedData((prevData) => ({ ...prevData, time }))
    setActiveTab("guest")
  }

  const handleGuestClick = (guest: number) => {
    setSelectedGuests(guest)
    setSelectedData((prevData) => ({ ...prevData, guests: guest }))
    setActiveTab("offers")
  }

  const handleOfferClick = (offerId: string) => {
    setSelectedOffer(offerId)
    setSelectedData((prevData) => ({ ...prevData, offer: offerId }))
  }

  const handleSkipOffers = () => {
    setSelectedOffer(null)
    setSelectedData((prevData) => ({ ...prevData, offer: null }))
    setActiveTab("confirm")
  }

  const handleContinueWithOffer = () => {
    setActiveTab("confirm")
  }

  const handleConfirmClick = () => {
    props.getDateTime(selectedData)
    props.onClick()
  }

  const isDarkMode = typeof localStorage !== "undefined" && localStorage.getItem("darkMode") === "true"

  return (
    <div className="">
      <div className="overlay z-[309] glassmorphism" onClick={props.onClick}></div>
      <div
        className={`popup z-[360] lt-sm:h-[70vh] sm:w-[30em] lt-sm:bottom-0 lt-sm:w-full rounded-[10px] ${
          isDarkMode ? "bg-bgdarktheme" : "bg-white"
        }`}
      >
        <div className="flex justify-center gap-3 mt-[1em] px-2">
          <span
            className={activeTab === "date" ? "activetabb" : "p-[10px]"}
            onClick={() => setActiveTab("date")}
            id="date"
          >
            Date
          </span>
          <span
            className={activeTab === "time" ? "activetabb" : "p-[10px]"}
            onClick={() => setActiveTab("time")}
            id="time"
          >
            Time
          </span>
          <span
            className={activeTab === "guest" ? "activetabb" : "p-[10px]"}
            onClick={() => setActiveTab("guest")}
            id="guest"
          >
            Guest
          </span>
          <span
            className={activeTab === "offers" ? "activetabb" : "p-[10px]"}
            onClick={() => setActiveTab("offers")}
            id="offers"
          >
            Offers
          </span>
        </div>

        {activeTab === "date" && (
          <div className="content">
            <div className="text-[20px] text-left mx-[30px] mt-[1em] mb-[.5em] font-bold">
              {selectedDate && format(selectedDate, "dd MMMM yyyy")}{" "}
              <span className="font-semibold">has been selected</span>
            </div>
            <OurCalendar forbidden={true} onClick={handleDateClick} />
          </div>
        )}

        {activeTab === "time" && (
          <div className="content">
            <div className="text-[20px] text-left mx-[30px] mt-[1em] mb-[.5em] font-bold">
              {selectedTime} <span className="font-semibold">has been selected</span>
            </div>
            <div className="flex flex-wrap h-[284px] overflow-y-auto justify-center gap-[10px] p-[20px] rounded-[3px]">
              {[...Array(48)].map((_, index) => {
                const hour = Math.floor(index / 2)
                const minute = index % 2 === 0 ? "00" : "30"
                const timeString = `${hour < 10 ? "0" + hour : hour}:${minute}`
                const now = new Date()
                const isToday = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")
                const isPastTime =
                  isToday &&
                  (hour < now.getHours() || (hour === now.getHours() && minute === "00" && now.getMinutes() >= 30))
                return (
                  <button
                    onClick={() => !isPastTime && handleTimeClick(timeString)}
                    className={`text-15 ${
                      isPastTime
                        ? "bg-softwhitetheme text-subblack cursor-not-allowed"
                        : "hover:bg-[#335a06] hover:text-white"
                    } font-bold h-[65px] w-[65px] flex items-center justify-center border-solid border-[1px] border-[#335A06] ${
                      isDarkMode ? "text-white" : " text-blacktheme"
                    } ${selectedTime === timeString ? "bg-black text-white" : ""}`}
                    key={index}
                    disabled={!!isPastTime}
                  >
                    {timeString}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === "guest" && (
          <div className="content">
            <div className="text-[20px] text-left mx-[30px] mt-[1em] mb-[.5em] font-bold">
              {selectedGuests ? (
                <>
                  {selectedGuests} <span className="font-semibold">guests have been selected</span>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-[10px] p-[20px] rounded-[3px]">
              {[...Array(props.maxGuests ? props.maxGuests : 15)].map((_, index) => (
                <button
                  className={`text-15 hover:bg-[#335a06] hover:text-white font-bold h-[65px] w-[65px] flex items-center justify-center border-solid border-[1px] border-[#335A06] ${
                    isDarkMode ? "text-white" : " text-blacktheme"
                  } ${selectedGuests === index + 1 ? "bg-black text-white" : ""}`}
                  key={index}
                  onClick={() => handleGuestClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              {!props.maxGuests && (
                <>
                  <div className="text-center w-full my-2"> Or Enter number of guests </div>
                </>
              )}
              {!props.maxGuests && (
                <div>
                  <div className="flex rounded-lg">
                    <input
                      type="number"
                      min={1}
                      name="note"
                      placeholder="Enter number of guests"
                      value={selectedGuests as number}
                      className="w-full p-3 border border-gray-300 dark:border-darkthemeitems rounded-s-lg bg-white dark:bg-darkthemeitems text-black dark:text-white"
                      onChange={(e) => setSelectedGuests(Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => handleGuestClick(Number(selectedGuests))}
                      className="btn-primary rounded-none rounded-e-lg"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div className="content">
            <div className="text-[20px] text-left mx-[30px] mt-[1em] mb-[.5em] font-bold">
              <span className="font-semibold">Select an offer (optional)</span>
            </div>
            <div className="h-[284px] overflow-y-auto px-[20px] py-[10px]">
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    onClick={() => handleOfferClick(offer.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOffer === offer.id
                        ? "border-greentheme bg-softgreentheme dark:bg-greentheme/20"
                        : "border-gray-200 dark:border-darkthemeitems hover:border-greentheme/50 dark:hover:border-greentheme/30"
                    } ${isDarkMode ? "bg-darkthemeitems" : "bg-white"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className={`font-bold ${
                            selectedOffer === offer.id ? "text-greentheme" : isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {offer.title}
                        </h3>
                        <p className={`text-sm mt-1 ${isDarkMode ? "text-textdarktheme/70" : "text-gray-600"}`}>
                          {offer.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex-shrink-0 ${
                          selectedOffer === offer.id
                            ? "border-greentheme bg-greentheme"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selectedOffer === offer.id && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-xs mt-2 font-medium ${
                        selectedOffer === offer.id ? "text-greentheme" : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      Code: {offer.code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3 p-4">
              <button
                onClick={handleSkipOffers}
                className={`px-6 py-2 rounded-lg border ${
                  isDarkMode
                    ? "border-textdarktheme/20 text-textdarktheme hover:bg-darkthemeitems"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Skip
              </button>
              <button onClick={handleContinueWithOffer} className="btn-primary" disabled={!selectedOffer}>
                Continue
              </button>
            </div>
          </div>
        )}

        {activeTab === "confirm" && (
          <div className="content">
            <div className="text-[20px] text-left mx-[30px] mt-[1em] mb-[.5em] font-bold">
              <span className="font-[500] mr-2">Your reservation is set for</span>{" "}
              {selectedDate && format(selectedDate, "dd MMMM yyyy")} <span className="font-semibold mx-2">at</span>
              {selectedTime} <span className="font-semibold mx-2">for</span>
              {selectedGuests} <span className="font-semibold">guests</span>
            </div>

            {selectedOffer && (
              <div
                className={`mx-[30px] mt-3 p-3 rounded-lg ${isDarkMode ? "bg-darkthemeitems" : "bg-softgreentheme/20"}`}
              >
                <div className="font-medium text-greentheme">Selected Offer:</div>
                <div className={isDarkMode ? "text-white" : "text-gray-800"}>
                  {offers.find((o) => o.id === selectedOffer)?.title}
                </div>
                <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  Code: {offers.find((o) => o.id === selectedOffer)?.code}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-[10px] p-[20px] rounded-[3px]">
              <button onClick={handleConfirmClick} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReservationProcess
