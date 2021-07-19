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

var obj,tname,ph,body,crollno,frollno,body2;
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

class cancelledhistory extends Component {
  constructor(props){
  super(props);
  this.state={
    data:[],
    open: false,
    
 
    }
 
  }
  componentDidMount = () => {
   tname = sessionStorage.getItem("uname")
   ph = sessionStorage.getItem("uphone")
   crollno = sessionStorage.getItem("crollno");
   frollno = localStorage.getItem("srollno");
    var body={
      cid:sessionStorage.getItem("cid")
    }
    console.log(body)
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
                 body2={
                  id :list.cid
                }
                console.log(body)
            return (
                <tr id={index}>
                    <td>{list.frollno}</td>
                    <td >{list.phoneNumber}</td>
                    <td>{list.tname}</td>
                    <td >{list.id}</td>
                     </tr>
            );
        });  
        

    

}
  render() {
      
    return (
      <div className="App">
        <Navbar/>
        <div>
          <h1>Details</h1>
            <br/><br/><br/><br/>
          <ul role="nav">
          <table  border="1">
                        <th>Rollno</th>
                        <th>phoneNumber</th>
                        <th>Name</th>
                        <th>ID</th>
                     <tbody> {this.listItems()} </tbody>
                </table>
                
          </ul>
         
       </div>
       
      </div>
    );
  }
}

export default cancelledhistory;

        