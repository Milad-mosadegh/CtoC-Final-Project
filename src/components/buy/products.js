import React, {useState,useEffect} from 'react';

export default function Products(props) {
    const {products} = props
    console.log("props in product", props.products)

    return (
        <div>
        <table>
        <h1>You are on products</h1>
                {products?products.map(product=><tr ><td><img className="w-25 vh-25" src={`http://localhost:5000/avatars/${product.images? product.images[0]:null}`} alt="nowimage"/>{/* product.images.lenght>0?product.images[0]:null */}</td><td>{product.title}</td><td>{product.price}</td></tr>):null}
        
                </table>
                </div>
    )
}
