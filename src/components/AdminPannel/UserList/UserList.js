import React from 'react'
import { Table } from 'react-bootstrap'



function UserList() {
    return (
        <div className="mt-5">

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>User List</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
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

                </tbody>
            </Table>
        </div>
    )
}

export default UserList
