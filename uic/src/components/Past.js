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
import moment from 'moment';

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

class Past extends Component {
  constructor(props){
  super(props);
  this.state={
    data:[],
    open: false,
    
    }
    
  }
  componentDidMount = () => {
    const date = moment(this.state.dateTimestamp).toString();
    date1 = moment(date).format('YYYY-MM-DD')
    rollno = localStorage.getItem("srollno")
    var body = {
      frollno : rollno
      
      }
    const url = "http://localhost:9000/history";
      
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
        });
 }
 handleClick(row){
  let d=this.state.data
  var body={
    cid:d[row].id,
    frollno :rollno
  }
  sessionStorage.setItem("cid",d[row].id);
  sessionStorage.setItem("phoneNumber",d[row].phoneNumber)
  sessionStorage.setItem("crollno",d[row].rollno)
  var url = "http://localhost:9000/checkRide";
     
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
      if(response.ok){
        this.rideDet(row)
      }
      else{
         
        
         alert("You already joined the ride")
      }
       });



 }
rideDet(row){

 let d=this.state.data
 var body={
   cid:d[row].id,
  
 }
 console.log(body)
 sessionStorage.setItem("cid",d[row].cid);
 sessionStorage.setItem("phoneNumber",d[row].phoneNumber)
 sessionStorage.setItem("crollno",d[row].rollno)
 window.location.href="/uhistory";
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
      });

}
handleCancel(row){
    
}
  render() {
    let time1 = moment().format("HH:MM:SS")
    if(localStorage.getItem("time") >= time1){
     let d=this.state.data;
    const listItems = d.map((list,index) =>
     list.rdate<date1 && list.status=="upcoming"?
      <MuiThemeProvider>
        <Card style={cardStyle} >
          <CardHeader
          subtitle="Creator name"
            title={list.cname}
            avatar=""
          />
          <CardText>
            <CardTitle title={list.src} subtitle="Origin" />
            <CardTitle title={list.dest} subtitle="Destination"/>
            <CardTitle title= {list.phoneNumber}subtitle="Contact number"/>
          </CardText>
          <Paper style={style} zDepth={1}>
          <p>{list.rdate}</p>
          </Paper>
          <Paper style={style} zDepth={1}>
          <p> {list.rtime}</p>
          </Paper>
          <Paper style={style} zDepth={1}>
  <p>{list.crollno}</p>
          </Paper>
          <CardActions>
            <RaisedButton label="Click to know the details!" style={buttonStyle} onClick={()=>this.handleClick(index)}/>
            
          </CardActions>
        </Card>

      </MuiThemeProvider>:""
    )
      
    return (
      <div className="App">
        <Navbar/>
        <div>
          <h1>List Of Past Rides</h1>
          <ul role="nav">
          {listItems}
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

export default Past;


        