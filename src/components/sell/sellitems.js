import React, { useState, useEffect } from 'react';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import { POST, IMGPOST } from '../lib/post';
import FormData from "form-data"
import SellDetails from './sellDetails';
import MyAlert from '../lib/alert';




const SellItems = (props) => {


    const [images, setImages] = useState([])
    const [aut, setAuth] = useState(false)
    const [product, setProduct] = useState({
        title: "",
        category: "",
        condition: "",
        quantity: "",
        color: "",
        price: "",
        description: "",
        creator: ""
    })

    const [alertId, setAlertId] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showAlert, setShowAlert] = useState(false)


    useEffect(() => {

        if (localStorage.getItem("c2c-token")) authenticate();

    }, [])
    const authenticate = async () => {
        let response = await GET("/api/auth/authenticated")
        if (response.data) {
            if (response.data.status === "success") {
                setAuth(true)
                setProduct({ ...product, creator: JSON.parse(localStorage.getItem("c2c-profile")).id })
            }
            else {
                localStorage.removeItem("c2c-token")
                localStorage.removeItem("c2c-profile")
            }
        }
    }

    const imageChangeHandler = (image) => {
        if (images.length === 0) return setImages([image])
        const tempImageArray = [...images]
        let index = tempImageArray.findIndex(key => key.id === image.id)
        if (index === -1) tempImageArray.push(image)
        else tempImageArray[index] = { ...image }
        setImages(tempImageArray)
    }

    const changeHandler = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
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

            const response = await IMGPOST("/api/sell/newproduct", formData, config)
            if (response.data && response.data.status === "success") {
                // alert("You have successfuly posted your product")
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
            const response = await POST("/api/sell/newproduct", product, config)
            if (response.data && response.data.status === "success") {
                // alert("You have successfuly posted your product")
                setAlertId("A")
                setAlertText('You have successfuly posted your product')
                setShowAlert(true)


            }
        }

    }
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

            {showAlert ? <MyAlert id={alertId} alertText={alertText} /> : null}
        </div>
    );
}

export default SellItems;