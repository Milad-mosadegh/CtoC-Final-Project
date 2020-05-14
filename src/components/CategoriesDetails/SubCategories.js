import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Categories from '../lib/categories'

import '../styles/main.css'
import MyNavbar from '../navbar/navBar';




function SubCategories(props) {
    const type = props.match.params.type
    const title = Categories.filter(data => data.linkName === type)[0].value

    console.log(title, "Somthings");


    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get(`/api/buy/categories/${type}`)
            .then(res => setProduct(res.data.products))
            .catch(err => err)
    }, [])


    return (
        <div>
            <MyNavbar {...props} />
            <div className="container">
                <div className="active-message-head"></div>
                <div className="active-message-text">
                    <h1>{title}</h1>
                </div>
            </div>

        </div>
    )
}

export default SubCategories
