import React, { Component } from 'react';
import BasicInfo from '../ProfileTabs/AllTabs/BasicInfo';
import AccountInfo from '../ProfileTabs/AllTabs/AccountInfo';
import CareerObjective from '../ProfileTabs/AllTabs/CareerObjective';
import Education from '../ProfileTabs/AllTabs/Education';
import Experience from '../ProfileTabs/AllTabs/Experience';
import Skills from '../ProfileTabs/AllTabs/Skills';
import axios from 'axios';
import backendServer from "../../../webConfig";
import { connect } from 'react-redux';
import { getStudentData } from "../../../js/actions/studentProfile.js";




class HomePage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            basicinfo: "",
            skills: "",
            careerObjective: "",
            education: {
                college : null,
                yearOfPassing : null,
                major : null,
                yearOfStarting : null,
                gpa : null,
                degreeType : null
            },
            accountInfo: {},
            experience: [],
            editable: false
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidMount() {
        if (this.props.match.params.id == localStorage.getItem('id')) {
            this.setState({
                editable: true
            })
        }
        this.props.studentdata(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.props.education.college !== this.state.education.college) {
            this.setState({
                education: this.props.education
            })
        }

        if (this.props.experience.company !== this.state.experience.company) {
            this.setState({
                experience: this.props.experience
            })
        }
    }


    AddEducationHandler = (e) => {
        this.setState({
            education: this.state.education.concat({
                educationID: "",
                studentID: "",
                college: "",
                major: "",
                yearOfStarting: null,
                yearOfPassing: null,
                gpa: "",
                degreeType: "",
                add: true
            })
        })
    }

    AddExperienceHandler = (e) => {
        this.setState({
            experience: this.state.experience.concat({
                experienceID: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                title: "",
                description: "",
                add: true
            })
        })
    }

    render() {
        let  educationTabs= null;
        if(this.state.education.college){
            educationTabs= <Education education={this.state.education} editable={this.state.editable} />
        }
        else if (this.state.editable){
            educationTabs = <button onClick={this.AddEducationHandler} className="btn btn-info form-control edit-button">Add Education</button>
        }

        let  experienceTabs= null;
        if(this.state.experience.company){
            experienceTabs= <Experience Experience={this.state.experience} editable={this.state.editable} />
        }
        else if (this.state.editable){
            experienceTabs = <button onClick={this.AddExperienceHandler} className="btn btn-info form-control edit-button">Add Experience</button>
        }
           
        // let  educationTabs= null;
        // if(this.props.experience._id){
        //     educationTabs= <Education education={this.props.experience} editable={this.state.editable} />
        // }

        // let addEducationButton = null;
        // if (this.state.editable) {
        //     addEducationButton = <button onClick={this.AddEducationHandler} className="btn btn-info form-control edit-button">Add Education</button>
        // }
        // let addExperienceButton = null;
        // if (this.state.editable) {
        //     addExperienceButton = <button onClick={this.AddExperienceHandler} className="btn btn-info form-control edit-button">Add Experience</button>
        // }
        return (
            <div className="handshake-body">
                <div className=" col-sm-8 col-sm-offset-2 profile-container card-columns">
                    <div className="card col-sm-4">
                        <div className="box-part">
                            <BasicInfo editable={this.state.editable} />
                        </div>
                        <div className="box-part">
                            <AccountInfo editable={this.state.editable} />
                        </div>
                        <div className="box-part">
                            <Skills  editable={this.state.editable} />
                        </div>
                    </div>
                    <div className="card col-sm-8">
                        <div className="box-part">
                            <CareerObjective editable={this.state.editable} />
                        </div>
                        <div className="box-part">
                            <div className="card-body">
                                <h4 className="card-title">Education</h4>
                                {educationTabs}
                            </div>
                        </div>
                        <div className="box-part">
                            <div className="card-body">
                                <h4 className="card-title">Experience</h4>
                                {experienceTabs}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        education: state.studentProfileReducer.education,
        experience: state.studentProfileReducer.experience
    };
};

function mapDispatchToProps(dispatch) {
    return {
        studentdata: (id) => dispatch(getStudentData(id))
    };
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default Home;
