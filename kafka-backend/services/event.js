const Event = require('../Models/EventModel');

function handle_request(msg, callBack) {
  console.log(msg);
  if (msg.path === "create_event") {
    let data=msg.data;
    var newEvent = new Event({
        date :data.date ,
        time : data.time,
        name : data.name,
        description : data.description,
        companyID : data.companyID,
        companyName : data.companyName,
        majorsEligible : data.majorsEligible,
        location : data.location,
        participants : []
      });
  
      newEvent.save((error, data) => {
        if (error) {
          callBack(error);
        }
        console.log(data);
        return callBack(null, data);
      })
  }
  else if (msg.path === "register_for_event") {
    let data=msg.data;
    let newParticipant = {
        studentID: data.studentID,
        name: data.name,
      }
      Event.update({ _id: data.eventID },  { $push: { participants: newParticipant  } }, { upsert: false }, (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
      );
  }
  else if (msg.path === "get_all_events_by_student_id") {
    Event.find({ 'participants.studentID':{$ne: msg.id}}, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "get_all_event_registrations_by_student_id") {
    Event.find({ 'participants.studentID': msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }
  else if (msg.path === "get_events_by_company_id") {
    Event.find({ companyID : msg.id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result);
      });
  }

  else if (msg.path === "get_particpant_list_by_event_id") {
      Event.findOne({ _id : id }, (error, result) => {
        if (error) {
          callBack(error);
        }
        console.log(result);
        return callBack(null, result.participants);
      });
  }

  
};

exports.handle_request = handle_request;