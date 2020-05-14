import React, { useEffect, useState } from 'react'
import SellItems from '../../sell/sellitems'
import axios from 'axios'

function EditProduct(props) {
    const id = props.match.params.id
    const [product, setProduct] = useState({})


    useEffect(() => {
        axios.get(`/api/buy/activeproductdetails/${id}`)
            .then(res => setProduct(res.data.data))
            .catch(err => err)
    }, [])

    return (
        <div>
            <SellItems product={product} />
            {console.log("product in edit component", product, id)}
            <h1>Edit Your Information ...</h1>

        </div>
    )
}

export default EditProduct
