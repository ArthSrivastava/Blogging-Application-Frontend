import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { React, useEffect, useState } from "react";
import {
  doLogout,
  getCurrentUserData,
  isLoggedIn,
} from "../services/auth/auth_service";

export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(getCurrentUserData());
    setLoggedIn(isLoggedIn());
  }, [loggedIn]);

  const logout = () => {
    doLogout(() => {
      navigate("/");
      setLoggedIn(isLoggedIn());
    });
  };
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="my-nav">
      <Navbar dark expand="md" fixed="" className="px-3">
        <NavbarBrand tag={ReactLink} to="/home">
          MyBlogger
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/contact">
                Contact
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {!loggedIn ? (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile-info">
                    Profile-Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout} style={{cursor: "pointer"}}>Logout</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
