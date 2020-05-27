import React from 'react';
import { Form, Col, InputGroup, FormControl } from 'react-bootstrap'
import Categories from "../lib/categories"
import ImageCard from "./imageCard"
import Colors from "../lib/colors"
import Conditions from "../lib/condition"
import Fade from 'react-reveal/Fade';
import '../styles/main.css'

import TextField from '@material-ui/core/TextField';



const SellDetails = (props) => {

    const { imageChangeHandler, changeHandler, submitHandler, product, edit, showAlertBox, inputErrors } = props
    console.log("info from edit sell", product);


    const cancelHandler = () => {
        props.history.push("/")
    }


    return (

        <div className="sellWrapAll ">
            <div className="row sellBgGradient ">
                <Fade top cascade delay={100}>
                    <div className="boxLeft">
                        <div className="boxLeftChild">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    {/* <Form.Label>Title</Form.Label> */}
                                    <Form.Control name="title" type="text" value={product.title} placeholder="Enter Tilte" onChange={changeHandler} />
                                    <small className="sText">{inputErrors.title ? inputErrors.title.status ? inputErrors.title.value : null : null}</small>
                                </Form.Group>
                            </Form.Row>


                            <TextField
                                id="standard-name-input"
                                label="Title"
                                type="text"
                                autoComplete="current-name"
                                name="title"
                                value={product.title}
                                onChange={changeHandler}
                                fullWidth={true}
                                required={true}
                            />



                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    {/* <Form.Label>Categories</Form.Label> */}
                                    <Form.Control as="select" name="category" value={product.category} onChange={changeHandler}>
                                        {Categories.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                    <small className="sText">{inputErrors.category ? inputErrors.category.status ? inputErrors.category.value : null : null}</small>

                                </Form.Group>
                            </Form.Row>



                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    {/* <Form.Label>Condition</Form.Label> */}
                                    <Form.Control as="select" name="condition" value={product.condition} onChange={changeHandler}>
                                        {Conditions.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                    <small className="sText">{inputErrors.condition ? inputErrors.condition.status ? inputErrors.condition.value : null : null}</small>

                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    {/* <Form.Label>Quantity</Form.Label> */}
                                    <Form.Control type="text" placeholder="Quantity" name="quantity" value={product.quantity} onChange={changeHandler} />
                                    <small className="sText">{inputErrors.quantity ? inputErrors.quantity.status ? inputErrors.quantity.value : null : null}</small>

                                </Form.Group>

                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    {/* <Form.Label>Color</Form.Label> */}
                                    <Form.Control as="select" name="color" value={product.color} onChange={changeHandler}>
                                        {Colors.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                    <small className="sText">{inputErrors.color ? inputErrors.color.status ? inputErrors.color.value : null : null}</small>

                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Price</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Amount (to the nearest dollar)" name="price" value={product.price} onChange={changeHandler} />
                                
                            </InputGroup>
                            <small className="sText">{inputErrors.price ? inputErrors.price.status ? inputErrors.price.value : null : null}</small>

                            </Form.Group>
                            </Form.Row>

                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Description</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" name="description" value={product.description} onChange={changeHandler}/>
                            </InputGroup>
                            <small className="sText">{inputErrors.description ? inputErrors.description.status ? inputErrors.description.value : null : null}</small>

                            </Form.Group>
                            </Form.Row>

                        </div>
                    </div>
                </Fade>



                <Fade right cascade delay={100}>
                    <div className=" boxRight">
                        <div >
                            <div className="d-flex justify-content-around mb-2">
                                <ImageCard id={"1"} image={product.images ? product.images[0] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"2"} image={product.images ? product.images[1] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"3"} image={product.images ? product.images[2] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                            </div>
                            <div className="d-flex justify-content-around mt-4">
                                <ImageCard id={"4"} image={product.images ? product.images[3] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"5"} image={product.images ? product.images[4] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"6"} image={product.images ? product.images[5] : null} edit={product.images ? true : false} imageChangeHandler={imageChangeHandler} />
                            </div>
                        </div>
                        {edit ?
                            <div style={{ marginTop: "60px" }}>
                                <button className="myOrabgeButton-lg" onClick={showAlertBox}>Update</button>
                                <button className="myRedButton-lg ml-2" onClick={cancelHandler}>Cancel</button>
                            </div>
                            :
                            <div style={{ marginTop: "60px" }}>
                                <button className="myBlueButton-lg" type="submit" onClick={submitHandler}>Submit</button>
                                <button className="myRedButton-lg ml-2" onClick={cancelHandler}>Cancel</button>
                            </div>}
                            <small className="sText">{inputErrors.form ? inputErrors.form.status ? inputErrors.form.value : null : null}</small>

                    </div>
                </Fade>
            </div>
        </div>

    );
}

export default SellDetails;