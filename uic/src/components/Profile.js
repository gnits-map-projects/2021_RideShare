import React from "react";
import './Profile.css';
import Navbar from './home/Nav1';
import { Link,Redirect } from 'react-router-dom';
import moment from 'moment';
var eid,profile,pooler,driver,history,home;

const user ={
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
}

class Profile extends React.Component {
    constructor(props) {
      super(props);
      eid = localStorage.getItem("srollno")//this.props.match.params.rollno
      this.state={
       
        email : '',
        name : '', 
        phone:'',
        rollno : '',
        age : '',
        gender : '',
      }
      this.updateHandler=this.updateHandler.bind(this)
      //this.handleEmailChange=this.handleEmailChange.bind(this)
      //his.handlePhoneChange=this.handlePhoneChange.bind(this)
      
      
       const url = "http://localhost:9000/personDet";
      
          let headers = new Headers();
           headers.append('Content-Type','application/json');
           headers.append('Accept','application/json');
      
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
    
            headers.append('POST','GET');
            var body={rollno:eid};
           var s = fetch(url, {
              headers:headers,
              method: 'POST',
              body: JSON.stringify(body)
            }).then(response => 
              response.text().then(data => ({
                  data1: (data)
              })
          ).then(res => {
              console.log(res.data1)
              var obj=JSON.parse(res.data1)
              //console.log(obj.name)
             this.setState({
               name:obj.name,
               email:obj.email,
               phone:obj.phone,
               rollno : obj.rollno,
               age : obj.age,
               gender : obj.gender,


              });
              sessionStorage.setItem("uname",this.state.name);
              sessionStorage.setItem("uemail",this.state.email);
              sessionStorage.setItem("uage",this.state.age);
              sessionStorage.setItem("ugender",this.state.gender);
              sessionStorage.setItem("uphone",this.state.phone)
              localStorage.setItem("upswd1",this.state.pswd)
             console.log(this.state.age)
              
        }));
        console.log(this.state.name)
    
    }
    
      updateHandler=event=>{
      }
    
    
    render(){
      let time1 = moment().format("HH:MM:SS")
      if(localStorage.getItem("time") >= time1){
      console.log(sessionStorage.getItem("srollno"))
      
        return(
            <div style={user} class="profile">
         <Navbar/>
          <div class="pcontainer">
                <form>
                  <center><h2><u>Personal Details</u></h2></center><center>
                    <br/>
                    <div class="row">
                        <div class="collabel">
                            <h3>Rollno:</h3>
                        </div>
                        <div class="colvalue">
                          <h3>{this.state.rollno}</h3>
                        </div>
                      </div>
                      <div class="row">
                        <div class="collabel">
                            <h3>Name:</h3>
                        </div>
                        <div class="colvalue">
                          <h3>{this.state.name}</h3>
                        </div>
                        </div>
                      <div class="row">
                        <div class="collabel">
                            <h3>Email:</h3>
                        </div>
                        <div class="colvalue">
                            <h3>{this.state.email}</h3>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="collabel">
                          <h3>Mobile:</h3>
                        </div>
                        <div class="colvalue">
                            <h3>{this.state.phone}</h3>
                        </div>
                      </div>
                      <div class="row">
                        <div class="collabel">
                            <h3>Age:</h3>
                        </div>
                        <div class="colvalue">
                          <h3>{this.state.age}</h3>
                        </div>
                        </div>
                        <div class="row">
                        <div class="collabel">
                            <h3>Gender:</h3>
                        </div>
                        <div class="colvalue">
                          <h3>{this.state.gender}</h3>
                        </div>
                        </div>
                       <div class="profileb">
                       <Link to="/update"><button onClick={this.updateHandler}>Edit</button></Link>
                       </div>
                    </center>
                </form>
            </div>
            

          </div>
            
        )
    }
    else{
      window.location.href="/logout"
    }
  }
}

export default Profile