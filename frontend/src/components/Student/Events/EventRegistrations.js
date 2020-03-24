import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventsNavbar from './EventsNavbar';
import backendServer from '../../../webConfig'







//create the Navbar Component
class EventRegistrations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventRegistrations: []
        }
    }
    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/api/event/getAllEventRegistrationsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        eventRegistrations: response.data.data      
                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    render() {
        let participants = this.state.eventRegistrations.map(participant => {
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

        return (
            <div className="handshake-body">
               <EventsNavbar/>
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