import React, { useState, useEffect } from 'react';

import ItemCard from './ItemCard';

const LastSeen = () => {
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
            <div className="d-flex">
                {popProducts ? popProducts.map(data =>
                    <ItemCard
                        image={data.image}
                        title={data.title}
                        description={data.description}
                        addRefrence={data.addRefrence}
                    />

                ) : <p> No proudcst</p>}

            </div>

        </div>
    );
}



export default LastSeen;