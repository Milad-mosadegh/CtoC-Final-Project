import React from 'react'
import { Table } from 'react-bootstrap'
import SearchBar from '../../searchBar/searchbar';
function ProductList() {
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
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ProductList
