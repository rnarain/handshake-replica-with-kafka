import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import PostingsNavbar from './PostingsNavbar';
import JobList from './JobList';
import backendServer from '../../../webConfig'




class Postings extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            jobList: [],
            filteredJobList: [],
            selectedfilters: [],
            fullTime: false,
            partTime: false,
            internship: false,
            onCampus: false,
        }

        this.filterChangeHandler = this.filterChangeHandler.bind(this);
        this.buildSelectedFilterArray = this.buildSelectedFilterArray.bind(this);

        this.searchChangeHandler = this.searchChangeHandler.bind(this);


    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.get(`${backendServer}/api/job/getJobsByStudentID/${localStorage.getItem('id')}`)
            .then(response => {
                this.setState({
                    jobList: response.data.data,
                    filteredJobList: response.data.data
                })
            }
            ).catch(ex => {
                alert("error");
            });
    }

    clearFilter = () => {
        this.setState({
            fullTime: false,
            partTime: false,
            internship: false,
            onCampus: false,
            selectedfilters: [],
            filteredJobList: this.state.jobList

        })
    }

    filterChangeHandler = (i) => {

        switch (i) {
            case 0:
                this.setState({
                    fullTime: !this.state.fullTime
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
            case 1:
                this.setState({
                    partTime: !this.state.partTime
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
            case 2:
                this.setState({
                    internship: !this.state.internship
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
            case 3:
                this.setState({
                    onCampus: !this.state.onCampus
                }, () => {
                    this.buildSelectedFilterArray()
                })
                break;
        }
    }

    buildSelectedFilterArray = () => {
        var selFilters = [];
        if (this.state.fullTime) {
            selFilters.push(0);
        }
        if (this.state.partTime) {
            selFilters.push(1);
        }
        if (this.state.internship) {
            selFilters.push(2);
        }
        if (this.state.onCampus) {
            selFilters.push(3);
        }
        let tempJobs;
        if (selFilters.length > 0) {
            tempJobs = this.state.jobList.filter((job) => {
                return (selFilters.includes(job.category))
            }
            )
        }
        else {
            tempJobs = this.state.jobList;
        }
        this.setState({
            selectedfilters: selFilters,
            filteredJobList: tempJobs

        })


        return tempJobs;
    }


    searchChangeHandler = (e) => {
        let filteredJobs = this.buildSelectedFilterArray();
        if (e.target.value) {
            this.setState({
                filteredJobList: filteredJobs.filter((job) => {
                    return (job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
    }

    cityChangeHandler = (e) => {
        let filteredJobs = this.buildSelectedFilterArray();
        if (e.target.value) {
            this.setState({
                filteredJobList: filteredJobs.filter((job) => {
                    return (job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
    }

    render() {
        let clearButton = null;
        if (this.state.selectedfilters.length > 0) {
            clearButton = <a onClick={() => { this.clearFilter() }} className="btn">Clear All</a>
        }
        return (
            <div className="handshake-body">
                <PostingsNavbar />
                <div className=" col-sm-10 col-sm-offset-1 card-columns">
                    <div className="col-sm-12 card">
                        <div className="box-part-container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                                        <input id="search" onChange={this.searchChangeHandler} type="text" className="form-control" name="search" placeholder="Search" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-map-marker"></i></span>
                                        <input id="city" type="text" onChange={this.cityChangeHandler} className="form-control" name="city" placeholder="City" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-12 filter-buttons">
                                    <button type="button" className={this.state.fullTime ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(0) }}>Full-Time</button>
                                    <button type="button" className={this.state.partTime ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(1) }}>Part-Time</button>
                                    <button type="button" className={this.state.internship ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(2) }}>Internship</button>
                                    <button type="button" className={this.state.onCampus ? 'btn btn-outline-colored' : 'btn btn-outline'} onClick={() => { this.filterChangeHandler(3) }}>On-Campus</button>
                                    <button type="button" className={this.state.selectedfilters.length > 0 ? 'btn btn-outline-colored' : 'btn btn-outline'}>Filters <span className="badge badge-light">{this.state.selectedfilters.length}</span></button>
                                    {clearButton}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 card">
                        <div className="box-part-container margin20"> <JobList jobList={this.state.filteredJobList} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Postings;
