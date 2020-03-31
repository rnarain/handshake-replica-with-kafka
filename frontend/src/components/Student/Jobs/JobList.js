import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import SweetAlert from 'sweetalert-react';
// import 'sweetalert/dist/sweetalert.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { jobTypes } from '../../../enum.js'
import axios from 'axios';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import { jobSearchPaginatinon } from "../../../js/actions/jobSearch.js";



// let selectedfilters= [0,3];
// const jobTypes = {
//     0: "Full-Time",
//     1: "Part-Time",
//     2: "Internship",
//     3: "On-Campus"
// }
 const MySwal = withReactContent(Swal)




//create the Navbar Component
class JobListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            selectedJob: {},
            selectedPageNumber: 0,

        }
        this.showJobDetail = this.showJobDetail.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.applyModal = this.applyModal.bind(this);
    }
    // filterJobs = ()=>{
    //     console.log("in filter jobs");

    //     this.props.jobList.filter((job)=>{
    //         selectedfilters.includes(job.category)
    //     })
    // } 


    componentDidUpdate() {
        if (this.props.jobList.length > 0) {

            if (Object.keys(this.state.selectedJob).length === 0) {
                this.setState({
                    selectedJob: this.props.jobList[0]
                })
            }
            // else if(this.state.selectedJob.jobID !== this.props.jobList.jobID){
            //         this.setState({
            //             selectedJob :this.props.jobList[0]
            //         })
            // }
        }
        else if (Object.keys(this.state.selectedJob).length !== 0) {
            this.setState({
                selectedJob: []
            })
        }


    }
    showJobDetail = (e) => {
        this.setState({
            selectedJob: e
        })
    }

    paginationHandler = (e) => {
        this.setState({
            selectedJob: e
        })
    }

    applyModal = () => {
        return (
            MySwal.fire({
                title: 'Upload Resume',
                input: 'file',
                confirmButtonText: 'Apply',
                showCancelButton: true,
                preConfirm: (file) => {
                    const data = new FormData() 
                    data.append('file', file)
                    axios.post(`${backendServer}/api/job/applyForJob?studentID=${localStorage.getItem('id')}&jobID=${this.state.selectedJob.jobID}`, data)
                        .then(response => {
                            if(response.status==201){
                                this.setState({
                                    selectedJob: {
                                        ...this.state.selectedJob,
                                        applied:true
                                    }
                                })
                            }
                        }
                        ).catch(ex => {
                           alert(ex);
                        });
                },
            }).then((result) => {
                if (result.value) {
                    MySwal.fire({
                        icon: 'success',
                        title: 'Applied',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }

            })
        )
    }


    //handle logout to destroy the cookie

    render() {

        let applicationCloseOnBar = "";
        if(this.state.selectedJob.applied === undefined){
        applicationCloseOnBar =<div className="card-body applyBox row">
            <div className="col-sm-10">
                Applications close on {this.state.selectedJob.deadLineDate} </div>
            <div className="col-sm-2">
                <button type="button" onClick={this.applyModal} className="btn btn-success" data-toggle="modal" data-target="#exampleModalLong">Apply</button>
            </div>
        </div>
        }
        else{
            applicationCloseOnBar= <p>applied</p>
        }

        let jobs = this.props.jobList.map(job => {
            return (
                <div className="row job" key={job.jobID} onClick={() => { this.showJobDetail(job) }} >
                    <div className="col-sm-12">
                        <h5> {job.title}</h5>
                        <p className="smallText"> {job.name} - {job.location}</p>
                        <span className="greyText smallText">{jobTypes[job.category]}</span>
                    </div>
                </div>
            )
        })


        let links = [];
        if (this.props.pages > 0) {
            for (let i = 1; i <= this.props.pages; i++) {
                links.push(<li className="page-item" key={i}><a className="page-link" onClick={()=>{this.props.jobSearchPaginatinon(i)}}>
                    {i}
                </a></li>
                )
            }
        }


        //         const pageLinks = [];
        //         if(pages > 0){
        // for(let i =1; i <pages ; i++){
        //             return(
        //                 pageLinks.push(<li class="page-item"><a class="page-link" href="#">i</a></li>)
        //             )

        //                             }
        //         }





        //if Cookie is set render Logout Button
        return (

            <div className="row jobList">
                <div className="col-sm-4 jobListLeft">
                    {jobs}
                    {/* pagination */}
                    <nav>
                        <ul className="pagination">
                            {links}
                        </ul>
                    </nav>
                </div>
                <div className="col-sm-8 jobListRight">
                    {/* <div>
                <button onClick={() => this.setState({ show: true })}>Alert</button>
                <SweetAlert
                    show={this.state.show}
                    title="Demo"
                    text="SweetAlert in React"
                    onConfirm={() => this.setState({ show: false })}
                />
                </div> */}
                    <h3>{this.state.selectedJob.title}</h3>
                    <p>{this.state.selectedJob.name}</p>
                    <span className="greyText marginright10">
                        <i className="glyphicon glyphicon-briefcase"></i> {jobTypes[this.state.selectedJob.category]} </span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-map-marker"></i> {this.state.selectedJob.location}</span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-usd"></i>{this.state.selectedJob.salary}</span>
                    <span className="greyText marginright10"><i className="glyphicon glyphicon-time"></i> Posted {this.state.selectedJob.postedDate}</span>
                    <div className="card">
                       {applicationCloseOnBar}
                        <p>{this.state.selectedJob.description}</p>
                    </div>
                </div>


            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        jobList: state.jobSearchReducer.filteredJobs,
        pages :  state.jobSearchReducer.pages
    };
};

function mapDispatchToProps(dispatch) {
     return {
         jobSearchPaginatinon: (data) => dispatch(jobSearchPaginatinon(data))
     };
}
const JobList = connect(mapStateToProps, mapDispatchToProps)(JobListPage);
export default JobList;