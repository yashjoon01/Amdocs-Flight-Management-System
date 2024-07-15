import React, { useEffect, useState } from "react";
import HeaderComponent from "./header.js";
import SuccessModal from "../modals/SuccessModal";
import ValidationModal from "../modals/ValidationModal";
import "../styles/BookFlight.css";

function BookFlight() {
  const [flights, setFlights] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedPassenger, setSelectedPassenger] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingDate] = useState(new Date().toISOString());
  const [status] = useState("waiting");
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchFlights();
    fetchPassengers();
  }, []);

  const fetchFlights = () => {
    fetch("http://localhost:3000/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  };

  const fetchPassengers = () => {
    fetch("http://localhost:3000/passengers")
      .then((response) => response.json())
      .then((data) => setPassengers(data));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!bookingId || !selectedFlight || !selectedPassenger) {
      setShowValidationModal(true);
      return;
    }

    const selectedFlightData = flights.find(
      (flight) => flight.flight_id === selectedFlight
    );

    if (!selectedFlightData) {
      console.error("Selected flight not found.");
      return;
    }

    const newBooking = {
      booking_id: bookingId,
      flight_id: selectedFlight,
      passenger_id: selectedPassenger,
      booking_date: bookingDate,
      status: status,
    };

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Booking successful:", data);

        const updatedSeats = selectedFlightData.seats - 1;

        fetch(`http://localhost:3000/flights/${selectedFlightData.id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...selectedFlightData, seats: updatedSeats }),
        })
          .then((response) => response.json())
          .then((updatedFlight) => {
            console.log("Flight seats updated:", updatedFlight);

            const updatedFlights = flights.map((flight) =>
              flight.id === updatedFlight.id ? updatedFlight : flight
            );
            setFlights(updatedFlights);

            setShowSuccessModal(true);

            setBookingId("");
            setSelectedFlight("");
            setSelectedPassenger("");
          })
          .catch((error) => {
            console.error("Error updating flight seats:", error);
          });
      })
      .catch((error) => {
        console.error("Error booking flight:", error);
      });
  };

  const handleCloseValidationModal = () => {
    setShowValidationModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div>
      <HeaderComponent />

      <div className="bookflight-container">
        <button className="button-99">Book a Flight</button>

        <form className="bookflight-inputs" onSubmit={handleBooking}>
          <label className="bookflight-label">Booking ID</label>
          <input
            className="bookflight-input"
            type="text"
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
          />

          <label className="bookflight-label">Flight</label>
          <select
            className="bookflight-input-1"
            value={selectedFlight}
            onChange={(e) => setSelectedFlight(e.target.value)}
          >
            <option value="">Select Flight</option>
            {flights
              .filter(
                (flight) =>
                  flight.seats > 0 &&
                  new Date(flight.departure_time) > new Date()
              )
              .map((flight) => (
                <option key={flight.id} value={flight.flight_id}>
                  {flight.flight_id} - {flight.airline} - {flight.source} to{" "}
                  {flight.destination} ({flight.seats} seats available)
                </option>
              ))}
          </select>

          <label className="bookflight-label">Passenger</label>
          <select
            className="bookflight-input-1"
            value={selectedPassenger}
            onChange={(e) => setSelectedPassenger(e.target.value)}
          >
            <option value="">Select Passenger</option>
            {passengers.map((passenger) => (
              <option key={passenger.id} value={passenger.passenger_id}>
                {passenger.passenger_id} - {passenger.name}
              </option>
            ))}
          </select>

          <label className="bookflight-label">Booking Date</label>
          <input
            className="bookflight-input"
            type="text"
            value={bookingDate}
            readOnly
          />

          <label className="bookflight-label">Status</label>
          <input className="bookflight-input" type="text" value={status} readOnly />

          <button className="button-50" type="submit">
            Book Flight
          </button>
        </form>
      </div>

      <ValidationModal
        show={showValidationModal}
        handleClose={handleCloseValidationModal}
      />

      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
      />
    </div>
  );
}

export default BookFlight;
