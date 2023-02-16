import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { authenticateUser } from '../services/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faEnvelope, faLock, faUndo} from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
        
        const [error, setError] = useState();
        const [show, setShow] = useState(true);
          
        const initialState = {
            email: "",
            password: "",
        };

        const [user, setUser] = useState(initialState);
          
        const credentialChange = (event) => {
            const { name, value } = event.target;
            setUser({ ...user, [name]: value });
          };
        
        const dispatch = useDispatch();
        
        const validateUser = () => {
            dispatch(authenticateUser(user.email, user.password))
            .then((response) => {
                console.log(response.data);
                return props.history.push("/");
            })
            .catch((error) => {
                console.log(error.message);
                setShow(true);
                resetLoginForm();
                setError("Invalid email and password");
            });
        };
        
        const resetLoginForm = () => {
            setUser(initialState);
        };

        return(
            <div>
                {show && props.message && (
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                        {props.message}
                    </Alert>
                    )}
                    {show && error && (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        {error}
                    </Alert>
                    )}
                    <Card className='justify-content-md-center app__header app__bg app__wrapper section__padding'>
                        <Card.Header className="app__header-h1">
                            <FontAwesomeIcon icon = {faSignInAlt} /> Login
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon = {faEnvelope} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete = "off" type="email" name="email" value= {user.email} onChange = {credentialChange}
                                            className = {"app__bg text-white "} placeholder = "Enter Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon = {faLock} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete = "off" type="password" name="password" value= {user.password} onChange = {credentialChange}
                                            className = {"app__bg text-white"} placeholder = "Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <div align= "center">
                                <Button size="sm" 
                                    type="button" variant="success"
                                    disabled= {user.email.length === 0 || user.password.length === 0}
                                    onClick = {validateUser}
                                    className="custom__button">
                                        <FontAwesomeIcon icon = {faSignInAlt} /> Login
                                </Button>{' '}
                                <Button size="sm" 
                                    type="button" variant="info"
                                    disabled= {user.email.length === 0 && user.password.length === 0}
                                    onClick = {resetLoginForm}
                                    className="custom__button">
                                        <FontAwesomeIcon icon = {faUndo} /> Reset
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
            </div>         
        );
};

export default Login;