import React, { useState, useEffect } from 'react';
import '../../App.css'
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap'
import '../styles/main.css'

import UserList from './UserList/UserList';
import ProductList from './ProductList/ProductList';
import Complains from './Complains/Complains';
import Curries from './Curries/Curries';


export default function AdminMain(props) {

    const headingStyle = {
        margin: "50px 0",
        letterSpacing: "4px",
        fontSize: "50px"
    }

    return (

        <div className="container mt-5">
            <h1 style={headingStyle}>WELCOME TO ADMIN PANNEL</h1>

            <Tabs
                defaultActiveKey="userlist"
                id="uncontrolled-tab-example"
                mountOnEnter={true}
                unmountOnExit={true}>


                <Tab eventKey="userlist" title="User List"  >
                    <UserList />
                </Tab>
                <Tab eventKey="productlist" title="Product List" >
                    <ProductList />
                </Tab>
                <Tab eventKey="complains" title="Complains" >
                    <Complains />
                </Tab>

                <Tab eventKey="curries" title="Curries" >
                    <Curries />
                </Tab>
            </Tabs>



        </div>
    );
}

