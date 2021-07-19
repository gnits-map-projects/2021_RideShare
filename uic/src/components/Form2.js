import React, { Component } from 'react';
import './Form1.css'
import {Link,useHistory, withRouter} from 'react-router-dom'
//import Autocomplete from  'react-autocomplete';
//import { getCountry, matchCountry } from './dataService';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'
import moment from 'moment';

class Form2 extends Component{
    constructor(props){
        super(props);
        this.state={
              sname : "",
              dname : "",
              data:[],
              data1:[],
              data2:[]  
              

        }
        this.snameChange = this.snameChange.bind(this);
        this.dnameChange = this.dnameChange.bind(this);
        
       this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = () => {

      var body = {
        frollno : sessionStorage.getItem("srollno")
        
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
   
   snameChange = (event, values) => {
    this.setState({
      sname : values.src
  });
  console.log(this.state.sname);
}
dnameChange = (event, values) => {
  this.setState({
    dname : values.dest
});
console.log(this.state.dname);
}
    


    handleSubmit = event =>{
        event.preventDefault();
       console.log(this.state);
       var body = {
       src    : this.state.sname,
       dest   : this.state.dname,
       
       }
       console.log(body);
       if(this.state.sname==""){
         alert('Please enter the source')
       }

       else if(this.state.dname==""){
         alert('Please enter the destinantion')
       }
    
       else{
         sessionStorage.setItem("src",this.state.sname);
         sessionStorage.setItem("dest",this.state.dname);
         
        console.log(this.state)
         const url = "http://localhost:9000/find";
            window.location.href="/list";
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
              
                return response.json();
               // console.log(r[0])
                // sessionStorage.setItem("data",JSON)
                // window.location.href="/list";
        
              
            }).then(res=>{console.log(res[0].id)
              return res});
        
      
      
         
   }
  }

    render(){
      function removeDuplicates(data, key) {
  
        return [
          ...new Map(data.map(item => [key(item), item])).values()
        ]
      
      }
      
      this.state.data1=(removeDuplicates(this.state.data, item => item.src));
      this.state.data2=(removeDuplicates(this.state.data, item => item.dest));
      //console.log(this.state.data1);
      //console.log(this.state.data2);
      let time1 = moment().format("HH:MM:SS")
      if(localStorage.getItem("time") >= time1){
        return(
          <div className="App">
          <br></br>
          <div>
          <center>
        <Autocomplete
          id="combo-box-demo"
          options={this.state.data1}
          getOptionLabel={(option) => option.src}
          style={{ width: 300}}
          onChange={this.snameChange}
          renderInput={(params) => <TextField {...params} label="Enter Source" variant="outlined" />}


        />
        </center>
</div>

<br></br>
<div>
  <center>

<Autocomplete
          id="combo-box-demo1"
          options={this.state.data2}
          getOptionLabel={(option) => option.dest}
          style={{ width: 300 }}
          onChange={this.dnameChange}
          renderInput={(params) => <TextField {...params}  label="Enter Destination" variant="outlined" />}


        />
        </center>
        
</div>
<center>   
<br></br><br></br>
<div>
  
    <button type="submit" class="submitb" onClick={this.handleSubmit.bind(this)} value="Submit">Submit</button>
    
    </div>
    </center>   
       </div> 
        

        );
    }
    else{
      window.location.href="/logout"
    }
  }
}
export default Form2;