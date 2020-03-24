import React, { Component } from 'react';
// import BasicInfo from '../ProfileTabs/AllTabs/BasicInfo';
// import AccountInfo from '../ProfileTabs/AllTabs/AccountInfo';
// import CareerObjective from '../ProfileTabs/AllTabs/CareerObjective';
// import Education from '../ProfileTabs/AllTabs/Education';
// import Experience from '../ProfileTabs/AllTabs/Experience';
// import Skills from '../ProfileTabs/AllTabs/Skills';
import axios from 'axios';
import {colleges ,majors, skills} from '../../../enum'
import cookie from 'react-cookies';
import {dateTimeToDate} from '../../../helperMethods'
import EventsNavbar from './EventsNavbar';
import backendServer from '../../../webConfig'







class Events extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            events: [],
            filteredevents: [],
            buttonText:"+ RSVP"
        }

        this.nameFilterChangeHandler= this.nameFilterChangeHandler.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.get(`${backendServer}/api/event/getAllEventsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                console.log(response);
                this.setState({
                    events: response.data.data,
                    filteredevents : response.data.data
                })
            }
            ).catch(ex => {
                alert(ex);
            });
    }
    nameFilterChangeHandler = (e) => {
        if(e.target.value === ""){
            this.setState({
                filteredevents : this.state.events
            })
        }
        else{
            let filteredevents = this.state.events;
            if (e.target.value) {
                this.setState({
                    filteredevents: filteredevents.filter((s) => {
                        return (s.name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                    }
                    )
                })
            }
        }
        
    }

    registerForEvent = (e) => {
        const data={
            eventID:e,
            studentID: localStorage.getItem('id')
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
    render() {
        let events = this.state.filteredevents.map(event => {
            return (
                <div className="box-part">
                    <div className="card-body container-fluid">
                        <div className="col-sm-10">
                            <div className="row">
                            <h4 className="card-title">{event.name}</h4>
                            <p className="card-text">{event.description}</p>

                            <div className="col-sm-12 nopadding">
                            <p >{event.location} </p>
                            <p > {dateTimeToDate(event.date)} at {event.time}</p>
                             </div>
                        </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="row">
                            <button type="button" className="btn btn-outline-colored" onClick={()=>{this.registerForEvent(event.eventID)}} >{this.state.buttonText}</button>

                        </div>
                        </div>
                        </div>
                    </div>
            )
        })
        return (
            <div className="handshake-body">
                <EventsNavbar/>
                <div className=" col-sm-10 col-sm-offset-1 card-columns">
                    <div className="card col-sm-3">
                        <div className="box-part-nopadding">
                            <div className="padding-inside">
                                <div className="header-filter">
                                    <h4>Filters</h4>
                                </div>
                                <div className="style-divider"></div>
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <a type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Name
        </a>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                            <input id="nameFilter" onChange={this.nameFilterChangeHandler} type="text" className="form-control" name="nameFilter" placeholder="Filter by name" />

      </div>
                                        </div>
                                    </div>
                                   </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-sm-9">
                        {events}
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;
