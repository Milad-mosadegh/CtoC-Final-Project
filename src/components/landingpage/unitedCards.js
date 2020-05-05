import React from 'react';


import Slide from 'react-reveal/Slide';



const UnitedCards = ({ title, price, id, images, interProduct }) => {
    const setFvourities=async()=> console.log("fav called")
    return (

        <div>
            <div className="unitedWrap ">
                <Slide left>
            
                    <div className="unitedCards" key={id} onClick={() => interProduct(id)}>
                        
                        <div className="unitedImgBox"
                            style={{
                                backgroundImage: `url(${`http://localhost:5000/avatars/${images}`})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                        <button className="btn fa fa-star" onClick={setFvourities}></button>
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

export default UnitedCards;