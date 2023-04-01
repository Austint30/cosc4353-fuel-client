import React, {useContext, useState, useEffect} from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import NavLink from 'components/navlink';
import styles from './global-navbar.module.css'
import { useLocation } from 'react-router-dom';
import { ProfileContext, UserContext } from '../../context';

function GlobalNavbar() {
    const { pathname } = useLocation();
    const { profile, setProfile } = useContext(ProfileContext);
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState();
    // useEffect(() => {setEmail(profile?.email)}, [profile]); 
    useEffect(() => {
      console.log('inside useEfect', profile)
      if (profile?.user) setEmail(profile.user)
    }, [profile])
    console.log("logging profile: ", profile)
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    console.log("logging user: ", user)
    console.log("logging email: ", email)
    return <Navbar variant="dark" className={styles.navbar}>
      <Container>
        <Navbar.Brand>Fuel App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={pathname}
          className="w-100">
            <NavLink href="/">Home</NavLink>
            {/* <Nav.Link href="#link">Link</Nav.Link>
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
            </NavDropdown> */}
            <div className={styles.loginbox}>
              {/* TODO: Change this to a sign out button when logged in */}
              {!email && <NavLink href="/login">Login</NavLink>}
              {!!email && <div className="nav-link" style = { { cursor: "pointer" } }  onClick = {() => {
                setUser()
                localStorage.removeItem("user")
                window.location = "/home"
              }
                }> Logout</div>}
              {!email && <NavLink href="/signup">Sign Up</NavLink>}
              <NavLink href="/form">Fuel Form</NavLink> 
              <NavLink href="/history">Fuel History</NavLink>
              <NavLink href="/pricing_module">Pricing</NavLink>
              
              {
                profile && profile.auth && (
                  <><NavLink href="/profile">Profile</NavLink></> 
                )
              }

            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>;
}

export default GlobalNavbar;