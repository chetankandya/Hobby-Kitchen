import React, { useState } from 'react';
import {Card, Button, Table, Alert} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import { saveOrder } from '../../services/index';

const Cart = (props) => {

const auth = useSelector((state) => state.auth);
const dispatch = useDispatch();
const [error, setError] = useState();
const [show, setShow] = useState(false);

const placeOrder = () => {

    const order =  {
        email : auth.username,
        isCompleted: false,
        dateOfOrder: new Date(),
        totalPrice: totalPrice,
        dishList: cartItems
    }
    console.log(order);
        dispatch(saveOrder(order))
        .then((response) => {
            console.log(response.data);
            setShow(true);
        })
        .catch((error) => {
            console.log(error.message);
            setShow(true);
            setError("Order cannot be placed at this time, please try again later.");
        });
    };
   
const { cartItems, onAdd, onRemove } = props;
const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
const taxPrice = itemsPrice * 0.14;
const shippingPrice = itemsPrice > 2000 ? 0 : 20;
const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <div>
        {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
            Order Placed Successfully, Check the status under My Order tab.
        </Alert>
        )}
        {show && error && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            {error}
        </Alert>
            )}
        <Card className='app__header app__bg section__padding' align = "center">
        <Card.Header className="app__header-h1"> 
                <FontAwesomeIcon icon={faShoppingBasket} /> Items In Cart
        </Card.Header>
        <Table bordered hover striped variant='dark' className = 'app__bg'>
                <tbody>
                    <Card.Body className='app__bg section__padding'>
                        {console.log(auth.isLoggedIn)}
                        {cartItems.length === 0 && <div className="col-2 p__opensans">Cart is empty</div>}
                        {cartItems.map((dish) => (
                            
                        <div key={dish.dishId}>
                            <td className="col-2 p__opensans" align='center'>{dish.name}</td>
                            <td className="col-2 p__opensans" align='center'>
                            <Button onClick={() => onRemove(dish)} className="custom__button" variant="danger">
                                <FontAwesomeIcon icon={faMinus} /> 
                            </Button>{' '}
                            <Button onClick={() => onAdd(dish)} className="custom__button" variant="info">
                                <FontAwesomeIcon icon={faPlus} /> 
                            </Button>
                            </td>

                            <td className="col-2 p__opensans" align='center'>
                            {dish.quantity} x {dish.price.toFixed(2)} kr
                            </td>
                        </div>
                        ))}

                        {cartItems.length !== 0 && (
                        <>
                            <hr></hr>
                            <td>
                                <tr className="p__opensans" align='left'>
                                    Items Price 
                                    <td align='left'>
                                        {itemsPrice.toFixed(2)} kr
                                    </td>
                                </tr>
                                <tr className="p__opensans" align='left'>
                                    Tax Price
                                    <td align='left'>
                                        {taxPrice.toFixed(2)} kr
                                    </td>
                                </tr>
                                <tr className="p__opensans" align='left'>
                                    Delivery Price 
                                    <td align='left'>
                                        {shippingPrice.toFixed(2)}  kr
                                    </td>
                                </tr>
                                <tr className="p__opensans" align='left'>
                                    Total Price
                                    <td align='left'>
                                        {totalPrice.toFixed(2)} kr
                                    </td>
                                </tr>
                            </td>
                            <hr />
                            <div align='center'>
                                <Button 
                                    onClick={placeOrder}
                                    className="custom__button">
                                    Place Order
                                </Button>
                            </div>
                        </>
                        )}
                    </Card.Body>
            </tbody>
            </Table>
        </Card> 
    </div>
  );
}

export default Cart;