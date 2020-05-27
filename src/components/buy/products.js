import React from 'react';
import '../styles/main.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import ItemCard from '../landingpage/itemCard';

export default function Products(props) {
    const {favorit,favoritHandler, products, setTargetProduct,url,status} = props

    return (
        <div className="container">
            <div className="myWrap mt-5">
                {products ? products.map(product =>
                    <ItemCard
                        setTargetProduct={setTargetProduct}
                        title={product.title}
                        price={product.price}
                        id={product._id}
                        images={product.images.length > 0 ? product.images[0] : 'noimage.png'}
                        favorit={favorit}
                        url={url?url:`/api/buy/activeproductdetails`}
                        favoritHandler={favoritHandler}
                        status={status}
                    />

                ) : null}
            </div>
        </div>
    )
}



