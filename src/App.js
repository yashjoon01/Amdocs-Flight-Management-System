import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import HeaderComponent from "./components/header";
import AppNavbar from "./components/AppNavbar";
import "./styles/app.css";
import ValidationModal from "./modals/ValidationModal";
import AddFlightModal from "./modals/AddFlightModal";

function App() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flight_id: "",
    airline: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    seats: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then((response) => response.json())
      .then((data) => {
        const validFlights = data.filter((flight) => flight.id);
        setFlights(validFlights);
        setFilteredFlights(validFlights);
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleSearch = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (normalizedSearchTerm === "") {
      setFilteredFlights(flights);
    } else {
      const filteredFlights = flights.filter(
        (flight) =>
          flight.flight_id.toLowerCase().includes(normalizedSearchTerm) ||
          flight.airline.toLowerCase().includes(normalizedSearchTerm) ||
          flight.source.toLowerCase().includes(normalizedSearchTerm) ||
          flight.destination.toLowerCase().includes(normalizedSearchTerm) ||
          flight.departure_time.toLowerCase().includes(normalizedSearchTerm) ||
          flight.arrival_time.toLowerCase().includes(normalizedSearchTerm)
      );

      setFilteredFlights(filteredFlights);
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

  const handleAddFlight = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  const handleValidationModalClose = () => {
    setShowValidationModal(false);
  };

  const handleNewFlightChange = (event) => {
    const { name, value } = event.target;
    setNewFlight((prevFlight) => ({
      ...prevFlight,
      [name]: value,
    }));
  };

  const handleNewFlightSubmit = () => {
    const { flight_id, airline, source, destination, departure_time, arrival_time, seats } = newFlight;

    if (!flight_id || !airline || !source || !destination || !departure_time || !arrival_time || !seats) {
      setShowValidationModal(true);
      return;
    }

    fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newFlight,
        id: Math.random().toString(36).substring(7),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlights((prevFlights) => [...prevFlights, data]);
        setFilteredFlights((prevFlights) => [...prevFlights, data]);
        setShow(false);
        setNewFlight({
          flight_id: "",
          airline: "",
          source: "",
          destination: "",
          departure_time: "",
          arrival_time: "",
          seats: "",
        });
      })
      .catch((error) => console.error("Error adding flight:", error));
  };

  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <AppNavbar
        handleAddFlight={handleAddFlight}
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
      />
      <div className="main">
        {filteredFlights.map((flight) => (
          <CardComponent key={flight.id} flight={flight} />
        ))}
      </div>

      <AddFlightModal 
        show={show} 
        handleClose={handleModalClose} 
        newFlight={newFlight} 
        handleNewFlightChange={handleNewFlightChange} 
        handleNewFlightSubmit={handleNewFlightSubmit} 
      />

      <ValidationModal 
        show={showValidationModal} 
        handleClose={handleValidationModalClose} 
      />
    </div>
  );
}

export default App;
