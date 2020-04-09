import React, { useState } from 'react';
import { Button, Form, Col, InputGroup, FormControl } from 'react-bootstrap'
import { post } from "axios"
import {POST} from "../lib/post"
import ImageCard from "./imageCard"


import './styles.css'

const MainSell = (props) => {

    const {imageChangeHandler, changeHandler, submitHandler, product} = props

    const cancelHandler = () => {
        props.history.push("/")
    }
    return (
        <div className="posi">
            <div className='container shadow-lg' style={{ marginTop: "100px" }}>

                <Form onSubmit={submitHandler}>
                    <div className="d-flex">
                        <div className="row">
                            <div className="p-5" >
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" type="text" value={product.title} placeholder="Enter Tilte" onChange={changeHandler} />
                                    </Form.Group>
                                </Form.Row>
                                {/*  */}
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Categories</Form.Label>
                                        <Form.Control as="select" name="category" value={product.category} onChange={changeHandler}>
                                            <option value="0">All Categories</option>
                                            <option value="1">Antiques</option>
                                            <option value="2">Art</option>
                                            <option value="3">Baby</option>
                                            <option value="4">Books</option>
                                            <option value="5">Cameras</option>
                                            <option value="6">Cell Phones & Accessories</option>
                                            <option value="7">Clothing, Shoes & Accessories</option>
                                            <option value="8">Computers & Accessories</option>
                                            <option value="9">Consumer Electronics</option>
                                            <option value="10">DVDs & Movies</option>
                                            <option value="11">Home & Garden</option>
                                            <option value="12">Jewelry & Watches</option>
                                            <option value="13">Musical Instruments & Gear</option>
                                            <option value="14">Pet Supplies</option>
                                            <option value="15">Sports</option>
                                            <option value="16">Toys & Hobbies</option>
                                            <option value="17">Video Games & Consoles</option>
                                            <option value="18">Others</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/*  */}

                                </Form.Row>
                                {/*  */}
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Condition</Form.Label>
                                        <Form.Control as="select" name="condition" value={product.condition} onChange={changeHandler}>
                                            <option value="used">Used</option>
                                            <option value="new">New</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/*  */}
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" placeholder="Quantity" name="quantity" value={product.quantity} onChange={changeHandler} />
                                    </Form.Group>

                                </Form.Row>
                                {/*  */}

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control as="select" name="color" value={product.color} onChange={changeHandler}>
                                            <option value="red">Red</option>
                                            <option value="black">Black</option>
                                            <option value="white">White</option>
                                            <option value="green">Green</option>
                                            <option value="yellow">Yellow</option>
                                            <option value="mixed">Mixed</option>
                                            <option value="blue">Blue</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>


                                {/*       <Form.Group controlId="formGridAddress1">
                                <Form.Label>Price</Form.Label>
                            </Form.Group>
 */}
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
                                    <FormControl as="textarea" aria-label="With textarea" name="description"  value={product.description} onChange={changeHandler} />
                                </InputGroup>

                            </div>
                            {/*  */}
                            <div className="p-5" >
                                <div className="mb-3 mt-5">
                                    <div className="d-flex text-center">
                                        <ImageCard  id={"1"} imageChangeHandler={imageChangeHandler} />
                                        <ImageCard  id={"2"} imageChangeHandler={imageChangeHandler}/>
                                        <ImageCard  id={"3"} imageChangeHandler={imageChangeHandler}/>
                                    </div>

                                    <div className="d-flex mb-5 text-center">
                                        <ImageCard  id={"4"} imageChangeHandler={imageChangeHandler}/>
                                        <ImageCard  id={"5"} imageChangeHandler={imageChangeHandler}/>
                                        <ImageCard  id={"6"} imageChangeHandler={imageChangeHandler}/>
                                    </div>

                                </div>

                                <Button variant="primary m-2" type="submit">
                                    Submit
                            </Button>
                                <Button variant="danger m-2" onClick={cancelHandler}>
                                    Cancel
                            </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>

    );
}

export default MainSell;