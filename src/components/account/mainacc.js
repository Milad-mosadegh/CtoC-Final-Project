import React, {useState,useEffect} from 'react';
import MyNavbar from '../navbar/navBar';
import MyProfile from './profile/mainProfile';
import '../../App.css'
import MainActivity from './activity/activity.js';
import { Tabs, Tab } from 'react-bootstrap'
import Favorites from './favorities/favorities';
import '../styles/main.css'
import GET from '../lib/get';

export default function MainAcc(props) {
    const [favorit, setFavorit] = useState([])
    const mykey = props.location.mykey ? props.location.mykey : "profile"
    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            const getFavorities = async()=>{
                if(!localStorage.getItem("c2c-token")) return
                let response= await GET("/api/account/getfavoritelist")
                if(response.data.status==="success")
                setFavorit(response.data.favourities)
            }
            
            getFavorities()
        }
    }, [])
    const favoritHandler = async()=>{
        let response= await GET("/api/account/getfavoritelist")
            if(response.data.status==="success") setFavorit(response.data.favourities)
    }
    return (
        <div >
            <MyNavbar {...props} />
            <div className="container">

                <Tabs
                    defaultActiveKey={mykey}
                    id="uncontrolled-tab-example"
                    mountOnEnter={true}
                    unmountOnExit={true}>


                    <Tab eventKey="profile" title="Profile"  >
                        <MyProfile {...props} />
                    </Tab>
                    <Tab eventKey="activities" title="Activities" >
                        <MainActivity {...props}
                        favorit={favorit}
                        favoritHandler={favoritHandler} />
                    </Tab>
                    <Tab eventKey="favorities" title="Favorities" >
                        <Favorites {...props}
                            favorit={favorit}
                            favoritHandler={favoritHandler} />
                    </Tab>


                </Tabs>

            </div>
        </div>
    );
}
