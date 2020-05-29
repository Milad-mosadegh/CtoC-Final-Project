import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap'
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
    const [status, setStatus] = useState("")



    const setTargetProduct = (id, url, status) => {
        setShowModal(true)
        setUrl(url)
        setProductId(id)
        setStatus(status)
    }


    const handleClose = () => {
        setShowModal(false)

    }



    return (

        <div className="border shadow milad">
            <Tabs
                id="uncontrolled-tab-example"
                mountOnEnter={true}
                unmountOnExit={true}
                variant='pills'
                defaultActiveKey={props.location.subKey ? props.location.subKey : "active"}
                className="d-flex justify-content-center ml-2"
            >
                <Tab eventKey="active" title="Active Products" className="col-lg-3 col-md-3 col-sm-12" >
                    <ActiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="inactive" title="Inactive Products" className="col-lg-3 col-md-3 col-sm-12"  >
                    <InactiveProducts
                        setTargetProduct={setTargetProduct}
                        favorit={favorit}
                        favoritHandler={favoritHandler}
                    />
                </Tab>
                <Tab eventKey="sold" title="Sold Products" className="col-lg-3 col-md-3 col-sm-12"  >
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
                    status={status}
                    {...props}
                /> : null}

        </div>



    );
}

export default Activity;