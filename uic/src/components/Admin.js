import React, { Component } from 'react';
import Navbar from './home/Nav3';
import {Card,Button} from 'react-bootstrap';

//import { bootstrapUtils } from 'react-bootstrap/lib/utils';

var obj,rollno;
var date1;
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

const buttonStyle ={
  marginLeft : 20,
}

class Admin extends Component {
  constructor(props){
  super(props);
  this.state={
    data:[],
    open: false,
    rollno:'',
    phno:'',
    username:'',
    password:''
    }
    
  }

  componentDidMount = () => {
    const url = "http://localhost:9000/list";
      
    let headers = new Headers();
     headers.append('Content-Type','application/json');
     headers.append('Accept','application/json');

      headers.append('Access-Control-Allow-origin',url);
      headers.append('Access-Control-Allow-Credentials','true');

      headers.append('POST','GET');
      fetch(url, {
        headers:headers,
        method: 'GET',
    
      }).then(response=>{
          return response.json();        
      }).then(res=>{
        this.setState({
          data : res
        })
        });
        console.log(this.state.data)
 }

onAccept(row){
console.log("aacept")
  var  templateId = "join_ride";
    let d=this.state.data
    var body = {
        rollno    : d[row].rollno,
        phoneNumber   : d[row].phoneNumber,
        
        }
        localStorage.setItem("name",d[row].name);
        localStorage.setItem("branch",d[row].rollno);
        localStorage.setItem("phoneNumber",d[row].phoneNumber);
        localStorage.setItem("email",d[row].email);
      body = {
        email:localStorage.getItem("email")
      }
      console.log(body)
      const url = "http://localhost:9000/deleteRequest";
    
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
            
        }).then(response => {
            if(response.ok){
              window.location.href="/staffform"
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
}

 onDecline(row){
   alert("You rejected the request")
  var  templateId = "join_ride";
  let d=this.state.data
  localStorage.setItem("email",d[row].email);
  var body = {
    email:d[row].email
  }
  const url = "http://localhost:9000/deleteRequest";
      
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
        this.sendFeedback(templateId, { to_name: d[row].name,from_name: "",subject:"details Regarding Your Account", email: d[row].email ,message_html:"Your Request for the Website has been declined by the admin "})
          return response.json();        
      }).then(response => {
          if(response.ok){
           
          }
      });
}
  render() {
   
     let d=this.state.data;
    const listItems = d.map((list,index) =>
    <Card style={{ width: '18rem' }}>
    <Card.Body>
  <Card.Title>{list.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{list.rollno}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{list.phoneNumber}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{list.email}</Card.Subtitle>
      <Card.Text>
        Want's to request you for access!
      </Card.Text>
      <input type="submit" name="Accept" value="Accept" onClick={()=>this.onAccept(index)}/>&nbsp;
      <input type="submit" name="Decline" value = "Decline" onClick={()=>this.onDecline(index)}/>
    </Card.Body>
  </Card>
    )
    
      
    return (
      <div className="App">
        <Navbar/>
        <div>
          <ul role="nav">
          {listItems}
          </ul>
       </div>
      </div>
    );
  }
}

export default Admin;


        