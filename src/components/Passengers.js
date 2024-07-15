import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/header";
import PassengerCardComponent from "../components/PassengerCardComponent";
import PassengerNavbar from "../components/PassengerNavbar";
import AddPassengerModal from "../modals/AddPassengerModal";
import ValidationModal from "../modals/ValidationModal";
import "../styles/passengers.css";

function Passengers() {
  const [passengers, setPassengers] = useState([]);
  const [filteredPassengers, setFilteredPassengers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [newPassenger, setNewPassenger] = useState({
    passenger_id: "",
    name: "",
    age: "",
    gender: "",
    passport_number: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/passengers")
      .then((response) => response.json())
      .then((data) => {
        const validPassengers = data.filter((passenger) => passenger.id);
        setPassengers(validPassengers);
        setFilteredPassengers(validPassengers);
      })
      .catch((error) => console.error("Error fetching passengers:", error));
  }, []);

  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm === "") {
      setFilteredPassengers(passengers);
    } else {
      const filtered = passengers.filter(
        (passenger) =>
          passenger.passenger_id.toLowerCase().includes(normalizedSearchTerm) ||
          passenger.name.toLowerCase().includes(normalizedSearchTerm)
      );

      setFilteredPassengers(filtered);
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

  const handleAddPassenger = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  const handleValidationModalClose = () => {
    setShowValidationModal(false);
  };

  const handleNewPassengerChange = (event) => {
    const { name, value } = event.target;
    setNewPassenger((prevPassenger) => ({
      ...prevPassenger,
      [name]: value,
    }));
  };

  const handleNewPassengerSubmit = () => {
    const { passenger_id, name, age, gender, passport_number } = newPassenger;

    if (!passenger_id || !name || !age || !gender || !passport_number) {
      setShowValidationModal(true);
      return;
    }

    fetch("http://localhost:3000/passengers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newPassenger,
        id: Math.random().toString(36).substring(7),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPassengers((prevPassengers) => [...prevPassengers, data]);
        setFilteredPassengers((prevPassengers) => [...prevPassengers, data]);
        setShow(false);
        setNewPassenger({
          passenger_id: "",
          name: "",
          age: "",
          gender: "",
          passport_number: "",
        });
      })
      .catch((error) => console.error("Error adding passenger:", error));
  };

  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <PassengerNavbar
        handleAddPassenger={handleAddPassenger}
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
      />
      <div className="main">
        {filteredPassengers.map((passenger) => (
          <PassengerCardComponent key={passenger.id} passenger={passenger} />
        ))}
      </div>

      <AddPassengerModal
        show={show}
        handleClose={handleModalClose}
        newPassenger={newPassenger}
        handleNewPassengerChange={handleNewPassengerChange}
        handleNewPassengerSubmit={handleNewPassengerSubmit}
      />

      <ValidationModal show={showValidationModal} handleClose={handleValidationModalClose} />
    </div>
  );
}

export default Passengers;
