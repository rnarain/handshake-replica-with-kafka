import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventPostingsNavbar from './EventPostingsNavbar';
import backendServer from '../../../webConfig'






//create the Navbar Component
class participantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantList: []
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/api/event/getParticpantListByEventID/${this.props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        participantList: response.data.data      
                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    render() {
        let participants = this.state.participantList.map(participant => {
            let profileLink="/student/profile/" + participant.studentID;
            return (
                <tr>
                {/* <th scope="row"></th> */}
                <td>{participant.fname} {participant.lname}</td>
                <td><Link to={profileLink} className="btn btn-primary">View</Link></td>
              </tr>
            )
        })

        return (
            <div className="handshake-body">
                <EventPostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">View Profile</th>
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

export default participantList;