import React, { useState } from 'react';

import MyCarousel from '../carousel/carousel';
import PopularProduct from './PopularProduct';
import LastSeen from './LastSeen';
import SearchBar from '../SearchBar/searchbar';
import Categories from './Categories';


const Home = () => {

    const [auth, setAuth] = useState(true)
    return (
        <div style={{ height: "100vh" }} >


            <div className="container" style={{ marginTop: "20px" }} >

                <MyCarousel />
                <SearchBar />
            </div>
            <PopularProduct />
            {auth ? <LastSeen /> : null}
            <Categories title="MIlad" />
        </div>
    );
}

export default Home;