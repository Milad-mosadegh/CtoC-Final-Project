import React, { useState, useEffect } from 'react';

import ItemCard from './itemcard';

import '../styles/main.css';

const LastSeen = (props) => {
    const [popProducts, setPopProducts] = useState("")

    useEffect(() => {
        setPopProducts([
            {
                title: "product 1",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "fdsfsdfdsf"
            },
            {
                title: "product 2",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "fdsfsdfdsf"
            },
            {
                title: "product 3",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "fdsfsdfdsf"
            },
            {
                title: "product 4",
                description: "blal bla ",
                image: "jlkjlk",
                addRefrence: "fdsfsdfdsf"
            }])

    }, [])

    return (
        <div className="container mt-5 p-3 text-center">
            <div >
                <h2>Last Seen Products</h2>
            </div>
            <div className="row">
                {popProducts ? popProducts.map(data =>
                    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        <ItemCard
                            //image={data.image}
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