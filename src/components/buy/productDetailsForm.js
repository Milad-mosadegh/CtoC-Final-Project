import React, { useState, useEffect } from 'react';
import PictureSlider from './pictureSlider';
import { CheckAuthentication } from '../lib/auth'
import '../styles/main.css'

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
        activateHandler,
        status,
        favorit } = props

    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            let res = await CheckAuthentication();
            if (res.data.status === 'success') setAuth(true)
            else setAuth(false)
        }
        checkAuth()
    }, [])
    let currentUserId = auth ? JSON.parse(localStorage.getItem("c2c-profile")).id : null


console.log("favorit in detail form", favorit)


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
                        <div className="desOne">
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
                                Price : $ <input className="p-d-input" type="text" value={price} disabled /> 
                            </span>
                        </div>
                        <hr />
                        <div className="mt-1 text-center desTow ">
                            <span>Description :</span>
                            <div className="box-exeed">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom">
                {creatorId ?
                    status!=="sold"?
                    creatorId === currentUserId ?
                        status==="inactive"?
                            <div>
                                <button className='myOrabgeButton-lg ml-1' onClick={() => activateHandler(productId)}> Activate</button>
                            </div>

                            :<div>
                                <button className='myBlueButton-lg' onClick={() => editHandler(productId)}>       Edit    </button>
                                <button className='myRedButton-lg ml-1' onClick={() => deleteHandler(productId)}>     Delete  </button>
                                <button className='myOrabgeButton-lg ml-1' onClick={() => deactivateHandler(productId)}> In-Active</button>
                                <button className='myGreenButton-lg ml-1' onClick={() => soldHandler(productId)}>       Sold    </button>
                            </div>
                        : <div>

                            <div className="myIcon w-50 mx-auto">
                                <button className=
                                    {favorit?
                                    "myIcons myBlueButton-lg fa fa-star"
                                    :"myIcons myBlueButton-lg fa fa-star-o"} 
                                    onClick={() => favoriteHandler(productId)}>   </button>
                                <button className="myIcons myRedButton-lg fa fa-ban" onClick={() => reportHandler(productId)}>     </button>
                                <button className="myOrabgeButton-lg fa fa-envelope">
                                </button>
                            </div>

                        </div>

                    :null
                    : null}
            </div>


        </div>
    );
}

export default ProductDetailsForm;




