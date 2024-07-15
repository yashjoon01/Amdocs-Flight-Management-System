import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "../styles/header.css";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/home">Airlines</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/passengers" className={({ isActive }) => isActive ? "active" : ""}>Passengers</Nav.Link>
            <Nav.Link as={NavLink} to="/bookings" className={({ isActive }) => isActive ? "active" : ""}>Bookings</Nav.Link>
            <Nav.Link as={NavLink} to="/bookflight" className={({ isActive }) => isActive ? "active" : ""}>Book-a-flight</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <span className="mainHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Airlines 🚀</span>
      <div className="custom-hr"></div>
    </>
  );
}

export default ColorSchemesExample;
