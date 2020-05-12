import React, { useState, useEffect } from 'react';
import '../styles/main.css'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'
import PictureSlider from './pictureSlider';
import NewMessage from '../messages/newMessage';
import { CheckAuthentication } from '../lib/auth'
import SigninModal from "../signin/signinModal/signinModal"
import { makeStyles } from '@material-ui/core/styles';
import PasswordReset from '../signin/resetModal';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const ProductDetailsForm = (props) => {

    const { favoriteHandler,
            reportHandler,
            productDetail,
            soldHandler,
            deleteHandler, 
            editHandler, 
            handleBgImage, 
            images, 
            description, 
            postedBy, 
            productId, 
            color, 
            condition, 
            quantity, 
            title, 
            bgImage,
            deactivateHandler, 
            activateHandler } = props

    const [auth, setAuth] = useState(false)
    const [showSignin, setShowSignin]= useState(false)
    const [showReset, setShowReset]= useState(false)

    const openShowSignin=()=>setShowSignin(true)
    const closeShowSignin=()=>setShowSignin(false)
    const classes = useStyles();

    const handleOpenReset =()=>{
        setShowSignin(false)
        setShowReset(true)
    }
    const handleCloseReset =()=>{
        setShowReset(false)
        setShowSignin(true)
    }
    const submitHandler=()=>console.log("it is for fun  ")
    useEffect(() => {
        const checkAuth = async () => {
            let res = await CheckAuthentication();
            if (res.data.status === 'success') setAuth(true)
            else setAuth(false)
        }
        checkAuth()
    }, [])
    let currentUserId = auth ? JSON.parse(localStorage.getItem("c2c-profile")).id : null
    return (
        <div>
            <div className="pd-row-1">

                <div className="largImage">
                    <img src={`http://localhost:5000/avatars/${bgImage}`} alt="" />
                </div>


                <div className="thumbNailImage">
                    <PictureSlider
                        images={images}
                        handleBgImage={handleBgImage}
                    />
                </div>
            </div>

            <div className="content">
                <h2>{title}</h2>
                <Zoom righ>
                    <div className="myLine"></div>
                </Zoom>
                <div className="p-d-content">
                    <Fade right cascade duration={1000}>
                        <div className="innerContent">
                            <div>
                                <span>
                                    Posted By :
                                </span>
                                <input className="p-d-input" type="text" value={postedBy} />
                            </div>
                            <div>
                                <span>
                                    Product ID :
                                </span>
                                <input className="p-d-input" type="text" value={productId} />
                            </div>
                            <div>
                                <span>
                                    Color :
                                </span>
                                <input className="p-d-input" type="text" value={color} />
                            </div>
                            <div>
                                <span>
                                    Condition :
                                </span>
                                <input className="p-d-input" type="text" value={condition} />
                            </div>
                            <div>
                                <span>
                                    Quantity :
                                </span>
                                <input className="p-d-input" type="text" value={quantity} />
                            </div>

                        </div>
                    </Fade>

                    <div className="des">
                        <span>Description</span>
                        <p>{description}</p>
                    </div>
                </div>

                {productDetail ?
                    productDetail.creator._id === currentUserId ?
                        <div>
                            <button className='bigBlueButton'       onClick={()=>editHandler(productId)}>       Edit    </button>
                            <button className='bigRedButton ml-1'   onClick={()=>deleteHandler(productId)}>     Delete  </button>
                            <button className='bigBlueButton ml-1'  onClick={()=>deactivateHandler(productId)}> Deactive</button>
                            <button className='bigRedButton ml-1'   onClick={()=>soldHandler(productId)}>       Sold    </button>
                        </div>
                        : <div>

                            <div className="myIcon">
                                <div className="myIcons fa fa-star-o"   onClick={()=>favoriteHandler(productId)}>   </div>
                                <div className="myIcons fa fa-ban"      onClick={()=>reportHandler(productId)}>     </div>
                                <NewMessage
                                    title           ={productDetail.title}
                                    productId       ={productDetail._id}
                                    recipentId      ={productDetail ? productDetail.creator._id : null}
                                    openShowSignin  ={openShowSignin}  />
                            </div>

                        </div>


                    : null}
            </div>
            {showSignin?<SigninModal 
                        handleClose         ={closeShowSignin}
                        show                ={showSignin} 
                        classes             ={classes}
                        handleCloseReset    ={handleCloseReset}
                        handleOpenReset     ={handleOpenReset}
                        showReset           ={showReset}
                        productSubmitHandler={submitHandler}
                        />
                        :null}
            {showReset? <PasswordReset 
                            handleClose     ={handleCloseReset} 
                            handleOpen      ={handleOpenReset} 
                            show            ={showReset} classes={classes} 
                            /> 
                            :null}       
                                    
        </div>
    );
}

export default ProductDetailsForm;




