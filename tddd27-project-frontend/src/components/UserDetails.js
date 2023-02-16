import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';


function UserDetails(props) {

    const [user, setUser] = useState({});
    const [address, seAddress] = useState([]);
    const auth = useSelector((state) => state.auth);
    
    useEffect(() => {

        axios.get("http://localhost:8086/v1/user/view/" + auth.username)
        .then((response) => {
            console.log(response.data)
            setUser(response.data)
            seAddress(response.data.addresses)
        })
        .catch((error) => {
            console.log(error)
        });

        }, [auth.username])

    return (
            <div>
                <Card className='app__header app__bg app__wrapper section__padding'>
                <div className="app__special">
                    <h1 className="headtext__cormorant">User Details</h1>
                </div>
                    <Card.Body className='app__bg'>
                        <div className="p__opensans"> User Name : { user.userName}</div>
                        <div className="p__opensans"> Email : { user.email}</div>
                        <div className="p__opensans"> Role : { user.role}</div>
                        <div className="p__opensans">
                            {address.map((addr) => {
                                return (
                                    <div className="p__opensans"> 
                                        <div> Address: { addr.address} </div>
                                        <div> Phone Number:{ addr.phoneNumber}</div>
                                    </div>
                                    );
                                })
                            }
                        </div>

                    </Card.Body>
                    <Card.Footer>
                        <Button variant="outline-info"  
                                //onClick={() => onAdd(dish)}
                                className="custom__button">
                                <FontAwesomeIcon icon={faEdit} /> Change Password
                        </Button>{' '}
                        <Button variant="outline-info"  
                                //onClick={() => onAdd(dish)}
                                className="custom__button">
                                <FontAwesomeIcon icon={faEdit} /> Update Address
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
    );
}

export default UserDetails;