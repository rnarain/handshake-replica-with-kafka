import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import IndividualApplicant from './IndividualApplicant';
import backendServer from '../../../webConfig'






//create the Navbar Component
class ApplicantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicantList: []
        }
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.get(`${backendServer}/api/job/getApplicantListByJobID/${this.props.match.params.id}`)
            .then(response => {
                if (response.status === 200) {
                      this.setState({
                        applicantList: response.data.data      
                      })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    }

    render() {
        let applicants = this.state.applicantList.map(applicant => {
            return (
               <IndividualApplicant individualApplicant={applicant} />
            )
        })

        return (
            <div className="handshake-body">
                <PostingsNavbar />
                <div className=" col-sm-offset-1 col-sm-10 jobListCompany">
                <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Application Date</th>
      <th scope="col">View Profile</th>
      <th scope="col">View Resume</th>
      <th scope="col">Change Status</th>


    </tr>
  </thead>
  <tbody>
   {applicants}
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

export default ApplicantList;