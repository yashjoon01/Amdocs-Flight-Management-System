import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddFlightModal({ show, handleClose, newFlight, handleNewFlightChange, handleNewFlightSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Flight</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFlightID">
            <Form.Label>Flight ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Flight ID"
              name="flight_id"
              value={newFlight.flight_id}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formAirline">
            <Form.Label>Airline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Airline"
              name="airline"
              value={newFlight.airline}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formSource">
            <Form.Label>Source</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Source"
              name="source"
              value={newFlight.source}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Destination"
              name="destination"
              value={newFlight.destination}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formDepartureTime">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="departure_time"
              value={newFlight.departure_time}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formArrivalTime">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="arrival_time"
              value={newFlight.arrival_time}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
          <Form.Group controlId="formSeats">
            <Form.Label>Seats</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of seats"
              name="seats"
              value={newFlight.seats}
              onChange={handleNewFlightChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleNewFlightSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddFlightModal;
