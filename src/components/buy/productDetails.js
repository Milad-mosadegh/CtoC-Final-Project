import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import '../styles/main.css';
import ProductDetailsForm from './productDetailsForm';
import { POST } from '../lib/post';
import axios from 'axios';
import AlertBox from '../AlertBox/alertBox';
import Color from "../lib/colors"
import Condition from "../lib/condition"
import SigninModal from '../signin/signinModal/signinModal';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


const ProductDetails = (props) => {

    const classes = useStyles();
    const { id, showModel, handleClose, url,status } = props
    const [product, setProduct] = useState("")
    const [showSoldAlertBox, setShowSoldAlertBox] = useState(false)
    const [showActiveAlertBox, setShowActiveAlertBox]=useState(false)
    const [showInactiveAlertBox, setShowInactiveAlertBox]=useState(false)
    const [showDeleteAlertBox, setShowDeleteAlertBox]=useState(false)
    const [favorit, setFavorit]=useState(false)
    const[showSigninModal,setShowSigninModal]=useState(false)

    let color=product?Color.filter(color=>color.id===product.color)[0].value:null
    let condition=product?Condition.filter(condition=>condition.id===product.condition)[0].value:null

    const [bgImage, setBgImage] = useState("noimage.png")

    useEffect(() => {

        let config;
        if(localStorage.getItem("c2c-token")) config = {headers:{
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('c2c-token')
        }}
            else config={
                headers:{
                    'Content-Type': 'application/json',
                }
            } 
        axios.get(url ? `${url}/${id}` : `/api/buy/activeproductdetails/${id}`,config)
           .then(res=>{
               if(res.data.success){
                   setProduct(res.data.success)
                   setFavorit(res.data.favorit)
                   (res.data.success.images.length>0?setBgImage(res.data.success.images[0]):null)
               }
           })
           .catch(err=>err)

        return (async () => {
            const config = {
                headers: {
                    'x-auth-token': localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            await POST("/api/account/lastseen", id, config)
        })

    }, [favorit])


    const handleBgImage = (backgroundImage) => {
        setBgImage(backgroundImage)
    }


    const deactivateHandler = async (id) => {
        await axios.post("/api/products/inactiveproduct", { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.data.success) {
                    setShowInactiveAlertBox(false)
                    handleClose()
                    //props.history.push("/")
                    props.history.push({pathname:"/account",mykey:"activities", subKey:"inactive"})
                }
            })
            .catch(err => err)


    }
    const soldHandler = (id) => {
        
        axios.post("/api/products/soldproduct", { data: { id } }, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })

            .then(res => {
                if(res.data.success) {
                    setShowSoldAlertBox(false)
                    handleClose()
                    //props.history.push("/")
                   props.history.push({pathname:"/account",mykey:"activities", subKey:"sold"})
                }
            })
            .catch(err => err)
    }
    const activateHandler = (id) => axios.post("/api/products/activateproduct", { data: { id } }, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })

        .then(res => {
            if(res.data.success) {
                setShowActiveAlertBox(false)
                handleClose()
                //props.history.push("/")
                props.history.push({pathname:"/account",mykey:"activities", subKey:"active"})
            }
        })
        .catch(err => err)
    const deleteHandler = (id) => axios.post("/api/products/deleteproduct", { data: { id } }, {
        headers: {
            'x-auth-token': localStorage.getItem('c2c-token'),
            'Content-Type': 'application/json'
        }
    })

        .then(res => {
            if(res.data.success) {
                setShowSoldAlertBox(false)
                handleClose()
                props.history.push("/")
            }
        })
        .catch(err => err)

    const editHandler = (id) => props.history.push(`./editproduct/${id}`)

    const reportHandler = (id) => console.log("Report handler called", id)
    const favoriteHandler = async(id) => {
         if (localStorage.getItem("c2c-token")) {
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        }
        let response = await POST("/api/account/setfavorities", id, config)
        if (response.data.status === "success") {
            setFavorit(!favorit)
        }
        setShowSigninModal(false)
    }
    else setShowSigninModal(true) 

    
    
}


    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <Zoom>
            
                <div>
                    <ProductDetailsForm
                        description={product.description}
                        postedBy={product ? product.creator.firstName : null}
                        creatorId={product ? product.creator._id : null}
                        productId={product._id}
                        color={color}
                        price={product.price}
                        condition={condition}
                        quantity={product.quantity}
                        title={product.title}
                        bgImage={bgImage}
                        images={product.images}
                        handleBgImage={handleBgImage}
                        deactivateHandler={()=>setShowInactiveAlertBox(true)}
                        activateHandler={()=>setShowActiveAlertBox(true)}
                        deleteHandler={()=>setShowDeleteAlertBox(true)}
                        editHandler={editHandler}
                        reportHandler={reportHandler}
                        favoriteHandler={favoriteHandler}
                        soldHandler={()=>setShowSoldAlertBox(true)}
                        handleClose={handleClose}
                        status={status}
                        favorit={favorit}
                    />
                </div>
            </Zoom>
            {showSoldAlertBox?
                    <AlertBox
                        alertBoxTitle="Sold" 
                        alertBoxBody="Do you want to mark it sold?"
                        proceedHandler={()=>soldHandler(id)}
                        hideAlertBox={()=>setShowSoldAlertBox(false)} />
                        :null}
            {showActiveAlertBox?
                    <AlertBox
                        alertBoxTitle="Mark Active" 
                        alertBoxBody="Do you want to mark it Active?"
                        proceedHandler={()=>activateHandler(id)}
                        hideAlertBox={()=>setShowActiveAlertBox(false)} />
                        :null}
            {showInactiveAlertBox?
                    <AlertBox
                        alertBoxTitle="Mark Inactive" 
                        alertBoxBody="Do you want to mark it Inactive?"
                        proceedHandler={()=>deactivateHandler(id)}
                        hideAlertBox={()=>setShowInactiveAlertBox(false)} />
                        :null}
            {showDeleteAlertBox?
                    <AlertBox
                        alertBoxTitle="Delete" 
                        alertBoxBody="Are you sure to delete it?"
                        proceedHandler={()=>deleteHandler(id)}
                        hideAlertBox={()=>setShowDeleteAlertBox(false)} />
                        :null}
            {showSigninModal?
            <SigninModal 
                    handleClose={()=>setShowSigninModal(false)}
                    show={showSigninModal}
                    classes={classes}
                    productSubmitHandler={favoriteHandler} />:null}                        
            </div>

    );
}

export default ProductDetails;