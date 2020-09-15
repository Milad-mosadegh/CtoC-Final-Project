import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import UserListModal from './userListModal'




function UserList() {
    useEffect(() => {

        axios.get("/api/admin/getuserlist", {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setUsers(res.data.success) })
            .catch(err => err)

    }, [])
    const closeHandler = () => {
        setUserList(false)
    }

    const [users, setUsers] = useState([])
    const [userList, setUserList] = useState(false)
    const [userId, setUserId] = useState(false)
    return (
        <div className="mt-5">
            {userList ? <UserListModal closeHandler={closeHandler} /> : null}
            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>User List</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>email</th>
                        <th>Access Level</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr key={data._id} className="active-message-body"
                            onClick={() => {
                                setUserList(true)
                                setUserId(data._id)
                            }} >
                            <td>{data._id}</td>
                            <td>{data.firstName}</td>
                            <td>{data.lastName}</td>
                            <td>{data.email}</td>
                            <td>{data.admin ? "Admin" : "User"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Users!</h4>}
                </tbody>
            </Table>
        </div>
    )
}

export default UserList
