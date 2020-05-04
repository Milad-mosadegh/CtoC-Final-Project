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
    const interProduct = (id) => {
        setShowMainComponents(false)
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        setShowModal(false)
        setShowMainComponents(true)

    }

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
                    <div className="container" style={{ marginTop: "20px" }} >
                        {/* <SearchBar /> */}
                    </div>


                    {/* Popular Side */}
                    <div className="homeWrap">
                        <Zoom duration={1000}>
                            <div>
                                <LatestProducts interProduct={interProduct} />
                            </div>
                        </Zoom>

                        {/* Last Seen */}
                        <Zoom top delay={200}>
                            <LastSeen auth={auth} />
                        </Zoom>
                    </div>
                    {/* <MyCarousel /> */}
                    <div className="mt-5">
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