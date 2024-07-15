import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DeleteSuccessModal from "../modals/DeleteSuccessModal";
import "../styles/BookingCardComponent.css";

function BookingCardComponent({ booking }) {
  const { booking_id, flight_id, passenger_id, booking_date, status, id } = booking;
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCancelBooking = () => {
    fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDeleteSuccess(true);
          setShowModal(true);
        } else {
          setDeleteError(true);
          console.error("Failed to cancel booking:", response.statusText);
        }
      })
      .catch((error) => {
        setDeleteError(true);
        console.error("Error canceling booking:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <Card className="booking-card">
      <Card.Body>
        <Card.Title>
          <div className="card-title-content">
            <span>Booking ID: {booking_id}</span>
            <button
              className="cancel-button"
              onClick={handleCancelBooking}
            >
              &#10060;
            </button>
          </div>
        </Card.Title>
        <Card.Text>
          <strong>Flight ID:</strong> {flight_id}
          <br />
          <strong>Passenger ID:</strong> {passenger_id}
          <br />
          <strong>Booking Date:</strong>{" "}
          {new Date(booking_date).toLocaleString()}
          <br />
          <strong>Status:</strong> {status}
        </Card.Text>
        <DeleteSuccessModal show={deleteSuccess && showModal} handleClose={handleCloseModal} />
        {deleteError && (
          <p className="text-danger">Failed to cancel booking. Please try again.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default BookingCardComponent;
