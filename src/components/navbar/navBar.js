import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import '../navbar/NavStyle.css'

import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = (props) => {
    const [auth, setAuth] = useState(true)
    const [username, setusername] = useState("")

    return (
        <div >
            <Router>
                <Navbar className="bg-dark p-2 fixed-top" expand="lg">
                    <Navbar.Brand className="text-uppercase text-light" href="#home" style={{ padding: "10px" }} >C to C</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to='/'>
                                <Nav.Link id="home" className="text-light text-uppercase" href="#home">Home</Nav.Link>
                            </Link>
                            <Link to='/sell'>
                                <Nav.Link id="sell" className="text-light text-uppercase" href="#sell">Sell</Nav.Link>
                            </Link>
                            <Link to='/buy'>
                                <Nav.Link id="buy" className="text-light text-uppercase" href="#buy">Buy</Nav.Link>
                            </Link>
                            <Link to='/contact'>
                                <Nav.Link id="contact" className="text-light text-uppercase" href="#contact">Contact</Nav.Link>
                            </Link>
                            <Link to="/account">
                                {auth ?
                                    <Nav.Link id="account" className="text-light text-uppercase" href="#account">Account</Nav.Link>
                                    :
                                    null
                                }
                            </Link>

                        </Nav>
                        <Nav.Link className="text-light justify-content-center">
                            {auth ? username : null}
                        </Nav.Link>
                        <Nav className="float-right">
                            <Link to="/signin">
                                <Nav.Link href="#signin" className=" btn btn-danger text-light">
                                    {auth ? "Logout" : "Signin"}
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Router>
        </div >
    );
}

export default MyNavbar;