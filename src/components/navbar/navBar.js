import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = (props) => {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#home" className="display-2">C to C</Navbar.Brand>
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
                        <Nav.Link href="#signin" className="btn btn-primary">Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MyNavbar;