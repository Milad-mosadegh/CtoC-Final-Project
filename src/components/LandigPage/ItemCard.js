import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

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
    })

    return (
        <div className="mt-5">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {description ?
                        <Card.Text>
                            {description}
                        </Card.Text>
                        : null}
                    {addRefrence ?
                        <Button variant="primary">
                            {addRefrence}
                        </Button>
                        : null}
                </Card.Body>
            </Card>


        </div>
    );
}

export default ItemCard;
