import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventsNavbar from './EventsNavbar';
import backendServer from '../../../webConfig'
import { paginate, pages } from '../../../helperFunctions/paginate'


//create the Navbar Component
class EventRegistrations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventRegistrations: [],
            filteredRegistrations: [],
            pages: 0
        }
    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/api/event/getAllEventRegistrationsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        eventRegistrations: response.data.data,
                        filteredRegistrations: paginate(response.data.data, 1, 10),
                        pages: pages(response.data.data, 10)
                    })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    paginatinon = (e) => {
        this.setState({
            filteredRegistrations: paginate(this.state.eventRegistrations, e, 10)
        })

    }

    render() {
        let participants = this.state.filteredRegistrations.map(participant => {
            // let profileLink="/student/profile/" + participant.studentID;
            return (
                <tr>
                    {/* <th scope="row"></th> */}
                    <td>{participant.name} </td>
                    <td>{participant.date} </td>
                    <td>{participant.time} </td>

                </tr>
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
                <EventsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants}
                        </tbody>

                    </table>
                    <ul className="pagination">
                        {links}
                    </ul>
                </div>

                {/* <div className="row">
                <div className="col-sm-12 jobListLeft">
                    {jobs}
                </div>
            </div> */}
            </div>
        )
    }
}

export default EventRegistrations;