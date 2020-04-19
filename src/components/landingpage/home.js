import React, { useState, useEffect } from 'react';

import MyCarousel from '../carousel/carousel';
import PopularProduct from './poplularproducts';
import LastSeen from './lastseen';
import SearchBar from '../searchBar/searchbar';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';




const Home = (props) => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("c2c-token")) 
            {
            const getData =async ()=>{
                let response = await GET("/api/auth/authenticated")
                if(response.data){
                    if(response.data.status==="success") setAuth(true)
                    }
                else setAuth(false)
                }
            getData()
            }

    }, [])
    return (
        <div style={{ height: "100vh" }} >
            <MyNavbar {...props} />
            <div className="container" style={{ marginTop: "20px" }} >
                <MyCarousel />
                <SearchBar />
            </div>
            <PopularProduct />
            {auth ? <LastSeen /> : null}
            <SlideShow/>
        </div>
    );
}

export default Home;