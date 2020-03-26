import React from 'react';
import '../navbar/NavStyle.css'

import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
        <div>
            <Navbar className="bg-dark p-4 fixed-top" expand="lg">
                <Navbar.Brand className="text-uppercase milad" href="#home" >C to C</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="text-light text-uppercase" href="#home">Home</Nav.Link>
                        <Nav.Link className="text-light text-uppercase" href="#link">Sell</Nav.Link>
                        <Nav.Link className="text-light text-uppercase" href="#link">Buy</Nav.Link>
                        <Nav.Link className="text-light text-uppercase" href="#link">Account</Nav.Link>
                        <Nav.Link className="text-light text-uppercase" href="#link">Contact</Nav.Link>
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