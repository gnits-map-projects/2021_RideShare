// import React, { Component } from "react";
// import { useHistory, withRouter,Link } from "react-router-dom";
// //import './home.css';
// //import Navigation from './home/Nav.js';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; 

// export default class Confirm extends Component{
//     constructor(props) {
//         super(props);
//       }
//       handleSubmit = event => {
//         event.preventDefault()
//         confirmAlert({
//             customUI: ({ onClose }) => {
//               return (
//                 <div className='custom-ui'>
//                   <h1>Are you sure?</h1>
//                   <p>You want to delete this file?</p>
//                   <button onClick={onClose}>No</button>
//                   <button
//                     onClick={() => {
//                       this.handleClickDelete();
//                       onClose();
//                     }}
//                   >
//                     Yes, Delete it!
//                   </button>
//                 </div>
//               );
//             }
//           });
//       }
//     render() {
//         return (
//         <div> 
//         <input type="submit" value="clikc" onClick={this.handleSubmit.bind(this)}/>
//         </div>
//         );
//     }
// }
import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 
class Confirm extends Component {
  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };
 
  render() {
    return (
      <div className='container'>
        <button onClick={this.submit}>Confirm dialog</button>
      </div>
    );
  }
}
export default Confirm;