import React from "react";
import Card from "react-bootstrap/Card";

function PassengerCardComponent({ passenger }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>{passenger.name}</Card.Title>
        <Card.Text>
          <strong>Passenger ID:</strong> {passenger.passenger_id}<br />
          <strong>Age:</strong> {passenger.age}<br />
          <strong>Gender:</strong> {passenger.gender}<br />
          <strong>Passport Number:</strong> {passenger.passport_number}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PassengerCardComponent;
