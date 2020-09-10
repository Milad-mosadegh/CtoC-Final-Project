import React ,{useEffect, useState}from 'react'
import { Table } from 'react-bootstrap'
import SearchBar from '../../searchBar/searchbar';
import axios from 'axios'

function ProductList() {

    useEffect(()=>{
            
        axios.get("/api/admin/getproducts",{
            headers:{
                'x-auth-token':localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res=>{if(res.data.success) setProducts(res.data.success)})
            .catch(err=>err)

    },[])
    const  [products, setProducts]=useState([])
    return (
        <div className="mt-5">
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
                    </tr>
                </thead>
                <tbody>
                {products.length > 0 ? products.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body" onClick={()=>console.log(" querry selected", data._id)} >
                            <td>{data._id}</td>
                            <td>{data.title}</td>
                            <td>{data.creator}</td>
                            <td>{data.category}</td>
                            <td>{data.timeStamp}</td>
                        </tr>
                    }
                    ) : <h4>Currently no Products listed!</h4>}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductList
