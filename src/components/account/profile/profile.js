import React from 'react';
import './../styles.css'
import { Form, Col } from 'react-bootstrap';
import ImageCard from '../../sell/imageCard';


import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },

}));

const ProfileData = (props) => {
    const classes = useStyles();

    const { submitHandler, imageChangeHandler, changeHandler, editDisabler, editEnabler, profile, renderModal, editAble, error } = props



    return (
        <div className='shadow-lg p-5'>
            <Form onSubmit={submitHandler}>

                <fieldset disabled={editAble ? "" : "disabled"}>
                    <div className="w-25  ">
                        <ImageCard image={profile.profileImage} edit={true} id={"1"} imageChangeHandler={imageChangeHandler} />
                    </div>

                    <form className={classes.root}>
                        <TextField
                            id="standard-name-input"
                            label="First Name"
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={changeHandler}
                            className="mb-4 mt-4"
                            helperText={<small className="sText">{error === "firstName" ?
                                <p>Attention! name must consist on 3 or more alphabets</p>
                                : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={changeHandler}
                            className="mb-4 mt-4"
                            helperText={error === "lastName" ?
                                <p>Attention! name must consist on 3 or more alphabets</p>
                                : null}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Last Name"
                            type="text"
                            name="email"
                            value={profile.email}
                            onChange={changeHandler}
                            className="mb-4"
                            fullWidth={true}
                            helperText={error === "email" ?
                                <p>Sorry! it is your use id and cannot be changed</p>
                                : null}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Phone"
                            type="text"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={changeHandler}
                            className="mb-4"
                            helperText={error === "phone" ?
                                <p>Attention! phone number can only consist of digits and more than eight.</p>
                                : null}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Password"
                            type="password"
                            name="password"
                            value="*********"
                            onChange={changeHandler}
                            className="mb-4"
                            helperText={editAble ?
                                <small className="sText"
                                    onClick={renderModal}
                                    style={{ cursor: "pointer" }}>click here to change your password</small> : null}
                        />
                        <TextField
                            id="standard-name-input"
                            label="PayPal ID"
                            type="text"
                            name="paypalId"
                            value={profile.paypalId}
                            onChange={changeHandler}
                            className="mb-4"
                            helperText={<small className="sText">{error === "paypalId" ?
                                <p>Attention! please provide valid email address.</p>
                                : null}</small>}
                        />

                        <TextField
                            id="standard-name-input"
                            label="Zipcode"
                            type="text"
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={changeHandler}
                            className="mb-4"
                            helperText={<small className="sText">{error === "zipCode" ?
                                <p>Attention! Zipcode can only consist of numbers and more than two.</p>
                                : null}</small>}

                        />

                        <TextField
                            id="standard-name-input"
                            label="City"
                            type="text"
                            name="city"
                            value={profile.city}
                            onChange={changeHandler}
                            className="mb-4"
                            helperText={<small className="sText">{error === "city" ?
                                <p>Attention! city name can only consist of alphabets and more than two. </p>
                                : null}</small>}
                        />
                    </form>

                    <TextField
                        id="standard-name-input"
                        label="Street"
                        type="text"
                        name="street"
                        value={profile.street}
                        onChange={changeHandler}
                        className="mb-4"
                        fullWidth={true}
                        helperText={<small className="sText">{error === "street" ?
                            <p>Attention! street can only consist of alphabets and more than two.</p>
                            : null}</small>}
                    />

                </fieldset>
                {
                    editAble ?
                        <div>
                            <button className='myBlueButton-lg' type="submit">
                                Update
                    </button>
                            <button className="ml-1 myRedButton-lg" onClick={editDisabler} >
                                Cancel
                    </button>
                        </div>
                        :
                        <button className="myBlueButton-lg" onClick={editEnabler}>
                            Edit
            </button>
                }
            </Form >
        </div >
    );
}

export default ProfileData;