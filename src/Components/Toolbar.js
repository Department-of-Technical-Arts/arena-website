import React, { useEffect, useState } from 'react';
import { auth } from "../config"
import Logo from '../Assets/phoenixplain.png'
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

  const toggle = () => setIsOpen(!isOpen);
  useEffect (() => {
    const number = localStorage.getItem("uid")
    if (number) {
      setUser(true)
    }
    else 
      setUser (false)
  }, [])

  const signOut = () => {
    localStorage.removeItem("uid")
    auth.signOut().then(() => {
      window.location.reload()
    }).catch(err => console.log(err.message))
  }
  return (
    <div>
      <Navbar style={{position:"fixed", width:"100vw", zIndex:"100", backgroundColor:"rgba(190,60,55,0.4)", backdropFilter:"blur(10px)"}} full light>
        <NavbarBrand href="/"><img src={Logo} style={{objectFit:"cover", height:"6vh"}}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        {isUser ?
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