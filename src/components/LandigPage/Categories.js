import React from 'react';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom'

import pic1 from '../../images/signin-bg.jpg'

const Categories = () => {
    return (
        <div className="container">
            <Link to="/signin"><ItemCard title='electronic' image={pic1} /></Link>
        </div>
    );
}

export default Categories;