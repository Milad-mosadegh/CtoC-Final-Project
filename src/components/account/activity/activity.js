import React, { useEffect, useState } from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap'
import ItemCard from '../../landingpage/itemcard';
import Zoom from 'react-reveal/Zoom';

import UnitedCards from '../../landingpage/unitedCards';

import GET from '../../lib/get';
import ProductDetails from '../../buy/productDetails';


const Activity = (props) => {

    const [products, setProducts] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")


    const interProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProducts(id)
    }


    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }

    useEffect(() => {
        const fetchData = async () => {
            let response = await GET("/api/account/myproducts")
            console.log("response from buy", response)
            setProducts(response.data.data)
        }
        fetchData()
    }, [])

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
                                <Nav.Link eventKey="third">Sold Products</Nav.Link>
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
                                                {products ? products.map(add =>
                                                    <UnitedCards
                                                        images={add.images.length > 0 ? add.images[0] : 'noimage.png'}
                                                        title={add.title}
                                                        price={add.price}
                                                    />
                                                ) : null}
                                                {/* <UnitedCards myAdds={myAdds ? myAdds : null}
                                                    interProduct={interProduct}
                                                /> */}
                                            </div>
                                            {showModal ?
                                                <ProductDetails showModel={showModal} handleClose={handleClose}
                                                    id={productId}
                                                /> : null}
                                        </div>
                                    </div>
                                </Zoom>
                            </Tab.Pane>



                            <Tab.Pane eventKey="third">
                                <Zoom>
                                    <div className=' text-center'>
                                        <div className="d-flex">
                                            <div className="row">
                                                {products ? products.map(add =>
                                                    <UnitedCards
                                                        images={add.images.length > 0 ? add.images[0] : 'noimage.png'}
                                                        title={add.title}
                                                        price={add.price}
                                                    />
                                                ) : null}
                                                {/* <UnitedCards myAdds={myAdds ? myAdds : null}
                                                    interProduct={interProduct}
                                                /> */}
                                            </div>
                                            {showModal ?
                                                <ProductDetails showModel={showModal} handleClose={handleClose}
                                                    id={productId}
                                                /> : null}
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

export default Activity;