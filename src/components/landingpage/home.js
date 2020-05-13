import React, { useState, useEffect } from 'react';

import LastSeen from './lastseen';

import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';



import '../styles/main.css'
import Footer from '../footer/footer';
import LatestProducts from './latestProducts';
import ProductDetails from '../buy/productDetails';


const Home = (props) => {
    const [auth, setAuth] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [showMainComponent, setShowMainComponents] = useState(true)
    const setTargetProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }
    const unAuthenticated = () => setAuth(false)
    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            const getData = async () => {
                let response = await GET("/api/auth/authenticated")
                if (response.data) {
                    if (response.data.status === "success") setAuth(true)
                }
                else setAuth(false)
            }
            getData()
        }
    }, [])
    return (
        <div>
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId}
                /> :
                <div>
                    <MyNavbar {...props} />
                    <div className="fixedBackground">
                        <div className="container">
                            <h1>WelcomE To <span className="c">C</span>-To-<span className="c">C</span> OnlinE ShoP</h1>
                            <h3>With Us - Take The BesT</h3>
                        </div>
                    </div>


                    <div className="homeCard">
                        <div className="leftCard">
                            <LatestProducts setTargetProduct={setTargetProduct} />
                        </div>

                        <div className="rightCard">
                            <LastSeen auth={auth}
                                setTargetProduct={setTargetProduct}
                                unAuthenticated={unAuthenticated} /> 
                        </div>
                    </div>

                    <div className="darkWhite p-5">
                        <h2 className='mb-5'> See What we Have in Categories</h2>
                        <div className="container">
                        <SlideShow />
                                                    </div>
                        
                        <div className="homeBanner"></div>
                    >
                        <Footer />
                    </div>
                </div>
            }

        </div>
    );
}

export default Home;