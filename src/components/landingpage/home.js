import React, { useState, useEffect } from 'react';

import MyCarousel from '../carousel/carousel';
import PopularProduct from './poplularproducts';
import LastSeen from './lastseen';
import SearchBar from '../searchBar/searchbar';
import MyNavbar from '../navbar/navBar';
import GET from '../lib/get';
import SlideShow from '../buy/slideShow';

import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

import '../styles/main.css'
import Footer from '../footer/footer';

const Home = (props) => {
    const [auth, setAuth] = useState(false)

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
                        <PopularProduct />
                    </div>
                </Zoom>

                {/* Last Seen */}
                <Zoom top delay={200}>

                    <div className="lastSeenBox ">
                        {auth ? <LastSeen /> :
                            <div className="describ">
                                <h3>What You Can Do Here ?!</h3>
                                <p>
                                    modi soluta maxime ab dolorum repellendus eius corporis necessitatibus assumenda incidunt vel delectus reprehenderit voluptatem suscipit nesciunt possimus officia. Doloribus commodi necessitatibus qui ab illo sed vitae in, amet cupiditate aliquid. Dolore voluptates inventore magnam architecto exercitationem. Ab ipsam repellendus laborum atque at amet nemo, consequuntur tempora deserunt eligendi vero alias sequi, debitis voluptatibus veniam suscipit aperiam. Quo sint veniam fuga enim ex perspiciatis cum fugiat, reiciendis quas aut, maiores tempore architecto obcaecati, nam cupiditate delectus! Autem rerum corrupti ipsum maiores pariatur reiciendis?
                                </p>
                                <div className="extra">
                                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe exercitationem nam vitae laborum autem quis illum perspiciatis, </p>
                                    <button value="Go" className="fa fa-long-arrow-right" />
                                </div>
                            </div>
                        }
                    </div>
                </Zoom>
            </div>
            {/* <MyCarousel /> */}
            <Fade right>
                <SlideShow />
            </Fade>
            <div className="homeBanner"></div>

            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Home;