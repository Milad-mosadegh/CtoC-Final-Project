import React, { useState } from 'react';
import './../styles.css'
import { Form, Button, Col } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';
import PasswordChange from './changepassword';

const ProfileData = (props) => {
    const [error, setError] = useState("")

    const {submitHandler,imageChangeHandler,changeHandler,cancelHandler,editHandler,profile,edit,showModal,renderModal,derenderModal} = props


    return (
        <div className='shadow-lg p-5'>
            <Form onSubmit={submitHandler}>

                <fieldset id="fieldset" disabled="disabled">
                    <div className="w-25  ">
                        <ImageCard image={profile.profileImage} edit={true} id={"1"} imageChangeHandler={imageChangeHandler} />

                    </div>
                    <Form.Row >
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >First Name</Form.Label>
                            <Form.Control name="firstName" type="text" value={profile.firstName} onChange={changeHandler} />
                            <smail className="sText">{error === "firstName" ?
                                <p>Attention! name must consist on 3 or more alphabets</p>
                                : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" value={profile.lastName} onChange={changeHandler} />
                            <smail className="sText">{error === "lastName" ?
                                <p>Attention! name must consist on 3 or more alphabets</p>
                                : null}</smail>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control name="email" type="email" value={profile.email} onChange={changeHandler} />
                            <smail className="sText">{error === "email" ?
                                <p>Sorry! it is your use id and cannot be changed</p>
                                : null}</smail>

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >Phone</Form.Label>
                            <Form.Control name="phoneNumber" type="text" value={profile.phoneNumber} onChange={changeHandler} />
                            <smail className="sText">{error === "phone" ?
                                <p>Attention! phone number can only consist of digits and more than eight.</p>
                                : null}</smail>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" value="*********" onChange={changeHandler} />
                            {edit?
                                <smail className="sText"
                                    onClick={renderModal}
                                    style={{cursor:"pointer"}}>click here to change your password</smail>:null}

                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Paypal Id</Form.Label>
                            <Form.Control name="paypalId" value={profile.paypalId} onChange={changeHandler} />
                            <smail className="sText">{error === "paypalId" ?
                                <p>Attention! please provide valid email address.</p>
                                : null}</smail>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Street</Form.Label>
                        <Form.Control name="street" value={profile.street} onChange={changeHandler} />
                        <smail className="sText">{error === "street" ?
                            <p>Attention! street can only consist of alphabets and more than two.</p>
                            : null}</smail>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail" >
                            <Form.Label >City</Form.Label>
                            <Form.Control name="city" type="text" value={profile.city} onChange={changeHandler} />
                            <smail className="sText">{error === "city" ?
                                <p>Attention! city name can only consist of alphabets and more than two. </p>
                                : null}</smail>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip" >
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control name="zipCode" value={profile.zipCode} onChange={changeHandler} />
                            <smail className="sText">{error === "zipCode" ?
                                <p>Attention! Zipcode can only consist of numbers and more than two.</p>
                                : null}</smail>
                        </Form.Group>
                    </Form.Row>


                </fieldset>
                {edit ?
                    <div>
                        <Button variant="success" type="submit">
                            Update
                    </Button>
                        <Button variant="danger" className="ml-1" onClick={cancelHandler} >
                            Cancel
                    </Button>
                    </div>
                    :
                    <Button variant="primary" onClick={editHandler}>
                        Edit
            </Button>
                }
            </Form>
            {showModal?
                <PasswordChange
                showModal={showModal}
                derenderModal={derenderModal}
            />:null}
        </div>
    );
}

export default ProfileData;