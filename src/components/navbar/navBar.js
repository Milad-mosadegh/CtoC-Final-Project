import React from 'react';
import './style.css'

import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
        <div>
            <Navbar className="bg-dark fixed-top" expand="lg">
                <Navbar.Brand href="#home" >C to C</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="text-light" href="#home">Home</Nav.Link>
                        <Nav.Link className="text-light" href="#link">Sell</Nav.Link>
                        <Nav.Link className="text-light" href="#link">Buy</Nav.Link>
                        <Nav.Link className="text-light" href="#link">Account</Nav.Link>
                        <Nav.Link className="text-light" href="#link">Contact</Nav.Link>
                    </Nav>
                    <Nav className="float-right">
                        <Nav.Link href="#signin" className=" btn btn primary text-light">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MyNavbar;