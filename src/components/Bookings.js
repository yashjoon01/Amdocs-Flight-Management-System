import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/header";
import BookingCardComponent from "../components/BookingCardComponent";
import BookingNavbar from "../components/BookingNavbar";
import ValidationModal from "../modals/ValidationModal";
import "../styles/bookings.css";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((response) => response.json())
      .then((data) => {
        const validBookings = data.filter((booking) => booking.id);
        setBookings(validBookings);
        setFilteredBookings(validBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) =>
          booking.booking_id.toLowerCase().includes(normalizedSearchTerm) ||
          booking.flight_id.toLowerCase().includes(normalizedSearchTerm) ||
          booking.passenger_id.toLowerCase().includes(normalizedSearchTerm) ||
          booking.status.toLowerCase().includes(normalizedSearchTerm) 
      );

      setFilteredBookings(filtered);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <BookingNavbar
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
      />
      <div className="main">
        {filteredBookings.map((booking) => (
          <BookingCardComponent key={booking.id} booking={booking} />
        ))}
      </div>

      <ValidationModal show={showValidationModal} handleClose={() => setShowValidationModal(false)} />
    </div>
  );
}

export default Bookings;
