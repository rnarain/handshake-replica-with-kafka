import React, { Component } from 'react';
import axios from 'axios';
import {colleges ,majors,degreeTypes} from '../../../../enum'
import backendServer from '../../../../webConfig'
import {connect} from 'react-redux'
import { changename  , changeProfilePic } from "../../../../js/actions/studentProfile.js";
import {dateTimeToDate} from '../../../../helperMethods';





class BasicInfoPage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            fname:null,
            lname:null,
            college:"",
            degreeType : "",
            yearOfPassing:"",
            major:"",
            gpa:"",
            profilePicURL:null,
            flag : true,
            edit:false,
            profileImg:null

        }

        this.editButtonChangeHandler = this.editButtonChangeHandler.bind(this);

        // this.state.fname = this.props.entireData.fname;
    }

        componentDidUpdate() {
            if( this.props.profilePicURL!=this.state.profilePicURL ){
                console.log(this.props.education);
                this.setState({
                    fname : this.props.fname,
                    lname : this.props.lname,
                    college: this.props.education[0].college,
                    yearOfPassing: this.props.education[0].yearOfPassing,
                    degreeType: this.props.education[0].degreeType,
                    major: this.props.education[0].major,
                    gpa: this.props.education[0].gpa,
                    profilePicURL : this.props.profilePicURL
                })
            }
            
        }
        editButtonChangeHandler = (e) => {
            this.setState({
                edit: !this.state.edit
            })
        }

        fNameChangeHandler = (e) => {
            this.setState({
            fname: e.target.value
            })
        }

        lNameChangeHandler = (e) => {
            this.setState({
                lname: e.target.value
            })
        }

        cancelEdit = (e) => {
            this.setState({
                edit: !this.state.edit
            })
        }

        submitEdit = (e) => {
           this.props.changename({
                fname: this.state.fname,
                lname: this.state.lname,
                id:localStorage.getItem('id'),
               
            })
            // axios.post(`${backendServer}/api/account/updateStudentName`  , data)
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
                edit: !this.state.edit
            })
        }

        getProfilePic =(e) =>{
            this.setState({
                profileImg: e.target.files[0]
            })
            console.log(e.target.files[0])
        }

        submitProfileEdit = (e) => {
            const data = new FormData()
            data.append('file', this.state.profileImg)
            this.props.changeProfilePic(data);
        //     axios.post(`${backendServer}/api/account/updateStudentProfilePic/${localStorage.getItem('id')}` , data)
        //         .then(response => {
        //             console.log(response);
        //             if (response.status == 200) {
        //                 this.setState({
        //                    profilePicURL :  
        //                 })
        //             }
        //         }
        //         ).catch(ex => {
        //             alert(ex);
        //         });
        // }
        }
    
    render() {
        let editButton=null;
        if(this.props.editable) {
            editButton = <button type="button" className="btn btn-default btn-circle pull-right" onClick={this.editButtonChangeHandler}>< i className="glyphicon glyphicon-pencil"></i></button>
        }
        if(this.state.edit)
{
        return (
            <div className="card-body">
               <div className=" text-center">
                 <p><img className="img-fluid img-circle profile-pic" src={this.state.profilePicURL} alt="card image" /></p>
                 <input type="file" className="form-control" onChange={this.getProfilePic}/>
                <p><button onClick={this.submitProfileEdit} className="btn btn-success edit-button">Save</button>
                </p>
                <input onChange={this.lNameChangeHandler} value={this.state.lname} type="text" className="form-control" name="lname" placeholder="Last Name" />
                <input onChange={this.fNameChangeHandler} value={this.state.fname} type="text" className="form-control" name="fName" placeholder="First Name" />
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="card-body">
              <div className="container-fluid">
                {editButton}
               </div>
               <div className=" text-center">
               <p><img className="img-fluid img-circle profile-pic" src={this.state.profilePicURL} alt="No profile picture available" /></p>
                <h4 className="card-title">{this.state.fname} {this.state.lname}</h4>
                <h5 className="card-text">{colleges[this.state.college]}</h5>
                <h5 className="card-text">{degreeTypes[this.state.degreeType]} , { majors[this.state.major]} </h5>
                <p >Graduates {dateTimeToDate(this.state.yearOfPassing)} </p>
                <p > GPA : {this.state.gpa} / 4 </p>
                </div>
            </div>
        )
    }
    }
}

const mapStateToProps = state => {
    return {
        fname: state.studentProfileReducer.fname,
        lname: state.studentProfileReducer.lname,
        profilePicURL: state.studentProfileReducer.profilePicURL,
        education : state.studentProfileReducer.education
    };
};

function mapDispatchToProps(dispatch) {
    return {
        changename: (data) => dispatch(changename(data)) ,
        changeProfilePic: (data) => dispatch(changeProfilePic(data)) ,

    };
}
const BasicInfo = connect(mapStateToProps, mapDispatchToProps)(BasicInfoPage);
export default BasicInfo;
