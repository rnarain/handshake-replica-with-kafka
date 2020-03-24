import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {jobTypes, applicationStatus} from '../../../enum.js';
import axios from 'axios';
import PostingsNavbar from './PostingsNavbar';
import backendServer from '../../../webConfig'





//create the Navbar Component
class IndividualApplicant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobApplicationID: "",
            studentID: "",
            status: "",
            applicationDate: "",
            fname: "",
            lname: ""
        }
    }
    changeStatus = (e)=>{
       const data={
           jobApplicationID : this.state.jobApplicationID,
           status : e.target.value
       }
       console.log(data);
        //change application status
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post(`${backendServer}/api/job/changeApplicationStatus`,data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        status : data.status
                    })
                    console.log(response);
                } else {
                    console.log("error");
                }
            });
    } 


    componentDidMount() {
        this.setState({
            jobApplicationID: this.props.individualApplicant.jobApplicationID,
            studentID: this.props.individualApplicant.studentID,
            status: this.props.individualApplicant.status,
            applicationDate: this.props.individualApplicant.applicationDate,
            fname: this.props.individualApplicant.fname,
            lname:this.props.individualApplicant.lname,
            resumeURL:this.props.individualApplicant.resumeURL,

        })
    }

    render() {
       let profileLink="/student/profile/" + this.state.studentID
        return (
            <tr>
            {/* <th scope="row"></th> */}
            <td>{this.state.fname} {this.state.lname}</td>
            <td>{this.state.applicationDate}</td>
            <td><Link to={profileLink} className="btn btn-primary">View</Link></td>
            <td><a href={this.state.resumeURL} className="btn btn-primary" target="_blank">Resume</a></td>
            <td><select className="form-control" value={this.state.status} onChange={this.changeStatus}>
                    <option value="0">{applicationStatus[0]}</option>
                    <option value="1">{applicationStatus[1]}</option>
                    <option value="2">{applicationStatus[2]}</option>
                </select>
            </td>
          </tr>
          )
    }
}

export default IndividualApplicant;

