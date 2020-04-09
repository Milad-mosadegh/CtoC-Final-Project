import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import '../navbar/styles.css'
import { Navbar, Nav } from 'react-bootstrap';
import GET from '../lib/get';

const MyNavbar = (props) => {
    const [auth, setAuth] = useState("")
    const [path, setPath] = useState("")
    const [username, setUsername] = useState("")
    
    const logoutHandler = () => {
        localStorage.removeItem('c2c-token')
        setAuth(false)
        if(props)props.history.push("/")

    }

    const loginHandler = () => {
        if(props) props.history.push("/signin")
    }

    const signupHandler = () => {
        if(props) props.history.push("/signup")

    }

    useEffect(() => {
        if (localStorage.getItem("c2c-token")) 
            {
            const getData =async ()=>{
                let response = await GET("/api/auth/authenticated")
                console.log(response)
                if(response.data){
                    if(response.data.status==="success") setAuth(true)
                    }
                else setAuth(false)
                }
            getData()
            }
        
        if(props.location) {
            setPath(props.location.pathname)
        }
    }, [])

    return (
        <div>
            <Navbar className="bg-dark p-2 fixed-top" expand="lg">
                <Navbar.Brand className="text-uppercase text-light" style={{ padding: "10px" }} >C to C</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link id="home" >
                            <Link className="text-light text-uppercase" to="/">Home</Link>
                        </Nav.Link>
                        <Nav.Link id="sellitems" >
                            <Link className="text-light text-uppercase" to="/sellitems">Sell</Link>
                        </Nav.Link>
                      
                        <Nav.Link id="buy" >
                            <Link className="text-light text-uppercase" to='/buy'>Buy</Link>
                        </Nav.Link>
                        <Nav.Link id="contact" >
                            <Link className="text-light text-uppercase" to='/contact'>Contact</Link>
                        </Nav.Link>
                    </Nav>

                    {auth ?

                        <Nav className="float-right">
                            <Nav.Link><Link className="text-light text-uppercase" to="/account">Account</Link></Nav.Link>
                            <Nav.Link className="text-light justify-content-center ">{username}</Nav.Link>
                            <Nav.Link className="btn btn-danger text-light " onClick={logoutHandler}>Log out</Nav.Link>
                        </Nav>

                        :
                        <Nav className="float-right">
                            {path === "/signin" ?
                                    <Nav.Link className="btn btn-danger text-light " onClick={signupHandler}>Signup</Nav.Link>
                                :   <Nav.Link className="btn btn-danger text-light " onClick={loginHandler}>Signin</Nav.Link>
                            }
                        </Nav>
                    }


                </Navbar.Collapse></Navbar>
        </div>)
}
export default MyNavbar;