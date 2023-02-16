import React, {Component} from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { deleteDish, fetchAllDishes, updateDish } from '../../services/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import SubHeading from '../SubHeading/SubHeading';
import axios from 'axios';
import MyToast from '../MyToast';
import {Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

class Dishes extends Component {

    constructor(props){
        super(props);
        this.isAdmin = true;
        this.state = {
            dishes : []
        };
    }

    componentDidMount(){
        this.getAllDishes();
    }
    
    getAllDishes() {
        axios.get("http://localhost:8086/v1/dish/viewAll")
            .then(response => response.data)
            .then((data) => {
                this.setState({dishes: data});
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem('jwtToken');
                this.props.history.push("/");
            });
    };

    deleteDish = (dishId) => {
        this.props.deleteDish(dishId);

        let dish = this.props.dishesData.dish

        setTimeout(() => {

            if(dish != null) 
            {
                axios.delete("http://localhost:8086/v1/image/delete/" + dishId)
                .then(res => {
                    console.log(res);
                })
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    dishes: this.state.dishes.filter(dish => dish.dishId !== dishId)
                });
            }else{
                this.setState({"show":false});
            }
        }, 1000);
    };

    addToMenu = (id) => {

        const dish = {
            dishId: id,
            inUse: true
        };

        this.props.updateDish(dish);

        setTimeout(() => {

            let dish = this.props.dishesData.dish
            if(dish != null) 
            {
                this.setState({"showToast":true, "addedToMenu":true});
                setTimeout(() => this.setState({"showToast":false}), 3000);
                this.componentDidMount();
            }else{
                this.setState({"showToast":false});
            } 
        }, 1000);
    };

    removeFromMenu = (id) => {

        const dish = {
            dishId: id,
            inUse: false
        };

        this.props.updateDish(dish);

        setTimeout(() => {

            let dish = this.props.dishesData.dish
            if(dish != null) 
            {
                this.setState({"showToast":true, "addedToMenu":false});
                setTimeout(() => this.setState({"showToast":false}), 3000);
                this.componentDidMount();
            }else{
                this.setState({"showToast":false});
            } 
        }, 1000);
    };

    render(){
       
        return(
            <div>
                <div style = {{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Dish deleted successfully."} type = {"danger"} />
                </div>
                <div style = {{"display" : this.state.showToast ? "block" : "none"}}>
                    <MyToast show = {this.state.added} message = {this.state.addedToMenu ? "Dish added to Menu." : "Dish removed from Menu."} type = {"success"} />
                </div>
                    <Card className='app__header app__bg app__wrapper section__padding'>
                    <div className="app__specialMenu-title">
                        <SubHeading title="All Dishes" />
                        <h1 className="headtext__cormorant">Dishes That We Make</h1>
                    </div>
                    <Card.Body className='app__bg'>
                    <Table bordered hover striped variant='dark'>
                    
                        <Row className="app__bg">
                            { this.state.dishes.map((dish) => {

                            return (
                                <Col className="dish-card app__bg">
                                    <Card key={dish.id} className="app__bg text-white">
                                        <Card.Img variant="top" 
                                            src={ "http://localhost:8086/v1/image/view/" + dish.dishId} 
                                            alt="Image not found" 
                                            className = "dish-images" 
                                            height={300}/>
                                        <Card.Body>
                                        <Card.Title className="app__header-h1">{dish.name}</Card.Title>
                                        <Card.Text className="p__opensans">{dish.description}</Card.Text>
                                        <Card.Text className="p__opensans">Recipe: {dish.recipe}</Card.Text>
                                        <Card.Text className="p__opensans">Pris: {dish.price} Kr</Card.Text>
                                        <Card.Text className="p__opensans">Dish Available Today: {dish.inUse ? "Yes" : "No"} </Card.Text>
                                        <ButtonGroup>

                                        {  this.props.auth.userrole === 'admin'  
                                        ?   <div>
                                                {dish.inUse ? (

                                                <Button variant="outline-primary"  
                                                    onClick={this.removeFromMenu.bind(this, dish.dishId)}
                                                    className="custom__button">
                                                        <FontAwesomeIcon icon={faSave} /> Remove From Menu
                                                </Button>
                                                ) : (
                                                <Button variant="outline-primary"  
                                                    onClick={this.addToMenu.bind(this, dish.dishId)}
                                                    className="custom__button">
                                                        <FontAwesomeIcon icon={faSave} /> Add to Today's Menu
                                                </Button>
                                                )}
                                                {' '}
                                                <Button variant="outline-primary"
                                                    className="custom__button">
                                                    <Link to={"/edit/" + dish.dishId} >
                                                        Edit Dish <FontAwesomeIcon icon={faEdit} />
                                                    </Link> 
                                                </Button>{' '}
                                                <Button variant="outline-danger" 
                                                    onClick={this.deleteDish.bind(this, dish.dishId)}
                                                    className="custom__button">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </div>
                                        :  <></>
                                        }
                                        </ButtonGroup>   
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                            })}
                        </Row>
                    </Table>
                    </Card.Body>
                </Card>  
           </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        dishesData: state.dish,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        fetchAllDishes: () => dispatch(fetchAllDishes()), 
        updateDish: (dish) => dispatch(updateDish(dish)),
        deleteDish: (dish) => dispatch(deleteDish(dish))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);


