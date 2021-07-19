
import React, { Component } from "react";
import { useHistory, withRouter,Link, Redirect } from "react-router-dom";
import './home.css';
import Navigation  from './Nav3.js';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
var time1;
let token="";
var rollno1;
var rollno;
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/i);
class Admindelete extends React.Component {

  constructor(props) {
    let loggedIn=true;
    if(localStorage.getItem("token") == null){
      loggedIn=false;
    }
    super(props);
    this.state={
      
      pswd : '',
      rollno : '',
      selectValue:'',
      errors: {   
        password: '',
        rollno : '',
      }

    }
  this.handleRollnoChange=this.handleRollnoChange.bind(this)
 
  this.handleSubmit=this.handleSubmit.bind(this)

  this.handleSubmit1=this.handleSubmit1.bind(this)
 
  this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
    
    
  }
  

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  

  handleSubmit=event=>{
    event.preventDefault();
    console.log(this.state);
    
    if(this.state.selectValue==""){
      alert('Select a value')

    }
    else{
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?.Deleted records cannot be restored.',
            buttons: [
              {
                label: 'Yes',
                onClick: ()=> this.delete()
              },
              {
                label: 'No',
                onClick: () => alert('Clicked No')
              }
            ]
          });
    
  }
}
delete(){
    this.setState({
        selectValue:this.state.selectValue
    })
    var body = {
        selectValue : this.state.selectValue
      }
      console.log(body)
    const url = "http://localhost:9000/delperson";
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
     alert("deleted Successfully")
    }
    else {
    alert(" details already deleted")
    }
    
 })
}
handleSubmit1=event=>{
    event.preventDefault();
    console.log(this.state);
    
    if(this.state.rollno==""){
      alert('enter the rollno')

    }
    else if(this.state.errors.rollno == 'RollNo. is not valid!' ){
        alert("rollno not entered correctly")
    }
    else{
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?.Deleted records cannot be restored.',
            buttons: [
              {
                label: 'Yes',
                onClick: ()=> this.delete1()
              },
              {
                label: 'No',
                onClick: () => alert('Clicked No')
              }
            ]
          });
    
  }
}
delete1(){
    this.setState({
        selectValue:this.state.rollno
    })
    var body = {
        selectValue: this.state.rollno
      }
      console.log(body)
    const url = "http://localhost:9000/delperson";
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
     alert("deleted Successfully")
    }
    else {
    alert(" details already deleted")
    }
 })
}

  render() {

       const {errors} = this.state;
       var min = parseInt(moment().minutes());
       var min1=min+30;
       var date = moment().year()
       var del= date-4
       //console.log(del)
        return (<div >

        <Navigation/>
            <br></br><br/>
            <br/>


            <div className="auth-wrapper2" >
            <div className="auth-inner">
              <div className="set">
            <form>
                <center><h3>Select to delete</h3></center>

                <div className="form-group">
                    <label>Roll Number</label>
                    <select id="dropdown" onChange={this.handleDropdownChange}>
              <option value="N/A">N/A</option>
              <option value={del-2000}>{del}</option>
             <option value={del+1-2000}>{del+1}</option>
             <option value={del+2-2000}>{del+2}</option>
             <option value={del+3-2000}>{del+3}</option>
            </select>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Delete</button>
                <hr/>
                <hr/>
                <center><h3>Enter a rollno to delete</h3></center>
                <div className="form-group">
                    <label>Roll Number</label>
                    <input type="text"
                       name="rollno"
                      id="exampleRollno"
                      className="form-control"
                      placeholder="Enter Roll No."
                      value = {this.state.rollno} 
                      onChange = {this.handleRollnoChange} required/>
                      <span className='error'>{errors.rollno}</span>
                      
                      
                </div>
                
                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit1}>delete</button>
        

            </form>
            </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </div>
             
        );
       
    }
    
}

export default Admindelete;
