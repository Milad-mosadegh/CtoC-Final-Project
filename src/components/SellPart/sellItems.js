import React from 'react';
import MyNavbar from '../navbar/navBar';
import MainSell from './mainsell';

const SellItems = (props) => {
    return ( 
        <div>
            <MyNavbar {...props} />
            <MainSell {...props}/>
           
        </div>
     );
}
 
export default SellItems;