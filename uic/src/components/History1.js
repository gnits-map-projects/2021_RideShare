import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './history.css'
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './home/Nav1';


var obj;
const style = {
  height: 50,
  width: 150,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const cardStyle = {
  margin:20,
  marginRight:50,
  textAlign: 'left',
  align: 'center',
  padding: '20px',
  chip: {
    margin: 10,
  },
};

const hisList ={
  display: 'flex !important',
  textAlign: 'left !important',
  align: 'center !important',
  justifyContent: 'center'
}
const buttonStyle ={
  // marginLeft : 20,
}

class History1 extends Component {
  constructor(props){
  super(props);
  this.state={
    data:[],
    open: false,
    
    
    }
    this.handleUpcoming = this.handleUpcoming.bind(this);
    this.handlePast= this.handlePast.bind(this);
    this.handleCanceled = this.handleCanceled.bind(this);
  }

  componentDidMount = () => {
 
 
 }
 handleUpcoming(){
     window.location.href="/history"
 }
 handlePast(){
 window.location.href="/past"
 }
 handleCanceled(){
  window.location.href="/cancelled1"
 }
listItems(){
  
}
  render() {
    let time1 = moment().format("HH:MM:SS")
    if(localStorage.getItem("time") >= time1){
      
    return (
      <div className="App">
        <Navbar/>
        <div>
         
          <h1>History</h1>
          <ul role="nav" >
          <br></br><br></br><br></br>
          <button className="buttonClass" onClick={this.handleUpcoming}>Upcoming Rides</button><br></br><br></br>
          <button className="buttonClass" onClick={this.handlePast}>Past Rides</button><br></br><br></br>
          <button className="buttonClass" onClick={this.handleCanceled}>Canceled Rides</button>
          </ul>
         
       </div>
      </div>
    );
  }
  else{
    window.location.href="/logout"
  }
}
}

export default History1;
