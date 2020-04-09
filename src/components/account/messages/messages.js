import React from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap'
import Inbox from './inbox';

const Messages = (props) => {
    return (

        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Inbox</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Sent</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">All</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Inbox of="From" />
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                                <Inbox of="To" />
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                                <Inbox of="From/To" />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>



    );
}

export default Messages;