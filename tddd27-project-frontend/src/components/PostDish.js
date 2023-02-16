import React, {Component} from 'react';
import {Card, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { saveDish, fetchDish, updateDish } from '../services/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import SubHeading from './SubHeading/SubHeading';

class PostDish extends Component {

    constructor(props) {

        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.seclectedImage = null;
        this.imageDishId = "";
        this.dishChange = this.dishChange.bind(this);
        this.submitDish = this.submitDish.bind(this);
    }

    initialState = {
        id:'', name:'', image: null, description:'', recipe:'', creationDate:'', price:'', inUse: ''
    };


    componentDidMount() {
        
        const dishId = +this.props.match.params.id;
        if(dishId) {
            this.findDishById(dishId);
        }
    };

    resetDish = () => {
        this.setState(() => this.initialState);
    };

    findDishById = (dishId) => {

        this.props.fetchDish(dishId);
       
        setTimeout(() => {

            let dish = this.props.dishObject.dish;
            if(dish != null)
            {
                this.setState({
                    id: dish.dishId,
                    name: dish.name,
                    description: dish.description,
                    recipe: dish.recipe,
                    price: dish.price,
                    inUse: dish.inUse
                });
            }
        }, 700);
    };

    submitDish = event => {
        event.preventDefault();
        const dish = {

            name: this.state.name,
            description: this.state.description,
            recipe: this.state.recipe,
            creationDate: new Date(),
            price: this.state.price,
            inUse: this.state.inUse === '' ? true : false
        };

        this.props.saveDish(dish);
        setTimeout(() => {

            if(this.props.savedDishData.dish != null)
            {
                const imageData = new FormData();
                imageData.append('image', this.seclectedImage);
                imageData.append('dishId', this.props.savedDishData.dish.dishId);
                axios.post("http://localhost:8086/v1/image/upload", imageData)
                .then(res => {
                    console.log(res);
                })
    
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            }else{
                    this.setState({"show":false});
                }
            }, 2000);

        this.setState(this.initialState);
    };

    updateSingleDish = event => {
        event.preventDefault();
        const dish = {

            dishId: this.state.id,
            name: this.state.name,
            description: this.state.description,
            recipe: this.state.recipe,
            creationDate: new Date(),
            price: this.state.price,
            inUse: this.state.inUse 
        };

        this.props.updateDish(dish);
        setTimeout(() => {

            if(this.props.updatedDish.dish != null)
            {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.viewDishes(), 3000);
            }else{
                    this.setState({"show":false});
                }
            }, 2000);

        this.setState(this.initialState);
    };

    dishChange = event =>{
        if (event.target.files && event.target.files[0]) {
            this.seclectedImage = event.target.files[0];
        }else {
            this.setState({
                [event.target.name]:event.target.value
            });
        }
    };

    viewDishes = () => {
        return this.props.history.push("/allDishes");
    };

    render() {

        const { name, image, description, recipe, price, inUse} = this.state;
        return(
            <div>
                <div style = {{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Dish Updated Successfully" : "Dish Saved Successfully"} type = {"success"} />
                </div>
                <Card className='app__header app__bg section__padding'>
                    <div className="app__specialMenu-title">
                        <h1 className="headtext__cormorant"> {this.state.id ? "Update Dish" : "Create New Dish"} </h1>
                        <SubHeading title="Add Details for the new dish" />
                    </div>
                    <Form onReset= {this.resetDish} onSubmit={this.state.id ? this.updateSingleDish : this.submitDish} id='userForm'>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="formDishName">
                                <Form.Label className='p__opensans'>Dish Name</Form.Label>
                                <Form.Control required
                                    type="text"
                                    name = "name"
                                    value = {name}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white'
                                    placeholder="Dish Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDishImage">
                                <Form.Label className='p__opensans'>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name = "image"
                                    value = {image}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white'
                                    placeholder="Select an Image of the dish." />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDishDescription">
                                <Form.Label className='p__opensans'>Description</Form.Label>
                                <Form.Control required
                                    type="text"
                                    name = "description"
                                    value = {description}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white'
                                    placeholder="Enter description of the dish." />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRecipe">
                                <Form.Label className='p__opensans'>Recipe</Form.Label>
                                <Form.Control required
                                    type="text"
                                    name = "recipe"
                                    value = {recipe}
                                    style={{"height":200, "flex":1}}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white'
                                    placeholder="Recipe" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPrice">
                                <Form.Label  className='p__opensans'>Price</Form.Label>
                                <Form.Control required
                                    type="text"
                                    name = "price"
                                    value = {price}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white'
                                    placeholder="Price" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formInUse">
                                <Form.Label className='p__opensans'>Post dish Today </Form.Label>
                                <select
                                    type="dropdown"
                                    name = "inUse"
                                    value = {inUse}
                                    onChange = {this.dishChange}
                                    className='app__bg text-white' >
                                        <option value="true" className="text-dark ">Yes</option>
                                        <option value="false" className=" text-dark ">No</option>
                                </select >
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer align= "center">
                            <Button size='sm' 
                                variant="info" 
                                type="reset"
                                className="custom__button">
                                    <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size='sm' 
                                variant="success" 
                                    type="submit" 
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size='sm' 
                                variant="info" 
                                type="button" 
                                onClick = {this.viewDishes.bind()}
                                className="custom__button">
                                    <FontAwesomeIcon icon={faSave} /> View Dishes
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        savedDishData: state.dish,
        dishObject: state.dish,
        updatedDish: state.dish
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        saveDish: (dish) => dispatch(saveDish(dish)),
        fetchDish: (dishId) => dispatch(fetchDish(dishId)), 
        updateDish: (dish) => dispatch(updateDish(dish))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDish);