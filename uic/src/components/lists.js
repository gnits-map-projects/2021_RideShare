import React, { Component } from 'react';
import Header from './HeaderComponent';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './home/Nav1';
import { mockComponent } from 'react-dom/test-utils';

var obj,tname,ph,body,crollno,frollno,body2,email1,src,dest,list1,l1,l2,l3,l4,date,time;
list1= [];
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

class Lists extends Component {
  constructor(props){
  super(props);
  this.state={
    data:[],
    open: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount = () => {
   tname = sessionStorage.getItem("uname")
   ph = sessionStorage.getItem("uphone")
   crollno = sessionStorage.getItem("crollno");
   frollno = localStorage.getItem("srollno");
   email1=sessionStorage.getItem("uemail");
    var body={
      cid:sessionStorage.getItem("cid")
    }
    const url = "http://localhost:9000/rideDet";
       
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
           return response.json();        
       }).then(res=>{
         this.setState({
           data : res
         })
         console.log(this.state.data)
         });
 }
 handleClick(){
   
        console.log(body)
        const url = "http://localhost:9000/match";
      
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
          }) .then(response => {
            if(response.ok){
              alert("You joined the ride");
              }
            
          }).then(
          ()=>{this.decVacancy()}
          )
           .catch(error=>{alert(error)});
 }
 decVacancy(){
    var  templateId = "join_ride";
  const url = "http://localhost:9000/decVacancy";
      
  let headers = new Headers();
   headers.append('Content-Type','application/json');
   headers.append('Accept','application/json');

    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');

    headers.append('POST','GET');
    fetch(url, {
       headers:headers,
       method: 'POST',
       body: JSON.stringify(body2)
     }) .then(response => {
       if(response.ok){
         console.log(list1)
        this.sendFeedback(templateId, { to_name: tname,from_name: "Admin", email: email1,subject:"Ride Details from ",message_html:"You have joined the ride from "+src+" to "+dest+ " on "+date+" at "+time+" \nfor more details log on to RideShare website"})
        alert("Email successfully sent!")
         }
        
     })
     .catch(error=>{alert(error)});
 }
 
 sendFeedback (templateId, variables) {
  window.emailjs.send(
  'service_8w5847a', templateId,
  variables
  ).then(res => {
     // alert('')
  })
  // Handle errors here however you like, or use a React error boundary
  .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  window.location.reload(false);
  window.location.href="/list"
}
listItems()
{
   
      
        let d=this.state.data
        return d.map((list,index) => {
             body = {
                rtime  : list.rtime,
                src    : list.src,
                dest   : list.dest,
                rdate  : list.rdate,
                cname   : list.cname,
                phoneNumber :ph,
                crollno :crollno,
                frollno:frollno,
                tname : tname,
                cid :list.cid,
                status : "upcoming"
                }
               if(list.status == "upcoming"){
                src = list.src
                dest = list.dest
                list1 = list1+"\n"+[list.tname]+":"+[list.phoneNumber]
                date=list.rdate
                time=list.rtime
               }
                 body2={
                  id :list.cid
                }
                console.log(body) 
                
            return (
              list.status == "upcoming" ?
                <tr id={index}>
                    <td>{list.frollno}</td>
                    <td >{list.phoneNumber}</td>
                    <td>{list.tname}</td>
                    <td >{list.id}</td>
                     </tr>: ""
            );
        });  
        

    

}
  render() {
   
   
    return (
      <div className="App">
        <Navbar/>
        <div>
          <h1>Details</h1>
            <br/><br/><br/><br/><center>
          <ul role="nav">
          <table  border="1">
                        <th>Rollno</th>
                        <th>phoneNumber</th>
                        <th>Name</th>
                        <th>ID</th>
                     <tbody> {this.listItems()} </tbody>
                </table><br/>
                <br/>
                <button onClick={this.handleClick}>Click Here To Join!</button>
                
          </ul>
          </center>
       </div>
       
      </div>
    );
  }
}

export default Lists;

        