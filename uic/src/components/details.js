import React from "react";


import { Link,Redirect } from 'react-router-dom';

var eid,profile,pooler,driver,history,home;

const user ={
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
}

class Details extends React.Component {
    constructor(props) {
      super(props);
      eid = sessionStorage.getItem("srollno")//this.props.match.params.rollno
      this.state={
       
        email : '',
        name : '', 
        phone:'',
        rollno : '',
        age : '',
        gender : '',
      }
     
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
              sessionStorage.setItem("uname",obj.name);
              sessionStorage.setItem("uemail",obj.email);
              sessionStorage.setItem("uage",obj.age);
              sessionStorage.setItem("ugender",obj.gender);
              sessionStorage.setItem("uphone",obj.phone);
              console.log(sessionStorage.getItem("srollno"))
              console.log(sessionStorage.getItem("uname"))
              console.log(sessionStorage.getItem("uphone"))
              console.log(sessionStorage.getItem("ugender"))
              console.log(sessionStorage.getItem("uage"))
              
        }));
       
      if(sessionStorage.getItem("srollno")!=null && sessionStorage.getItem("uname")!=null && sessionStorage.getItem("uphone")!=null && sessionStorage.getItem("ugender") && sessionStorage.getItem("uage")){
     window.location.href="/Home1";}
    }
    
    
    render(){
    
        return(
            <div style={user} class="profile">
         
        

          </div>
            
        )
    }
}

export default Details;