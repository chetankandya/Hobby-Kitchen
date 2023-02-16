import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleDish from './SingleDish';
import './Menu.css'
import { Row, Table, Card } from 'react-bootstrap';


function Meny(props) {

    const { onAdd } = props;
    const [dishes, setDishes] = useState([]);
    
    useEffect(() => {

        axios.get("http://localhost:8086/v1/dish/checkStatus/true")
        .then((response) => {
            setDishes(response.data)
        })
        .catch((error) => {
            console.log(error)
        });

        }, [])

    return (
            <div>
                <Card className='app__header app__bg app__wrapper section__padding'>
                <div className="app__specialMenu-title">
                    <h1 className="headtext__cormorant">Today&apos;s Menu</h1>
                </div>
                    <Card.Body className='app__bg'>
                        <Table bordered hover striped variant='dark'>
                            <Row className="app__bg ">
                                {dishes.map((dish) => {
                                    return <SingleDish dish={dish} key={dish.dishId} onAdd={onAdd}/>;
                                })}
                            </Row>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
    );
}

export default Meny;