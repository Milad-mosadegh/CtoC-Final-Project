import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';




const ImageCard = (props) => {

    const [image, setImage] = useState("")

    const fileSelectedHandler = async (e) => {
        if (e.target.files) {
            let reader = new FileReader()
            reader.onload = (e) => {
                setImage(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (

        <div className="boxes m-1"
            style={{
                backgroundImage: `url(${image ? image : null})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            <div style={{ height: "70%", width: "100%" }} >

                <Form.File style={{ height: "100%", width: "100%" }} id="formcheck-api-custom" custom>
                    <Form.File.Input
                        style={{ height: "100%", width: "100%", cursor: "pointer" }}
                        name="imageFiles"
                        onChange={fileSelectedHandler} />
                </Form.File>
            </div>
            <div className="text-center" >
                {image ?
                    <Button
                        className="btn btn-danger roundedCircle mb-1"
                        style={{ borderRadius: 20 + 'px' }} >
                        X</Button>
                    : null}
            </div>
        </div>
    )

}
export default ImageCard;

//<div className="boxes m-1">Image 6</div>
