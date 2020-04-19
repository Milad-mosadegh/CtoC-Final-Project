import React,{ useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "../lib/categories"


import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './style.css'

const SlideShow = () => {

    const [categories, setCategories] =useState("")
    useEffect(()=>{
        setCategories(Categories);

    },[])

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
                {categories?categories.map(data =>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" className='cardImg' src={ require(`../../images/${data.imgName}`) } />
                        <Card.Body className="bg-dark cbh">
                            <Card.Title> <Link className="text-light fs" to={data.value}>{data.value}</Link></Card.Title>
                        </Card.Body>
                    </Card>
                ):null}

            </Slider>
        </div>
    );
}

export default SlideShow;

