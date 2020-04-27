import React, { useState, useEffect } from 'react';

import '../styles/main.css'
import pic1 from '../../images/it.jpg';
const ItemCard = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [addRefrence, setAddRefrence] = useState("")

    useEffect(() => {
        setTitle(props.title);
        setDescription(props.description)
        setImage(props.image)
        setAddRefrence(props.addRefrence)
    }, [])

    return (
        <div>
            {/*    <Card >
                <Card.Img className="cat-image" variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {description ?
                        <Card.Text>
                            {description}
                        </Card.Text>
                        : null}
                    {addRefrence ?
                        <button variant="primary">
                            {addRefrence}
                        </button>
                        : null}
                </Card.Body>
            </Card> */}

            <div className="myCard">
                <div className="myCardImage"
                    style={{
                        backgroundImage: `url(${pic1})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                ></div>
                <div className="myCardBody">
                    <div>
                        <h2>{title}</h2>
                    </div>
                    {description ?
                        <p>
                            {description}
                        </p>
                        : null}
                    {addRefrence ?
                        <button className="myBlueButton">
                            {addRefrence} ->
                        </button>
                        : null}
                </div>
            </div>

        </div>
    );
}

export default ItemCard;
