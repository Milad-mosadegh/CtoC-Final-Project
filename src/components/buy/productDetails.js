import React from 'react';

const ProductDetails = ({ showModel, handleClose, title, description, images }) => {
    return (
        <div show={showModel} onHide={handleClose}>
            <div>
                {title}
            </div>
            <div className="modal-image">
                <img src={`http://localhost:5000/avatars/${images ? images[0] : null}`} alt="" />
            </div>
            <div>
                {description}
            </div>
            <button onClick={handleClose}>
                Close
            </button>
        </div>
    );
}

export default ProductDetails;