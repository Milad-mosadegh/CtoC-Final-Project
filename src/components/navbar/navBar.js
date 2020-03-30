import React from 'react';


import '../navbar/NavStyle.css'

import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
        <div >
            <Navbar className="bg-dark p-4 fixed-top" expand="lg">
                <Navbar.Brand className="text-uppercase milad" href="#home" >C to C</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link id="home" className="text-light text-uppercase" href="#home">Home</Nav.Link>
                        <Nav.Link id="cell" className="text-light text-uppercase" href="#cell">Sell</Nav.Link>
                        <Nav.Link id="buy" className="text-light text-uppercase" href="#buy">Buy</Nav.Link>
                        <Nav.Link id="account" className="text-light text-uppercase" href="#account">Account</Nav.Link>
                        <Nav.Link id="contact" className="text-light text-uppercase" href="#contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="float-right">
                        <Nav.Link href="#signin" className=" btn btn primary text-light text-uppercase">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MyNavbar;