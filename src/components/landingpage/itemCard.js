import React from 'react';


import Slide from 'react-reveal/Slide';



const ItemCard = ({ title, price, id, images, setTargetProduct }) => {
    const setFvourities=async()=> console.log("fav called")
    return (

        <div>
            <div className="unitedWrap ">
                <Slide left>
            
                    <div className="unitedCards" key={id} >
                        <button className="btn btn-warning fa fa-star" onClick={setFvourities}></button>
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