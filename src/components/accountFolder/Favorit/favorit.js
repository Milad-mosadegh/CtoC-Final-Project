import React from 'react';
import Swiper from 'react-id-swiper';

class Favorite extends React.Component {
    render() {

        return (
            <div>
                <Swiper>
                    <div>Slide 1</div>
                    <div>Slide 2</div>
                    <div>Slide 3</div>
                    <div>Slide 4</div>
                    <div>Slide 5</div>
                </Swiper>
            </div>
        )
    }
}

export default Favorite;