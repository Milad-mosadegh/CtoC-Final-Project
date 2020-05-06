import React,{useState, useEffect} from 'react';
import Slide from 'react-reveal/Slide';
import {POST} from "../lib/post"



const ItemCard = ({ title, price, id, images, setTargetProduct, favourities }) => {

    const [favouritized, setFavouritized] =useState(false)

    useEffect(()=>{
        if(favourities.includes(id)) setFavouritized(true)
    },[])
    if(favourities) console.log("i got fav", favourities)
    else console.log("no favoour", favourities)
    const setFvourities=async()=> {
        if(localStorage.getItem("c2c-token")){
            const config={
                headers:{
                    'x-auth-token':localStorage.getItem('c2c-token'),
                    'Content-Type': 'application/json'
                }
            }
            let response= await POST("/api/account/setfavourities", id, config)
            if(response.data.status==="success") setFavouritized(!favouritized)
        }
    }
    return (

        <div>
            <div className="unitedWrap ">
                <Slide left>
            
                    <div className="unitedCards" key={id} >
                        <button className={favouritized?"btn btn-warning fa fa-star":"btn btn-success fa fa-star-o"} onClick={setFvourities}></button>
                        <div className="unitedImgBox" onClick={() => setTargetProduct(id)}
                            style={{
                                backgroundImage: `url(${`http://localhost:5000/avatars/${images}`})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                        
                        </div>
                        <div className="unitedContent">
                        
                            <div className="unitedPrice">

                                <h5> Price : {price}€</h5>
                            </div>
                            <h3>{title}</h3>
                        </div>
                    </div>
                    
                
                </Slide>

            </div>
        </div>
    );
}

export default ItemCard;