import React, {Component} from 'react';
import {Navbar, Container, Col} from 'react-bootstrap';

export default class Footer extends Component {
    render(){
        let date = new Date().getFullYear();
        return(
            <Navbar className='app__footer' fixed='bottom'>
                 <Container>
                    <Col lg ={12} className="text-center text-muted">
                        <div className='text-white'>
                            Hope you have a good experience.
                        </div> 
                        <div className='text-white'>
                            {date} All Rights Reserved by Hobby Kitchen.
                        </div> 
                    </Col>
                 </Container>
            </Navbar>   
        );
    }
}