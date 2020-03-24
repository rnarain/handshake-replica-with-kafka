import React, { Component } from 'react';
// import BasicInfo from '../ProfileTabs/AllTabs/BasicInfo';
// import AccountInfo from '../ProfileTabs/AllTabs/AccountInfo';
// import CareerObjective from '../ProfileTabs/AllTabs/CareerObjective';
// import Education from '../ProfileTabs/AllTabs/Education';
// import Experience from '../ProfileTabs/AllTabs/Experience';
// import Skills from '../ProfileTabs/AllTabs/Skills';
import axios from 'axios';
import {colleges ,majors, skills} from '../../../enum'
import cookie from 'react-cookies';
import backendServer from '../../../webConfig'





class Students extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            students: [],
            filteredStudents: [],
            collegeFilterArray:[],
            skillsFilterArray:[],
        }

        this.nameFilterChangeHandler= this.nameFilterChangeHandler.bind(this);
        this.collegeFilterChangeHandler= this.collegeFilterChangeHandler.bind(this);
        this.skillsFilterChangeHandler= this.skillsFilterChangeHandler.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        await axios.get(`${backendServer}/api/account/getAllStudents`)
            .then(response => {
                console.log(response);
                this.setState({
                    students: response.data.data,
                    filteredStudents : response.data.data
                })
            }
            ).catch(ex => {
                alert(ex);
            });
    }
    nameFilterChangeHandler = (e) => {
        let filteredstudents = this.state.students;
        if (e.target.value) {
            this.setState({
                filteredStudents: filteredstudents.filter((s) => {
                    let name= s.fname + s.lname;
                    return (name.replace(/\s+/g, '').toLowerCase().includes(e.target.value.replace(/\s+/g, '').toLowerCase()))
                }
                )
            })
        }
    }

    collegeFilterChangeHandler = (e) => {
        if(e.target.checked){
            this.setState({
                collegeFilterArray : this.state.collegeFilterArray.concat(parseInt(e.target.value))
           } , ()=>{
               return this.updateStudentsForCollege()
           })
        }
        else{
            var array = [...this.state.collegeFilterArray]; // make a separate copy of the array
            var index = array.indexOf(parseInt(e.target.value))
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({
                    collegeFilterArray : array
                }, ()=>{
                    return this.updateStudentsForCollege()
                })
            }
        }
    }

    updateStudentsForCollege=()=>{
        console.log(this.state.collegeFilterArray)
        if(this.state.collegeFilterArray.length === 0){
            this.setState({
                filteredStudents: this.state.students
        })
        }
        else{
            let filteredstudents = this.state.students;
            this.setState({
                filteredStudents: filteredstudents.filter((s) => {
                    return (this.state.collegeFilterArray.includes(s.college))
                }
                )
            })
        }
        
    }

    skillsFilterChangeHandler = (e) => {
        if(e.target.checked){
            this.setState({
                skillsFilterArray : this.state.skillsFilterArray.concat(e.target.value)
           } , ()=>{
               return this.updateStudentsForSkills()
           })
        }
        else{
            var array = [...this.state.skillsFilterArray]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({
                    skillsFilterArray : array
                }, ()=>{
                    return this.updateStudentsForSkills()
                })
            }
        }
    }

    updateStudentsForSkills=()=>{
        console.log(this.state.skillsFilterArray)
        if(this.state.skillsFilterArray.length === 0){
            this.setState({
                filteredStudents: this.state.students
        })
    }
        else{
            let filteredstudents = this.state.students;
            this.setState({
                filteredStudents: filteredstudents.filter((s) => {
                    return (this.state.skillsFilterArray.some(item => s.skills.split(",").includes(item)))
                }
                )
            })
        }
        
    }

    render() {
        let students = this.state.filteredStudents.map(student => {
            let worksAt = null;
            if(student.title !== null){
                worksAt =<p><i className="glyphicon glyphicon-briefcase"></i>{student.title} at {student.company}</p>
              }
              else{
                worksAt =<p><i className="glyphicon glyphicon-briefcase"></i> No work experience listed</p>

              }
            return (
                <div className="box-part">
                    <div className="card-body container-fluid">
                        <div className="col-sm-2">
                            <img className=" img-fluid img-circle profile-img" src={student.profilePicURL} alt="No profile image available" />
                        </div>
                        <div className="col-sm-10">
                            <div className="row">
                            <a href=""><h4 className="card-title">{student.fname} {student.lname}</h4></a>
                            <h5 className="card-text">{colleges[student.college]}</h5>
                            </div>
                            <div className="row">
                            <div className="col-sm-6 nopadding">
                            <p className="card-text">{student.degreeType} ,Graduates {student.yearOfPassing} </p>
                            {worksAt}
                        </div>

                        <div className="col-sm-6 nopadding">
                            <p >{majors[student.major]} </p>
                            <p > GPA : {student.gpa} / 4 </p>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>

            )
        })

        let collegesCheckboxes = Object.keys(colleges).map((key)=> {
            return(
                <div className="form-check" key={key} >
    <input type="checkbox" className="form-check-input"  value={key} onChange={this.collegeFilterChangeHandler}/>
    <span className="form-check-label"> {colleges[key]}</span>
  </div>
            )
        }) 

        let skillsButtons = Object.keys(skills).map((key)=> {
            return(

                <div className="form-check" key={key}>
    <input type="checkbox" className="form-check-input" key={key} value={key} onChange={this.skillsFilterChangeHandler}/>
    <span className="form-check-label"> {skills[key]}</span>
  </div>
            )
        }) 
//         <div className="form-check">
//     <input type="checkbox" className="form-check-input" id="exampleCheck1">
//     <label className="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
        return (
            <div className="handshake-body">
                <div className=" col-sm-10 col-sm-offset-1 profile-container card-columns">
                    <div className="card col-sm-3">
                        <div className="box-part-nopadding">
                            <div className="padding-inside">
                                <div className="header-filter">
                                    <h4>Filters</h4>
                                </div>
                                <div className="style-divider"></div>
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <a type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Name
        </a>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                            <input id="nameFilter" onChange={this.nameFilterChangeHandler} type="text" className="form-control" name="nameFilter" placeholder="Filter by name" />

      </div>
                                        </div>
                                    </div>
                                    <div className="style-divider"></div>

                                    <div className="card">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <a className="collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    College Name
        </a>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="card-body">
                                                {collegesCheckboxes}
      </div>
                                        </div>
                                    </div>
                                    <div className="style-divider"></div>

                                    <div className="card">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <a className="collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    SkillSet
        </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div className="card-body">
                                                {skillsButtons}
      </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card col-sm-9">
                        {students}
                    </div>
                </div>
            </div>
        )
    }
}

export default Students;
