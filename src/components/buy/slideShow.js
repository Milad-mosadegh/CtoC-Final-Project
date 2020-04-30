import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "../lib/categories"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../styles/main.css'

const SlideShow = (props) => {

    const [categories, setCategories] = useState("")
    useEffect(() => {
        setCategories(Categories);

    }, [])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        verticalSwiping: false,
        useCSS: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };


    return (

        <div>

            <div className="" >

                <Slider {...settings} className="shadow-lg">
                    {categories ? categories.map(data =>
                        <Card >
                            <Card.Img variant="top" className='cardImg' src={require(`../../images/${data.imgName}`)} />
                            <Card.Body className="sliderBg">
                                <Card.Title >
                                    <Link to={data.value}>
                                        <span className="sliderTitle">{data.value}</span>
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ) : null}

                </Slider>
            </div>
        </div>
    );
}

export default SlideShow;

