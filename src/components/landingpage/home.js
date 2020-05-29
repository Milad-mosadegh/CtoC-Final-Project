import React, { useState, useEffect } from 'react';
import LastSeen from './lastseen';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';
import '../styles/main.css'

import LatestProducts from './latestProducts';
import ProductDetails from '../buy/productDetails';
import MyFooter from '../footer/footer';



const Home = (props) => {
    const [auth, setAuth] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [favorit, setFavorit] = useState([])
    const setTargetProduct = (id) => {
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        setShowModal(false)
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
            const getFavorities = async () => {
                if (!localStorage.getItem("c2c-token")) return
                let response = await GET("/api/account/getfavoritelist")
                if (response.data.status === "success")
                    setFavorit(response.data.favourities)
            }
            getFavorities()
        }
    }, [])

    const favoritHandler = async () => {
        let response = await GET("/api/account/getfavoritelist")
        if (response.data.status === "success") setFavorit(response.data.favourities)
    }

    return (
        <div>
            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose}
                    id={productId} {...props}
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
                            <LatestProducts
                                setTargetProduct={setTargetProduct}
                                favorit={favorit}
                                favoritHandler={favoritHandler} />
                        </div>

                        <div className="rightCard">
                            <LastSeen auth={auth}
                                setTargetProduct={setTargetProduct}
                                favorit={favorit}
                                favoritHandler={favoritHandler}
                                unAuthenticated={unAuthenticated} /> 
                        </div>
                    </div>

                    <div className="homeBanner"></div>
                    <div className="darkWhite p-5">
                        <h2 className='mb-5'> See What we Have in Categories</h2>
                        <div className="container">
                        <SlideShow />
                            </div>
                    </div>
            <MyFooter /> 
                            </div>
               }  
                    </div>
    );        
            }   
  
export default Home;