import React, { useState, useEffect } from 'react';

import LastSeen from './lastseen';

import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

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
                < div >
                    <MyNavbar {...props} />
                    <div className="fixedBackground">
                        <div className="container">
                            <h1>WelcomE To <span className="c">C</span>-To-<span className="c">C</span> OnlinE ShoP</h1>
                            <h3>With Us - Take The BesT</h3>
                        </div>
                    </div>


                    <div className="homeCard">
                        <div className="leftCard">
                            <Zoom duration={1000}>
                                <LatestProducts setTargetProduct={setTargetProduct} />
                            </Zoom>
                        </div>

                        <div className="rightCard">
                            <Zoom top delay={200}>
                                <LastSeen auth={auth}
                                    setTargetProduct={setTargetProduct}
                                    unAuthenticated={unAuthenticated} /> 
                            </Zoom>
                        </div>
                    </div>

                    <div className="darkWhite p-5">
                        <Fade right>
                            <SlideShow />
                        </Fade>
                    </div>
                    <div className="homeBanner"></div>

                    <div>
                        <Footer />
                    </div>
                </div>
            }

        </div>
    );
}

export default Home;