import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './home.css';
import Navigation from './Nav3.js';

var body;
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);
var u,p;
export default class Staffform extends Component {
  constructor(props) {
    super(props);
    this.handleRollnoChange = this.handleRollnoChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  
    this.state = {

      r:false,
      n:false,
      e:false,
      p:false,
      ph:false,
      g:false,
      a:false,
      rollno :'',
      name: "",
      email:"",
      pswd: "",
      phoneNumber:"",
      gender : "",
      age : "",
      username:'',
      password:'',
      errors: {
        name: '',
        email: '',
        password: '',
        rollno : '',
        mobile : '',
      }
     
      //confirmPassword: ""
      
    };

  }
  componentDidMount(){
    this.setState({
      
       rollno : localStorage.getItem("branch"),
       name : localStorage.getItem("name"),
       email:localStorage.getItem("email"),
       phoneNumber:localStorage.getItem("phoneNumber"),
       username:localStorage.getItem("username"),
       password:localStorage.getItem("password")
     })
     
     console.log(this.state.username)
     
   }
  validateForm() {
    return this.state.name.length > 0 && this.state.pswd.length > 5 ;
  }

  handleRollnoChange  = event => {
   
   this.setState({
       rollno:this.target.value
   })
   
    
 }

  handleNameChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.name = 
          value.length < 5
            ? 'Full Name must be 3 characters long!'
            : '';
    if(errors.name ==  '')
    {
          this.setState({n : true});
   }
    this.setState({errors, [name]: value});
    console.log(this.state.name)
   
  }

  handleEmailChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
    if(errors.email ==  '')
      {
         this.setState({e : true});
     }
    this.setState({errors, [name]: value});
    if(this.state.rollno == "CSE"){
        this.setState({
            username : "05"+this.state.email,
            password:"05"+this.state.email
        })
    }
    if(this.state.rollno == "IT"){
        this.setState({
        username : "12"+this.state.email,
        password:"12"+this.state.email
    })
    }
    if(this.state.rollno == "ECE"){
        this.setState({
            username : "04"+this.state.email,
            password:"04"+this.state.email
        })
    }
    if(this.state.rollno == "EEE"){
        this.setState({
            username : "02"+this.state.email,
            password:"02"+this.state.email
        })
    }
    if(this.state.rollno == "ETM"){
        this.setState({
            username : "17"+this.state.email,
            password:"17"+this.state.email
        })
    }
    
  }

  handlePasswordChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.password = 
    value.length < 8
      ? 'Password must be 8 characters long!'
      : '';
    if(errors.password ==  '')
      {
        this.setState({p : true});
      }
    this.setState({errors, [name]: value});
  }

  handleMobileChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.mobile = 
    (validMobileRegex.test(value))
      ? ''
      : 'Enter a valid phone number!';
   if(errors.mobile==  '')
    {
        this.setState({ph : true});
    }
    this.setState({errors, [name]: value});
    console.log(this.state.phoneNumber)
   
  }
  handleGenderChange(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleAgeChange(event) {
    this.setState({
      age : event.target.value
    });
  }




  handleSubmit(event){
   event.preventDefault();
    var  templateId = "join_ride";
      let d=this.state.data
      const p=localStorage.getItem("name")+"@123"
    this.setState({
        password:p
    })

      console.log(u)
      var body = {
          rollno    : this.state.email,
          phoneNumber   : this.state.phoneNumber,
          email  : this.state.email,
          age : "00",
          gender :"male",
          name :this.state.name,
          pswd : p,
          
          
          }
          console.log(body)
        const url = "http://localhost:9000/person";
        
        let headers = new Headers();
         headers.append('Content-Type','application/json');
         headers.append('Accept','application/json');
    
          headers.append('Access-Control-Allow-origin',url);
          headers.append('Access-Control-Allow-Credentials','true');
    
          headers.append('POST','GET');
          fetch(url, {
            headers:headers,
            method: 'POST',
            body: JSON.stringify(body)
          }).then(response=>{
             this.sendFeedback(templateId, { to_name: this.state.name,from_name: "",subject:"details Regarding Your Account", email: this.state.email ,message_html:"Your Request for the Website has been accepted by the admin You can now get access to the website by signing in"+"with this credentials "+" Username: "+this.state.email+" and password:"+this.state.password+"and you can update your profile by logging in"})
             alert("email") 
             return response.json();        
          }).then(response => {
              if(response.ok){
                  
              }
          });
   }
  
   sendFeedback (templateId, variables) {
    window.emailjs.send(
    'gmail', templateId,
    variables
    ).then(res => {
        alert('Email successfully sent!')
    })
    // Handle errors here however you like, or use a React error boundary
    .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    window.location.reload(false);
    window.location.href="/admin"
  }
  
    render() {
        const {errors} = this.state;
        return (<div className ="bg">
            
            <Navigation/>

            <br></br><br/>
            <br/>
           

            <div className="auth-wrapper1">
            <div className="auth-inner">
            <form>
                <center><h3>Create Profile For Staff</h3></center>

                <div className="form-group">
                    <label>Branch</label>
                    <input type="text"
                       name="rollno"
                      id="exampleRollno"
                      className="form-control"
                     // placeholder="Eg:CSE,IT,ECE,EEE,ETM"
                      value = {this.state.rollno} 
                      onChange = {this.handleRollnoChange} required/>
                      <span className='error'>{errors.rollno}</span>
                      
                      
                </div>
                 

                <div className="form-group">
                    <label>Name</label>
                    <input type="name"
                        name="name"
                        id="examplename"
                        className="form-control"
                        placeholder="Enter name"
                        value = {this.state.name} 
                        onChange = {this.handleNameChange} required/>
                   <span className='error'>{errors.name}</span>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"
                        name="email"
                        id="exampleEmail"
                        className="form-control"
                        placeholder="mygmail@gmail.com"
                        value = {this.state.email} 
                        onChange = {this.handleEmailChange} required/>
                <span className='error'>{errors.email}</span>
                </div>
                
                <div className="form-group">
                    <label>Mobile</label>
                    <input type="phone" name="phoneNumber" className="form-control" id="examplePhone" 
                    placeholder="Enter mobile number"
                    value = {this.state.phoneNumber}
                    onChange = {this.handleMobileChange} required/>
                    <span className='error'>{errors.mobile}</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit}>Generate uname,Password</button>
        </form>
        </div>
            </div></div>
        );
    }
}




