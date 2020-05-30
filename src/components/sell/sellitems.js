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
import AlertBox from "../AlertBox/alertBox"
import Errors from "../lib/errors"

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const SellItems = (props) => {

    const {id,editHandler} = props
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
            description: ""
        }

    )
    const classes = useStyles();
    const [alertId, setAlertId] = useState("")
    const [alertText, setAlertText] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [alertBox, setAlertBox] = useState(false)
    let   [inputErrors, setInputErrors] = useState([]);

    const regexNumber = new RegExp(/^[0-9]*$/)
    const regexPrice = new RegExp(/^[0-9]*$/)




    const changeHandler = (e) => {
        inputErrors = {...inputErrors,form:{...inputErrors.form, status:false}};

        switch (e.target.name) {
            
            case "title":
                if ((e.target.value.length < 4) || (e.target.value.length >40 )) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})

                break;

            case "quantity":
                if (!regexNumber.test(e.target.value)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})

                break;

            case "price":
                if ((!regexPrice.test(e.target.value)) || (e.target.value<1)) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})
                break;

            case "description":
                if ((e.target.value.length < 10) || (e.target.value.length >200 )) 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:true}})
                else 
                    setInputErrors({...inputErrors,[e.target.name]:{...inputErrors[e.target.name], status:false}})
                break;

            default:
                break;
        }
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const proceedHandler=()=>{
        editHandler(product, images)
        setAlertBox(false)
    }
    const hideAlertBox =()=>setAlertBox(false)

    


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
                    setEdit(true)
                    for(let  i=1; i<=product.images.length; i++){
                        images.push({id:i, image:fetch(`/avatars/${product.images[i]}`).then(r => r.blob())})
                    }})
                .catch(err => err)
        setInputErrors(Errors)
},[])

const showAlertBox =()=>{

    if(!Object.keys(product).every(key=>product[key])) 
        return setInputErrors({...inputErrors,form:{...inputErrors.form, status:true}})
        else   setInputErrors({...inputErrors,form:{...inputErrors.form, status:false}})

    if(Object.keys(product).filter(item=>{if((item==="_id" || item==="creator" || item ==="images")) return false
                                        else return true}).map(key=>inputErrors[key].status).includes(true)) return

    setAlertBox(true) 
}


    const imageChangeHandler = (image) => {
        if (images.length === 0) return setImages([image])
        const tempImageArray = [...images]
        let index = tempImageArray.findIndex(key => key.id === image.id)
        if (index === -1) tempImageArray.push(image)
        else tempImageArray[index] = { ...image }
        setImages(tempImageArray)
    }

    

    const submitHandler = async () => {

        if(!Object.keys(product).every(key=>product[key])) 
            return setInputErrors({...inputErrors,form:{...inputErrors.form, status:true}})
            else   setInputErrors({...inputErrors,form:{...inputErrors.form, status:false}})


        if(Object.keys(product).map(key=>inputErrors[key].status).includes(true)) return 
        
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
    
    return (
        <div>
        
            <MyNavbar {...props} />

            <SellDetails
                            {...props}
                            imageChangeHandler={imageChangeHandler}
                            changeHandler={changeHandler}
                            submitHandler={submitHandler}
                            product={product}
                            edit={edit}
                            showAlertBox={showAlertBox}
                            inputErrors={inputErrors}
            />

            {showAlert ? <MyAlert id={alertId} alertText={alertText} {...props} redirectPath="/account"/> : null}
            {showSignin ? <SigninModal
                            handleClose={handleClose}
                            show={showSignin}
                            classes={classes}
                            handleCloseReset={handleCloseReset}
                            handleOpenReset={handleOpenReset}
                            showReset={showReset}
                            productSubmitHandler={submitHandler}
            /> : null}
            {showReset ? <PasswordReset 
                            handleClose={handleCloseReset} 
                            handleOpen={handleOpenReset} 
                            show={showReset} 
                            classes={classes} /> : null}

            {alertBox?<AlertBox
                            alertBoxTitle="Update!"
                            alertBoxBody="Are you sure to update your product?"
                            hideAlertBox={hideAlertBox}
                            proceedHandler={proceedHandler}
                            
                    />:null}
        </div>
    );
}

export default SellItems;