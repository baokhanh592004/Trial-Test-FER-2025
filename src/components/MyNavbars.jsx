import React from 'react'
import { Container, NavDropdown, Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

export default function MyNavbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">SE181542</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="nav-link"> Home </Link>
          <Link to="/SE181542/AllCards" className="nav-link"> All Cards </Link>
          <Link to="/SE181542/UnavailableCards" className="nav-link"> UnAvailable Cards </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
