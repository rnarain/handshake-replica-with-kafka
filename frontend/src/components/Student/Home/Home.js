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
import { getStudentData , addEducation ,addExperience  } from "../../../js/actions/studentProfile.js";




class HomePage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            basicinfo: "",
            skills: "",
            careerObjective: "",
            education: [],
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
        if (this.props.education.length !== this.state.education.length) {
            this.setState({
                education: this.props.education
            })
        }

        if (this.props.experience.length !== this.state.experience.length) {
            this.setState({
                experience: this.props.experience
            })
        }
    }


    AddEducationHandler = (e) => {
        this.props.addEducation({
                _id: null,
                college : null,
                yearOfPassing : null,
                major : null,
                yearOfStarting : null,
                gpa : null,
                degreeType : null,
                add: true
        })
    }

    AddExperienceHandler = (e) => {
        this.props.addExperience({
                _id: null,
                company: null,
                location: null,
                startDate: null,
                endDate: null,
                title:null,
                description: null,
                add: true
        })
    }

    render() {
        // let  educationTabs= null;
        // if(this.state.education.college){
        //     educationTabs= <Education education={this.state.education} editable={this.state.editable} />
        // }
        // else if (this.state.editable){
        //     educationTabs = <button onClick={this.AddEducationHandler} className="btn btn-info form-control edit-button">Add Education</button>
        // }

        // let  experienceTabs= null;
        // if(this.state.experience.company){
        //     experienceTabs= <Experience Experience={this.state.experience} editable={this.state.editable} />
        // }
        // else if (this.state.editable){
        //     experienceTabs = <button onClick={this.AddExperienceHandler} className="btn btn-info form-control edit-button">Add Experience</button>
        // }
           
        let educationTabs = this.state.education.map(e => {
            return(
                <Education key={e._id} education= {e} editable={this.state.editable} />
            )
        })
        let experienceTabs = this.state.experience.map(e => {
            return(
                <Experience key={e._id} Experience= {e} editable={this.state.editable}/>
            )
        })

        let addEducationButton = null;
        if(this.state.editable){
            addEducationButton= <button onClick={this.AddEducationHandler} className="btn btn-info form-control edit-button">Add Education</button>
        }
        let addExperienceButton = null;
        if(this.state.editable){
            addExperienceButton= <button onClick={this.AddExperienceHandler} className="btn btn-info form-control edit-button">Add Experience</button>
        }
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
                                {addEducationButton}
                            </div>
                        </div>
                        <div className="box-part">
                            <div className="card-body">
                                <h4 className="card-title">Experience</h4>
                                {experienceTabs}
                                {addExperienceButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log(state.studentProfileReducer);
    return {
        education: state.studentProfileReducer.education,
        experience: state.studentProfileReducer.experience
    };
};

function mapDispatchToProps(dispatch) {
    return {
        studentdata: (id) => dispatch(getStudentData(id)),
        addEducation : (data) => dispatch(addEducation(data)),
        addExperience : (data) => dispatch(addExperience(data)),
    };
}
const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default Home;
