import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import MessagesNavbar from './MessagesNavbar';
// import JobList from './JobList';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import { updateFilteredJobs } from "../../../js/actions/jobSearch.js";



class MessagesPage extends Component {
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

        // this.filterChangeHandler = this.filterChangeHandler.bind(this);
        // this.buildSelectedFilterArray = this.buildSelectedFilterArray.bind(this);

        // this.searchChangeHandler = this.searchChangeHandler.bind(this);


    }
    //Call the Will Mount to set the auth Flag to false
    // async componentWillMount() {

    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     await axios.get(`${backendServer}/api/job/getJobsByStudentID/${localStorage.getItem('id')}`)
    //         .then(response => {
    //             console.log(response);
    //             this.setState({
    //                 jobList: response.data.data,
    //                 filteredJobList: response.data.data
    //             })
    //             this.props.updateFilteredJobs({jobs:this.state.jobList});
    //         }
    //         ).catch(ex => {
    //             alert("error");
    //         });
    // }

    // clearFilter = () => {
    //     this.setState({
    //         fullTime: false,
    //         partTime: false,
    //         internship: false,
    //         onCampus: false,
    //         selectedfilters: [],
    //         filteredJobList: this.state.jobList

    //     })
    //     this.props.updateFilteredJobs({jobs:this.state.jobList})
    // }

    // filterChangeHandler = (i) => {
    //     switch (i) {
    //         case 0:
    //             this.setState({
    //                 fullTime: !this.state.fullTime
    //             }, () => {
    //                 this.buildSelectedFilterArray()
    //             })
    //             break;
    //         case 1:
    //             this.setState({
    //                 partTime: !this.state.partTime
    //             }, () => {
    //                 this.buildSelectedFilterArray()
    //             })
    //             break;
    //         case 2:
    //             this.setState({
    //                 internship: !this.state.internship
    //             }, () => {
    //                 this.buildSelectedFilterArray()
    //             })
    //             break;
    //         case 3:
    //             this.setState({
    //                 onCampus: !this.state.onCampus
    //             }, () => {
    //                 this.buildSelectedFilterArray()
    //             })
    //             break;
    //     }
    // }

    // buildSelectedFilterArray = () => {
    //     var selFilters = [];
    //     if (this.state.fullTime) {
    //         selFilters.push(0);
    //     }
    //     if (this.state.partTime) {
    //         selFilters.push(1);
    //     }
    //     if (this.state.internship) {
    //         selFilters.push(2);
    //     }
    //     if (this.state.onCampus) {
    //         selFilters.push(3);
    //     }
    //     let tempJobs;
    //     if (selFilters.length > 0) {
    //         tempJobs = this.state.jobList.filter((job) => {
    //             return (selFilters.includes(job.category))
    //         }
    //         )
    //     }
    //     else {
    //         tempJobs = this.state.jobList;
    //     }
    //     this.setState({
    //         selectedfilters: selFilters,
    //         // filteredJobList: tempJobs
    //     })

    //     this.props.updateFilteredJobs({jobs:tempJobs})
    //     return tempJobs;
    // }


    // searchChangeHandler = (e) => {
    //     let filteredJobs = this.buildSelectedFilterArray();
    //     if (e.target.value) {
    //         this.props.updateFilteredJobs(

    //             { jobs :filteredJobs.filter((job) => {
    //                 return (job.title.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
    //             }
    //             )}
    //         )
    //     }
    // }

    // cityChangeHandler = (e) => {
    //     let filteredJobs = this.buildSelectedFilterArray();
    //     if (e.target.value) {
    //         this.props.updateFilteredJobs(
    //             {jobs:filteredJobs.filter((job) => {
    //                 return (job.location.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
    //             }
    //             )
    //         }
    //         )
    //     }
    // }

    render() {
        // let clearButton = null;
        // if (this.state.selectedfilters.length > 0) {
        //     clearButton = <a onClick={() => { this.clearFilter() }} className="btn">Clear All</a>
        // }
        return (
            <div className="handshake-body">
                <div className=" col-sm-10 col-sm-offset-1 card-columns">
                    <div className="col-sm-12 card">
                        <div className="message-heading margin20 container-fluid">
                            <div className="row ">
                                <div className="col-sm-4 message-heading-left">
                                    <h4>Messages</h4>
                                </div>
                                <div className="col-sm-8 message-heading-right">

                                <h4>Name</h4>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-12 card">
                        <div className="message-box">
                                <div className="col-sm-4 messageListLeft white-back nopadding">
            <div className="chat_list active_chat">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div className="chat_list">
              <div className="chat_people">
                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
          </div>

                                <div className="col-sm-8 white-back">
                                <div className=" row messageListRight ">
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Want to solve a Google engineering challenge? Registration is now open for Hash Code, Google’s team programming competition, which kicks off with an Online Qualification Round on Thursday, February 20 from 12:30pm to 4:30pm EST. Whether you’ve just started coding or you’re a programming competition expert, Hash Code is a great chance to meet other developers, get a glimpse into software engineering at Google, and have some fun. 
Here’s what you need to know:
Problems are modeled on Google engineering challenges. Past problems have included perfecting video streaming on YouTube and optimizing the layout of a Google data center.
You can compete with your friends. You need to form a team of 2 to 4 people to compete in Hash Code. If you don’t have a team, don’t worry! You can find teammates using our Facebook group. 
Hubs add even more excitement to the competition. Hubs are meetups where teams from the same university can come together to compete in the Online Qualification Round. Competing from a hub is a great way to connect with other developers in your community (PS it’s not too late to organize a hub for your university!).
The Final Round will be held at Google Ireland. Top teams from the Online Qualification Round will be invited to Dublin in April to compete for cash prizes and the title of Hash Code 2019 Champion.
Are you up for the challenge? Register today.
Check out our FAQ or email hashcode@google.com with any questions!</p>
                  <span className="time_date"> 11:01 AM    |    June 9</span></div>
              </div>
            </div>
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>Test which is a new approach to have all
                  solutions</p>
                <span className="time_date"> 11:01 AM    |    June 9</span> </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>Test, which is a new approach to have</p>
                  <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
              </div>
            </div>
            <div className="outgoing_msg">
              <div className="sent_msg">
                <p>Apollo University, Delhi, India Test</p>
                <span className="time_date"> 11:01 AM    |    Today</span> </div>
            </div>
            <div className="incoming_msg">
              <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
              <div className="received_msg">
                <div className="received_withd_msg">
                  <p>We work directly with our designers and suppliers,
                    and sell direct to you, which means quality, exclusive
                    products, at a price anyone can afford.</p>
                  <span className="time_date"> 11:01 AM    |    Today</span></div>
              </div>
            </div>
          </div>
                                
                                <div className="row messageTextBox">Type here</div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

        )
    }
}
const mapStateToProps = state => {
    // return {
    //     filteredJobs: state.studentProfileReducer.education,
    //     experience: state.studentProfileReducer.experience
    // };
};

function mapDispatchToProps(dispatch) {
    return {
        updateFilteredJobs: (data) => dispatch(updateFilteredJobs(data))
    };
}
const Messages = connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
export default Messages;
