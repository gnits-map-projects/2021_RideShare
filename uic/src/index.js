import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

var CronJob = require('cron').CronJob;
var date1,data,i
console.log('Before job instantiation');
const job = new CronJob('0 */2 * * *', function() {
	// const d = new Date();
    // console.log('At Ten Minutes:', d);
    const date = moment().toString();
    date1 = moment(date).format('YYYY-MM-DD')
    var body={
        rdate :date1
      }
      
      var url = "http://localhost:9000/date";
      var  templateId = "join_ride";
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
        
          for(i=0;i<res.length;i++){
              if(res[i].vacancy==3 && (res[i].rtime<moment().format("HH:MM:SS"))){
              var variable = {to_name: res[i].name,from_name: "Admin", email: "srujjii@gmail.com",subject:"No one joined your ride yet",message_html:"The vacancy for the ride which is created for today from "+res[i].src+" to "+res[i].dest+" is 3\n"+" i.e, no one has joined the ride "+"\nif you want to cancel the ride please login to the website"}
               window.emailjs.send(
                'gmail', templateId,
                variable
                ).then(res => {
                    console.log('Email successfully sent!')
                })
                .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
            
          }
        }
          
          });
    
    }
)

job.start();
console.log('After job instantiation');

ReactDOM.render( <App/>
   
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
