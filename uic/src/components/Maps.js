import React, { Component } from 'react';
import './maps.css';
import TimePicker from 'react-dropdown-timepicker';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

mapboxgl.accessToken = 'pk.eyJ1IjoicmlkZXNoYXJlMDQiLCJhIjoiY2tveWU5cHB5MDhyZjJ4cTd2N2M5b2FhMyJ9._BOn7V4N8QwBdSGm284S3w';
//session variables
var r=sessionStorage.getItem("srollno")
var  name=sessionStorage.getItem("uname");
var ph,frollno,crollno;
var date2,list1,body1,d;
list1=[]
var i;
var bool;
bool=0;
class Maps extends React.Component {
  constructor(props){
    super(props);
    this.state={
          A : "",
          B : "",
          date : "",
          time : "",
          id: "",
          date1: moment().format('YYYY-MM-DD'),
          data1 : []
          

    }
    this.dateChange = this.dateChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
 
  componentDidMount() {
    name=sessionStorage.getItem("uname");
      ph=sessionStorage.getItem("uphone");
      crollno = sessionStorage.getItem("srollno");
      frollno = sessionStorage.getItem("srollno");
    console.log(sessionStorage.getItem("srollno"))
    console.log(sessionStorage.getItem("uname"))
    console.log(sessionStorage.getItem("uphone"))
    console.log(sessionStorage.getItem("ugender"))
    console.log(sessionStorage.getItem("uage"))
    
   const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-73.985664, 40.748514],
      zoom: 12
    });
   const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    })
    map.addControl(directions, 'top-left');
    directions.on('route', e => {
 
      let routes = e.route;
      var latitude = directions.getOrigin(routes).geometry.coordinates[1];
       var longitude =directions.getOrigin(routes).geometry.coordinates[0] ;
       let url='https://api.mapbox.com/geocoding/v5/mapbox.places/'
         + longitude + ', ' + latitude
         + '.json?access_token=' + mapboxgl.accessToken;
       fetch(url, {
          method: 'GET',  
}).then(response => response.json())
.then((jsonData) => {
// jsonData is parsed json object received from url
this.state.A=jsonData.features[0].place_name;
//this.setState({srcarr: this.state.srcarr.concat(this.state.A)});
console.log(this.state.A);

}) 
var latitude = directions.getDestination(routes).geometry.coordinates[1];
var longitude =directions.getDestination(routes).geometry.coordinates[0] ;
       url='https://api.mapbox.com/geocoding/v5/mapbox.places/'
       + longitude + ', ' + latitude
       + '.json?access_token=' + mapboxgl.accessToken;
       fetch(url, {
          method: 'GET',  
}).then(response => response.json())
.then((jsonData) => {
// jsonData is parsed json object received from url
this.state.B=jsonData.features[0].place_name;

console.log(this.state.B);

}) 

});

  }
  
  dateChange = event =>{
    this.setState({
        date : event.target.value
    });
}
timeChange = time => {this.setState({ time })
    console.log(this.state.time)
}

  handleSubmit = event =>{
    event.preventDefault();
    var body = {
        src    : this.state.A,
        dest   : this.state.B    
        }
     body1 = {
    rollno : crollno,
    rtime  : this.state.time.hour+":"+this.state.time.minute,
    src    : this.state.A,
    dest   : this.state.B,
    rdate  : this.state.date,
    name   : name,
    phoneNumber :ph,
    crollno :crollno,
    frollno:frollno,
    tname : name,
    vacancy : 3
    
    }
    console.log(body);
    console.log(moment);
    if(this.state.A==""){
      alert('Please enter the source')
    }
    else if(this.state.time==""){
      alert('Please enter the time')
    }
    else if(this.state.B==""){
      alert('Please enter the destinantion')
    }
    else if(this.state.date==""){
      alert('Please enter date')
    }
    else if(this.state.A == this.state.B){
        alert("Source and destination cannot be the same")
      }
    else{
      console.log(body)
      let url = "http://localhost:9000/addRide";
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
        }).then(response=>{if(response.ok){
           alert("ok")
           //this.setState({srcarr: this.state.srcarr.concat(this.state.A)});
           //console.log(this.state.srcarr);
          this.callId()
        }
        })
        
     
}
  }
  callId()
  {
    var body = {
      rollno : crollno,
      rtime  : this.state.time.hour+":"+this.state.time.minute,
      src    : this.state.A,
      dest   : this.state.B,
      rdate  : this.state.date,
      name   : name,
      phoneNumber :ph,
      crollno :crollno,
      frollno:frollno,
      tname : name,
      vacancy : 3
      
      }
   let url = "http://localhost:9000/adding";
      
   let  headers = new Headers();
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
         console.log(response)
         return response.text();
     }).then(res=>{
         let s=JSON.parse(res)
         console.log(s)
         this.setState({
             id:s.id
         })
         console.log(this.state.id)
     }).then(()=>{this.callMatch()})
     .catch(error=>{alert(error)});
  }
  callMatch(){
    let body = {
        rtime  : this.state.time.hour+":"+this.state.time.minute,
        src    : this.state.A,
        dest   : this.state.B,
        rdate  : this.state.date,
        cname   : name,
        phoneNumber :ph,
        crollno :crollno,
        frollno:frollno,
        tname : name,
        cid :this.state.id
        
        }
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
              alert("inserted");
              }
            
          })
          .catch(error=>{alert(error)});
      
  }
 

 
  render() {
    sessionStorage.setItem("mapssrc",this.state.A);
    sessionStorage.setItem("mapsdest",this.state.B);
    return (
      <div className="App">
        <div class="row">
                  <div class="col-25">
                   <label for="date">Enter Date</label>
                  </div>
                <div class="col-75">
                  <input type="date" name="date" value={this.state.date} onChange={this.dateChange} required/>
                </div>
                </div>
               <div class="row1">
                  <div class="col-25">
                   <label for="time">Select Time</label>
                  </div>  
                  <div class="col-75">
                <TimePicker
                  
                    time={this.state.time}
                    onChange={this.timeChange}
                   />
                   </div>
                   </div>
               
          <div 
        ref={el => (this.mapWrapper = el)} 
        className="mapWrapper" 
        />
       
        <center>
        <button type="submit" class="submit" onClick={this.handleSubmit.bind(this)} value="Submit">BOOK NOW</button>
        </center>
        </div>
      
        
      
     
      
    );
  }
}
export default Maps;