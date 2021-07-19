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
      
      <Navbar.Brand href="/home"><h2 ><b className="heading">RIDE SHARE</b></h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="mr-auto"></Nav>
          <Nav>
          <Nav.Link href="/Home"><h5><b>HOME</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/Login"><h5><b>LOGIN</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/Signup"><h5><b>SIGN UP</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/contactus"><h5><b>CONTACT US</b></h5></Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Nav.Link href="/request"><h5><b>SEND REQUEST</b></h5></Nav.Link>
          </Nav>
       
      </Navbar.Collapse>
    </Navbar>      
</div>
         
        
  );
}}

export default Navigation;