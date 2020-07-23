import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import '../Style/Carrousel.css';




function Carrousel() {
    return (
        <div className="container-carrousel">
            <div className="carrousel-sizing">
                <AwesomeSlider animation="cubeAnimation" className="slider-homepage">
                    <div>
                        <img className="photo" src="./pictures/image1.jpg" alt="cirque" />
                    </div>
                    <div>
                        <img className="photo" src="./pictures/roue.jpg" alt="roue" />
                    </div>
                    <div>
                        <img className="photo" src="./pictures/image.jpg" alt="roue" />
                    </div>
                    <div>
                        <img className="photo" src="./pictures/image2.jpg" alt="roue" />
                    </div>
                </AwesomeSlider>
            </div>
        </div>
    );
}
export default Carrousel;
