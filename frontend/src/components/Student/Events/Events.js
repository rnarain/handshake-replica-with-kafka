import React, { Component } from 'react';
import axios from 'axios';
import {colleges ,majors, skills} from '../../../enum'
import cookie from 'react-cookies';
import {dateTimeToDate} from '../../../helperMethods'
import EventsNavbar from './EventsNavbar';
import backendServer from '../../../webConfig'
import IndividualEvent from './IndividualEvent'
import { paginate, pages } from '../../../helperFunctions/paginate'







class Events extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            events: [],
            filteredevents: [],
            buttonText:"+ RSVP",
            pages: 0

        }

        this.nameFilterChangeHandler= this.nameFilterChangeHandler.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.get(`${backendServer}/api/event/getAllEventsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                console.log(response);
                this.setState({
                    events: response.data.data,
                    filteredevents : paginate(response.data.data, 1, 10),
                    pages: pages(response.data.data, 10)
                })
            }
            ).catch(ex => {
                alert(ex);
            });
    }

    paginatinon = (e) => {
        this.setState({
            filteredRegistrations: paginate(this.state.events,e, 10)
        })
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

    
    render() {
        let events = this.state.filteredevents.map(event => {
            return (
                < IndividualEvent event={event} />
                )
        })

        let links = [];
        if (this.state.pages > 0) {
            for (let i = 1; i <= this.state.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={() => { this.paginatinon(i) }}>
                    {i}
                </a></li>
                )
            }
        }
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
                        <ul className="pagination">
                        {links}
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events;
