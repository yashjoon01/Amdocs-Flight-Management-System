import React from "react";
import { Container, Navbar, Nav, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../styles/bookings.css"

const BookingNavbar = ({
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
            <NavLink to="/bookflight" className="nav-link">
            <button class="button-54">Book a Flight</button>
            </NavLink>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search Bookings"
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

export default BookingNavbar;
