import React from 'react';
import ItemCard from './itemcard';
import { Link } from 'react-router-dom'


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





const Categories = () => {

    const allCat = [
        { value: 1, type: "Antiques",name:antique },
        { value: 2, type: "Art",name:art },
        { value: 3, type: "Baby",name:baby },
        { value: 4, type: "Books" ,name:book},
        { value: 5, type: "Cameras",name:camera },
        { value: 6, type: "Cell Phones & Accessories",name:cellphone },
        { value: 7, type: "Clothing, Shoes & Accessories",name:clothings },
        { value: 8, type: "Computers & Accessories", name: it },
        { value: 9, type: "Consumer Electronics",name:consumer },
        { value: 10, type: "DVDs & Movies", name: movie },
        { value: 11, type: "Home & Garden",name:home },
        { value: 12, type: "Jewellery & Watches",name:jewellery },
        { value: 13, type: "Music Instruments & Gear",name:music },
        { value: 14, type: "Pet Supplies",name:pet },
        { value: 15, type: "Sports", name: sports },
        { value: 16, type: "Toys & Hobbies",name:toy },
        { value: 17, type: "Video Games & Consoles",name:game },
        { value: 18, type: "Others" }
    ];

    return (
        <div className="container-fluid p-5 colorGray">
            <div className="container text-center " >
                <div className="mt-5">
                    <h1>Categories</h1>
                </div>
                <div className="row justify-content-around ">
                    {allCat.map(data =>
                        <Link to="/signin"><ItemCard title={data.type} image={[data.name]} /></Link>
                    )}
                </div>


            </div>
        </div>
    );
}

export default Categories;