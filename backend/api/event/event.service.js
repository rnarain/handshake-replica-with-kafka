const pool = require("../../config/database");
const Event = require("../../Models/EventModel");


module.exports = {
  createEvent: (data, callBack) => {

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
  },

  registerForEvent: (data, callBack) => {
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
  },
  getAllEventsByStudentID: (id,callBack) => {
    Event.find({ 'participants.studentID':{$ne: id}}, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

  getAllEventRegistrationsByStudentID: (id,callBack) => {
    Event.find({ 'participants.studentID': id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

   getEventsByCompanyID: (id,callBack) => {
    Event.find({ companyID : id }, (error, result) => {
      if (error) {
        callBack(error);
      }
      console.log(result);
      return callBack(null, result);
    });
  },

//   deleteJob: (id, callBack) => {
//     pool.query(
//       `delete from job where jobID = ?`,
//       [id],
//       (error, results, fields) => {
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },

getParticpantListByEventID: (id,callBack) => {
  Event.findOne({ _id : id }, (error, result) => {
    if (error) {
      callBack(error);
    }
    console.log(result);
    return callBack(null, result.participants);
  });
  },

//   changeApplicationStatus: (data, callBack) => {
//     pool.query(
//       `update jobapplication SET status=? where jobApplicationID= ?`,
//       [
//         data.status,
//         data.jobApplicationID
//       ],
//       (error, results, fields) => {
//         console.log(results);
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },
//   applyForJob: (data, callBack) => {
//     pool.query(
//       `insert into jobapplication(jobID,studentID,status,resumeURL) 
//                 values(?,?,?,?)`,
//       [
//         data.jobID,
//         data.studentID,
//         0,
//         data.resumeURL,
//       ],
//       (error, results, fields) => {
//         console.log(results);
//         if (error) {
//           callBack(error);
//         }
//         return callBack(null, results);
//       }
//     );
//   },
}