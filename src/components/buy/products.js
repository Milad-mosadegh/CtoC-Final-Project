import React from 'react';
import './style.css'

export default function Products(props) {
    const { products } = props
    console.log("props in product", props.products)

    return (
        <div className="container mt-5">
            <h1 className="mb-5">You are on products</h1>

            <div className="myWrap" onClick={props.interProduct}>
                {products ? products.map(product =>
                    <div className="shadow-lg" key={product.id}>
                        <div className="imgBox">
                            <img src={`http://localhost:5000/avatars/${product.images ? product.images[0] : null}`} alt="nowimage" />
                        </div>
                        <div className="myContent">
                            <h3>{product.title}</h3>
                            <h5> Price : {product.price}$</h5>
                        </div>
                    </div>) : null}
            </div>
        </div>
    )
}
