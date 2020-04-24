import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../navbar/styles.css'
import { Navbar, Nav, Badge } from 'react-bootstrap';
import GET from '../lib/get';

const MyNavbar = (props) => {
    const [auth, setAuth] = useState("")
    const [path, setPath] = useState("")
    const [username, setUsername] = useState("")

    const logoutHandler = () => {
        localStorage.removeItem('c2c-token')
        localStorage.removeItem("c2c-profile")
        setAuth(false)
        props.history.push("/")

    }

    const loginHandler = () => {
        props.history.push("/signin")
    }

    const signupHandler = () => {
        props.history.push("/signup")

    }

    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            const getData = async () => {
                let response = await GET("/api/auth/authenticated")
                if (response.data) {
                    if (response.data.status === "success") {
                        setAuth(true)
                        setUsername(response.data.data.firstName)
                    }
                }
                else {
                    setAuth(false)
                    localStorage.removeItem("c2c-token")
                    localStorage.removeItem("c2c-profile")
                }
            }
            getData()
        }
        else setAuth(false)

        if (props.location) {
            setPath(props.location.pathname)
        }
    }, [])

    return (
        <div>
            <Navbar className="bg-dark p-2" expand="lg">
                <Navbar.Brand className="text-uppercase text-light" style={{ padding: "10px" }} >C to C</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link id="home" >
                            <Link className="text-light text-uppercase App-link " to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link id="sellitems" >
                            <Link className="text-light text-uppercase App-link" to="/sellitems">Sell</Link>
                        </Nav.Link>

                        <Nav.Link id="buy" >
                            <Link className="text-light text-uppercase App-link" to='/buyitems'>Buy</Link>
                        </Nav.Link>
                        <Nav.Link id="contact" >
                            <Link className="text-light text-uppercase App-link" to='/contact'>Contact</Link>
                        </Nav.Link>
                    </Nav>

                    {auth ?

                        <Nav>
                            <Nav.Link><Link className="text-light text-uppercase" to="/account">Account</Link></Nav.Link>
                            <Nav.Link className="text-light justify-content-center ">Welcome! {username}</Nav.Link>
                            <Nav.Link className="btn fa fa-sign-out  text-light " onClick={logoutHandler}>Log out</Nav.Link>
                        </Nav>

                        :
                        <Nav className="justify-content-end">
                            {path === "/signin" ?
                                <Nav.Link className="btn fa fa-sign-out text-light " style={{ fontSize: "26px" }} onClick={signupHandler}></Nav.Link>
                                : <Nav.Link className="btn fa fa-sign-in text-light  " style={{ fontSize: "26px" }} onClick={loginHandler}></Nav.Link>
                            }
                        </Nav>
                    }

                    <Nav>
                        <Nav.Link>
                            <Badge className='text-danger'>
                                <span className= "badge badge-primary " style={{ verticalAlign: "super"}}>10</span>
                                <Link to="/">
                                    <svg className="bi bi-bell text-light" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z" />
                                        <path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clip-rule="evenodd" />
                                    </svg>
                                </Link>
                            </Badge>
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse></Navbar>
        </div>)
}
export default MyNavbar;