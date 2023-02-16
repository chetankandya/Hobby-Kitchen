import React from 'react';
import {Badge, Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from "../../services/index";
import logo from "../../images/Logo.png";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './Navbar.css';


export default function NavigationBar(props) {

    const [toggleMenu, setToggleMenu] = React.useState(false);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let isAdmin = auth.userrole === 'admin' ? true : false; 
   
    const logout = () => {
        dispatch(logoutUser());
    };

    const guestLinks = (
        <>
            <ul  className="app__navbar-links ">
                <Link to={"/meny"} className='nav-link'> Today's Menu </Link>
                <Link to={"/allDishes"} className='nav-link'>Old Dishes</Link>
                <Link to={"/about"} className='nav-link'>About</Link>
                <Link to={"/contact"} className='nav-link'>Contact</Link>
            </ul>
            <ul className="app__navbar-login">
                <Link to={"/signup"} className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus} /> Register
                </Link>
                <Link to={"/login"} className="nav-link">
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                </Link>
            </ul>
        </>
      );

    
    const userLinks = (
        <>
            <ul  className="app__navbar-links">
                <Link to={"/meny"} className="nav-link"> Today's Menu </Link>
                <Link to={"/allDishes"} className="nav-link">Old Dishes</Link>
                { isAdmin === true 
                    ? <>
                    <Link to={"/allUsers"} className="nav-link">View All Users</Link>
                    <Link to={"/order"} className="nav-link">Orders</Link>
                    <Link to={"/postDish"} className="nav-link">Post New Dish</Link>
                    </>
                    : <> 
                    <Link to={"/about"} className='nav-link'>About</Link>
                    <Link to={"/contact"} className="nav-link">Contact</Link>
                    <Link to={"/myorder"} className="nav-link">My Order</Link>
                    <ul  className="app__navbar-login">
                        <Link to={"/cart"} className='nav-link'>
                            Cart <FontAwesomeIcon icon={faShoppingCart} />
                            {props.countCartItems ? (
                                <Badge>{props.countCartItems}</Badge>
                            ) : (
                                ''
                            )}
                        </Link>{' '}
                    </ul>
                    </>
                }
            </ul>
            <ul  className="app__navbar-login">
                <Link to={"/userDetails"} className="nav-link">
                    Hi {auth.username}
                </Link> 
                <Link to={"/logout"} className="nav-link" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Link>
            </ul>
        </>
      );

        return(
            <Navbar className="app__navbar ">
                
                <Link to={"/"} className="app__navbar-logo">
                    <img
                    height={25}
                    width= {25}
                    src= {logo}
                    alt="brand"
                    />{" "}
                </Link>
                {auth.isLoggedIn ? userLinks : guestLinks}

                <div className="app__navbar-smallscreen">
                    <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
                    {toggleMenu && (
                    <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                        <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
                        <ul className="app__navbar-smallscreen_links">
                            <Link to={"/"} className='smallscreen_links' onClick={() => setToggleMenu(false)}>Home</Link>
                            <Link to={"/meny"} className='smallscreen_links' onClick={() => setToggleMenu(false)}>Today's Menu</Link>
                            <Link to={"/AllDishes"} className='smallscreen_links' onClick={() => setToggleMenu(false)}>View All Dishes</Link>
                            <Link to={"/about"} className='smallscreen_links' onClick={() => setToggleMenu(false)}>About</Link>
                            <Link to={"/contact"} className='smallscreen_links'  onClick={() => setToggleMenu(false)}>Contact</Link>
                           
                            {auth.isLoggedIn ? 
                            <>
                            <Link to={"/myorder"} className='smallscreen_links'  onClick={() => setToggleMenu(false)}>My Order</Link> 
                            <Link to={"logout"} className='smallscreen_links' onClick={logout}> Logout </Link>
                            <Link to={"/cart"} className='smallscreen_links'>
                                Cart <FontAwesomeIcon icon={faShoppingCart} />
                                {props.countCartItems ? (
                                    <Badge>{props.countCartItems}</Badge>
                                ) : (
                                    ''
                                )}
                            </Link>{' '} 
                            </> : 
                            <>
                             <Link to={"signup"} className='smallscreen_links'  onClick={() => setToggleMenu(false)}> Register </Link>
                            <Link to={"login"} className='smallscreen_links'  onClick={() => setToggleMenu(false)}> Login </Link>
                            </>}
                        </ul>
                    </div>
                    )}
                </div>
            </Navbar>   
        );
}