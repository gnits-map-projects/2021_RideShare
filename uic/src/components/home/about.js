import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './home.css';
import Navigation from './Nav.js';

export default class About extends Component{
    constructor(props) {
        super(props);
      }
    render() {
        return (
        <div> <Navigation/></div>
    
        );
    }
}
