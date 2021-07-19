
import React, { Component } from "react";
import { useHistory, withRouter,Link, Redirect } from "react-router-dom";
import './home.css';
import Navigation  from './Nav.js';
import moment from 'moment';

var time1;
let token="";
var rollno1;
var rollno;
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/i);
class Login1 extends React.Component {

  constructor(props) {
    let loggedIn=true;
    if(localStorage.getItem("token") == null){
      loggedIn=false;
    }
    super(props);
    this.state={
      
      pswd : '',
      rollno : '',
      loggedIn,
      errors: {   
        password: '',
        rollno : '',
      }

    }
  this.handleRollnoChange=this.handleRollnoChange.bind(this)
  this.handlePasswordChange=this.handlePasswordChange.bind(this)
  this.handleSubmit=this.handleSubmit.bind(this)
  
  }
  
  handleRollnoChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.rollno = 
          validRollRegex.test(value)
            ? ''
            : 'RollNo. is not valid!';
    this.setState({errors, [name]: value});
    console.log(this.state.rollno)
    rollno = "/Home1"+this.state.rollno;
    
  }

  handlePasswordChange=event=>{
    this.setState({
      pswd : event.target.value
    });
  }

  handleSubmit=event=>{
    event.preventDefault();
    console.log(this.state);
     var body = {
      pswd : this.state.pswd,
      rollno : this.state.rollno,
    }
   
   if(this.state.name==""){
      alert('Please enter the name')

    }
    else if(this.state.pswd==""){
      alert('Please enter the password')
  }
  
    else{
        if(this.state.rollno == "gnits@admin" && this.state.pswd == "12345678"){
          
      this.setState({
        loggedIn : true
      })
    }
      if(this.state.loggedIn){
        this.props.history.push("/admin");
        }
      
    
    else {
    alert("Invalid Credentials")
    }
 
  }

}
  render() {
       var min = parseInt(moment().minutes());
       var min1=min+30;
       time1 = moment().hour()+":"+min1+":"+moment().seconds()
        return (<div className="bg">

        <Navigation/>
            <br></br><br/>
            <br/>


            <div className="auth-wrapper2" >
            <div className="auth-inner">
              <div className="set">
            <form>
                <center><h3>Admin Login</h3></center>

                <div className="form-group">
                    <label>Roll Number</label>
                    <input type="text" name="rollno" id="examplename" className="form-control" placeholder="Enter Username"
                    onChange = {this.handleRollnoChange} value={this.state.rollno}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="pswd" id="examplePassword" className="form-control" placeholder="Enter password" 
                    onChange = {this.handlePasswordChange} value={this.state.pswd}/>
                  </div>

                

                <button type="submit" className="submitb" onClick={this.handleSubmit}>Login</button>

                
                
         
             
        
        

            </form>
            </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </div>
             
        );
       
    }
    
}

export default Login1;
