
import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import Navigation from './home/Nav1.js';
import './Profile.css';
var body;
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);

export default class Signup extends Component {
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

      r:true,
      n:true,
      e:true,
      p:true,
      ph:true,
      g:true,
      a:true,
      rollno:'',
      name: '',
      email:'',
      pswd: '',
      phoneNumber:'',
      gender : '',
      age :'',
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
     
      rollno : localStorage.getItem("srollno"),
      name : sessionStorage.getItem("uname"),
      email:sessionStorage.getItem("uemail"),
      pswd: localStorage.getItem("upswd1"),
      phoneNumber:sessionStorage.getItem("uphone"),
      gender : sessionStorage.getItem("ugender"),
      age :sessionStorage.getItem("uage"),
    })
    console.log(this.state)
    
  }
  validateForm() {
    return this.state.name.length > 0 && this.state.pswd.length > 5 ;
  }

  handleRollnoChange  = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.rollno = 
          validRollRegex.test(value)
            ? ''
            : 'RollNo. is not valid!';
    if(errors.rollno ==  'RollNo. is not valid!')
    {
      this.setState({r : false});
    }
    this.setState({errors, [name]: value});
    
  }

  handleNameChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.name = 
          value.length < 5
            ? 'Full Name must be 3 characters long!'
            : '';
    if(errors.name ==  'Full Name must be 3 characters long!')
    {
          this.setState({n : false});
   }
   else{
    this.setState({n : true});
  }
    this.setState({errors, [name]: value});
  }

  handleEmailChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
    if(errors.email ==  'Email is not valid!')
      {
         this.setState({e : false});
     }
     else{
      this.setState({e : true});
    }
    this.setState({errors, [name]: value});
  }

  handlePasswordChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.password = 
    value.length < 8
      ? 'Password must be 8 characters long!'
      : '';
    if(errors.password ==  'Password must be 8 characters long!')
      {
        this.setState({p : false});
      }
      else{
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
   if(errors.mobile==  'Enter a valid phone number!')
    {
        this.setState({ph : false});
    }
    else{
      this.setState({ph : true});
    }
    this.setState({errors, [name]: value});
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

  handleSubmit(event) {
    
    event.preventDefault();
    
    console.log(this.state)
     var body = {
      rollno :this.state.rollno,
      name : this.state.name,
      email : this.state.email,
      phoneNumber: this.state.phoneNumber,
      pswd : this.state.pswd,
      gender : this.state.gender,
      age : this.state.age
    }
    console.log(body);
    if(this.state.name==""){
      alert('Please enter the name')
    }
    else if(this.state.email==""){
      alert('Please enter the email')
    }
    else if(this.state.phoneNumber==""){
      alert('Please enter the phone number')
    }
    else if(this.state.pswd==""){
      alert('Please enter the password')
    }

    else if(this.state.age==""){
      alert('Please enter the age')
    }

    else if(this.state.gender==""){
      alert('Please enter the gender')
    }
    else{
    if(this.state.n == true && this.state.e == true && this.state.ph == true && this.state.p == true){
    console.log(this.state)
    const url = "http://localhost:9000/update";
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
    })
    //.then(response => response.json())
    //.then(contents => {console.log(contents);})
    .then(response => {
      if(response.ok){
        //alert("Details updated successfully!");
        this.props.history.push("/profile");
        }
      
    })
    .catch(()=> console.log("can't access " + url + " response. "))
    
  }

  else{
    alert("enter details correctly")
  }
}

  }

  
    render() {
        console.log(this.state)
        const {errors} = this.state;
        return (<div >
            
            <Navigation/>

            <br></br><br/>
            <br/>
           

             <div className="container">
            <form>
                <center><h3>Update Details</h3></center>

                <div className="row">
                 <div className="collabel">
                    <label>Name</label>
                 </div>
                 <div className="colvalue">
                    <input type="name"
                        name="name"
                        id="examplename"
                        className="form-control"
                        placeholder="Enter name"
                        value = {this.state.name} 
                        onChange = {this.handleNameChange} required/>
                         </div> 
                   <span className='error'>{errors.name}</span>
                  </div>

                <div className="row">
                 <div className="collabel">
                    <label>Email address</label>
                  </div>
                  <div className="colvalue">
                    <input type="email"
                        name="email"
                        id="exampleEmail"
                        className="form-control"
                        placeholder="mygmail@gmail.com"
                        value = {this.state.email} 
                        onChange = {this.handleEmailChange} required/>
                        </div>
                <span className='error'>{errors.email}</span>
                </div>
                
                <div className="row">
                <div className="collabel">
                    <label>Mobile</label>
                </div>
                <div className="colvalue">
                    <input type="phone" name="phoneNumber" className="form-control" id="examplePhone" 
                    placeholder="Enter mobile number"
                    value = {this.state.phoneNumber}
                    onChange = {this.handleMobileChange} required/>
                </div>
                    <span className='error'>{errors.mobile}</span>
                </div>
                
                
            <div className="row">
               <div className="collabel">
                 <label>Password</label>
                </div>
              <div className="colvalue">
                <input type="password"
                name="pswd"
                id="examplePassword"
                placeholder="********"
                className="form-control"
                 value = {this.state.pswd} 
                 onChange = {this.handlePasswordChange} required/>
                <span className='error'>{errors.password}</span>
              </div>
                </div>


            <div className="row">
              <div className="collabel">
                    <label>Age</label>
               </div>
               <div className="colvalue">
                    <input type="number" name="age" className="form-control" id="exampleAge" 
                    placeholder="Enter Age"
                    value = {this.state.age}
                    onChange = {this.handleAgeChange} required/>
              </div>
            </div>


            <div className="row">
              <div className="collabel">
            <label> Gender <br/>
            <input
              type="radio"
              value="female"
              checked={this.state.gender === "female"}
              onChange={this.handleGenderChange}
            />
            &nbsp;&nbsp;Female 
          </label>&nbsp;&nbsp;

          <label>
            <input
              type="radio"
              value="male"
              checked={this.state.gender === "male"}
              onChange={this.handleGenderChange}
            />
            &nbsp;&nbsp;Male
          </label>
          </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit}>Update</button>
        </form>
        </div>
            </div>
        );
    }
}