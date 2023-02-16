import React from 'react';
import authToken from "../../utils/authToken";
import SubHeading from '../SubHeading/SubHeading';
import welcome from "../../images/welcome.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import './Welcome.css';
import About from '../About/About';
import Contact from '../Contact';
import Intro from '../Intro/Intro';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

const Welcome = (props) => {

    if(localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }
        return(
            <div>
            <div className="app__header app__bg app__wrapper section__padding" id="home">
                <div className="app__wrapper_info">
                    <SubHeading title="Chase the new flavour" />
                    <h1 className="app__header-h1">The Food You Crave For.</h1>
                        <p className="p__opensans" style={{ margin: '2rem 0' }}>
                            Amazing Indian food with a swedish twist.
                         </p>
                    <button type="button" 
                        className="custom__button"
                        variant="info">
                        <Link to={"/Meny"} >
                            Explore Menu<FontAwesomeIcon icon={faEdit} />
                        </Link> 
                    </button>
                </div>

                <div className="app__wrapper_img">
                    <img 
                     src={welcome}
                     alt="header_img" />
                </div>
            </div>  
            <div>
                 <About />
            </div>
            <div>
                <Intro /> 
            </div>
            <div>
                <Contact /> 
            </div>
            <div>
                <Footer />
            </div>
        </div>
        );
};

export default Welcome;