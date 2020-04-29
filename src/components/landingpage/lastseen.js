import React, { useState, useEffect } from 'react';

import ItemCard from './itemcard';

import '../styles/main.css';

import pic1 from '../../images/it.jpg';
import UnitedCards from './unitedCards';


const LastSeen = (props) => {
    const [popProducts, setPopProducts] = useState("")

    useEffect(() => {
        setPopProducts([
            {
                title: "product 1",
                description: "Some Text one ",
                image: pic1,
                addRefrence: "Go More"
            },
            {
                title: "product 2",
                description: "Some Text Tow ",
                image: pic1,
                addRefrence: "Go More"
            },
            {
                title: "product 3",
                description: "Some Text Three",
                image: pic1,
                addRefrence: "Go More"
            },
            {
                title: "product 4",
                description: "Some Text Four ",
                image: "Go More",
                addRefrence: "Go More"
            }])

    }, [])

    return (
        <div className="wrapAll ">
            <h2>Last Seen Products</h2>
            <div className="row wrapAll-cads ">
                {popProducts ? popProducts.map(data =>
                    <div>
                        <UnitedCards
                            image={data.image}
                            title={data.title}
                            description={data.description}
                            addRefrence={data.addRefrence}
                        />

                    </div>
                ) : <p> No proudcst</p>}

            </div>
        </div>
    );
}



export default LastSeen;