import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchUsers } from '../../services/index';
import {Card, Table, ButtonGroup, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers, faEdit, faStepBackward, faStepForward, faFastBackward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from "axios";

class Users extends Component {

    constructor(props){
        super(props);
        this.state = {
            users : [],
            currentPage : 1,
            usersPerpge : 5
        };
        this.userRole = 'user';
        this.state.show = false;
    }

    componentDidMount(){
        this.props.fetchUsers();
    }

    changeRole = (currentUser) => {
        
        if(currentUser.role === 'admin'){
            this.userRole = 'user'
        }else{
            this.userRole = 'admin'
        }

        const user = {
            email: currentUser.email,
            userId: currentUser.id,
            role: this.userRole
        };
        
        axios.put("http://localhost:8086/v1/user/update/" + currentUser.email, user)
        .then(response => {
            if(response.data != null)
            {
               this.setState({"show":true});
               setTimeout(() => this.setState({"show":false}), 3000);
               this.componentDidMount();
            }else{
                this.setState({"show":false});
            }
        });
    };

    changePage = event => {
            if(isNaN(event.target.value) || (event.target.value === '')) {
                    this.setState({
                    [event.target.name]: ''
                });
            }else {
                    this.setState({
                    [event.target.name]:parseInt(event.target.value)
                });
            }
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState ({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState ({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage <  Math.ceil(this.props.userData.users.length / this.state.usersPerpge)) {
            this.setState ({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        let usersLength = this.props.userData.users.length;
        if(this.state.currentPage < Math.ceil(usersLength / this.state.usersPerpge)) {
            this.setState ({
                currentPage:  Math.ceil(usersLength / this.state.usersPerpge)
            });
        }
    };


    render(){

        const { currentPage, usersPerpge } = this.state;
        const lastIndex = currentPage * usersPerpge;
        const firstIndex = lastIndex - usersPerpge;
        const userData = this.props.userData;
        const users = userData.users;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(users.length / usersPerpge);


        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return(
            <div>
                 <div style = {{"display" : this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show}  message = {"Role Updated Successfully"}  type = {"success"} />
                </div>
                {userData.error ?
                    <Alert variant="danger">
                        {userData.error}
                    </Alert> :
                    <Card className="app__header app__bg section__padding" id="user">
                    <Card.Header className="app__header-h1"> 
                        <FontAwesomeIcon icon={faUsers} /> All users
                    </Card.Header>
                    <Card.Body>
                    <Table bordered hover striped variant='dark' className = 'app__bg'>
                        <thead>
                            <tr key= "">
                                <th>#</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ?
                                <tr align = "center">
                                    <td colSpan = "2"> No Users Available ! </td>
                                </tr> :
                                currentUsers.map((user, index) => (
                                <tr key= {user.id} >
                                    <td > {index + 1} </td>
                                    <td > {user.userName} </td>
                                    <td > {user.email} </td>
                                    <td > {user.role} </td>
                                    <td > 
                                        <ButtonGroup>
                                            <Button size="sm" 
                                                variant="outline-primary"  
                                                onClick={this.changeRole.bind(this, user)} 
                                                className="custom__button">
                                                    <FontAwesomeIcon icon={faEdit} /> Change Role
                                            </Button>
                                        </ButtonGroup>

                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div className="p__opensans" 
                            style={{"float" : "left"}}>
                            Showing Page {currentPage} of {totalPages}
                        </div>
                        <div style={{"float" : "right"}}>
                            <InputGroup>
                                
                                <Button type="button" 
                                    variant="outline-info" 
                                    disabled= {currentPage === 1 ? true : false}
                                    onClick = {this.firstPage}
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                </Button>
                                <Button type="button" 
                                    variant="outline-info"
                                    onClick = {this.prevPage}
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                </Button>
                                
                                <FormControl style={pageNumCss} 
                                    className={"app__bg"} 
                                    name="currentPage" value={currentPage}
                                    onChange = {this.changePage}/>
                                    
                                <Button type="button" 
                                    variant="outline-info"
                                    onClick = {this.nextPage}
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                </Button>
                                <Button type="button" 
                                    variant="outline-info" 
                                    disabled= {currentPage === totalPages ? true : false}
                                    onClick = {this.lastPage}
                                    className="custom__button">
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                </Button>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card> 
               
               }
                     
            </div>
                  
        );
    }
}

const mapStateToProps = state =>{
    return {
        userData: state.user
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);