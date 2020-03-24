import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import StudentHome from './Student/Home/Home';
import Postings from './Student/Jobs/Postings';
import EventPostings from './Company/Events/EventPostings';
import Applications from './Student/Jobs/Applications';
import JobPostings from './Company/JobPostings/JobPostings';
import Listings from './Company/JobPostings/Listings';
import EventListings from './Company/Events/EventListings';
import CompanyProfile from './Company/Profile/CompanyProfile';

import ApplicantList from './Company/JobPostings/ApplicantList';
import EventParticipantList from './Company/Events/EventParticipantList';
import Student from './Company/Students/student';
import Students from './Student/Students/Students';
import Events from './Student/Events/Events';
import EventRegistrations from './Student/Events/EventRegistrations';







// import Postings from './Student/Jobs/Postings';
// import Applications from './Student/Jobs/Applications';


import Navbar from './LandingPage/Navbar';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';


//Create a Main Component
class Main extends Component {
    render(){
        let navRoute = null;
        if (localStorage.getItem('id')) {
            navRoute = <Navbar />
            }
        else{
        }

        return(
            <div>
                {/*Render Different Component based on Route*/}
                {navRoute}
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login}/>
                <Route path="/student/profile/:id" component={StudentHome}/>
                <Route path="/company/profile/:id" component={CompanyProfile}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/student/postings" component={Postings}/>
                <Route path="/student/applications" component={Applications}/>
                <Route path="/company/postings" component={JobPostings}/>
                <Route path="/company/listings" component={Listings}/>
                <Route path="/company/events" component={EventPostings}/>
                <Route path="/company/eventlistings" component={EventListings}/>
                <Route path="/company/event-participant-list/:id" component={EventParticipantList}/>
                <Route path="/company/applicantlist/:id" component={ApplicantList}/>
                <Route path="/company/students" component={Student}/>
                <Route path="/student/students" component={Students}/>
                <Route path="/student/events" component={Events}/>
                <Route path="/student/event-registrations" component={EventRegistrations}/>




                
               
            </div>
        )
    }
}
//Export The Main Component
export default Main;