import React, { useState } from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap'
import ProductDetails from '../../buy/productDetails';
import '../../styles/main.css'
import ActiveProducts from './activeProducts';
import InactiveProducts from './inactiveProducts';
import SoldProducts from './soldProducts';


const Activity = (props) => {

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

            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" justify="false" className="flex-column mt-5">
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
                            />
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                            <InactiveProducts
                                setTargetProduct={setTargetProduct}
                            />
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                            <SoldProducts
                                setTargetProduct={setTargetProduct}
                            />
                        </Tab.Pane>
                    </Tab.Content>

                </Row>
            </Tab.Container>
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