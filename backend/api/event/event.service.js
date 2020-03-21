const pool = require("../../config/database");

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
    pool.query(
      `insert into eventparticipant(studentID,eventID) 
                values(?,?)`,
      [
        data.studentID,
        data.eventID,
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
  getAllEventsByStudentID: (id,callBack) => {
    pool.query(
      `select * from event AS et 
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

  getAllEventRegistrationsByStudentID: (id,callBack) => {
    pool.query(
      `select * from eventparticipant as ep
      INNER JOIN event as et ON ep.eventID = et.eventID
      where studentID = ?
`,
      [
        id
      ],
      (error, results) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
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