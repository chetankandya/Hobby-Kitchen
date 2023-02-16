import React, {Component} from 'react';
import SubHeading from './SubHeading/SubHeading';

export default class Contact extends Component {
    render(){
        return(
            <div className=' app__header app__bg app__wrapper section__padding'>
                 <SubHeading title="Contact me on hobbykitchen@gmail.com or call me at 0767578239" />
                
            </div>         
        );
    }
}