import React, { useState, useEffect } from 'react';
import MyNavbar from '../navbar/navBar';
import MainSell from './mainsell';
import GET from '../lib/get';
import { POST, IMGPOST } from '../lib/post';
import FormData from "form-data"
import Fade from 'react-reveal/Fade';
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
        description: ""
    })


    useEffect(() => {

        if (localStorage.getItem("c2c-token")) authenticate();

    }, [])
    const authenticate = async () => {
        let response = await GET("/api/auth/authenticated")
        if (response.data) {
            if (response.data.status === "success") setAuth(true)
            else localStorage.removeItem("c2c-token")
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
                alert("You have successfuly posted your product")
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
                alert("You have successfuly posted your product")
            }
        }

    }
    return (
        <div>

            <MyNavbar {...props} />


            <MainSell
                {...props}
                imageChangeHandler={imageChangeHandler}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                product={product}
            />



        </div>
    );
}

export default SellItems;