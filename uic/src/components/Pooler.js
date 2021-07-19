// modules/Pooler.js
import React, { Component } from 'react';
import Form3 from './Form3';
import logo from './images/logo.svg';
import Header from './HeaderComponent';
import Form1 from './Form1';
import { Link,Redirect } from 'react-router-dom';
import Navbar from './home/Nav1';
var eid,profile,pooler,driver,history;

class Pooler extends Component{

    constructor(props){
      super(props);
      
      this.state={
        origin:"",
        destination:""
      };

    }

    render() {
    return (
      <div className="App">
          
    <Navbar/>    
        <div>
        <Form3/>
      
       </div>
      </div>
    );
  }
}

export default Pooler;
