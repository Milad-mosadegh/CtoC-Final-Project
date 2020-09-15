import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Table } from 'react-bootstrap'
import ComplainsPopup from './complainsPopup'


function Complains(props) {

    const [complainsInfo, setComplainsInfo] = useState('')

    useEffect(() => {

        axios.get("/api/admin/getcomplaints", {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setComplainsInfo(res.data.success) })
            .catch(err => err)

    }, [])
    const [complain, setComplain] = useState([])

    return (
        <div className="mt-5">
            {complain ? <ComplainsPopup /> : null}
            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Customer Complains</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Title</th>
                        <th>Product Owner   </th>
                        <th>Date/Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/*  "_id":"5f58cd3c9f182f7d1cc6c053","title":"Robot for sell","timeStamp":"2020-09-09T12:40:28.893Z" */}
                    {complainsInfo.length > 0 ? complainsInfo.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body" onClick={() => {
                            setComplain(true)
                        }} >
                            <td>{data.productId}</td>
                            <td>{data.title}</td>
                            <td>{data.creatorId}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.completed ? "Completed" : "In Proccess"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Messages!</h4>}

                </tbody>
            </Table>
        </div>
    )
}
export default Complains
