import React, { useState } from 'react';
import './App.css';
import { Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from './components/Navbar/NavigationBar';

import Meny from './components/Menu/Meny';
import Cart from './components/Cart/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import Welcome from './components/Welcome/Welcome';
import Users from './components/Users/Users';
import Dishes from './components/Dishes/Dishes';
import Orders from './components/Orders';
import PostDish from './components/PostDish';
import About from './components/About/About';
import MyOrder from './components/MyOrder';
import ViewDish from './components/ViewDish/ViewDish';
import UserDetails from './components/UserDetails';

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };


  const [cartItems, setCartItems] = useState([]);

  const onAdd = (dish) => {
    const exist = cartItems.find((x) =>  x.dishId === dish.dishId);
    if (exist) { 
    console.log("exist");
      setCartItems(
        cartItems.map((x) =>
          x.dishId === dish.dishId ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  };

  const onRemove = (dish) => {
    const exist = cartItems.find((x) => x.dishId === dish.dishId);
    if (exist.quantity > 1) {
      setCartItems(
        cartItems.map((x) =>
          x.dishId === dish.dishId ? { ...exist, quantity: exist.quantity - 1 } : x
        )
        );
      } else {
      setCartItems(cartItems.filter((x) => x.dishId !== dish.dishId));
    }
  };

  return (
    <Router>
      <NavigationBar countCartItems={cartItems.length} />
        <Row>
          <Col>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/about" exact component={About} />
              <Route exact path="/meny">
                <Meny onAdd={onAdd}/>
              </Route>
              <Route exact path="/cart">
                <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}/>
              </Route>
              <Route path="/allUsers" exact component={Users} />
              <Route path="/userDetails" exact component={UserDetails} />
              <Route path="/allDishes" exact component={Dishes} />
              <Route path="/postDish" exact component={PostDish} />
              <Route path="/edit/:id" exact component={PostDish} />
              <Route path="/view/:id" exact component={ViewDish} />
              <Route path="/order" exact component={Orders} />
              <Route path="/myorder" exact component={MyOrder} />
              <Route path="/Signup" exact component={Signup} />
              <Route path="/Login" exact component={Login} />
              <Route path="/Contact" exact component={Contact} />
              <Route path="/logout" exact component={Login}/>
            </Switch>
          </Col>
        </Row>
    </Router>
  );
};

export default App;
