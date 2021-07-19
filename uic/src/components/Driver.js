
import React, { Component } from 'react';
import Form2 from './Form2';
import { Link,Redirect } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Image
} from 'react-bootstrap'

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
    margin: '0 auto',
  },
};

var eid,profile,pooler,driver,history;

class Driver extends Component{
    constructor(props) {
      super(props);
      eid = this.props.match.params.rollno
      profile = "/profile/"+eid;
      pooler = "/pooler/"+eid;
      driver = "/driver/"+eid;
      history = "/history/"+eid;
    }

    render() {
    return (
      <div className="App">
         <Navbar bg="#1565c0" expand="md">
      
      <Navbar.Brand href="#home"><h2 ><Link to="/Home"><b className="heading">RIDE SHARE</b></Link></h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="mr-auto"></Nav>
          <Nav>
          <Nav.Link href={profile}><h5><b>PROFILE</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href= {history}><h5><b>HISTORY</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/logout"><h5><b>LOGOUT</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav>
       
      </Navbar.Collapse>
    </Navbar>    
        
        <div style={{backgroundImage: "url('findRideBg.v2.jpg')" ,height:'100%'}}>
        <h2>Find A Ride</h2>
        <div>
        <Form2/> 
       </div>
       </div>
      </div>
    );
  }
}

export default Driver;
