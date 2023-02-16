import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Col} from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Menu.css';

function SingleDish(props) {

    const { dish, onAdd } = props;
    const auth = useSelector((state) => state.auth);

    return (
            <Col className="dish-card-menu app__bg">
                <Card key={dish.dishId} className=' app__header app__bg app__wrapper'>
                    <Card.Body>
                        <Card.Title className="app__header-h1">{dish.name}</Card.Title>
                        <Card.Img variant="top" 
                            src={ "http://localhost:8086/v1/image/view/" + dish.dishId} 
                            alt="Image not found" 
                            className = "dish-images" 
                            height={200}
                            width = {20}/>
                                <Card.Text className="p__opensans">Pris: {dish.price} Kr</Card.Text>
                            {auth.isLoggedIn ? 
                                <Button variant="outline-info"  
                                    onClick={() => onAdd(dish)}
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faPlus} /> Add to Cart
                                </Button>
                            : 
                            <></>
                            }
                            {' '}
                            <Button variant="outline-primary"
                                className="custom__button">
                                <Link to={"/view/" + dish.dishId} >
                                    View Dish <FontAwesomeIcon icon={faEye} />
                                </Link> 
                            </Button>
                        </Card.Body>
                </Card>
            </Col>
    );
}

export default SingleDish;