import React from 'react';

import '../styles/main.css'
// import './style.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

import Slide from 'react-reveal/Slide';




export default function Products({ products, interProduct }) {

    return (
        <div className="container mt-5">
            <h1 className="mb-5">You are on products</h1>

            <div className="myWrap">
                {products ? products.map((product, index) =>
                    <Slide left>
                        <div className="myCard" key={product.id} onClick={e => interProduct(index)}>
                            <div className="imgBox"
                                style={{
                                    backgroundImage: `url(${`http://localhost:5000/avatars/${product.images.length > 0 ? product.images[0] : 'noimage.png'}`})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    // borderRadius: "20px 20px 0 0 "
                                }}>
                                {/* <img src={`http://localhost:5000/avatars/${product.images ? product.images[0] : null}`} alt="nowimage" /> */}
                                <button className="btn fa fa-star"></button>
                            </div>
                            <div className="myContent">
                                <div className="describ">
                                    <h5> Price : {product.price}€</h5>
                                </div>
                                <h3>{product.title}</h3>

                            </div>
                        </div>
                    </Slide>
                ) : null}
            </div>
        </div>
    )
}



