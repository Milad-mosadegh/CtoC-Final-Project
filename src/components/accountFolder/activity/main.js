import React from 'react';

import { Tab, Col, Nav, Row } from 'react-bootstrap'
import ItemCard from '../../LandigPage/ItemCard';
import Zoom from 'react-reveal/Zoom';


const MainActivity = () => {
    return (

        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">My Adds</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Bought</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Sold</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Zoom>
                                    <div className=' text-center'>
                                        <div className="d-flex">
                                            <div className="row">
                                                <ItemCard title="Miald" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                                <Zoom>
                                    <div className=' text-center'>
                                        <div className="d-flex">
                                            <div className="row">
                                                <ItemCard title="Miald" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                            </Tab.Pane>


                            <Tab.Pane eventKey="third">
                                <Zoom>
                                    <div className=' text-center'>
                                        <div className="d-flex">
                                            <div className="row">
                                                <ItemCard title="Miald" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                                <ItemCard title="NIma" />
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>

                            </Tab.Pane>


                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>



    );
}

export default MainActivity;