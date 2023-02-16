import React, { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Col, Button} from 'react-bootstrap';
import axios from "axios";
import './Dish.css';
import { Link } from 'react-router-dom';

const SERVER_URL = "http://localhost:8086/";

function ViewDish(props) {
    const params = useParams();
    const [dish, setDish] = useState({});
    
    useEffect(() => {

       axios
      .get(SERVER_URL + "v1/dish/view/" + params.id)
      .then((response) => {
        console.log(response.data.dishId)
        setDish(response.data)
      })
      .catch((error) => {
        console.log(error)
      });

    }, [params.id])


    return (

        <Col className=" dish-card app__bg app__heaser section__padding" >
            <Card key={params.id} className="app__bg" align="center">
                <Card.Title className="app__header-h1">{dish.name}</Card.Title>
                <Card.Img variant="top" 
                    src={ "http://localhost:8086/v1/image/view/" + dish.dishId} 
                    alt="Image not found" 
                    className = "dish-images" 
                    height={300}/>
                <Card.Body>
                    <Card.Text className="p__opensans">{dish.description}</Card.Text>
                    <Card.Text className="p__opensans">Recipe: {dish.recipe}</Card.Text>
                    <Card.Text className="p__opensans">Pris: {dish.price} Kr</Card.Text>
                    <Card.Text className="p__opensans">Dish Available Today: {dish.inUse ? "Yes" : "No"} </Card.Text> 
                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-info"
                            className="custom__button">
                            <Link to={"/Meny"} >
                            <FontAwesomeIcon icon={faArrowLeft} /> Go BacK TO Menu
                            </Link> 
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
} 

export default ViewDish;