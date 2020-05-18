import React, { useState, useEffect } from 'react';
import MyNavbar from '../navbar/navBar';
import { POST, IMGPOST } from '../lib/post';
import FormData from "form-data"
import SellDetails from './sellDetails';
import MyAlert from '../lib/alert';
import SigninModal from "../signin/signinModal/signinModal"
import { makeStyles } from '@material-ui/core/styles';
import PasswordReset from "../signin/resetModal"
import axios from "axios"

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const SellItems = (props) => {

    const {id} = props
    const [images, setImages] = useState([])
    const [edit, setEdit] = useState(false)
    const [showSignin, setShowSignin] = useState(false)
    const [showReset, setShowReset] = useState(false)

    const [product, setProduct] = useState(
        {
            title: "",
            category: "",
            condition: "",
            quantity: "",
            color: "",
            price: "",
            description: "",
            creator: ""
        }

    )
    const classes = useStyles();
    const [alertId, setAlertId] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const handleOpenReset = () => {
        setShowSignin(false)
        setShowReset(true)
    }
    const handleCloseReset = () => {
        setShowReset(false)
        setShowSignin(true)
    }
    const handleOpen = () => setShowSignin(true)
    const handleClose = () => setShowSignin(false);

    useEffect(() => {
        if(id)  axios.get(`/api/buy/activeproductdetails/${id}`)
                .then(res => {
                    setProduct(res.data.data)
                    setEdit(true)})
                .catch(err => err)
}, [])


    const imageChangeHandler = (image) => {
        if (images.length === 0) return setImages([image])
        const tempImageArray = [...images]
        let index = tempImageArray.findIndex(key => key.id === image.id)
        if (index === -1) tempImageArray.push(image)
        else tempImageArray[index] = { ...image }
        setImages(tempImageArray)
    }

    const changeHandler = (e) => setProduct({ ...product, [e.target.name]: e.target.value })

    const submitHandler = async () => {

        if (!localStorage.getItem("c2c-token")) return handleOpen()
        if (showSignin) handleClose()
        let config;
        if (images.length > 0) {
            const formData = new FormData();
            let imageArray = images.map(value => value.image)
            imageArray.forEach(value => formData.append("files", value))
            Object.keys(product).forEach(key => formData.append(key, product[key]))
            config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-type': 'multipart/form-data'
                }
            }

            const response = await IMGPOST("/api/products/newproduct", formData, config)
            if (response.data && response.data.status === "success") {
                setAlertId("A")
                setAlertText('You have successfuly posted your product')
                setShowAlert(true)

            }
        }
        else {
            config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            const response = await POST("/api/products/newproduct", product, config)
            if (response.data && response.data.status === "success") {
                setAlertId("A")
                setAlertText('You have successfuly posted your product')
                setShowAlert(true)


            }
        }

    }
    if(edit) console.log("edit is enabled")
    return (
        <div>
        
            <MyNavbar {...props} />
            <SellDetails
                {...props}
                imageChangeHandler={imageChangeHandler}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                product={product}
            />

            {showAlert ? <MyAlert id={alertId} alertText={alertText} {...props} /> : null}
            {showSignin ? <SigninModal
                handleClose={handleClose}
                show={showSignin}
                classes={classes}
                handleCloseReset={handleCloseReset}
                handleOpenReset={handleOpenReset}
                showReset={showReset}
                productSubmitHandler={submitHandler}
            /> : null}
            {showReset ? <PasswordReset handleClose={handleCloseReset} handleOpen={handleOpenReset} show={showReset} classes={classes} /> : null}
        </div>
    );
}

export default SellItems;