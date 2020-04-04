import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import backendServer from '../../../webConfig'
import { connect } from 'react-redux';
import {dateTimeToDate} from '../../../helperMethods'


class IndividualMessage extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            selectedMessage: {},
            newMessage:null,
            typing:false
        }
    }
    //Call the Will Mount to set the auth Flag to false
     componentDidUpdate() {
    }

    submitEdit = (e) => {
        // const data = {
        //     careerObjective: this.state.careerObjective,
        //     id:localStorage.getItem('id')
        // }
        // this.props.changeObjective(data);
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
            typing: false,
        })
    }

    cancelEdit = (e) => {
        this.setState({
            typing: false,
            newMessage:""
        })
    }
    typingHandler = (e) => {
        this.setState({
            newMessage: e.target.value,
            typing:true
        })
      }

    render(){
      let chats = this.props.individualMessage.chats.map(chat => {
          console.log(chat.to);
        if(chat.to === localStorage.getItem('id')){
            return (
                <div className="incoming_msg">
                <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{chat.chat}</p>
                    <span className="time_date">{dateTimeToDate(chat.time)}</span></div>
                </div>
              </div>
            )
        }
        else{
            return(
                <div className="outgoing_msg">
              <div className="sent_msg">
              <p>{chat.chat}</p>
                    <span className="time_date">{dateTimeToDate(chat.time)}</span></div>
            </div>
            )
        }
    });



    let buttons= null;
        if(this.state.typing){
            buttons= 
                <p>
                    <button onClick={this.submitEdit} className="btn btn-success edit-button">Send</button>
                    <button onClick={this.cancelEdit} className="btn btn-danger edit-button">Cancel</button>
                </p>
        }
        return (
            <div>
            <div className=" row messageListRight">
                {chats}
           </div>
            <div className="row messageTextBox">
            <textarea className="form-control" value={this.state.newMessage} onChange={this.typingHandler} placeholder="Type Here" rows="2"></textarea>
                    {buttons}
            </div>
            </div>
        )
    }
}
export default IndividualMessage;
