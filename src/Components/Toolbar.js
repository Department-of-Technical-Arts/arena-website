import React, { useEffect, useState } from 'react';
import { auth, firestore } from "../config"
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
  const [isUser, setUser] = useState(false);
  const [isEditTeam, setEditTeam] = useState (false)

  const toggle = () => setIsOpen(!isOpen);
  useEffect (() => {
    const number = localStorage.getItem("uid")
    if (number) {
      setUser(true)
    }
    else 
      setUser (false)
    if (isUser) {
    firestore.collection("registration").doc(number).get().then(document => {
      setEditTeam(document.exists)
    }).catch(err => console.log(err.message))
    }
  }, [])

  const signOut = () => {
    localStorage.removeItem("uid")
    auth.signOut().then(() => {
      window.location.reload()
    }).catch(err => console.log(err.message))
  }
  return (
    <div>
      <Navbar color='light' full light>
        <NavbarBrand href="/">ARENA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        {isUser ?
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
          {isEditTeam && 
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/edit-team">Edit Team</NavLink>
            </NavItem>
          </Nav>}
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/profile">My Profile</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink onClick={signOut} href="/login">Sign Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse> : 
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login / Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>}
      </Navbar>
    </div>
  );
}

export default Toolbar;