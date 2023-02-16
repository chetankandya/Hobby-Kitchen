import Axios from 'axios';
import {Card, Table, Button} from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

function MyOrders(props) {

    const [orders, setOrders] = useState([]);
    const auth = useSelector((state) => state.auth);

    const fetchOrders = useCallback(() => {
        
        Axios.get("http://localhost:8086/v1/order/viewByEmail/" + auth.username)
        .then((response) => {
            setOrders(response.data)
        })
        .catch((error) => {
        });

    }, [auth.username]);
    
    useEffect(() => {
        fetchOrders();
        }, [fetchOrders])

    return (
        <div className='app__header app__bg section__padding'>
            <Card className='app__header app__bg section__padding' align = "center">
                <Card.Header className="app__header-h1"> 
                    <FontAwesomeIcon icon={faShoppingBasket} /> All Orders
                </Card.Header>

                <Card.Body className='app__bg section__padding'>
                    <Table bordered hover striped variant='dark' className = 'app__bg'>
                    <thead>
                            <tr key= "">
                                <th>Order Id</th>
                                <th>Total Price</th>
                                <th>Order Status</th>
                                <th>Dishes</th>
                                <th>Date of Order</th>
                            </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ?
                            <tr align = "center">
                                <td colSpan = "5"> No Orders Available ! </td>
                            </tr> :
                            orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td >{order.orderId}</td>
                                    <td >{order.totalPrice + ' '} kr</td>
                                    <td >{order.isCompleted ? "Completed" : "Preparing"}</td>
                                    <td>
                                        {order.dishList.map((dish) => (
                                        <div key=" " className='app__bg'>
                                            {dish.name + '-qty('}   
                                            {dish.quantity + ')'}
                                        </div>
                                        ))}
                                    </td>
                                    <td >{dateFormat(order.dateOfOrder, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <Button variant = "info"
                        className="custom__button"
                        align='right'
                        onClick={fetchOrders}> 
                        Check Status
                    </Button>
                </Card.Footer>
            </Card>
    
        </div>
    );
}

export default MyOrders;