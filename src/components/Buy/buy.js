import React from 'react';

import MyNavbar from '../navbar/navBar';
import SearchBar from '../SearchBar/searchbar';


import SlideShow from './slideShow';





const BuyComponent = (props) => {
    return (
        <div>
            <MyNavbar {...props} />
            <SearchBar />
            <div className="d-flex justify-content-center">
                <SlideShow />
            </div>
        </div>
    );
}

export default BuyComponent;    