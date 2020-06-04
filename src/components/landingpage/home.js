import React, { useState, useEffect,useContext } from 'react';
import LastSeen from './lastseen';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';
import '../styles/main.css'
import LatestProducts from './latestProducts';
import ProductDetails from '../buy/productDetails';
import MyFooter from '../footer/footer';
import  {GlobalContextContext} from "../Context/contextApi"

const Home = (props) => {

    const [profile,setProfile]=useContext(GlobalContextContext)
    const [showModal, setShowModal] = useState(false)
    const [productId, setProductId] = useState("")
    const [lastSeenProducts, setLastSeenProducts] = useState([])
    const setTargetProduct = (id) => {
        setShowModal(true)
        setProductId(id)
    }

    const handleClose = () => {
        setShowModal(false)
    }
    const unAuthenticated = () => setProfile({ ...profile,
        auth:false,
       userId:false,
       favorities:[],
       name:false
   })
    useEffect(() => {
        if (localStorage.getItem("c2c-token")) {
            const getData = async () => {
                let response = await GET("/api/auth/authenticated")
                if (response.data) {
                    if (response.data.status === "success") {
                        setProfile({ ...profile,
                        auth:true,
                        userId:response.data.data._id,
                        name:response.data.data.firstName,
                        favorities:response.data.data.liked
                   })
                }}
                else setProfile({ ...profile,
                    auth:false,
                   userId:false,
                   favorities:[],
                   name:false
               })
            }
            getData()
            const getFavorities = async () => {
                if (!localStorage.getItem("c2c-token")) return
                let response = await GET("/api/account/getfavoritelist")
                if (response.data.status === "success")
                setProfile({ ...profile,favorities:response.data.favourities})
            }
            getFavorities()
        }
    }, [])
    const getLastSeen = async () => {
        let response = await GET("/api/account/lastseen")
        if (response.data.status === "success") setLastSeenProducts(response.data.data)
        else {
            localStorage.removeItem("c2c-token")
            localStorage.removeItem("c2c-profile")
            unAuthenticated()
        }
    }

    const favoritHandler = async () => {
        let response = await GET("/api/account/getfavoritelist")
        if (response.data.status === "success") setProfile({ ...profile,favorities:response.data.favourities})
    }

    return (
        <div>
            <MyNavbar {...props} />


            {showModal ?
                <ProductDetails showModel={showModal} handleClose={handleClose} getLastSeen={getLastSeen}
                    id={productId} {...props}
                /> :

                <div>

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
                                favorit={profile.favorities}
                                favoritHandler={favoritHandler}
                                />
                        </div>

                        <div className="rightCard">
                            <LastSeen auth={profile.auth}
                                setTargetProduct={setTargetProduct}
                                favorit={profile.favorities}
                                favoritHandler={favoritHandler}
                                unAuthenticated={unAuthenticated}
                                lastSeenProducts={lastSeenProducts}
                                getLastSeen={getLastSeen}  /> 
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
    )
}
export default Home;