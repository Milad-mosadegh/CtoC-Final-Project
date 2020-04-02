import React from 'react';
import { Table } from 'react-bootstrap'

const Inbox = (props) => {
    const myDate = new Date().toLocaleTimeString()
    return (
        <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{props.of}</th>
                        <th>Date</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>{myDate}</td>
                        <td>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</td>
                        <button className="btn btn-danger">Reply</button>
                    </tr>

                </tbody>
            </Table>
        </div>
    );
}

export default Inbox;