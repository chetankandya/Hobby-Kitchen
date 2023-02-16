import React, {Component} from 'react';
import {Card, Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class Signup extends Component {

    constructor(props) {

        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.error = false;
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    initialState = {
        userName:'', email:'', password:''
    }

    resetUser = () => {
        this.setState(() => this.initialState);
    }

    submitUser = event => {
        event.preventDefault();
        
        const user = {
            userName: this.state.userName, 
            email: this.state.email, 
            password: this.state.password,
            role: "user"
        };

        axios.post("http://localhost:8086/v1/user/create", user)
            .then(response => {
                    if(response.data != null)
                    {
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}), 3000);
                    }else{
                        this.setState({"show":false});
                    }
                })
                .catch((error) => {
                    this.setState({"error": true});
                    setTimeout(() => this.setState({"error":false}), 3000);
                    console.log(error);
                });
        this.setState(this.initialState);   
    }

    userChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    render(){

        const {userName, email, password} = this.state;

        return(
            <div >
                <div style = {{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Signup Successful"} type = {"success"}/>
                </div>
                <div style = {{"display" : this.state.error ? "block" : "none"}}>
                    <MyToast show = {this.state.error} message = {"User already exist"} type = {"danger"}/>
                </div>
                    <Card className='justify-content-md-center app__bg app__wrapper section__padding'>
                    <Card.Header className="app__header-h1"> Sign Up</Card.Header>
                    <Form onReset= {this.resetUser} onSubmit={this.submitUser} id='userForm'>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="formUserName">
                                <Form.Label  className="p__opensans">User Name</Form.Label>
                                <Form.Control required
                                    type="text" 
                                    name = "userName"
                                    value = {userName}
                                    onChange = {this.userChange} 
                                    className='app__bg text-white' 
                                    placeholder="User Name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label  className="p__opensans">Email address</Form.Label>
                                <Form.Control required
                                    type="email" 
                                    name = "email"
                                    value = {email}
                                    onChange = {this.userChange} 
                                    className='app__bg text-white' 
                                    placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label  className="p__opensans">Password</Form.Label>
                                <Form.Control required 
                                    type="password"
                                    name = "password" 
                                    value = {password}
                                    onChange = {this.userChange} 
                                    className='app__bg text-white' 
                                    placeholder="Password" />
                            </Form.Group>
                        </Card.Body> 
                            <div align="center">
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
                                        <FontAwesomeIcon icon={faSave} /> Submit
                                </Button>
                            </div> 
                    </Form>
                </Card>  
            </div>
        );
    }
}