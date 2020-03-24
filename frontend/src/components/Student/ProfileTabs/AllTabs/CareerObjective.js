import React, { Component } from 'react';
import axios from 'axios';
import backendServer from '../../../../webConfig'
import { connect } from 'react-redux';
import { changeObjective } from "../../../../js/actions/studentProfile.js";




class CareerObjectivePage extends Component {
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            careerObjective:"",
            editing:false,
        }

        // this.state.fname = this.props.entireData.fname;
    }

        componentDidUpdate() {
            console.log("aya")
            if(this.props.careerObjective!=this.state.careerObjective && !this.state.editing){
                this.setState({
                    careerObjective : this.props.careerObjective
                })
            }
            
        }
    
        submitEdit = (e) => {
            const data = {
                careerObjective: this.state.careerObjective,
                id:localStorage.getItem('id')
            }
            this.props.changeObjective(data);
            // axios.post(`${backendServer}/api/account/updateStudentObjective`, data)
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
                editing: false,
            })
        }
    
        cancelEdit = (e) => {
            this.setState({
                careerObjective: this.props.careerObjective,
                editing: false,
            })
        }
        careerObjectiveChangeHandler =(e)=>{
            this.setState({
                careerObjective: e.target.value,
                editing:true
            })
        }
    render() {

        let buttons= null;
        if(this.state.editing){
            buttons= 
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Save</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
        }

            return(
                <div className="card-body">
                     <h4 className="card-title">My Journey</h4>
                     <div className="row"></div>
                    <p className="card-text text-primary">What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</p>
                    <textarea className="form-control" value={this.state.careerObjective || ''} onChange={this.careerObjectiveChangeHandler} name="jobDescription" rows="3"></textarea>
                    {buttons}
                </div>
            )
        }
       
}
const mapStateToProps = state => {
    return { 
     careerObjective : state.studentProfileReducer.careerObjective,
     };
};

function mapDispatchToProps(dispatch) {
    return {
         changeObjective: (data) => dispatch(changeObjective(data))
    };
}
const CareerObjective = connect(mapStateToProps, mapDispatchToProps)(CareerObjectivePage);
export default CareerObjective;