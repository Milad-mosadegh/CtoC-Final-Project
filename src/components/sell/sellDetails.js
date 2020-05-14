import React from 'react';
import { Form, Col, InputGroup, FormControl } from 'react-bootstrap'
import Categories from "../lib/categories"
import ImageCard from "./imageCard"
import Colors from "../lib/colors"
import Conditions from "../lib/condition"
import Fade from 'react-reveal/Fade';
import '../styles/main.css'

const SellDetails = (props) => {

    const { imageChangeHandler, changeHandler, submitHandler, product } = props
    console.log("info from sell Details", product);


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
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="title" type="text" value={product.title} placeholder="Enter Tilte" onChange={changeHandler} />
                                </Form.Group>
                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Categories</Form.Label>
                                    <Form.Control as="select" name="category" value={product.category} onChange={changeHandler}>
                                        {Categories.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>



                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Condition</Form.Label>
                                    <Form.Control as="select" name="condition" value={product.condition} onChange={changeHandler}>
                                        {Conditions.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" placeholder="Quantity" name="quantity" value={product.quantity} onChange={changeHandler} />
                                </Form.Group>

                            </Form.Row>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" name="color" value={product.color} onChange={changeHandler}>
                                        {Colors.map((key, index) => <option value={key.id}>{key.value}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Amount (to the nearest dollar)" name="price" value={product.price} onChange={changeHandler} />

                            </InputGroup>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Description</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" name="description" value={product.description} onChange={changeHandler} />
                            </InputGroup>
                        </div>
                    </div>
                </Fade>



                <Fade right cascade delay={100}>
                    <div className=" boxRight">
                        <div >
                            <div className="d-flex justify-content-around">
                                <ImageCard id={"1"} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"2"} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"3"} imageChangeHandler={imageChangeHandler} />
                            </div>
                            <div className="d-flex justify-content-around mt-2">
                                <ImageCard id={"4"} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"5"} imageChangeHandler={imageChangeHandler} />
                                <ImageCard id={"6"} imageChangeHandler={imageChangeHandler} />
                            </div>
                        </div>
                        <div style={{ marginTop: "60px" }}>
                            <button className="myBlueButton-sm" type="submit" onClick={submitHandler}>Submit</button>
                            <button className="myRedButton-sm ml-2" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>

    );
}

export default SellDetails;