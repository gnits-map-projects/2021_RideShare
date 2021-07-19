
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import moment, { isMoment } from 'moment';
import { Link } from 'react-router-dom';



const styles = {
  block: {
    maxWidth: 250,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  Calendar: {
    maxWidth: 250,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  toggle: {
    marginBottom: 16,
    margin: '0 auto',
  },
};



class FormComponent extends Component{
    constructor(props) {
      super(props);
      this.state={
        open: false,
        origin: '',
        destin:'',
        controlledDate: null,
        time:moment(),
        value: null,
        Toggled:false,
        Disabled:true,
        timeReturn:null,
        controlledDateReturn:null,
        databaseType : this.props.databaseType,
        originfieldRequired : '',
        destinfieldRequired : '',
        controlledDateRequired : '',
        timeDateRequired : '',
        redirect: false,

      }
    }

    onchangeHandler=(e)=>{
      if(e.target.id === "origin"){
        this.initAutoComplete(e.target.id);
        this.setState({origin:e.target.value});
      } if(e.target.id === "destination"){
        this.initAutoComplete(e.target.id);
        this.setState({destin:e.target.value});

      }
      
    }
    onChange = (value, inputValue) => {
      console.log(value.format('YYYY-MM-DD'))
      this.setState({value})
    }
    onOpenChange = (status) => {
      console.log('open status: ' + status)
    }
    disabledDate = (currentDate, inputValue) => {
      return false
    }
  
    onchangeDateTime=(event , date)=>{
        this.setState({controlledDate:date});
        alert("date")
    }
    onchangeTime=(event , time)=>{
        this.setState({time:time});
    }

    /*onchangeDateTimeDisabled=(event , date)=>{
        this.setState({controlledDateReturn:date});
    }
    onchangeTimeDisabled=(event , date)=>{
        this.setState({timeReturn:date});
    }
    
    onSubmitForm=()=>{


      if (this.state.origin === "") {
        this.setState({originfieldRequired : 'This field is Required'});
      } else if(this.state.destin === "") {
        this.setState({destinfieldRequired : 'This field is Required'});
      } else if (this.state.controlledDate === null) {
        this.setState({controlledDateRequired : 'This field is Required'});
      } else if (this.state.time === null) {
          this.setState({timeDateRequired : 'This field is Required'});
      } else {
        var logDate =  this.state.controlledDate.getDate() + "/" + (this.state.controlledDate.getMonth() + 1) + "/" + this.state.controlledDate.getFullYear();
        var logTime = this.state.time.getHours() + ":" + this.state.time.getMinutes();
        if (this.state.Disabled) {
          payload = {
              'name' : 'Brian',
              'origin' : `${this.state.origin}`,
              'destination' : `${this.state.destin}`,
              'date' : logDate,
              'time' : logTime
          };
         
        } else {
          var logDateReturn =  this.state.controlledDateReturn.getDate() + "/" + (this.state.controlledDateReturn.getMonth() + 1) + "/" + this.state.controlledDateReturn.getFullYear();
          var logTimeReturn = this.state.timeReturn.getHours() + ":" + this.state.timeReturn.getMinutes();
          payload = {
              'name' : 'Brian',
              'origin' : `${this.state.origin}`,
              'destination' : `${this.state.destin}`,
              'date' : logDate,
              'time' : logTime,
              'dateReturn' : logDateReturn,
              'timeReturn' : logTimeReturn
          };
         
        }
        this.setState({
          open: false,
          origin: '',
          destin:'',
          controlledDate:null,
          time:null,
          Toggled:false,
          //Disabled:true,
          //timeReturn:null,
          //controlledDateReturn:null,
          //originfieldRequired : '',
          //destinfieldRequired : '',
          //controlledDateRequired : '',
          //timeDateRequired : '',
        });
      }
    }*/

    openReturn=()=>{
      this.setState({Toggled: !this.state.Toggled , Disabled : !this.state.Disabled});
      if (!this.state.Disabled) {
        this.setState({controlledDateReturn : null, timeReturn : null})
      }
    }

initAutoComplete=(event)=>{
      const input = document.getElementById(event)
      const options = {
        componentRestrictions: {country: 'ie'},
        types: ['geocode']
      }
      const geoAutocomplete = new window.google.maps.places.Autocomplete((input), options)
      geoAutocomplete.addListener('place_changed', () => {
        const selectedPlace = geoAutocomplete.getPlace()
        const componentForm = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'short_name',
          country: 'long_name',
          postal_code: 'short_name'
        }
        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        let selectedSuggest = {}
        for (let addressComponent of selectedPlace.address_components) {
          const addressType = addressComponent.types[0]
          if (componentForm[addressType]) {
            selectedSuggest[addressType] = addressComponent[componentForm[addressType]]
          }
        }
        // input.value = selectedPlace.name // Code injection risk (check doc)
        if(selectedSuggest.locality === undefined){
          input.value = `${selectedSuggest.administrative_area_level_1}, ${selectedSuggest.country}`;
        }else{
          input.value = `${selectedSuggest.locality}, ${selectedSuggest.administrative_area_level_1}`;
        }

        if(event === "origin"){
          this.setState({origin:input.value});
        } else {
          this.setState({destin:input.value});
        }


      })
    }



    render() {

    const { redirect } = this.state;
    const {onChange, onOpenChange, disabledDate} = this
     /*if (redirect) {
       <Redirect push to="/list" />
     }*/

    return (
      <div>
      <MuiThemeProvider>
        <form onSubmit={this.onSubmitForm}>
          <TextField
            hintText="Define your origin"
            floatingLabelText="Where are you?"
            value={this.state.origin}
            id="origin"
            onChange={this.onchangeHandler}
            placeholder=''
            errorText={this.state.originfieldRequired}
          />
          <p/>
          <TextField
            hintText="Define your destination"
            floatingLabelText="Where you're going?"
            value={this.state.destin}
            id="destination"
            onChange={this.onchangeHandler}
            placeholder=''
            errorText ={this.state.destinfieldRequired}
          />
          <p/><center>
        <p/></center><br/>
          <center>
      </center>
          <Link to="/list"><RaisedButton label="GO" onTouchTap={this.handleOpen} type="submit">
    </RaisedButton></Link>
    
   
        </form>
      </MuiThemeProvider>
    </div>
    );
  }
}

export default FormComponent;
