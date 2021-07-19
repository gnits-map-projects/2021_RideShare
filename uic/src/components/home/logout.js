import React, { Component } from "react";
import {Redirect } from "react-router-dom";

export default class Logout extends Component{
    constructor(props){
        super(props);
        localStorage.removeItem("token")
        sessionStorage.clear();
        localStorage.clear();
    }
    render()
    {
        return(
            <div>
                {alert("logged out!")}
                <Redirect to='/Home'/>
            </div>
        )
    }
}
