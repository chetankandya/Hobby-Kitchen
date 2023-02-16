import React from 'react';
import './About.css';
import spoon from "../../images/spoon.png";
import knife from "../../images/knife.png";

function About(props) {
    return (
        <div className="app__aboutus app__bg flex__center section__padding" id="about">

            <div className="app__aboutus-content flex__center">
            <div className="app__aboutus-content_about">
                <h1 className="headtext__cormorant">About Us</h1>
                <img src={spoon} alt="about_spoon" className="spoon__img" />
                <p className="p__opensans">
                    Hobby Kitchen is an online restaurant which is all about cooking tasty Indian recipies with a Swedish twist. We try out best to provide an unforgettable experience to our customers.
                </p>
            </div>

            <div className="app__aboutus-content_knife flex__center">
                <img src={knife} alt="about_knife" />
            </div>

            <div className="app__aboutus-content_history">
                <h1 className="headtext__cormorant">Our History</h1>
                <img src={spoon} alt="about_spoon" className="spoon__img" />
                <p className="p__opensans">
                    Hobby Kitchen was started when my friends liked my cooking so much that they wanted me to cook a whole buch of dishes and snacks for them. I then started cooking on the weekends and delivered a small number of orders. But in only a month, the number of orders increased exponentially.
                </p>
            </div>
            </div>
        </div>
    )

}

export default About;