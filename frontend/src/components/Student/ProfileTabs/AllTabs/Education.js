import React, { Component } from 'react';
import { colleges, majors ,degreeTypes } from '../../../../enum';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import { changeEducation } from "../../../../js/actions/studentProfile.js";
import { connect } from 'react-redux';




import {dateTimeToDate} from '../../../../helperMethods';



class EducationPage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            _id: "",
            college: "",
            major: "",
            yearOfStarting: "",
            yearOfPassing: "",
            gpa: "",
            degreeType: "",
            add: false,
            edit: false
        }
    }

    componentDidMount() {
        console.log(this.props);
        if(this.props.education._id !=this.state._id){
            this.setState({
                _id: this.props.education._id,
                college: this.props.education.college,
                major: this.props.education.major,
                yearOfStarting: this.props.education.yearOfStarting,
                yearOfPassing: this.props.education.yearOfPassing,
                gpa: this.props.education.gpa,
                degreeType: this.props.education.degreeType,
                add: this.props.education.add,
                edit: this.props.education.edit
            })
        }
    }

    editButtonChangeHandler = (e) => {
        this.setState({
            edit: !this.state.edit,
            add: false
        })
    }

    collegeChangeHandler = (e) => {
        this.setState({
            college: e.target.value
        })
    }
    eduLevelChangeHandler = (e) => {
        this.setState({
            degreeType: e.target.value
        })
    }
    majorChangeHandler = (e) => {
        this.setState({
            major: e.target.value
        })
    }
    startDateChangeHandler = (e) => {
        this.setState({
            yearOfStarting: e.target.value
        })
    }
    endDateChangeHandler = (e) => {
        this.setState({
            yearOfPassing: e.target.value
        })
    }
    gpaChangeHandler = (e) => {
        this.setState({
            gpa: e.target.value
        })
    }



    cancelEdit = (e) => {
        this.setState({
            edit: false,
        })
        // this.state =[]
    }

    submitEdit = (e) => {
        e.preventDefault();
        const data = {
            college: this.state.college,
            major: this.state.major,
            yearOfStarting: this.state.yearOfStarting,
            yearOfPassing: this.state.yearOfPassing,
            gpa: this.state.gpa,
            degreeType: this.state.degreeType,
            id: localStorage.getItem('id')
        }

        this.props.changeEducation(data)
        // console.log(data);
        // axios.post(`${backendServer}/api/account/addUpdateStudentEducation`, data)
        //     .then(response => {
        //         console.log(response);
        //         if (response.status == 200) {
        //             //
        //         }
        //     }
        //     ).catch(ex => {
        //         alert(ex);
        //     });
        this.setState({
            // educationID: this.state.educationID,
            // college: this.state.college,
            // major: this.state.major,
            // yearOfStarting: this.state.yearOfStarting,
            // yearOfPassing: this.state.yearOfPassing,
            // gpa: this.state.gpa,
            // degreeType: this.state.degreeType,
            add: false,
            edit: false
        })
    }
    render() {

        let collegeSelect =
            (
                <select onChange={this.collegeChangeHandler} value={this.state.college} className="form-control">
                    <option key={colleges[0]} value="0" > {colleges[0]} </option>
                    <option key={colleges[1]} value="1"> {colleges[1]} </option>
                    <option key={colleges[2]} value="2"> {colleges[2]} </option>
                    <option key={colleges[3]} value="3"> {colleges[3]} </option>
                </select>
            );

            let degreeSelect =
            (
                <select onChange={this.eduLevelChangeHandler} value={this.state.degreeType} className="form-control">
                    <option key={degreeTypes[0]} value="0" > {degreeTypes[0]} </option>
                    <option key={degreeTypes[1]} value="1"> {degreeTypes[1]} </option>
                    <option key={degreeTypes[2]} value="2"> {degreeTypes[2]} </option>
                </select>
            );

        let majorSelect =
            (
                <select onChange={this.majorChangeHandler} value={this.state.major} className="form-control">
                    <option key={majors[0]} value="0" >{majors[0]} </option>
                    <option key={majors[1]} value="1"> {majors[1]} </option>
                    <option key={majors[2]} value="2"> {majors[2]} </option>
                    <option key={majors[3]} value="3"> {majors[3]} </option>
                    <option key={majors[4]} value="4" >{majors[4]} </option>
                    <option key={majors[5]} value="5"> {majors[5]} </option>
                    <option key={majors[6]} value="6"> {majors[6]} </option>
                    <option key={majors[7]} value="7"> {majors[7]} </option>
                    <option key={majors[8]} value="8" >{majors[8]} </option>
                </select>
            );

        if (this.state.edit || this.state.add) {
            return (
                <div>
                    <div className="form-group">
                        <label>College</label>
                        {collegeSelect}
                        {/* <input type="text" onChange={this.collegeChangeHandler} value={this.state.college} className="form-control" id="inputAddress" placeholder="College" /> */}
                    </div>
                    <div className="form-group">
                        <label>Education Level</label>
                        {degreeSelect}
                        </div>
                    <div className="row">
                        <div className="form-group  col-sm-6">
                            <label >Major</label>
                            {majorSelect}
                            {/* <input type="text" onChange={this.majorChangeHandler} value={this.state.major} className="form-control" id="inputAddress" placeholder="Major" /> */}
                        </div>
                        <div className="col-sm-6">
                            <label >GPA</label>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input type="text" onChange={this.gpaChangeHandler} value={this.state.gpa} className="form-control" />
                                </div>
                                <div className="col-sm-6">
                                    <h5>Out of 4</h5>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label >Start Date</label>
                            <input type="date" onChange={this.startDateChangeHandler} value={this.state.yearOfStarting} className="form-control" />
                        </div>
                        <div className="form-group col-sm-6">
                            <label >End Date</label>
                            <input type="date" onChange={this.endDateChangeHandler} value={this.state.yearOfPassing} className="form-control" />
                        </div>
                    </div>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </div>

            )
        }
        else {
            let editButton=null;
        if(this.props.editable) {
            editButton = <button type="button" className="btn btn-default btn-circle pull-right" onClick={this.editButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
        }
            return (
                <div className="row">
                    <div className="col-sm-1">
                        <p>
                            <img src="/images/university.png" className="logo" /></p>
                    </div>
                    <div className="col-sm-9">
                        <h4>{colleges[this.state.college]}</h4>
                        <p>{degreeTypes[this.state.degreeType]} , {majors[this.state.major]} </p>
                        <p>{dateTimeToDate(this.state.yearOfStarting)} - {dateTimeToDate(this.state.yearOfPassing)}</p>
                        <p> <b> GPA : </b>{this.state.gpa} / 4</p>
                    </div>
                    <div className="col-sm-1">
                        {editButton}
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = state => {
    return { 
      education : state.studentProfileReducer.education,
     };
};

function mapDispatchToProps(dispatch) {
    return {
        changeEducation: (data) => dispatch(changeEducation(data))
    };
}
const Education = connect(mapStateToProps, mapDispatchToProps)(EducationPage);
export default Education; 