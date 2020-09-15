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

    console.log(complainsInfo);

    const [complain, setComplain] = useState()
    const closeHandler = () => {
        setComplain(false)
    }

    const [title, setTitle] = useState()
    const [userId, setUserId] = useState()
    const [creatorId, setCreatorId] = useState()
    const [message, setMessage] = useState()


    return (
        <div className="mt-5">
            {complain ? <ComplainsPopup
                title={title}
                userId={userId}
                creatorId={creatorId}
                message={message}
                closeHandler={closeHandler} /> : null}
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

                    {complainsInfo.length > 0 ? complainsInfo.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body" onClick={() => {
                            setComplain(true)
                            setTitle(data.title)
                            setUserId(data._id)
                            setCreatorId(data.creatorId)
                            setMessage(data.message)
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
