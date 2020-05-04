import React, { useEffect, useState } from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap'

import Zoom from 'react-reveal/Zoom';


import GET from '../../lib/get';
import ProductDetails from '../../buy/productDetails';
import Products from '../../buy/products';


const Activity = (props) => {

    const [products, setProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")



    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/account/myproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()
    }, [])

    const interProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }


    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }

    return (

        <div className="border shadow">

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={12}>
                        <Nav variant="pills" justify="false" className="flex-column mt-5">
                            <Nav.Item>
                                <Nav.Link eventKey="first">My Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Sold Products</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>

                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Zoom>
                                <div>
                                    <Products
                                        products={products}
                                        interProduct={interProduct}
                                    />
                                    {showModal ?
                                        <ProductDetails showModel={showModal} handleClose={handleClose}
                                            id={productId}
                                        /> : null}
                                </div>
                            </Zoom>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">

                        </Tab.Pane>
                    </Tab.Content>

                </Row>
            </Tab.Container>

        </div>



    );
}

export default Activity;