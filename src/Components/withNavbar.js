import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "../index.css";

function Withnav(WrappedComponent) {
  const profileIcon = (<i className="fas fa-user-circle"></i>);
  return () => {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Courses</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">

                <Nav.Link as={Link} to="/languagedetails/HTML">HTML</Nav.Link>
                <Nav.Link as={Link} to="/languagedetails/CSS">CSS</Nav.Link>
                <Nav.Link as={Link} to="/languagedetails/JavaScript">JavaScript</Nav.Link>
                <Nav.Link as={Link} to="/languagedetails/Bootstrap">Bootstrap</Nav.Link>
                <Nav.Link as={Link} to="/languagedetails/React">React</Nav.Link>

              </Nav>
              <Nav>
                <NavDropdown title={profileIcon} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">{localStorage.getItem("user")}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/forgotpassword">Change Password</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login" onClick={() => localStorage.clear()}><i className="fa fa-sign-out fa-fw"></i> Sign out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <WrappedComponent />
      </div>
    );
  };
}

export default Withnav;

