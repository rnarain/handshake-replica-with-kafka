const pool = require("../../config/database");
const Event = require("../../Models/EventModel");


module.exports = {
  createEvent: (data, callBack) => {
    pool.query(
      `insert into event(companyID,date,time,name,description,location,majorsEligible	) 
                values(?,?,?,?,?,?,?)`,
      [
        data.companyID,
        data.date,
        data.time,
        data.name,
        data.description,
        data.location,
        data.majorsEligible,
      ],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
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
    pool.query(
      `select * 
      from event where companyID = ?
`,
      [
       id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
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
    pool.query(
      `select EP.eventParticipantID,EP.studentID,SP.fname,SP.lname from eventparticipant EP INNER JOIN studentprofile SP ON SP.studentID = EP.studentID where EP.eventID =? 
`,
      [
       id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
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