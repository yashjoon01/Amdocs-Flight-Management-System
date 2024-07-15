import React from "react";
import { Modal, Button } from "react-bootstrap";

const ValidationModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} style={{ width: "450px", marginLeft: "535px", marginTop: "200px" }}>
      <Modal.Header closeButton style={{ backgroundColor: "#a9a9a9" }}>
        <Modal.Title>Validation Error</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#a9a9a9" }}>
        Please fill in all the fields &#129398;
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#a9a9a9" }}>
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#212529" }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ValidationModal;
