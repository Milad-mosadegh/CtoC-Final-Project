import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './style.css'

import it from '../../images/it.jpg'
import sports from '../../images/sport.jpg'
import home from '../../images/home.jpg'
import game from '../../images/game.jpg'
import music from '../../images/music.jpg'
import movie from '../../images/movie.jpg'
import antique from '../../images/antique.jpg'
import art from '../../images/art.jpg'
import baby from '../../images/baby.jpg'
import book from '../../images/book.jpg'
import camera from '../../images/camera.jpeg'
import cellphone from '../../images/cellphone.jpeg'
import clothings from '../../images/clothings.jpg'
import jewellery from '../../images/jewellery.jpg'
import consumer from '../../images/consumer.jpeg'
import pet from '../../images/pet.jpeg'
import toy from '../../images/toys.jpeg'

const SlideShow = () => {
    const allCat = [
        { value: 1, type: "Antiques", name: antique },
        { value: 2, type: "Art", name: art },
        { value: 3, type: "Baby", name: baby },
        { value: 4, type: "Books", name: book },
        { value: 5, type: "Cameras", name: camera },
        { value: 6, type: "Cell Phones & Accessories", name: cellphone },
        { value: 7, type: "Clothing, Shoes & Accessories", name: clothings },
        { value: 8, type: "Computers & Accessories", name: it },
        { value: 9, type: "Consumer Electronics", name: consumer },
        { value: 10, type: "DVDs & Movies", name: movie },
        { value: 11, type: "Home & Garden", name: home },
        { value: 12, type: "Jewellery & Watches", name: jewellery },
        { value: 13, type: "Music Instruments & Gear", name: music },
        { value: 14, type: "Pet Supplies", name: pet },
        { value: 15, type: "Sports", name: sports },
        { value: 16, type: "Toys & Hobbies", name: toy },
        { value: 17, type: "Video Games & Consoles", name: game },
        { value: 18, type: "Others" }
    ];


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };


    return (
        <div className="container">
            <Slider {...settings} className="shadow-lg ">
                {allCat.map(data =>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" className='cardImg' src={data.name} />
                        <Card.Body className="bg-dark cbh">
                            <Card.Title> <Link className="text-light fs" to={data.type}>{data.type}</Link></Card.Title>
                        </Card.Body>
                    </Card>
                )}

            </Slider>
        </div>
    );
}

export default SlideShow;

