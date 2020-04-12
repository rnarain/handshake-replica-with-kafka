import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import {dateTimeToDate} from '../../../helperMethods'


class IndividualEvent extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            buttonText:"+ RSVP"
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidUpdate() {
    }

    registerForEvent = (e) => {
        const data={
            eventID:e,
            studentID: localStorage.getItem('id'),
            name:localStorage.getItem('name'),
        }
        axios.post(`${backendServer}/api/event/registerForEvent`,data)
            .then(response => {
                this.setState({
                    buttonText : "Registered"
                })
            }
            ).catch(ex => {
                alert(ex);
            });
    }
    render(){
 
        return (
            <div className="box-part">
                    <div className="card-body container-fluid">
                        <div className="col-sm-10">
                            <div className="row">
                            <h4 className="card-title">{this.props.event.name}</h4>
                            <p className="card-text">{this.props.event.description}</p>

                            <div className="col-sm-12 nopadding">
                            <p >{this.props.event.location} </p>
                            <p > {dateTimeToDate(this.props.event.date)} at {this.props.event.time}</p>
                             </div>
                        </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="row">
                            <button type="button" className="btn btn-outline-colored" onClick={()=>{this.registerForEvent(this.props.event._id)}} >{this.state.buttonText}</button>

                        </div>
                        </div>
                        </div>
                    </div>
            
        )
    }
}
export default IndividualEvent;
