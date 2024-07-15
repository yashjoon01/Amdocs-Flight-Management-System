import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const SuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#a9a9a9" }}>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#a9a9a9" }}>Your flight has been booked. &#9989;</Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#a9a9a9" }}>
        <Button variant="primary" as={NavLink} to="/bookings" onClick={handleClose}>
          Go to Bookings
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
