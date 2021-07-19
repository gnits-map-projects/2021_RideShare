import React, { Component } from 'react'
import * as emailjs from 'emailjs-com'
//import Layout from '../components/layout'
import Navbar from './home/Nav';
import './home/home.css';
import { Button, FormFeedback, Form, FormGroup, Label, Input } from 'reactstrap'
//import Accordion from './Accordion';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validRollRegex = RegExp(/^1[6-9]251A((12)|(17)|(02)|(04)|(05))([0-9]{2}|([A-I]{1}[0-9]{1}))$/);

class ContactForm extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    rollno: '',
    e:false,
    errors: {
        email: '',}
  }
handleSubmit(e) {
    if(this.state.name!="" && this.state.email!="" && this.state.subject!="" && this.state.message!=""){
    e.preventDefault()
    const { name, email, subject, message ,rollno} = this.state
    let templateParams = {
      from_name: email,
      to_name: 'Admin',
      subject: subject,
      message_html: message,
      rollno:rollno
     }
     emailjs.send(
      'service_8w5847a',
      'template_wo18iHWy',
       templateParams,
      'user_3mZKYqV5tLO70k7u6fym9'
     )
     alert("email has been sent successfully:)")
     this.resetForm()
     
 }
else{
    alert("Please enter the details correctly")
}}
resetForm() {
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
      rollno:''
    })
  }
handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }
render() {
    return (<div>
        <div className="App">
        <Navbar/>
       </div>
       
       <div className="auth-wrapper1">
            <div className="auth-inner">
          <h5 className="p-heading1">Get in Touch</h5>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup controlId="formBasicEmail">
              <Label className="text-muted">Email address</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'email')}
                placeholder="Enter email"
              />
            </FormGroup>
            <FormGroup controlId="formBasicRollno">
              <Label className="text-muted">RollNo</Label>
              <Input
                type="text"
                name="rollno"
                value={this.state.rollno}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'rollno')}
                placeholder="Enter rollno"
              />
            </FormGroup>
<FormGroup controlId="formBasicName">
              <Label className="text-muted">Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                className="text-primary"
                onChange={this.handleChange.bind(this, 'name')}
                placeholder="Name"
              />
            </FormGroup>
<FormGroup controlId="formBasicSubject">
              <Label className="text-muted">Subject</Label>
              <Input
                type="text"
                name="subject"
                className="text-primary"
                value={this.state.subject}
                onChange={this.handleChange.bind(this, 'subject')}
                placeholder="Subject"
              />
            </FormGroup>
<FormGroup controlId="formBasicMessage">
              <Label className="text-muted">Message</Label>
              <Input
                type="textarea"
                name="message"
                className="text-primary"
                value={this.state.message}
                onChange={this.handleChange.bind(this, 'message')}
              autoFocus="true"/>
            </FormGroup>
<Button type="submit" class="btn btn-primary btn-block">
              Submit
            </Button>
          </Form>
     </div>
     </div>
     </div>
    )
  }
}
export default ContactForm;