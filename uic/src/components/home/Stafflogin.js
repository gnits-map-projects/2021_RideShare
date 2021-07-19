import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import './home.css';
import Navigation from './Nav.js';
import moment from 'moment';
var body,time1;
const validEmailRegex = RegExp(/^[A-Za-z0-9]{5,30}\@gnits.com$/);
//const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);
var sr;
export default class Stafflogin extends Component {
  constructor(props) {
    super(props);
    //this.handleRollnoChange = this.handleRollnoChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    let loggedIn=true;
    if(localStorage.getItem("token") == null){
      loggedIn=false;
    }
    this.state = {

      r:false,
      n:false,
      ph:false,
      e:false,
      rollno :'',
      name: "",
      email:"",
      phoneNumber:"",
      errors: {
        name: '',
        rollno : '',
        mobile : '',
        email: '',
      }
     
      //confirmPassword: ""
      
    };

  }
  validateForm() {
    return this.state.name.length > 0 && this.state.pswd.length > 5 ;
  }

//   handleRollnoChange  = event => {
   
//     const { name, value } = event.target;
//     let errors = this.state.errors;
//     errors.rollno = 
//           validRollRegex.test(value)
//             ? ''
//             : 'RollNo. is not valid!';
//     if(errors.rollno == '')
//     {
//       this.setState({r : true});
//     }
//     this.setState({errors, [name]: value});
//     console.log(this.state.rollno)
//     if(errors.rollno == ''){
//     sr= this.state.rollno;
   
//     } 
    
//  }

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
    errors.rollno = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
    if(errors.rollno ==  '')
      {
         this.setState({e : true});
     }
    this.setState({errors, [name]: value});
  }

  handleRollnoChange = event => {
    this.setState({
      rollno : event.target.value
    });
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
  handlePasswordChange=event=>{
    this.setState({
      pswd : event.target.value
    });
  }
 
  handleSubmit(event) {
    
    event.preventDefault();
    
    
     var body = {
      rollno : this.state.rollno,
      pswd: this.state.pswd,
      
    }
    
    console.log(body);
    if(this.state.rollno==""){
      alert('Please enter the name')
    }
   
    else if(this.state.pswd==""){
      alert('Please enter the phone number')
    }


    else{
        const url = "http://localhost:9000/personVal";
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
        .then(response => {if(response.ok){
          localStorage.setItem("token","gshfdyuyweu74ruergfjsd")
          localStorage.setItem("upswd",this.state.pswd);
          localStorage.setItem("srollno",this.state.rollno)
          localStorage.setItem("time",time1)
          this.setState({
            loggedIn : true
          })
          if(this.state.loggedIn){
            this.props.history.push("/home1");
            }
          
        }
        else {
        alert("Invalid Credentials")
        }
     })
      }
  }

  Check(){
    if(this.state.loggedIn == true){
      this.props.history.push("/home1");
    }
  }
  
    render() {
        this.Check()
        const {errors} = this.state;
        var min = parseInt(moment().minutes());
       var min1=min+30;
       time1 = moment().hour()+":"+min1+":"+moment().seconds()
        return (<div className ="bg">
            
            <Navigation/>

            <br></br><br/>
            <br/>
           

            <div className="auth-wrapper1">
            <div className="auth-inner">
            <form>
                <center><h3>Staff Login</h3></center>

                 
                <div className="form-group">
                    <label>Username</label>
                    <input type="rollno"
                        name="rollno"
                        id="exampleEmail"
                        className="form-control"
                        placeholder="mygmail@gnits.ac.in"
                        value = {this.state.rollno} 
                        onChange = {this.handleRollnoChange} required/>
                <span className='error'>{errors.rollno}</span>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="pswd" id="examplePassword" className="form-control" placeholder="Enter password" 
                    onChange = {this.handlePasswordChange} value={this.state.pswd}/>
                  </div>
                
         
          <button type="submit" className="submitb" onClick = {this.handleSubmit}>Login</button>
            <p className="forgot-password text-right">
               Not a User <a href="/request">Send Request</a>
            </p>
        </form>
        </div>
            </div></div>
        );
    }
}




