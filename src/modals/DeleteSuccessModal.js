import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DeleteSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centred>
      <Modal.Header closeButton style={{ backgroundColor: "#a9a9a9" }}>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#a9a9a9" }}>Booking canceled successfully! &#9989;</Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#a9a9a9" }}>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSuccessModal;
