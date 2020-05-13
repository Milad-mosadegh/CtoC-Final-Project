import React from 'react';
import MyNavbar from '../navbar/navBar';
import MyProfile from './profile/mainProfile';
import '../../App.css'
import MainActivity from './activity/activity.js';
import { Tabs, Tab } from 'react-bootstrap'
import Favorites from './favorities/favorities';
import '../styles/main.css'

export default function MainAcc(props) {
    console.log(props, "in account")

    const mykey = props.location.mykey ? props.location.mykey : "profile"

    return (
        <div >
            <MyNavbar {...props} />
            <div className="container">

                <Tabs
                    defaultActiveKey={mykey}
                    id="uncontrolled-tab-example"
                    mountOnEnter={true}
                    unmountOnExit={true}>

                    <Tab eventKey="profile" title="Profile" >
                        <MyProfile {...props} />
                    </Tab>
                    <Tab eventKey="activities" title="Activities">
                        <MainActivity {...props} />
                    </Tab>
                    <Tab eventKey="favorities" title="Favorities">
                        <Favorites {...props} />
                    </Tab>

                </Tabs>

            </div>
        </div>
    );
}
