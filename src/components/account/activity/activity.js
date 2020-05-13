import React, { useEffect, useState } from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap'

import Zoom from 'react-reveal/Zoom';


import GET from '../../lib/get';
import ProductDetails from '../../buy/productDetails';
import Products from '../../buy/products';

import '../../styles/main.css'


const Activity = (props) => {

    const [products, setProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [inActiveProducts, setInActiveProducts] = useState("")



    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/account/myproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
            let res = await GET("/api/account/inactiveproducts")
            setInActiveProducts(res.data.products)
        }
        fetchData()
    }, [])

    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }


    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

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
                            <Zoom>
                                <div>
                                    <Products
                                        products={products}
                                        setTargetProduct={setTargetProduct}
                                    />
                                    {showModal ?
                                        <ProductDetails showModel={showModal} handleClose={handleClose}
                                            id={productId}
                                        /> : null}
                                </div>
                            </Zoom>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">

                            <Zoom>
                                <div>
                                    {console.log(inActiveProducts, "in activities")}
                                    <Products
                                        products={inActiveProducts}
                                        setTargetProduct={setTargetProduct}
                                    />
                                    {showModal ?
                                        <ProductDetails showModel={showModal} handleClose={handleClose}
                                            id={productId}
                                        /> : null}
                                </div>
                            </Zoom>

                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <Zoom>
                                <div>
                                    <Products
                                        products={products}
                                        setTargetProduct={setTargetProduct}
                                    />
                                    {showModal ?
                                        <ProductDetails showModel={showModal} handleClose={handleClose}
                                            id={productId}
                                        /> : null}
                                </div>
                            </Zoom>
                        </Tab.Pane>
                    </Tab.Content>

                </Row>
            </Tab.Container>

        </div>



    );
}

export default Activity;