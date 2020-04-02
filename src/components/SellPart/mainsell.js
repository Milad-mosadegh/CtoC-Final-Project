import React, { useState } from 'react';
import { Button, Form, Col, InputGroup, FormControl } from 'react-bootstrap'


import './style.css'

const MainSell = (props) => {

    const [aut, setAuth] = useState("")
    const [title, setTitel] = useState("")
    const [category, setCategory] = useState("")
    const [condition, setCondition] = useState("")
    const [quantity, setQuantity] = useState("")
    const [color, setColor] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e.target.category.value)
    }
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
                                        <Form.Control name="title" type="text" placeholder="Enter Tilte" />
                                    </Form.Group>
                                </Form.Row>
                                {/*  */}
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Categories</Form.Label>
                                        <Form.Control as="select" name="category">
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
                                        <Form.Control as="select" name="condition">
                                            <option value="used">Used</option>
                                            <option value="new">New</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/*  */}
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type="text" placeholder="Quantity" name="quantity" />
                                    </Form.Group>

                                </Form.Row>
                                {/*  */}

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control as="select" name="color">
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
                                <InputGroup className="col-md-6 col-sm-12 mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Amount (to the nearest dollar)" name="price" />

                                </InputGroup>

                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Description</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl as="textarea" aria-label="With textarea" name="description" />
                                </InputGroup>

                            </div>
                            {/*  */}
                            <div className="p-5" >
                                <div className="mb-3 mt-5">
                                    <div className="d-flex text-center">
                                        <div className="boxes m-1">Image 1</div>
                                        <div className="boxes m-1">Image 2</div>
                                        <div className="boxes m-1">Image 3</div>
                                    </div>

                                    <div className="d-flex mb-5 text-center">
                                        <div className="boxes m-1">Image 4</div>
                                        <div className="boxes m-1">Image 5</div>
                                        <div className="boxes m-1">Image 6</div>
                                    </div>
                                    <Form.File id="formcheck-api-custom" custom>
                                        <Form.File.Input />
                                        <Form.File.Label name="imageFiles" data-browse="Upload Image">
                                            Custom file input
                                </Form.File.Label>
                                        <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                                    </Form.File>
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