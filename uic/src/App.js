import React ,{ Component } from 'react';

import { BrowserRouter as Router, 
  Switch, 
  Route,
   Link } from "react-router-dom";
   import Login from "./components/home/login";
   import Signup from "./components/home/Signup";
   import Home from "./components/home/home";
   import Home1 from './components/Home1';
   import Driver from './components/Driver';
   import Pooler from './components/Pooler';
   import About from "./components/home/about.js";
   import List from "./components/List";
   import logout from './components/home/logout';
   import Profile from './components/Profile';
   import Updatedetalis from './components/Updatedetails';
   import Details from './components/details';
import Lists from './components/lists';
import History1 from './components/History1';
import uhistory from './components/uhistory';
import DisHistory1 from './components/DisHistory1';
import Past from './components/Past';
import { AutoComplete } from 'material-ui';
import autoComplete from './components/autocomplete';
import Cancelled from './components/Cancelled';
import ContactForm from './components/Contact';
import Request from './components/Request'
import Admin from './components/Admin';
import Confirm from './components/Confirm';
import ListFromCreate from './components/ListFromCreate'
import Login1 from './components/home/Login1';
import Staffform from './components/home/Staffform';
import Stafflogin from './components/home/Stafflogin';
import Adminvalidate from './components/home/Adminvalidate'
import Admindelete from './components/home/Admindelete'
import Cancelled1 from './components/Cancelled1';
import cancelledhistory from './components/cancelledhistory';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
  return (
    <div style={{height:"100%", width:"100%"}}>
            <Router>
                <Switch>
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path='/' component={ Home } />
            <Route exact path='/Home' component={ Home } />
            <Route path="/Login" component={ Login } />
            <Route path="/Signup" component={ Signup } />
            <Route path="/Home1" component={Home1}/>
            <Route path="/Driver" component={Driver}/>
            <Route path="/Pooler" component={Pooler}/>
            <Route path="/about" component= { About }/>
            <Route path="/logout" component= { logout }/>
            <Route path="/list" component= { List }/>
            <Route path="/profile" component= { Profile }/>
            <Route path="/update" component={Updatedetalis}/>
            <Route path="/details" component={Details}/>
            <Route path="/history" component={DisHistory1}/>
            <Route path="/lists" component={Lists}/>
            <Route path="/history1" component={History1}/>
            <Route path="/uhistory" component={uhistory}/>
            <Route path="/past" component={Past}/>
            <Route path="/autocomplete" component={autoComplete}/>
            <Route path="/cancelled" component={Cancelled}/>
            <Route path="/contactus" component={ContactForm}/>
            <Route path="/request" component={Request}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/confirm" component={Confirm}/>
            <Route path="/listFromCreate" component={ListFromCreate}/>
            <Route path="/Login1" component={ Login1 } />
            <Route path="/staffform" component={ Staffform } />
            <Route path="/stafflogin" component={ Stafflogin } />
            <Route path="/adminvalidate" component={ Adminvalidate } />
            <Route path="/admindelete" component={Admindelete } />
            <Route path="/cancelled1" component={ Cancelled1 } />
            <Route path="/cancelledhistory" component={ cancelledhistory } />
           
            </Switch>
            </Router>
            </div>
        
  );
}}

export default App;
