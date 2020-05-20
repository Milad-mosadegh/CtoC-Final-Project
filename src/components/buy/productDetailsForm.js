import React, { useState, useEffect } from 'react';

import PictureSlider from './pictureSlider';
import NewMessage from '../messages/newMessage';
import { CheckAuthentication } from '../lib/auth'
import SigninModal from "../signin/signinModal/signinModal"
import { makeStyles } from '@material-ui/core/styles';
import PasswordReset from '../signin/resetModal';

import '../styles/main.css'

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
        soldHandler,
        deleteHandler,
        editHandler,
        handleBgImage,
        images,
        description,
        postedBy,
        productId,
        creatorId,
        color,
        condition,
        quantity,
        title,
        price,
        bgImage,
        deactivateHandler,
        handleClose,
        activateHandler } = props

    const [auth, setAuth] = useState(false)
    const [showSignin, setShowSignin] = useState(false)
    const [showReset, setShowReset] = useState(false)

    const openShowSignin = () => setShowSignin(true)
    const closeShowSignin = () => setShowSignin(false)
    const classes = useStyles();

    const handleOpenReset = () => {
        setShowSignin(false)
        setShowReset(true)
    }
    const handleCloseReset = () => {
        setShowReset(false)
        setShowSignin(true)
    }
    const submitHandler = () => console.log("it is for fun  ")
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
            <div className="head-one">
                <button className='btn cancelBtn' onClick={handleClose}>
                    X
            </button>
            </div>
            <div className="head-tow">
                <h2>{title}</h2>
            </div>
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
                <div className="p-d-content">
                    <div className="innerContent">
                        <span>
                            Posted By : <input className="p-d-input" type="text" value={postedBy} disabled />
                        </span>
                        <span>
                            Product ID : <input className="p-d-input" type="text" value={productId} disabled />
                        </span>
                    </div>


                    <div className="des">
                        <div className="d-flex justify-content-lg-around">
                            <span>
                                Color : <input className="p-d-input" type="text" value={color} disabled />
                            </span>
                            <span>
                                Condition : <input className="p-d-input" type="text" value={condition} disabled />
                            </span>
                            <span>
                                Quantity : <input className="p-d-input" type="text" value={quantity} disabled />
                            </span>
                            <span>
                                Price : <input className="p-d-input" type="text" value={price} disabled />
                            </span>
                        </div>
                        <hr />
                        <div className="mt-1 text-center">
                            <span>Description :</span>
                            <p>{description}</p>
                        </div>
                    </div>


                </div>
            </div>
            <div>
                {creatorId ?
                    creatorId === currentUserId ?
                        <div className="mt-5">
                            <button className='myBlueButton-lg' onClick={() => editHandler(productId)}>       Edit    </button>
                            <button className='myRedButton-lg ml-1' onClick={() => deleteHandler(productId)}>     Delete  </button>
                            <button className='myOrabgeButton-lg ml-1' onClick={() => deactivateHandler(productId)}> In-Active</button>
                            <button className='myGreenButton-lg ml-1' onClick={() => soldHandler(productId)}>       Sold    </button>
                        </div>
                        : <div>

                            <div className="myIcon">
                                <div className="myIcons fa fa-star-o" onClick={() => favoriteHandler(productId)}>   </div>
                                <div className="myIcons fa fa-ban" onClick={() => reportHandler(productId)}>     </div>
                                <NewMessage
                                    title={title}
                                    productId={productId}
                                    recipentId={creatorId ? creatorId : null}
                                    openShowSignin={openShowSignin} />
                            </div>

                        </div>


                    : null}
            </div>
            {showSignin ? <SigninModal
                handleClose={closeShowSignin}
                show={showSignin}
                classes={classes}
                handleCloseReset={handleCloseReset}
                handleOpenReset={handleOpenReset}
                showReset={showReset}
                productSubmitHandler={submitHandler}
            />
                : null}
            {showReset ? <PasswordReset
                handleClose={handleCloseReset}
                handleOpen={handleOpenReset}
                show={showReset} classes={classes}
            />
                : null}

        </div>
    );
}

export default ProductDetailsForm;




