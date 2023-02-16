import React, {Component} from 'react';
import Axios from 'axios';
import {Card, Table, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import MyToast from './MyToast';
import dateFormat from 'dateformat';

export default class Orders extends Component {


    constructor(props){
        super(props);
        this.state = {
            orders : []
        };
        this.state.show = false;
    }
    
    componentDidMount(){

        Axios.get("http://localhost:8086/v1/order/checkStatus/false")
        .then((response) => {
            this.setState({orders: response.data});
        })
        .catch((error) => {
        });
    };

    completeOrder = (orderDetails) => {
       
        const order =  {
            orderId: orderDetails.orderId,
            isCompleted: true,
            }
            Axios.put("http://localhost:8086/v1/order/update/" + orderDetails.orderId, order)
            .then((response) => {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.componentDidMount();
            })
            .catch((error) => {
                this.setState({"show":false});
        });
    };

    
    render(){
        return (
            <div className='app__header app__bg section__padding'>
                <div style = {{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show}  message = {"Order Updated Successfully"}  type = {"success"} />
                </div>
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
                                        <th>User</th>
                                        <th>Dishes</th>
                                        <th>Date of Order</th>
                                        <th>Action</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.length === 0 ?
                                    <tr align = "center">
                                        <td colSpan = "6"> No Orders Available ! </td>
                                    </tr> :
                                    this.state.orders.map((order) => (
                                        <tr key={order.orderId}>
                                            <td >{order.orderId}</td>
                                            <td >{order.totalPrice + ' '} kr</td>
                                            <td >{order.email}</td>
                                            <td>
                                                {order.dishList.map((dish) => (
                                                <div key=" " className='app__bg'>
                                                    {dish.name + '-qty('}   
                                                    {dish.quantity + ')'}
                                                </div>
                                                ))}
                                            </td>
                                            <td >{dateFormat(order.dateOfOrder, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                            <td >
                                                <Button
                                                    variant="outline-success"  
                                                    onClick={this.completeOrder.bind(this, order)} 
                                                    className="custom__button btn-block mr-1 mt-1 btn-lg">
                                                        <FontAwesomeIcon icon={faThumbsUp} /> Complete Order
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant = "info"
                                hidden = {true}
                                onClick={this.componentDidMount()}> 
                                Check Status
                            </Button>
                        </Card.Footer>
                    </Card>
            </div>
        );
    }
}