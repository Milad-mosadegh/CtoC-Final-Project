import React from 'react';
import MyNavbar from '../navbar/navBar';
import Home from '../landingpage/home';


const Dashboard = (props) => {
    return (
        <div>
            <Home {...props}/>
        </div>

    );
}

export default Dashboard;