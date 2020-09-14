import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import QueriesPopup from '../PopupMessage/QuriesPopup'

function Querries() {

    useEffect(() => {

        axios.get("/api/admin/getquerries", {
            headers: {
                'x-auth-token': localStorage.getItem('c2c-token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => { if (res.data.success) setQuerries(res.data.success) })
            .catch(err => err)

    }, [])
    const [querries, setQuerries] = useState([])
    const [productId, setProductId] = useState(false)

    const [queriesPopup, setQueriesPopup] = useState(false)

    const closeHandler = () => {
        setQueriesPopup(false)
    }
    return (
        <div className="mt-5">
            {queriesPopup ? <QueriesPopup productMessageId={productId} closeHandler={closeHandler} /> : null}

            <div className="active-message-head"></div>
            <div className="active-message-text">
                <h1>Customer Querries</h1>
            </div>

            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {querries.length > 0 ? querries.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body"
                            onClick={() => {
                                setQueriesPopup(true)
                                setProductId(data._id)
                            }
                            }
                            style={{ cursor: "pointer" }}

                        >
                            <td>{data._id}</td>
                            <td>{data.name}</td>
                            <td>{data.subject}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.completed ? "Completed" : "In Proccess"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Messages!</h4>}

                </tbody>
            </Table>
        </div >
    )
}


export default Querries
