import React from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";

const PassengerNavbar = ({
  handleAddPassenger,
  searchTerm,
  handleInputChange,
  handleKeyDown,
  handleSearch,
}) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <button className="button-24" onClick={handleAddPassenger}>
              Add Passenger
            </button>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search Passengers"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button className="button-33" type="button" onClick={handleSearch}>
              Search
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PassengerNavbar;
