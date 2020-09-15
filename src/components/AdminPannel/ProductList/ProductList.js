import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import SearchBar from '../../searchBar/searchbar';
import axios from 'axios'
import ProductListModal from './productListModal';
import Art from '../../../images/art.jpg'



function ProductList(props) {

    useEffect(() => {
        axios.get("/api/admin/activeproducts", {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setProducts(res.data.success) })
            .catch(err => err)

    }, [])


    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [creator, setCreator] = useState('')
    const [productId, setProductId] = useState(false)


    const handleClose = () => {
        setAdminRedAlert(false)
    }

    const getProducts = (e) => {
        console.log("pather ", e.target.value)
        axios.get(`/api/admin/${e.target.value}`, {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setProducts(res.data.success) })
            .catch(err => err)
    }

    const [adminRedAlert, setAdminRedAlert] = useState(false)

    return (
        <div className="mt-5">
            {adminRedAlert ?
                <ProductListModal
                    productId={productId}
                    closeHandler={handleClose}
                    adminRedBoxTitle={title}
                    adminRedBoxImage={Art}
                    adminRedCreator={creator}
                />
                : null}

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Product List</h1>
            </div>
            <SearchBar />
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Creator ID</th>
                        <th>Category</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th>
                            <select className="form-control search-slt"
                                name="searchCategory"
                                defaultValue={props.category}
                                onChange={e => getProducts(e)}>
                                <option value="activeproducts">Active Products</option>
                                <option value="inactiveproducts">Inactive Products</option>
                                <option value="blockedproducts">Blocked Products</option>
                                <option value="deletedproducts">Deleted Products</option>
                                <option value="soldproducts">Sold Products</option>
                                <option value="allproducts">All Products</option>
                            </select></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setProductId(data._id)
                                setAdminRedAlert(true)
                                setTitle(data.title)
                                setCreator(data.creator)
                                console.log(data)
                            }
                            }
                        >

                            <td>{data.refId}</td>
                            <td>{data.title}</td>
                            <td>{data.creator}</td>
                            <td>{data.category}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.active?"Active":data.blocked?"Blocked":data.sold?"Sold":data.deleted?"Deleted":"Inactive"}</td>
                        </tr>
                    }
                    ) : <h4>Currently no Products listed!</h4>}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductList
