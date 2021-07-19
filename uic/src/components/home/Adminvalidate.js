import React, { Component } from "react";
import { useHistory, withRouter,Link } from "react-router-dom";
import '../Profile.css';
import Navigation from './Nav3.js';
var body;
const validEmailRegex = RegExp(/^[A-Za-z0-9]{5,30}\@gnits.com$/);
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);
var sr;
export default class Adminvalidate extends Component {
  constructor(props) {
    super(props);
    this.handleRollnoChange = this.handleRollnoChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  
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
    errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
    if(errors.email ==  '')
      {
         this.setState({e : true});
     }
    this.setState({errors, [name]: value});
  }
  handleRollnoChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.rollno = 
          validRollRegex.test(value)
            ? ''
            : 'Rollno is not valid!';
    if(errors.rollno ==  '')
      {
         this.setState({r : true});
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
 
  handleSubmit(event) {
    
    event.preventDefault();
    
    
     var body = {
      rollno : this.state.rollno,
      phoneNumber: this.state.phoneNumber,
      
    }
    
    console.log(body);
    if(this.state.rollno==""){
      alert('Please enter the Rollno')
    }
   
    else if(this.state.phoneNumber==""){
      alert('Please enter the phone number')
      console.log(this.state)
    }

    else{
    if( this.state.r == true && this.state.ph == true ){
    console.log(this.state)
    const url = "http://localhost:9000/addValidate";
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
    .then(response => {
      if(response.ok){
         alert("Details added successfully!")
        }
        else{
            alert("The details exists already")
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
        const {errors} = this.state;
        return (<div >
            
            <Navigation/>

            <br></br><br/>
            <br/>
           

            <div className="auth-wrapper1">
            <div className="auth-inner">
            <form>
                <center><h3>Student Details</h3></center>

                <div className="form-group">
                    <label>rollno</label>
                    <input type="name"
                        name="rollno"
                        id="examplename"
                        className="form-control"
                        placeholder="enter rollno"
                        value = {this.state.rollno} 
                        onChange = {this.handleRollnoChange} required/>
                   <span className='error'>{errors.rollno}</span>
                </div>    
                <div className="form-group">
                    <label>Mobile</label>
                    <input type="phone" name="phoneNumber" className="form-control" id="examplePhone" 
                    placeholder="Enter mobile number"
                    value = {this.state.phoneNumber}
                    onChange = {this.handleMobileChange} required/>
                    <span className='error'>{errors.mobile}</span>
                </div>
                
                
         
          <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit}>Add</button>
            
        </form>
        </div>
            </div></div>
        );
    }
}




