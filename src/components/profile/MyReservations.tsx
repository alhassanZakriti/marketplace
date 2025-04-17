import type React from "react"

// Update the sample reservation data to be restaurant-focused
const reservations = [
  {
    id: 1,
    restaurant: "La Bella Italia",
    date: "2023-06-15",
    time: "19:30",
    people: 2,
    status: "Confirmed",
    specialRequest: "Window table if possible",
  },
  {
    id: 2,
    restaurant: "Sakura Sushi",
    date: "2023-07-10",
    time: "20:00",
    people: 4,
    status: "Pending",
    specialRequest: "Birthday celebration",
  },
  {
    id: 3,
    restaurant: "Le Petit Bistro",
    date: "2023-08-05",
    time: "12:30",
    people: 2,
    status: "fulfilled",
    specialRequest: "",
  },
]

export const MyReservations: React.FC = () => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-softgreentheme text-greentheme dark:bg-greentheme dark:text-whitetheme"
      case "pending":
        return "bg-softbluetheme text-bluetheme dark:bg-bluetheme dark:text-whitetheme"
      case "fulfilled":
        return "bg-softpurpletheme text-purpletheme dark:bg-purpletheme dark:text-whitetheme"
      case "cancelled":
        return "bg-softredtheme text-redtheme dark:bg-redtheme dark:text-whitetheme"
      default:
        return "bg-softgreytheme text-greytheme dark:bg-greytheme dark:text-whitetheme"
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-blacktheme dark:text-textdarktheme">My Reservations</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-softgreytheme dark:divide-darkthemeitems">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">
                Restaurant
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">People</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">
                Special Request
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-greytheme dark:text-textdarktheme">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-softgreytheme dark:divide-darkthemeitems">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-4 py-4 text-sm text-blacktheme dark:text-textdarktheme">{reservation.restaurant}</td>
                <td className="px-4 py-4 text-sm text-blacktheme dark:text-textdarktheme">
                  {formatDate(reservation.date)}
                </td>
                <td className="px-4 py-4 text-sm text-blacktheme dark:text-textdarktheme">{reservation.time}</td>
                <td className="px-4 py-4 text-sm text-blacktheme dark:text-textdarktheme">{reservation.people}</td>
                <td className="px-4 py-4 text-sm text-blacktheme dark:text-textdarktheme">
                  {reservation.specialRequest || "-"}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <button className="text-greentheme hover:text-opacity-80 dark:text-whitetheme dark:hover:text-opacity-80 mr-3">
                    View
                  </button>
                  {reservation.status.toLowerCase() !== "fulfilled" &&
                    reservation.status.toLowerCase() !== "cancelled" && (
                      <button className="text-redtheme hover:text-opacity-80">Cancel</button>
                    )}
                  {reservation.status.toLowerCase() === "fulfilled" && (
                    <button className="text-purpletheme hover:text-opacity-80">Review</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
