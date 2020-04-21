import React from 'react';
import "./productstyles.css"

const ProductDetails = ({ showModel, handleClose, title, description, images }) => {
    return (
        <div className="my-container" show={showModel} onHide={handleClose}>
            <div className="content">
            <div>
                {title}
            </div>
            <div className="modal-image">
                {images.map(image=><img src={`http://localhost:5000/avatars/${image ? image : null}`} alt="" />)}
               {/*  <img src={`http://localhost:5000/avatars/${images ? images[0] : null}`} alt="" /> */}
            </div>
            <div>
                {description}
            </div>
            <button onClick={handleClose}>
                Close
            </button>
            </div>
        </div>
    );
}

export default ProductDetails;