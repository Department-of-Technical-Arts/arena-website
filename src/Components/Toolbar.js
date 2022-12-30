
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' full light>
        <NavbarBrand href="/">ARENA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/edit-team">Edit Team</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/profile">My Profile</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/">Sign Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Toolbar;