import React ,{ Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { BrowserRouter as Router, 
  Switch, 
  Route,
   Link } from "react-router-dom";
   import {
    Navbar,
    Nav,
    Form,
    FormControl,
    NavDropdown,
    Button,
    Image
  } from 'react-bootstrap'

class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <div>
      
<Navbar bg="#1565c0" expand="md">
      
      <Navbar.Brand href="/home1"><h2 ><Link to="/details"><b className="heading">RIDE SHARE</b></Link></h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="mr-auto"></Nav>
          <Nav>
          <Nav.Link href="/profile"><h5><b>PROFILE</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/history1"><h5><b>HISTORY</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/logout"><h5><b>LOGOUT</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav>
       
      </Navbar.Collapse>
    </Navbar>      
</div>
         
        
  );
}}

export default Navigation;