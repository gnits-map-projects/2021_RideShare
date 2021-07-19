import React, { Component } from 'react';
import './Form1.css'
//  import './maps.css';
//import TimePicker from 'react-timekeeper';
import Autocomplete from  'react-autocomplete';
import { getCountry, matchCountry } from './dataService';
import { Link,Redirect } from 'react-router-dom';
import moment from 'moment';
import { map } from 'leaflet';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import TimePicker from 'react-dropdown-timepicker';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = 'pk.eyJ1IjoicmlkZXNoYXJlMDQiLCJhIjoiY2tveWU5cHB5MDhyZjJ4cTd2N2M5b2FhMyJ9._BOn7V4N8QwBdSGm284S3w';


var r=sessionStorage.getItem("srollno")
var  name=sessionStorage.getItem("uname");
var ph,frollno,crollno;
var date2,list1,body1,d;
list1=[]
var i;
var bool;
bool=0;

class Form3 extends Component{
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
       console.log(this.state.date1)
        // this.snameChange = this.snameChange.bind(this);
        // this.dnameChange = this.dnameChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      
      name=sessionStorage.getItem("uname");
      ph=sessionStorage.getItem("uphone");
      crollno = localStorage.getItem("srollno");
      frollno = localStorage.getItem("srollno");
    console.log(localStorage.getItem("srollno"))
    console.log(sessionStorage.getItem("uname"))
    console.log(sessionStorage.getItem("uphone"))
    console.log(sessionStorage.getItem("ugender"))
    console.log(sessionStorage.getItem("uage"))
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center:[78.4867,17.3850],
      //center: [-73.985664, 40.748514],
      zoom: 12
    });
  
   const nav = new mapboxgl.NavigationControl()
   map.addControl(nav)

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
    
    // snameChange = event =>{
    //     this.setState({
    //         sname : event.target.value
    //     });
    // }

    // dnameChange = event =>{
    //     this.setState({
    //         dname : event.target.value
    //     });
    // }

    dateChange = event =>{
        this.setState({
            date : event.target.value
        });
    }
    timeChange = time => {this.setState({ time })
   console.log(this.state.time)
 }
   
    /*timeChange = time => {this.setState({ time })
    console.log(this.state.time.formatted12)
}*/


    handleSubmit = event =>{
    event.preventDefault();
    var body = {
    src    : this.state.A,
    dest   : this.state.B    
    }
    body1 = {
      rollno : crollno,
       rtime  : this.state.time.hour+":"+this.state.time.minute,
     // rtime  : this.state.time.formatted24,
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
      const url = "http://localhost:9000/reply";
      
          let headers = new Headers();
           headers.append('Content-Type','application/json');
           headers.append('Accept','application/json');
      
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
    
            headers.append('POST','GET');
           var s = fetch(url, {
              headers:headers,
              method: 'POST',
              body: JSON.stringify(body)
                   
            }).then(response=>{
              return response.json(); })
            .then(response=>{
              this.setState({
                data1:response
              })
              let d=this.state.data1
              for(i=0;i<d.length;i++){
               if(d[i].rdate>=date2){
                 bool = bool+1;
               }
               console.log(bool) 
              }
              if(bool){
                this.setState({
                  data1:response
                })
                for(i=0;i<d.length;i++){
                  if(d[i].rdate>=date2 && d[i].vacancy>0){
                  list1=list1+"["+d[i].rdate+" : "+d[i].rtime+"]"
                  }
                  console.log(list1)
                }
                let message="Rides from "+this.state.A+" to "+this.state.B+" are at "+list1
                console.log(this.state.data1)
                confirmAlert({
                    title: 'Are you sure you want to create?',
                    message: message,
                    buttons: [
                      {
                        label: 'Yes',
                        onClick : () => this.createRide()
                      },
                      {
                        label: 'No',
                        onClick: () => this.redirect()
                      }
                    ]
                  })
              }
              else{
                confirmAlert({
                  title: 'Confirm to Create',
                  message: " are you sure you want to creat a new ride?",
                  buttons: [
                    {
                      label: 'Yes',
                      onClick : () => this.createRide()
                    },
                    {
                      label: 'No',
                      onClick: () => alert("You didnt create the ride")
                    }
                  ]
                })
              
              }
            });
           
    }
       
    
  }
  list2(){
    confirmAlert({
      title: 'Confirm to Find',
      message: " Do you want to find a ride from "+this.state.A+" to "+this.state.B,
      buttons: [
        {
          label: 'Yes',
          onClick : () => this.redirect()
        },
        {
          label: 'No',
          onClick: () => alert("You didnt create the ride")
        }
      ]
    })
    
  }
  redirect(){
    localStorage.setItem("src",this.state.A)
    localStorage.setItem("dest",this.state.B)
    localStorage.setItem("bool",true)
    if(localStorage.getItem("bool") == true)
    {
      window.location.href="/listFromCreate"
    }
     
  }

  createRide(){
    
    
    console.log(body1)

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
        body: JSON.stringify(body1)
      }).then(response=>{if(response.ok){
         alert("your ride has been successfully created")
        this.callId()
      }
      })
      
  }
  callId()
  {
    var body = {
      rollno : crollno,
       rtime  : this.state.time.hour+":"+this.state.time.minute,
     // rtime  : this.state.time.formatted24,
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
       // rtime  : this.state.time.formatted24,
       rtime  : this.state.time.hour+":"+this.state.time.minute,
        src    : this.state.A,
        dest   : this.state.B,
        rdate  : this.state.date,
        cname   : name,
        phoneNumber :ph,
        crollno :crollno,
        frollno:frollno,
        tname : name,
        cid :this.state.id,
        status : "upcoming"
        
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
       
    
    
    render(){
      sessionStorage.setItem("mapssrc",this.state.A);
      sessionStorage.setItem("mapsdest",this.state.B);
      let time1 = moment().format("HH:MM:SS")
      if(localStorage.getItem("time") >= time1){
      date2=this.state.date1
        return(
          <div>
               <div 
              ref={el => (this.mapWrapper = el)} 
              className="mapWrapper" 
              />
              <div class="flex">
              <div class="row">
                  <div class="col-25">
                   <label for="date">Enter Date</label>
                  </div>
                  
                <div class="col-75">
                  <input type="date" name="date"  onChange={this.dateChange} min={date2}  required/>
                </div>
                </div>
                <br/>
                
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
                   
                   <br/>
                   <br/>
                   
               {/* <center> */}
                <div class="row"><center>
                    <button type="submit" class="submit" onClick={this.handleSubmit.bind(this)} value="Submit">Book Now!</button></center>
                  </div>
                  </div>
                  {/* </center>  */}
              </div>
                  
        

        );
    
      }
      else{
        window.location.href="/logout"
      }
  }
}
export default Form3;



