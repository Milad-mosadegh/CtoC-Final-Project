import React, { useState } from 'react';
import { Tab, Tabs, Col, Nav, Row } from 'react-bootstrap'
import ProductDetails from '../../buy/productDetails';
import '../../styles/main.css'
import ActiveProducts from './activeProducts';
import InactiveProducts from './inactiveProducts';
import SoldProducts from './soldProducts';


const Activity = (props) => {
    const { favorit, favoritHandler } = props
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [url, setUrl] = useState("")



    const setTargetProduct = (id, url) => {
        setShowModal(true)
        setUrl(url)
        setProductId(id)
    }


    const handleClose = () => {
        setShowModal(false)

    }



    return (

        <div className="border shadow milad">

              {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={12}>
                        <Nav variant="pills" justify="false" className="d-flex mt-5">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Active Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Inactive Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Sold Products</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Tab.Content>
                        <Tab.Pane eventKey="first" >
                            <ActiveProducts
                                setTargetProduct={setTargetProduct}
                                favorit={favorit}
                                favoritHandler={favoritHandler}
                            />
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                            <InactiveProducts
                                setTargetProduct={setTargetProduct}
                                favorit={favorit}
                                favoritHandler={favoritHandler}
                            />
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                            <SoldProducts
                                setTargetProduct={setTargetProduct}
                                favorit={favorit}
                                favoritHandler={favoritHandler}
                            />
                        </Tab.Pane>
                    </Tab.Content>

                </Row>
            </Tab.Container> */}




            <Tabs
                id="uncontrolled-tab-example"
                mountOnEnter={true}
                unmountOnExit={true}
                variant='pills'
                defaultActiveKey= {props.location.subKey ? props.location.subKey : "active"}
                className="d-flex justify-content-center ml-2"
            >
                <Tab eventKey="active" title="Active Products"  >
                    <ActiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="inactive" title="Inactive Products" >
                    <InactiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="sold" title="Sold Products" >
                    <SoldProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>


            </Tabs>



            {showModal ?
                <ProductDetails
                    showModel={showModal}
                    handleClose={handleClose}
                    id={productId}
                    url={url}
                    {...props}
                /> : null}

        </div>



    );
}

export default Activity;