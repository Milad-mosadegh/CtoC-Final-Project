import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic1 from '../../images/art.jpg'
import { Card } from 'react-bootstrap'
import Categories from '../lib/categories';
import { Link } from 'react-router-dom';
import './style.css'

const SlideShow = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    let cat = Categories
    return (
        <div className="container">
            <Slider {...settings} className="shadow-lg">
                {cat.map(data =>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" className='cardImg' src={pic1} />
                        <Card.Body className="bg-dark">
                            <Card.Title> <Link className="text-light" to={data.value}>{data.value}</Link></Card.Title>
                            {/*  <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text> */}
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                )}

            </Slider>
        </div>
    );
}

export default SlideShow;

