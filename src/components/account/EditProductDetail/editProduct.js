import React from 'react'
import SellItems from '../../sell/sellitems'


function EditProduct(props) {
    const id = props.match.params.id

    return (
        <div>
            <SellItems id={id} {...props}/>
            <h1>Edit Your Information ...</h1>

        </div>
    )
}

export default EditProduct
