import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import "../styles/CardComponent.css";

const CardComponent = ({ flight }) => {
  const [showModal, setShowModal] = useState(false);

  const currentDate = new Date();
  const departureDate = new Date(flight.departure_time);

  let buttonText = "Book flight";
  let buttonClass = "";
  let navLinkTo = `/bookflight`;

  let onClickHandler = () => {
    if (flight.seats === 0 || departureDate < currentDate) {
      setShowModal(true);
    }
  };

  if (flight.seats === 0) {
    buttonText = "Booked";
    buttonClass = "btn btn-danger";
  } else if (departureDate < currentDate) {
    buttonText = "Departed";
    buttonClass = "btn btn-warning";
  }

  const handleClose = () => setShowModal(false);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{flight.airline}</h3>
        <ul className="list-group list-group-flush mukta-regular">
          <li className="list-group-item">Flight ID: {flight.flight_id}<br /></li>
          <li className="list-group-item">Source: {flight.source}<br /></li>
          <li className="list-group-item">Destination: {flight.destination}<br /></li>
          <li className="list-group-item">Departure: {departureDate.toLocaleString()}<br /></li>
          <li className="list-group-item">Arrival: {new Date(flight.arrival_time).toLocaleString()}</li>
          <li className="list-group-item">Seats: {flight.seats}</li>
          <li className="list-group-item" style={{paddingTop:"15px", paddingBottom:"15px"}}>
            {flight.seats > 0 && departureDate >= currentDate ? (
              <NavLink to={navLinkTo} className="button-54" >{buttonText}</NavLink>
            ) : (
              <button type="button" className={buttonClass} onClick={onClickHandler}>{buttonText}</button>
            )}
          </li>
        </ul>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{backgroundColor :"#a9a9a9"}}>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor :"#a9a9a9"}}>Better luck next time &#128511;</Modal.Body>
        <Modal.Footer style={{backgroundColor :"#a9a9a9"}}>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor :"#212529"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardComponent;
