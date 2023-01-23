import React, { useEffect, useState } from "react";
import { auth } from "../config";
import Logo from "../Assets/phoenixplain.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import pdf from './rulebook.pdf';

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUser, setUser] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    const number = localStorage.getItem("uid");
    if (number) {
      setUser(true);
    } else setUser(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem("uid");
    auth
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <Navbar style={{position:"fixed", width:"100vw", zIndex:"100", backgroundColor:"rgba(190,60,55,0.4)", backdropFilter:"blur(10px)"}} full light>
        <NavbarBrand href="/"><img src={Logo} style={{objectFit:"cover", height:"6rem"}}/></NavbarBrand>
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
              <NavLink href="/gallery">Gallery</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/gallery">Gallery</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/gallery">Gallery</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="https://forms.gle/Ka3AvHUHRTiRBpYc8">Player Details</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href={pdf}>Rulebook 2023</NavLink>
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
      <Navbar
        style={{
          position: "fixed",
          width: "100vw",
          zIndex: "100",
          backgroundColor: "rgba(190,60,55,0.4)",
          backdropFilter: "blur(10px)",
        }}
        full
        light
      >
        <NavbarBrand href="/">
          <a href="/">
            <img
              alt="arena"
              src={Logo}
              style={{ objectFit: "cover", height: "6vh" }}
            />
          </a>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="nav-bar-button">
          <span
            style={{ filter: "invert(100%)" }}
            class="navbar-toggler-icon"
          ></span>
          {/* { isUser||isOpen ? null: <div style={{position:"absolute", padding:"0.5rem", top:"3rem",transform:"translate(-80%, 100%)", height:"max-content", width:"max-content", backgroundColor:"yellow", borderRadius:"0.5rem"}}>REGISTER HERE</div>} */}
        </NavbarToggler>
        {isUser ? (
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/gallery">Gallery</NavLink>
              </NavItem>
            </Nav>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink onClick={signOut} href="/login">
                  Sign Out
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        ) : (
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/gallery">Gallery</NavLink>
              </NavItem>
            </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="https://forms.gle/Ka3AvHUHRTiRBpYc8">Player Details</NavLink>
            </NavItem>
          </Nav>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href={pdf}>Rulebook 2023</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
        )}
      </Navbar>
    </div>
  );
};

export default Toolbar;
