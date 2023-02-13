import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import NavLink from 'components/navlink';
import styles from './global-navbar.module.css'

function GlobalNavbar() {
    return <Navbar variant="dark" className={styles.navbar}>
      <Container>
        <Navbar.Brand>Fuel App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <NavLink href="/">Home</NavLink>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <div className={styles.loginbox}>
              {/* TODO: Change this to a sign out button when logged in */}
              <NavLink href="/login">Log In</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>;
}

export default GlobalNavbar;