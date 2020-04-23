import React, { useState, useEffect } from 'react';

import { Button, Form } from 'react-bootstrap';
import NoImage from "../../images/noimage.png"





const ImageCard = (props) => {

    const [image, setImage] = useState("")
    useEffect(() => {
        setImage(props.image)
    }
        , [])

    const fileSelectedHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        let url = reader.readAsDataURL(file)
        reader.onloadend = (e) => {
            setImage(reader.result)
        }
        props.imageChangeHandler({ image: e.target.files[0], id: e.target.id })

    }
    const inputHandler = (e) => {
        document.getElementById(props.id).click();
    }
    const deleteHandler = () => {
        setImage("")
    }

    return (

        <div className="boxes m-1"
            style={{
                backgroundImage: `url(${image ? image : props.image ? `http://localhost:5000/avatars/${props.image}` : NoImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>

            <div style={{ height: "70%", width: "100%" }} >
                <Form.File style={{ height: "100%", width: "100%" }} id="formcheck-api-custom" custom>
                    <Form.File.Input id={props.id}
                        style={{ display: "none" }}
                        name="imageFiles"
                        onChange={fileSelectedHandler} />
                </Form.File>
            </div>
            <div className="text-center" name="button holder" >
                {props.image ?
                    props.edit ?
                        <Button
                            className="btn btn-warning roundedCircle mb-1"
                            onClick={inputHandler}
                            style={{ borderRadius: 20 + 'px' }} >
                            <svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd" />
                            </svg>
                        </Button>
                        : <Button
                            className="btn btn-danger roundedCircle mb-1"
                            style={{ borderRadius: 20 + 'px' }}
                            onClick={deleteHandler} >
                            <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd" />
                            </svg>
                        </Button>
                    : <Button
                        onClick={inputHandler}
                        className="btn btn-danger fa fa-plus text-white roundedCircle mb-1"
                        style={{ borderRadius: '100%', padding: "13px" }}
                        name="addButton">

                    </Button>}
            </div>
        </div>
    )

}
export default ImageCard;


