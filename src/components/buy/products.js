import React from 'react';
import './style.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


export default function Products({ products, interProduct }) {

    return (
        <div className="container mt-5">
            <h1 className="mb-5">You are on products</h1>

            <div className="myWrap">
                {products ? products.map((product, index) =>
                    < div className="myCard" key={product.id} onClick={e => interProduct(index)}>
                        <div className="imgBox">
                            <button className="btn fa fa-star"></button>
                            <img src={`http://localhost:5000/avatars/${product.images ? product.images[0] : null}`} alt="nowimage" />
                        </div>
                        <div className="myContent">
                            <div className="describ">
                                <h5> Price : {product.price}€</h5>
                                <h5> Price : {product.price}€</h5>
                            </div>
                            <h3>{product.title}</h3>

                        </div>
                    </div>) : null}
            </div>
        </div>
    )
}



