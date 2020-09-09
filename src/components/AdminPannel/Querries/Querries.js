import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function Querries() {
        useEffect(()=>{
            axios.get()
    
        })
    const  [querries, setQuerries]=useState([{
        id:1,
        name:"Ather",
        email:"atherahmad@gmail.com",
        subject:"TEsing",
        message:"sjkldafjaklsdjfklajds",
        timeStamp:"23-11-2020",
        completed:false
    },
    {
        id:2,
        name:"Ather",
        email:"atherahmad@gmail.com",
        subject:"TEsing",
        message:"sjkldafjaklsdjfklajds",
        timeStamp:"23-11-2020",
        completed:false
    }])
        return (
            <div className="mt-5">
    
                <div className="active-message-head"></div>
                <div className="active-message-text">
                    <h1>Customer Querries</h1>
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
                    {querries.length > 0 ? querries.map(data => {
                        let myDate = new Date(data.timeStamp)
                        return <tr className="active-message-body" onClick={()=>console.log(" querry selected", data.id)} >
                            <td>{data.name}</td>
                            <td>{data.subject}</td>
                            <td>{data.email}</td>
                            <td>{data.timeStamp}</td>
                            <td>{data.completed?"Completed":"In Proccess"}</td>
                        </tr>
                    }
                    ) : <h4>You have no Messages!</h4>}
    
                    </tbody>
                </Table>
            </div>
        )
    }
 

export default Querries
