import React, { Component } from 'react';
import driverimage from './images/car-compact.png';
import poolerimage from './images/call-taxi.png';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Link,Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './home/Nav1';
import moment from 'moment';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  paddingTop: 15,
  textAlign: 'center',
  display: 'inline-block',
};
var eid;
class Home1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
     
    };
  }
  //sessionStorage.setItem("srollno",localStorage.getItem("srollno"))
  componentDidMount() {
    //if(localStorage.getItem("token") == "gshfdyuyweu74ruergfjs"){
    sessionStorage.setItem("srollno",localStorage.getItem("srollno"))
    sessionStorage.setItem("upswd",localStorage.getItem("upswd"))
    setTimeout(() => this.setState({ loading: false }), 1500);
    eid = localStorage.getItem("srollno")
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
              sessionStorage.setItem("uname",obj.name);
              sessionStorage.setItem("uemail",obj.email);
              sessionStorage.setItem("uage",obj.age);
              sessionStorage.setItem("ugender",obj.gender);
              sessionStorage.setItem("uphone",obj.phone);
               console.log(localStorage.getItem("srollno"))
               console.log(sessionStorage.getItem("uname"))
               console.log(sessionStorage.getItem("uemail"))
               console.log(sessionStorage.getItem("uphone"))
               console.log(sessionStorage.getItem("ugender"))
               console.log(localStorage.getItem("upswd"))
          
               
        }));
      //}   
  }
  render() {
    if(localStorage.getItem("token") == null ){
      window.location.href="/login"
    }
    else{
    let time1 = moment().format("HH:MM:SS")
    if(localStorage.getItem("time") >= time1){
    const loadpage = [<MuiThemeProvider><CircularProgress/></MuiThemeProvider>]
    const { loading } = this.state;

    if(loading) {
      return (<div className="App-loading">{loadpage}</div>); // render null when app is not ready
     
    }

    return (
      <MuiThemeProvider>
      <div className="App">
    <Navbar/>     
        <div><br/><br/><br/><br/><br/>
          <h1>What are you looking for?</h1>
        </div>
        <div>
          <ul role="nav">
          <Paper style={style} zDepth={2} circle={true} >
          <Link to="/pooler"><img src={driverimage} alt="logo" /></Link>
          </Paper>
          <Paper style={style} zDepth={2} circle={true} >
          <Link to="/driver"><img src={poolerimage} alt="logo" align="center"/></Link>
          </Paper>
          <p/>
          </ul>
       </div>
      </div>
      </MuiThemeProvider>
    );
    }
    else{
      window.location.href="./logout"
    }
  }
  }
}

export default Home1;

