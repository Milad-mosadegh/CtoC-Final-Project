import React from 'react';


import Slide from 'react-reveal/Slide';



const UnitedCards = ({ title, price, id, images }) => {
    return (
        <div >
            <div className="unitedWrap mt-5">
                <Slide left>
                    <div className="unitedCards" key={id} >
                        <div className="unitedImgBox"
                            style={{
                                backgroundImage: `url(${`http://localhost:5000/avatars/${images}`})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                // borderRadius: "20px 20px 0 0 "
                            }}>
                            {/* <img src={`http://localhost:5000/avatars/${product.images ? product.images[0] : null}`} alt="nowimage" /> */}
                            <button className="btn fa fa-star"></button>
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