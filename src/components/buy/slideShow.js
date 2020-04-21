import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "../lib/categories"


import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './style.css'

const SlideShow = () => {

    const [categories, setCategories] = useState("")
    useEffect(() => {
        setCategories(Categories);

    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        vertical:true,
        verticalSwiping:true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="container">
            <Slider {...settings} className="shadow-lg ">
                {categories ? categories.map(data =>
                    <Card >
                        <Card.Img variant="top" className='cardImg' src={require(`../../images/${data.imgName}`)} />
                        <Card.Body className="bg-dark">
                            <Card.Title >
                                <Link className="text-light fs" to={data.value}>
                                    {data.value}
                                </Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ) : null}

            </Slider>
        </div>
    );
}

export default SlideShow;

