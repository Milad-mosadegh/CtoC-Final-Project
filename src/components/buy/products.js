import React from 'react';

import '../styles/main.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


import UnitedCards from '../landingpage/unitedCards';




export default function Products({ products, interProduct }) {
    return (
        <div >
            <div className="myWrap mt-5">
                {products ? products.map(product =>
                    <UnitedCards
                        interProduct={interProduct}
                        title={product.title}
                        price={product.price}
                        id={product._id}
                        images={product.images.length > 0 ? product.images[0] : 'noimage.png'}
                    />

                ) : null}
            </div>
        </div>
    )
}



