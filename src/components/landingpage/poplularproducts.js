import React, { useState, useEffect } from 'react';
import UnitedCards from './unitedCards';


const PopularProduct = (props) => {

    const [popProducts, setPopProducts] = useState("")

    useEffect(() => {
        setPopProducts([
            {
                title: "product 1",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "Go More"
            },
            {
                title: "product 2",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "Go More"
            },
            {
                title: "product 3",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "Go More"
            },
            {
                title: "product 4",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "Go More"
            }])

    }, [])

    return (
        <div className="popProBox">
            <div className="popProBox-content ">
                <h2>Latest Product</h2>

                <div className="popProBox-cards row ">
                    {popProducts ? popProducts.map(data =>
                        <div>
                            <UnitedCards
                                //image={data.image}
                                title={data.title}
                                description={data.description}
                                addRefrence={data.addRefrence}
                            />
                        </div>
                    ) : <p> No proudcst</p>}
                </div>
            </div>
        </div>
    );
}

export default PopularProduct;