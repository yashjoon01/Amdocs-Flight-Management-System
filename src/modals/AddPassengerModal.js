import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddPassengerModal = ({
  show,
  handleClose,
  newPassenger,
  handleNewPassengerChange,
  handleNewPassengerSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Passenger</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPassengerID">
            <Form.Label>Passenger ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Passenger ID"
              name="passenger_id"
              value={newPassenger.passenger_id}
              onChange={handleNewPassengerChange}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={newPassenger.name}
              onChange={handleNewPassengerChange}
            />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              name="age"
              value={newPassenger.age}
              onChange={handleNewPassengerChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Gender"
              name="gender"
              value={newPassenger.gender}
              onChange={handleNewPassengerChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassportNumber">
            <Form.Label>Passport Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Passport Number"
              name="passport_number"
              value={newPassenger.passport_number}
              onChange={handleNewPassengerChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleNewPassengerSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPassengerModal;
